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
import { LucideAngularModule } from 'lucide-angular';
import { ICON_MAP, type IconType } from '../shared/icons';

export type { IconType };

interface RippleData { id: number; x: number; y: number; size: number; }

@Component({
  selector: 'lib-list-item',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="list"
      [attr.data-list-state]="listState()"
      [style.cursor]="viewOnly ? 'default' : 'pointer'"
      style="
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--list-gap);
        padding: var(--list-padding);
        border-radius: var(--list-radius);
        min-height: var(--list-min-height);
        overflow: hidden;
        box-sizing: border-box;
      "
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- State layer & ripple -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;" aria-hidden="true">
        <div class="list__state-layer" style="position:absolute;inset:0;"></div>
        @for (r of ripples(); track r.id) {
          <div class="list__ripple"
            [style.left]="r.x + 'px'" [style.top]="r.y + 'px'"
            [style.width]="r.size + 'px'" [style.height]="r.size + 'px'">
          </div>
        }
      </div>

      <!-- Leading icon -->
      @if (iconName) {
        <span class="list__icon" style="position:relative;display:flex;align-items:center;justify-content:center;align-self:center;flex-shrink:0;width:20px;height:20px;line-height:0;">
          <lucide-icon
            [img]="iconData()"
            [size]="20"
            [strokeWidth]="2"
            color="currentColor"
            style="display:flex;align-items:center;justify-content:center;"
          ></lucide-icon>
        </span>
      }

      <!-- Title -->
      <span
        class="list__title"
        style="
          position: relative;
          flex: 1;
          min-width: 0;
          font-family: var(--font-family-roboto);
          font-size: var(--list-title-font-size);
          font-weight: var(--list-title-font-weight);
          line-height: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >{{ title }}</span>

      <!-- Trailing section -->
      @if (trailingCount !== null) {
        <span
          class="list__trailing-count"
          style="
            position: relative;
            font-family: var(--font-family-be-vietnam-pro);
            font-size: var(--list-count-font-size);
            font-weight: var(--list-count-font-weight);
            line-height: normal;
            flex-shrink: 0;
          "
        >{{ trailingCount }}</span>
      }
      @if (trailingText) {
        <span
          class="list__trailing-text"
          style="
            position: relative;
            font-family: var(--font-family-roboto);
            font-size: var(--list-trailing-text-font-size);
            font-weight: var(--list-trailing-text-font-weight);
            line-height: normal;
            flex-shrink: 0;
          "
        >{{ trailingText }}</span>
      }

      <!-- Chevron -->
      @if (showChevron) {
        <span class="list__chevron" style="position:relative;display:flex;align-items:center;flex-shrink:0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            [attr.width]="'var(--list-chevron-size)'" [attr.height]="'var(--list-chevron-size)'">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </span>
      }
    </div>
  `,
  styles: [`
    lib-list-item { display: block; }
    lib-list-item lucide-icon { display: flex; align-items: center; justify-content: center; }
    lib-list-item lucide-icon svg { display: block; }
  `],
})
export class ListItemComponent {
  @Input() title = '';
  @Input() iconName?: IconType;
  @Input() showChevron = true;
  @Input() trailingCount: number | null = null;
  @Input() trailingText?: string;
  @Input() disabled = false;
  @Input() viewOnly = false;
  @Output() clicked = new EventEmitter<void>();

  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples = signal<RippleData[]>([]);
  protected iconData = computed(() => this.iconName ? (ICON_MAP[this.iconName] ?? ICON_MAP['bell']) : ICON_MAP['bell']);

  protected listState = computed(() => {
    if (this.disabled) return 'disabled';
    return this.interaction();
  });

  private get isInteractive(): boolean { return !this.disabled && !this.viewOnly; }

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
  protected onClick(): void { if (!this.disabled && !this.viewOnly) this.clicked.emit(); }
}
