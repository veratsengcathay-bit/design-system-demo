import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';

export type BadgeType = 'numeric' | 'dot';
export type BadgeNumericVariant = 'success' | 'neutral';
export type BadgeDotVariant = 'warning' | 'error';
export type BadgeDotSize = 'sm' | 'md';

@Component({
  selector: 'lib-badge',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (type === 'numeric') {
      <div
        class="badge"
        [attr.data-badge-type]="'numeric'"
        [attr.data-badge-variant]="numericVariant"
        style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: var(--badge-numeric-min-width);
          height: var(--badge-numeric-height);
          padding: var(--badge-numeric-padding-y) var(--badge-numeric-padding-x);
          border-radius: var(--badge-numeric-radius);
        "
      >
        <span
          class="badge__label"
          style="
            font-family: var(--font-family-be-vietnam-pro);
            font-size: var(--badge-numeric-font-size);
            font-weight: var(--badge-numeric-font-weight);
            line-height: normal;
            flex: 1;
            min-width: 0;
            text-align: center;
          "
        >{{ displayCount() }}</span>
      </div>
    } @else {
      <div
        class="badge"
        [attr.data-badge-type]="'dot'"
        [attr.data-badge-variant]="dotVariant"
        [attr.aria-label]="dotVariant + ' indicator'"
        [style.width]="dotSizeVar"
        [style.height]="dotSizeVar"
        style="border-radius: 50%;"
      ></div>
    }
  `,
  styles: [`lib-badge { display: inline-block; }`],
})
export class BadgeComponent {
  @Input() type: BadgeType = 'numeric';
  @Input() count = 0;
  @Input() numericVariant: BadgeNumericVariant = 'success';
  @Input() dotVariant: BadgeDotVariant = 'error';
  @Input() dotSize: BadgeDotSize = 'md';

  protected displayCount = computed(() => (this.count > 99 ? '99+' : String(this.count)));

  get dotSizeVar(): string {
    return this.dotSize === 'sm' ? 'var(--badge-dot-size-sm)' : 'var(--badge-dot-size-md)';
  }
}
