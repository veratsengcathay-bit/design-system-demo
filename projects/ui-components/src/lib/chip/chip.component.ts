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
import { NgStyle } from '@angular/common';

interface RippleData {
  id: number;
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'lib-chip',
  standalone: true,
  imports: [NgStyle],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="chip"
      [attr.data-chip-selected]="selected.toString()"
      [attr.data-chip-state]="chipState()"
      [disabled]="disabled"
      style="
        padding-top: var(--chip-padding-y);
        padding-bottom: var(--chip-padding-y);
        padding-left: var(--chip-padding-x);
        padding-right: var(--chip-padding-x);
        border-radius: var(--chip-radius);
        border: none;
        outline: none;
        position: relative;
        flex-shrink: 0;
        cursor: pointer;
      "
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- State layer & ripple -->
      <div class="chip-overlay"
        style="position:absolute;inset:0;overflow:hidden;border-radius:var(--chip-radius);"
        aria-hidden="true">
        <div class="chip__state-layer" style="position:absolute;inset:0;"></div>
        @for (r of ripples(); track r.id) {
          <div class="chip__ripple"
            [ngStyle]="{ left: r.x + 'px', top: r.y + 'px', width: r.size + 'px', height: r.size + 'px' }">
          </div>
        }
      </div>

      <!-- Label -->
      <span class="chip__label" style="position:relative;">{{ label }}</span>

      <!-- Border ring -->
      <div class="chip__border"
        style="position:absolute;inset:0;pointer-events:none;border-radius:var(--chip-radius);border:1px solid var(--chip-border-unselected);"
        aria-hidden="true">
      </div>
    </button>
  `,
  styles: [`lib-chip { display: inline-block; }`],
})
export class ChipComponent {
  @Input() label = '';
  @Input() selected = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples = signal<RippleData[]>([]);

  protected chipState = computed(() => {
    if (this.disabled) return 'disabled';
    return this.interaction();
  });

  private get isInteractive(): boolean {
    return !this.disabled;
  }

  protected onMouseEnter(): void {
    if (!this.isInteractive) return;
    this.interaction.set('hover');
  }

  protected onMouseLeave(): void {
    if (!this.isInteractive) return;
    this.interaction.set('default');
  }

  protected onMouseDown(e: MouseEvent): void {
    if (!this.isInteractive) return;
    this.interaction.set('pressed');

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = performance.now();

    this.ripples.update(prev => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      this.ripples.update(prev => prev.filter(r => r.id !== id));
    }, 620);
  }

  protected onMouseUp(): void {
    if (!this.isInteractive) return;
    this.interaction.set('default');
  }

  protected onClick(): void {
    if (!this.disabled) this.clicked.emit();
  }
}
