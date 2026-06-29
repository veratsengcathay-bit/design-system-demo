import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
} from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';

interface RippleData { id: number; x: number; y: number; size: number; }

@Component({
  selector: 'lib-menu-item',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="menu-item"
      [attr.data-menu-state]="menuState()"
      [attr.data-menu-selected]="selected && size === 'M' ? 'true' : 'false'"
      [attr.data-menu-size]="size"
      [disabled]="disabled || null"
      [style.height]="size === 'S' ? 'auto' : 'var(--menu-m-height)'"
      [style.padding]="size === 'S'
        ? 'var(--menu-s-padding-y) var(--menu-s-padding-x)'
        : 'var(--menu-m-padding-y) var(--menu-m-padding-x)'"
      [style.gap]="size === 'M' ? 'var(--menu-m-gap)' : '0'"
      [style.font-size]="size === 'S' ? 'var(--menu-s-font-size)' : 'var(--menu-m-font-size)'"
      [style.line-height]="size === 'S' ? 'normal' : 'var(--menu-m-line-height)'"
      style="
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-sizing: border-box;
        border: none;
        outline: none;
        cursor: pointer;
        font-family: var(--font-family-be-vietnam-pro);
        font-weight: var(--font-weight-medium);
        font-style: normal;
        white-space: nowrap;
      "
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- State layer & ripple -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;" aria-hidden="true">
        <div class="menu-item__state-layer" style="position:absolute;inset:0;"></div>
        @for (r of ripples(); track r.id) {
          <div class="menu-item__ripple"
            [style.left]="r.x + 'px'"
            [style.top]="r.y + 'px'"
            [style.width]="r.size + 'px'"
            [style.height]="r.size + 'px'">
          </div>
        }
      </div>

      <!-- Text label -->
      <span class="menu-item__text" style="position:relative;flex-shrink:0;white-space:nowrap;">{{ text }}</span>

      <!-- Check icon — M size, selected state only -->
      @if (size === 'M' && selected) {
        <span class="menu-item__check" style="position:relative;display:flex;align-items:center;flex-shrink:0;top:3px;">
          <lucide-icon [img]="checkIcon" [size]="24" [strokeWidth]="2" color="currentColor"></lucide-icon>
        </span>
      }
    </button>
  `,
  styles: [`lib-menu-item { display: block; }`],
})
export class MenuItemComponent {
  @Input() text = '';
  @Input() size: 'M' | 'S' = 'M';
  @Input() selected = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  protected readonly checkIcon = Check;
  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples = signal<RippleData[]>([]);

  protected menuState = computed(() => {
    if (this.disabled) return 'disabled';
    return this.interaction();
  });

  private get isInteractive(): boolean { return !this.disabled; }

  protected onMouseEnter(): void { if (this.isInteractive) this.interaction.set('hover'); }
  protected onMouseLeave(): void { if (this.isInteractive) this.interaction.set('default'); }

  protected onMouseDown(e: MouseEvent): void {
    if (!this.isInteractive) return;
    this.interaction.set('pressed');
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = performance.now();
    this.ripples.update(prev => [...prev, {
      id,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    }]);
    setTimeout(() => this.ripples.update(prev => prev.filter(r => r.id !== id)), 620);
  }

  protected onMouseUp(): void { if (this.isInteractive) this.interaction.set('default'); }
  protected onClick(): void { if (!this.disabled) this.clicked.emit(); }
}

/**
 * S 按鈕組合情境 — menu_group。
 * 將多個 size="S" 的 lib-menu-item 包進白底圓角外框,項目間以 1px 白縫分隔。
 * Figma: SAG Library node 601:612。
 */
@Component({
  selector: 'lib-menu-group',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="menu-group"><ng-content></ng-content></div>`,
  styles: [`lib-menu-group { display: inline-block; }`],
})
export class MenuGroupComponent {}
