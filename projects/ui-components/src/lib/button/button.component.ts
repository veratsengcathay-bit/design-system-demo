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
import { DS_ICONS, ICON_MAP, type IconType } from '../shared/icons';

export type ButtonAppearance = 'outline' | 'tonal' | 'filled' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface RippleData { id: number; x: number; y: number; size: number; }

/**
 * Size config — CSS variable aliases only (mirrors Figma Make button SIZE_CONFIG).
 * sm/md/lg share font 12px + radius 16px; xl uses font 16px + radius 12px.
 * Icon px: sm 16 / md 12 / lg 20 / xl 20. Horizontal padding is uniform (--btn-px)
 * with +8px added on the side opposite a present icon (see template).
 */
const SIZE_CONFIG: Record<ButtonSize, { py: string; fontSize: string; radius: string; iconPx: number; }> = {
  sm: { py: 'var(--btn-py-sm)', fontSize: 'var(--btn-font-size-sm)', radius: 'var(--btn-radius-sm)', iconPx: 16 },
  md: { py: 'var(--btn-py-md)', fontSize: 'var(--btn-font-size-sm)', radius: 'var(--btn-radius-sm)', iconPx: 12 },
  lg: { py: 'var(--btn-py-lg)', fontSize: 'var(--btn-font-size-sm)', radius: 'var(--btn-radius-sm)', iconPx: 20 },
  xl: { py: 'var(--btn-py-xl)', fontSize: 'var(--btn-font-size-xl)', radius: 'var(--btn-radius-xl)', iconPx: 20 },
};

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="btn"
      [attr.data-btn-appearance]="appearance"
      [attr.data-btn-state]="btnState()"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || label"
      style="position:relative;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;outline:none;"
      [style.paddingTop]="cfg.py"
      [style.paddingBottom]="cfg.py"
      [style.paddingLeft]="trailingIcon ? 'calc(var(--btn-px) + 8px)' : 'var(--btn-px)'"
      [style.paddingRight]="leadingIcon ? 'calc(var(--btn-px) + 8px)' : 'var(--btn-px)'"
      [style.gap]="'var(--btn-gap)'"
      [style.borderRadius]="cfg.radius"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- State layer & ripple -->
      <div style="position:absolute;inset:0;overflow:hidden;" [style.borderRadius]="cfg.radius" aria-hidden="true">
        <div class="btn__state-layer" style="position:absolute;inset:0;"></div>
        @for (r of ripples(); track r.id) {
          <div class="btn__ripple"
            [style.left.px]="r.x" [style.top.px]="r.y"
            [style.width.px]="r.size" [style.height.px]="r.size">
          </div>
        }
      </div>

      <!-- Leading icon -->
      @if (leadingIcon) {
        <lucide-icon
          class="btn__icon"
          style="position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;"
          [img]="leadingIconData()"
          [size]="cfg.iconPx"
          [strokeWidth]="1.5"
          color="currentColor"
        ></lucide-icon>
      }

      <!-- Label -->
      <span
        class="btn__label"
        style="position:relative;font-family:var(--font-family-roboto);font-weight:var(--btn-font-weight);white-space:nowrap;line-height:normal;"
        [style.fontSize]="cfg.fontSize"
      >{{ label }}</span>

      <!-- Trailing icon -->
      @if (trailingIcon) {
        <lucide-icon
          class="btn__icon"
          style="position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;"
          [img]="trailingIconData()"
          [size]="cfg.iconPx"
          [strokeWidth]="1.5"
          color="currentColor"
        ></lucide-icon>
      }

      <!-- Border ring -->
      <div class="btn__border" style="position:absolute;inset:0;pointer-events:none;" [style.borderRadius]="cfg.radius" aria-hidden="true"></div>
    </button>
  `,
  styles: [`lib-button { display: inline-block; }`],
})
export class ButtonComponent {
  @Input() label = 'Label';
  @Input() appearance: ButtonAppearance = 'outline';
  @Input() size: ButtonSize = 'sm';
  @Input() disabled = false;
  @Input() leadingIcon: IconType | null = null;
  @Input() trailingIcon: IconType | null = null;
  @Input('aria-label') ariaLabel?: string;
  @Output() clicked = new EventEmitter<void>();

  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples     = signal<RippleData[]>([]);

  protected btnState = computed(() => {
    if (this.disabled) return 'disabled';
    return this.interaction();
  });

  protected leadingIconData  = computed(() =>
    this.leadingIcon  ? ICON_MAP[this.leadingIcon]  : ICON_MAP['chevron-left']
  );
  protected trailingIconData = computed(() =>
    this.trailingIcon ? ICON_MAP[this.trailingIcon] : ICON_MAP['chevron-right']
  );

  get cfg() { return SIZE_CONFIG[this.size]; }

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

  protected onMouseUp(): void { if (this.isInteractive) this.interaction.set('default'); }
  protected onClick(): void { if (!this.disabled) this.clicked.emit(); }
}
