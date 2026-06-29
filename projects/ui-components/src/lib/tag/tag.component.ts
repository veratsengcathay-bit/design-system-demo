import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

export type TagVariant = 'success' | 'error' | 'warning' | 'neutral' | 'info';

@Component({
  selector: 'lib-tag',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="tag"
      [attr.data-tag-variant]="variant"
      style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--tag-padding-y) var(--tag-padding-x);
        border-radius: var(--tag-radius);
      "
    >
      <span
        class="tag__label"
        style="
          font-family: var(--type-bvp-label-sm-family);
          font-size: var(--tag-font-size);
          font-weight: var(--tag-font-weight);
          line-height: normal;
          white-space: nowrap;
        "
      >{{ label }}</span>
    </div>
  `,
  styles: [`lib-tag { display: inline-block; }`],
})
export class TagComponent {
  @Input() label = '';
  @Input() variant: TagVariant = 'success';
}
