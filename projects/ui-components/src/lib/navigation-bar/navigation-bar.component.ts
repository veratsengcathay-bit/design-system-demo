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
import { SafeHtmlPipe } from '../shared/safe-html.pipe';

export interface NavBarItem {
  label: string;
  /** SVG HTML string for default (inactive) state */
  iconSvg: string;
  /** SVG HTML string for active (selected) state — falls back to iconSvg if omitted */
  activeIconSvg?: string;
}

@Component({
  selector: 'lib-navigation-bar',
  standalone: true,
  imports: [SafeHtmlPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="navbar">
      <!--
        button/group wrapper — rounded-[36px] per Figma.
        Contains: indicator bar (top) → nav items row (below).
      -->
      <div class="navbar__group" #groupEl>

        <!-- ① Indicator — sits at TOP of button/group (Figma spec) -->
        <div class="navbar__indicator-container">
          <div
            class="navbar__indicator"
            [style.left]="indicatorLeft()"
          ></div>
        </div>

        <!-- ② Nav item row -->
        <div class="navbar__items">
          @for (item of items; track item.label; let i = $index) {
            <button
              type="button"
              class="navbar-item"
              [attr.data-navbar-selected]="(activeIndex === i).toString()"
              (click)="selectItem(i)"
            >
              <!-- Icon: use activeIconSvg when selected, otherwise iconSvg -->
              <div
                class="navbar-item__icon-container"
                [innerHTML]="(activeIndex === i && item.activeIconSvg
                  ? item.activeIconSvg
                  : item.iconSvg) | safeHtml"
              ></div>

              <!-- Label -->
              <span class="navbar-item__label">{{ item.label }}</span>
            </button>
          }
        </div>
      </div>

      <!-- ③ iOS Home Indicator -->
      @if (showHomeIndicator) {
        <div class="navbar__home-indicator-container">
          <div class="navbar__home-indicator"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    lib-navigation-bar { display: block; }
  `],
})
export class NavigationBarComponent implements AfterViewInit {
  @Input() items: NavBarItem[] = [];
  @Input() activeIndex = 0;
  @Input() showHomeIndicator = true;
  @Output() itemChange = new EventEmitter<number>();

  @ViewChild('groupEl') groupEl!: ElementRef<HTMLElement>;

  private itemWidths = signal<number[]>([]);

  /** Left offset so indicator centres under the active tab */
  protected indicatorLeft = computed(() => {
    const widths = this.itemWidths();
    if (!widths.length) return '0px';
    const indicatorWidth = 94; // var(--navbar-indicator-width)
    const itemWidth = widths[this.activeIndex] ?? 0;
    const leftEdge = widths.slice(0, this.activeIndex).reduce((a, b) => a + b, 0);
    return `${leftEdge + (itemWidth - indicatorWidth) / 2}px`;
  });

  ngAfterViewInit(): void {
    this.measureItems();
  }

  private measureItems(): void {
    const group = this.groupEl?.nativeElement;
    if (!group) return;
    const itemEls = group.querySelectorAll<HTMLElement>('.navbar-item');
    this.itemWidths.set(Array.from(itemEls).map(el => el.offsetWidth));
  }

  protected selectItem(index: number): void {
    this.itemChange.emit(index);
    setTimeout(() => this.measureItems(), 0);
  }
}
