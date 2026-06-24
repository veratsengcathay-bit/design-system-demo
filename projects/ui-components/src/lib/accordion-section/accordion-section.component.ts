import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Collapsible section accordion (Figma "Accordion" — node 64:12272).
 *
 * NOTE: This is distinct from `lib-accordion`, which is actually a tab/filter
 * control (label + chevron + bottom border). This component is the true
 * collapsible region: leading icon slot + two-part title + projected content.
 *
 * Usage:
 *   <lib-accordion-section name="xe máy" [expanded]="true">
 *     <span accordionIcon>🛵</span>
 *     ...cards...
 *   </lib-accordion-section>
 */
@Component({
  selector: 'lib-accordion-section',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion-section" [attr.data-expanded]="expanded.toString()">
      <button
        type="button"
        class="accordion-section__header"
        [attr.aria-expanded]="expanded.toString()"
        (click)="toggle()"
      >
        <span class="accordion-section__icon">
          <ng-content select="[accordionIcon]"></ng-content>
        </span>

        <span class="accordion-section__name">
          <span class="accordion-section__prefix">{{ prefix }}</span>
          <span class="accordion-section__title">{{ name }}</span>
        </span>

        <span
          class="accordion-section__chevron"
          [class.is-expanded]="expanded"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24" width="24" height="24" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      @if (expanded) {
        <div class="accordion-section__content">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`lib-accordion-section { display: block; width: 100%; }`],
})
export class AccordionSectionComponent {
  /** Regular-weight prefix before the bold name (e.g. "Bảo hiểm"). */
  @Input() prefix = 'Bảo hiểm';
  /** Bold section name (e.g. "xe máy"). */
  @Input() name = '';
  /** Whether the content region is expanded. */
  @Input() expanded = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  protected toggle(): void {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
