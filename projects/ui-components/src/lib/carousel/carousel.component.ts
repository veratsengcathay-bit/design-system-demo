import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { ProgressPaginationComponent } from '../progress-pagination/progress-pagination.component';

/**
 * Carousel — swipeable image banner with integrated progress pagination.
 *
 * A horizontal scroll-snap slider where each banner fills the viewport width.
 * Image switching is driven purely by native scroll (touch / trackpad / wheel);
 * no mouse-drag interaction. Supports keyboard activation and click-to-open via
 * `itemClick`. Index is tracked from scroll position; the bundled
 * ProgressPagination reflects it.
 */
@Component({
  selector: 'lib-carousel',
  standalone: true,
  imports: [ProgressPaginationComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="carousel">
      <div
        #slider
        class="carousel__slider"
        role="button"
        tabindex="0"
        [attr.aria-label]="ariaLabel"
        (scroll)="onScroll()"
        (click)="onClick()"
        (keydown)="onKeydown($event)"
      >
        @for (item of items; track $index) {
          <div class="carousel__banner">
            <img [src]="item" [alt]="'Slide ' + ($index + 1)" draggable="false" />
          </div>
        }
      </div>

      @if (items.length > 1) {
        <div class="carousel__indicator">
          <lib-progress-pagination
            [currentPage]="currentIndex() + 1"
            [totalPages]="items.length"
          ></lib-progress-pagination>
        </div>
      }
    </div>
  `,
  styles: [`lib-carousel { display: inline-block; max-width: 100%; }`],
})
export class CarouselComponent {
  /** Image source URLs — one banner per entry. */
  @Input() items: string[] = [];
  @Input('aria-label') ariaLabel = 'Image carousel';
  /** Emits the active index when a banner is clicked (and not dragged). */
  @Output() itemClick = new EventEmitter<number>();

  @ViewChild('slider', { static: true }) sliderRef!: ElementRef<HTMLDivElement>;

  protected currentIndex = signal(0);

  protected onScroll(): void {
    const s = this.sliderRef.nativeElement;
    const itemWidth = s.offsetWidth;
    if (!itemWidth) return;
    const idx = Math.round(s.scrollLeft / itemWidth);
    if (idx !== this.currentIndex()) this.currentIndex.set(idx);
  }

  protected onClick(): void {
    this.itemClick.emit(this.currentIndex());
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.itemClick.emit(this.currentIndex());
    }
  }
}
