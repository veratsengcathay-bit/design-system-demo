import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  signal,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

export interface TabItem {
  label: string;
  badgeCount?: number;
}

@Component({
  selector: 'lib-tab-bar',
  standalone: true,
  imports: [BadgeComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tabbar">
      <!-- Tab buttons -->
      <div class="tabbar__tabs-container" #tabsContainer>
        @for (tab of tabs; track tab.label; let i = $index) {
          <button
            type="button"
            class="tab"
            [attr.data-tab-selected]="(activeIndex === i).toString()"
            (click)="selectTab(i)"
          >
            <span
              class="tab__label"
              style="
                font-family: var(--font-family-roboto);
                font-size: var(--tab-font-size);
                font-weight: var(--tab-font-weight);
                white-space: nowrap;
                line-height: normal;
              "
            >{{ tab.label }}</span>

            @if (tab.badgeCount !== undefined) {
              <lib-badge
                type="numeric"
                [count]="tab.badgeCount"
                [numericVariant]="activeIndex === i ? 'success' : 'neutral'"
              ></lib-badge>
            }
          </button>
        }
      </div>

      <!-- Animated indicator -->
      <div class="tabbar__indicator-container">
        <div
          class="tabbar__indicator"
          [style.left]="indicatorLeft()"
          [style.width]="indicatorWidth()"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    lib-tab-bar { display: block; }
    .tab { display: flex; flex: 1 0 0; min-width: 1px; align-items: center; justify-content: center; }
  `],
})
export class TabBarComponent implements AfterViewInit {
  @Input() tabs: TabItem[] = [];
  @Input() activeIndex = 0;
  @Output() tabChange = new EventEmitter<number>();

  @ViewChild('tabsContainer') tabsContainerRef!: ElementRef<HTMLElement>;

  private tabWidths = signal<number[]>([]);

  protected indicatorLeft = computed(() => {
    const widths = this.tabWidths();
    if (!widths.length) return '0px';
    const left = widths.slice(0, this.activeIndex).reduce((a, b) => a + b, 0);
    return `${left + 8}px`;
  });

  protected indicatorWidth = computed(() => {
    const widths = this.tabWidths();
    if (!widths.length) return '0px';
    const tabWidth = widths[this.activeIndex] ?? 0;
    return `${Math.max(0, tabWidth - 16)}px`;
  });

  ngAfterViewInit(): void {
    this.measureTabs();
  }

  private measureTabs(): void {
    const container = this.tabsContainerRef?.nativeElement;
    if (!container) return;
    const tabEls = container.querySelectorAll<HTMLElement>('.tab');
    this.tabWidths.set(Array.from(tabEls).map(el => el.offsetWidth));
  }

  protected selectTab(index: number): void {
    this.tabChange.emit(index);
    setTimeout(() => this.measureTabs(), 0);
  }
}
