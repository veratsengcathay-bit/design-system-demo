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

export type ServiceTileOrientation = 'vertical' | 'horizontal';

interface RippleData { id: number; x: number; y: number; size: number; }

/**
 * ServiceTile — quick-action button (a.k.a. "Service Button" in Figma).
 *
 * Two styles via `orientation`:
 *   - vertical   (default): icon above label, 88px tall
 *   - horizontal: icon left of label, 64px tall (used for single-item groups)
 *
 * Interactive: hover / pressed state layer + Ionic-style ripple, matching the
 * button / chip / list pattern. Provide the icon via `iconSrc` (image URL) or
 * by projecting custom markup/SVG through the default slot.
 *
 * Figma: 💫 SAG Library — Service Button (node 463:3370).
 */
@Component({
  selector: 'lib-service-tile',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="service-tile"
      [attr.data-service-tile-orientation]="orientation"
      [attr.data-service-tile-state]="tileState()"
      [disabled]="disabled || null"
      [attr.aria-label]="ariaLabel || label"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- State layer & ripple -->
      <div class="service-tile__state-layer" aria-hidden="true"></div>
      @for (r of ripples(); track r.id) {
        <div class="service-tile__ripple"
          [style.left.px]="r.x" [style.top.px]="r.y"
          [style.width.px]="r.size" [style.height.px]="r.size">
        </div>
      }

      <span class="service-tile__icon">
        @if (iconSrc) {
          <img [src]="iconSrc" [alt]="label" />
        } @else {
          <ng-content></ng-content>
        }
      </span>
      <span class="service-tile__label">{{ label }}</span>
    </button>
  `,
  styles: [`lib-service-tile { display: block; width: 100%; }`],
})
export class ServiceTileComponent {
  @Input() label = '';
  @Input() iconSrc?: string;
  @Input() orientation: ServiceTileOrientation = 'vertical';
  @Input() disabled = false;
  @Input('aria-label') ariaLabel?: string;
  @Output() clicked = new EventEmitter<void>();

  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples     = signal<RippleData[]>([]);

  protected tileState = computed(() => (this.disabled ? 'disabled' : this.interaction()));

  private get isInteractive(): boolean { return !this.disabled; }

  protected onMouseEnter(): void { if (this.isInteractive) this.interaction.set('hover'); }
  protected onMouseLeave(): void { if (this.isInteractive) this.interaction.set('default'); }

  protected onMouseDown(e: MouseEvent): void {
    if (!this.isInteractive) return;
    this.interaction.set('pressed');
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const s = Math.max(rect.width, rect.height) * 2;
    const id = performance.now();
    this.ripples.update(prev => [...prev, {
      id, size: s,
      x: e.clientX - rect.left - s / 2,
      y: e.clientY - rect.top  - s / 2,
    }]);
    setTimeout(() => this.ripples.update(prev => prev.filter(r => r.id !== id)), 620);
  }

  protected onMouseUp(): void { if (this.isInteractive) this.interaction.set('hover'); }
  protected onClick(): void { if (!this.disabled) this.clicked.emit(); }
}
