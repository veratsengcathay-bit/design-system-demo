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

interface RippleData { id: number; x: number; y: number; size: number; }

@Component({
  selector: 'lib-accordion',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="accordion"
      [attr.data-accordion-selected]="selected.toString()"
      [attr.data-accordion-state]="accordionState()"
      [disabled]="disabled"
      style="
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: var(--accordion-gap);
        padding-top: var(--accordion-padding-y);
        padding-bottom: var(--accordion-padding-y);
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        overflow: hidden;
      "
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- State layer & ripple -->
      <div style="position:absolute;inset:0;overflow:hidden;" aria-hidden="true">
        <div class="accordion__state-layer" style="position:absolute;inset:0;"></div>
        @for (r of ripples(); track r.id) {
          <div class="accordion__ripple"
            [style.left]="r.x + 'px'" [style.top]="r.y + 'px'"
            [style.width]="r.size + 'px'" [style.height]="r.size + 'px'">
          </div>
        }
      </div>

      <!-- Label -->
      <span
        class="accordion__label"
        style="
          position: relative;
          font-family: var(--font-family-roboto);
          font-size: var(--accordion-font-size);
          font-weight: var(--accordion-font-weight);
          white-space: nowrap;
          line-height: normal;
        "
      >{{ label }}</span>

      <!-- Chevron icon -->
      <span class="accordion__icon" style="position:relative;display:flex;align-items:center;">
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          [attr.width]="'var(--accordion-icon-size)'"
          [attr.height]="'var(--accordion-icon-size)'"
          [style.transform]="selected ? 'rotate(180deg)' : 'rotate(0deg)'"
          style="transition: transform 200ms ease;"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>

      <!-- Bottom border (selected state) -->
      <div class="accordion__border" style="position:absolute;bottom:0;left:0;right:0;" aria-hidden="true"></div>
    </button>
  `,
  styles: [`lib-accordion { display: inline-block; }`],
})
export class AccordionComponent {
  @Input() label = '';
  @Input() selected = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples = signal<RippleData[]>([]);

  protected accordionState = computed(() => {
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
