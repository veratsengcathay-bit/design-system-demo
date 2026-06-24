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

export type { IconType };
export type IconButtonSize    = 'xs' | 'sm' | 'md';
export type IconBorderVariant = 'outline' | 'white' | 'none';
export type IconDotSize       = 'sm' | 'md';

interface RippleData { id: number; x: number; y: number; size: number; }

const SIZE_CONFIG: Record<IconButtonSize, {
  container: string;
  iconPx:    number;
  padding:   string;
  badgeTopPx: number;
  badgeRightPx: Record<IconDotSize, number>;
}> = {
  xs: {
    container:    'var(--icon-button-size-xs)',
    iconPx:       14,
    padding:      'var(--icon-button-padding-xs)',
    badgeTopPx:   6,
    badgeRightPx: { sm: 5, md: 5 },
  },
  sm: {
    container:    'var(--icon-button-size-sm)',
    iconPx:       20,
    padding:      'var(--icon-button-padding-sm)',
    badgeTopPx:   6,
    badgeRightPx: { sm: 7, md: 8 },
  },
  md: {
    container:    'var(--icon-button-size-md)',
    iconPx:       24,
    padding:      'var(--icon-button-padding-md)',
    badgeTopPx:   6,
    badgeRightPx: { sm: 8, md: 9 },
  },
};

@Component({
  selector: 'lib-icon-button',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="icon-btn"
      [attr.data-icon-btn-state]="effectiveState()"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel || icon"
      [style.width]="cfg.container"
      [style.height]="cfg.container"
      [style.padding]="cfg.padding"
      style="
        box-sizing: border-box;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: var(--icon-button-radius);
        border: none;
        outline: none;
        cursor: pointer;
      "
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown($event)"
      (mouseup)="onMouseUp()"
      (click)="onClick()"
    >
      <!-- ① State layer + ripple -->
      <div style="position:absolute;inset:0;overflow:hidden;border-radius:inherit;" aria-hidden="true">
        <div class="icon-btn__state-layer" style="position:absolute;inset:0;"></div>
        @for (r of ripples(); track r.id) {
          <div class="icon-btn__ripple"
            [style.left.px]="r.x" [style.top.px]="r.y"
            [style.width.px]="r.size" [style.height.px]="r.size">
          </div>
        }
      </div>

      <!-- ② Icon via lucide-angular -->
      <lucide-icon
        class="icon-btn__icon"
        style="position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;"
        [img]="iconData()"
        [size]="cfg.iconPx"
        [strokeWidth]="2"
        color="currentColor"
      ></lucide-icon>

      <!-- ③ Badge dot -->
      @if (showDot && effectiveState() !== 'disabled') {
        <div
          aria-hidden="true"
          style="position:absolute;border-radius:50%;pointer-events:none;background-color:var(--icon-button-badge);"
          [style.width.px]="badgeSizePx"
          [style.height.px]="badgeSizePx"
          [style.top.px]="cfg.badgeTopPx"
          [style.right.px]="cfg.badgeRightPx[dotSize]"
        ></div>
      }

      <!-- ④ Border ring -->
      @if (!disabled && borderVariant !== 'none') {
        <div
          aria-hidden="true"
          style="position:absolute;inset:0;pointer-events:none;border-radius:inherit;"
          [style.border]="'1px solid ' + borderColor"
        ></div>
      }
    </button>
  `,
  styles: [`lib-icon-button { display: inline-block; }`],
})
export class IconButtonComponent {
  @Input() icon: IconType = 'bell';
  @Input() size: IconButtonSize = 'sm';
  @Input() showDot = false;
  @Input() dotSize: IconDotSize = 'sm';
  @Input() borderVariant: IconBorderVariant = 'white';
  @Input() disabled = false;
  @Input('aria-label') ariaLabel?: string;
  @Output() clicked = new EventEmitter<void>();

  protected interaction = signal<'default' | 'hover' | 'pressed'>('default');
  protected ripples     = signal<RippleData[]>([]);

  protected effectiveState = computed<string>(() => {
    if (this.disabled) return 'disabled';
    return this.interaction();
  });

  protected iconData = computed(() => ICON_MAP[this.icon] ?? ICON_MAP['bell']);

  get cfg() { return SIZE_CONFIG[this.size]; }

  get badgeSizePx(): number {
    return this.dotSize === 'sm' ? 6 : 8;
  }

  get borderColor(): string {
    if (this.borderVariant === 'outline') return 'var(--icon-button-border-outline)';
    if (this.borderVariant === 'white')   return 'var(--icon-button-border-white)';
    return 'transparent';
  }

  private get isInteractive(): boolean { return !this.disabled; }

  protected onMouseEnter(): void { if (this.isInteractive) this.interaction.set('hover'); }
  protected onMouseLeave(): void { if (this.isInteractive) this.interaction.set('default'); }

  protected onMouseDown(e: MouseEvent): void {
    if (!this.isInteractive) return;
    this.interaction.set('pressed');
    const target = e.currentTarget as HTMLElement;
    const rect   = target.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const id     = performance.now();
    this.ripples.update(prev => [...prev, {
      id,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top  - size / 2,
      size,
    }]);
    setTimeout(() => this.ripples.update(prev => prev.filter(r => r.id !== id)), 620);
  }

  protected onMouseUp(): void { if (this.isInteractive) this.interaction.set('default'); }
  protected onClick(): void { if (!this.disabled) this.clicked.emit(); }
}
