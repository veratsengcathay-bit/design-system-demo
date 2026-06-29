import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  signal,
  inject,
} from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';
import { AccordionTabComponent } from './accordion-tab.component';

/**
 * AccordionTabs — container that arranges {@link AccordionComponent} headers as a
 * tab bar and swaps the active {@link AccordionTabComponent}'s projected content.
 *
 * Layout ownership lives here (not on the individual accordion header):
 *   - `fill=false` (default): content-width headers, left-aligned (Figma default)
 *   - `fill=true`: headers share the row equally (each stretches to fill)
 *
 * Content is consumer-provided via projected <lib-accordion-tab> children, so the
 * container stays page-agnostic.
 *
 *   <lib-accordion-tabs [fill]="true" [(selectedIndex)]="idx">
 *     <lib-accordion-tab label="產品">…</lib-accordion-tab>
 *     <lib-accordion-tab label="服務">…</lib-accordion-tab>
 *   </lib-accordion-tabs>
 */
@Component({
  selector: 'lib-accordion-tabs',
  standalone: true,
  imports: [AccordionComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion-tabs" [attr.data-accordion-tabs-fill]="fill">
      <div class="accordion-tabs__headers" role="tablist">
        @for (tab of tabList(); track tab; let i = $index) {
          <lib-accordion
            [label]="tab.label"
            [disabled]="tab.disabled"
            [selected]="i === activeIndex()"
            (clicked)="select(i)"
          ></lib-accordion>
        }
      </div>
      <div class="accordion-tabs__panel">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`lib-accordion-tabs { display: block; width: 100%; }`],
})
export class AccordionTabsComponent implements AfterContentInit {
  @ContentChildren(AccordionTabComponent) private tabsQuery!: QueryList<AccordionTabComponent>;

  /** Equal-width headers that fill the row; default is content-width, left-aligned. */
  @Input() fill = false;
  @Input() selectedIndex = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  protected readonly tabList = signal<AccordionTabComponent[]>([]);
  protected readonly activeIndex = signal(0);

  private readonly cdr = inject(ChangeDetectorRef);

  ngAfterContentInit(): void {
    this.activeIndex.set(this.clamp(this.selectedIndex));
    this.refresh();
    this.tabsQuery.changes.subscribe(() => {
      this.refresh();
      this.cdr.markForCheck();
    });
  }

  protected select(index: number): void {
    if (this.tabList()[index]?.disabled) return;
    if (index === this.activeIndex()) return;
    this.activeIndex.set(index);
    this.syncPanels();
    this.selectedIndexChange.emit(index);
  }

  private refresh(): void {
    this.tabList.set(this.tabsQuery.toArray());
    if (this.activeIndex() > this.tabList().length - 1) {
      this.activeIndex.set(this.clamp(this.activeIndex()));
    }
    this.syncPanels();
  }

  private syncPanels(): void {
    const active = this.activeIndex();
    this.tabList().forEach((tab, i) => tab.active.set(i === active));
  }

  private clamp(index: number): number {
    const max = Math.max(0, this.tabsQuery ? this.tabsQuery.length - 1 : 0);
    return Math.min(Math.max(0, index), max);
  }
}
