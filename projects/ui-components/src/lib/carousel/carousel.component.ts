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
 * Switching works via native scroll (touch / trackpad / wheel) and mouse
 * drag-to-scroll; releasing a drag snaps to the nearest banner. Supports
 * keyboard activation and click-to-open via `itemClick`. The live scroll
 * position (0–1) is fed to the bundled ProgressPagination so its segment
 * slides proportionally while you swipe/drag.
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
        [class.is-dragging]="dragging"
        [attr.aria-label]="ariaLabel"
        (scroll)="onScroll()"
        (click)="onClick()"
        (keydown)="onKeydown($event)"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerUp($event)"
        (pointercancel)="onPointerUp($event)"
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
            [progress]="progress()"
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
  /** Live scroll position as a 0–1 ratio; drives the progress indicator. */
  protected progress = signal(0);
  /** True while a mouse drag is in progress (toggles grabbing cursor). */
  protected dragging = false;

  private dragStartX = 0;
  private dragStartScroll = 0;
  private dragMoved = false;
  private startIndex = 0;

  protected onScroll(): void {
    const s = this.sliderRef.nativeElement;
    const max = s.scrollWidth - s.clientWidth;
    const ratio = max > 0 ? Math.min(1, Math.max(0, s.scrollLeft / max)) : 0;
    this.progress.set(ratio);
    const n = this.items.length;
    const idx = n > 1 ? Math.round(ratio * (n - 1)) : 0;
    if (idx !== this.currentIndex()) this.currentIndex.set(idx);
  }

  /** Mouse drag-to-scroll. Touch / trackpad keep native scroll + momentum. */
  protected onPointerDown(e: PointerEvent): void {
    if (e.pointerType !== 'mouse') return;
    const s = this.sliderRef.nativeElement;
    this.dragging = true;
    this.dragMoved = false;
    this.dragStartX = e.clientX;
    this.dragStartScroll = s.scrollLeft;
    this.startIndex = this.currentIndex();
    s.style.scrollSnapType = 'none'; // free movement; JS settles on release
    s.setPointerCapture(e.pointerId);
  }

  protected onPointerMove(e: PointerEvent): void {
    if (!this.dragging) return;
    const dx = e.clientX - this.dragStartX;
    if (Math.abs(dx) > 5) this.dragMoved = true;
    this.sliderRef.nativeElement.scrollLeft = this.dragStartScroll - dx;
  }

  protected onPointerUp(e: PointerEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    const s = this.sliderRef.nativeElement;
    if (s.hasPointerCapture(e.pointerId)) s.releasePointerCapture(e.pointerId);

    const n = this.items.length;
    if (n <= 1) { s.style.scrollSnapType = ''; return; }

    // Distance between adjacent banners (banner width + gap).
    const first = s.children[0] as HTMLElement;
    const second = s.children[1] as HTMLElement | undefined;
    const step = second ? second.offsetLeft - first.offsetLeft : s.clientWidth;
    const moved = (s.scrollLeft - this.dragStartScroll) / step; // signed banners dragged

    // Directional commit: past the threshold advances ≥1 banner; otherwise snap back.
    const THRESHOLD = 0.15;
    let target = this.startIndex;
    if (moved >= THRESHOLD) target = this.startIndex + Math.max(1, Math.round(moved));
    else if (moved <= -THRESHOLD) target = this.startIndex + Math.min(-1, Math.round(moved));
    target = Math.min(n - 1, Math.max(0, target));

    const el = s.children[target] as HTMLElement;
    this.settleTo(el.offsetLeft);
  }

  /** Smooth-scroll to an exact banner offset, then restore CSS scroll-snap. */
  private settleTo(left: number): void {
    const s = this.sliderRef.nativeElement;
    s.scrollTo({ left, behavior: 'smooth' });
    const restore = () => {
      s.style.scrollSnapType = '';
      s.removeEventListener('scrollend', restore);
    };
    s.addEventListener('scrollend', restore, { once: true });
    setTimeout(restore, 500); // fallback where scrollend is unsupported
  }

  protected onClick(): void {
    if (this.dragMoved) {
      this.dragMoved = false; // a drag, not a click — don't emit
      return;
    }
    this.itemClick.emit(this.currentIndex());
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.itemClick.emit(this.currentIndex());
    }
  }
}
