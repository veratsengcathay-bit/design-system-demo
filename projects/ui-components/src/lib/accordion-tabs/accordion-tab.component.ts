import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';

/**
 * AccordionTab — a single tab panel for {@link AccordionTabsComponent}.
 *
 * Declare one per tab; the `label` drives the header and the projected content
 * is shown when the tab is active. The parent container toggles `active`;
 * consumers never set it directly.
 *
 *   <lib-accordion-tab label="產品">…content…</lib-accordion-tab>
 */
@Component({
  selector: 'lib-accordion-tab',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.display]': "active() ? 'block' : 'none'" },
  template: `<ng-content></ng-content>`,
})
export class AccordionTabComponent {
  @Input() label = '';
  @Input() disabled = false;
  /** Controlled by the parent AccordionTabs container. */
  readonly active = signal(false);
}
