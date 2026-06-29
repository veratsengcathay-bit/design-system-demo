import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostListener,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';

/**
 * CarouselPreviewer — full-size (large) image previewer.
 *
 * A portrait 9:16 viewer where each image fills the frame (object-fit: cover).
 * Left / right IconButton controls (chevron-left / chevron-right) step through
 * the images, wrapping around at both ends. Designed to be opened from a
 * Carousel banner click (see `CarouselComponent.itemClick`) so a small banner
 * "expands" into this large preview mode.
 *
 * Set `overlay` to render it as a full-screen modal (scrim + close button,
 * dismissable via the close button, backdrop click, or Escape). This overlay
 * mode is a code-side convenience and has no Figma spec; the inline 9:16
 * previewer itself matches the design source.
 */
@Component({
  selector: 'lib-carousel-previewer',
  standalone: true,
  imports: [IconButtonComponent, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (overlay) {
      <div
        class="carousel-previewer-overlay"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel"
        tabindex="-1"
        (click)="onBackdrop($event)"
      >
        <lib-icon-button
          class="carousel-previewer__close"
          icon="x"
          size="md"
          borderVariant="none"
          aria-label="Close preview"
          (clicked)="close()"
        ></lib-icon-button>
        <ng-container [ngTemplateOutlet]="frame"></ng-container>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="frame"></ng-container>
    }

    <ng-template #frame>
      <div class="carousel-previewer">
        <img
          class="carousel-previewer__image"
          [src]="items[currentIndex()]"
          [alt]="'Preview ' + (currentIndex() + 1)"
          draggable="false"
        />

        @if (items.length > 1) {
          <div class="carousel-previewer__controls">
            <lib-icon-button
              icon="chevron-left"
              size="md"
              borderVariant="none"
              aria-label="Previous image"
              (clicked)="previous()"
            ></lib-icon-button>
            <lib-icon-button
              icon="chevron-right"
              size="md"
              borderVariant="none"
              aria-label="Next image"
              (clicked)="next()"
            ></lib-icon-button>
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: [`lib-carousel-previewer { display: inline-block; max-width: 100%; }`],
})
export class CarouselPreviewerComponent {
  /** Image source URLs — one per preview slide. */
  @Input() items: string[] = [];

  /** Index shown first; setting it again (e.g. on re-open) jumps to that slide. */
  @Input() set initialIndex(value: number) {
    this.currentIndex.set(value ?? 0);
  }

  /** Render as a full-screen overlay (scrim + close button) instead of inline. */
  @Input() overlay = false;

  @Input('aria-label') ariaLabel = 'Image preview';

  /** Emits the active index whenever the visible slide changes. */
  @Output() indexChange = new EventEmitter<number>();
  /** Emits when the overlay is dismissed (close button / backdrop / Escape). */
  @Output() closed = new EventEmitter<void>();

  protected currentIndex = signal(0);

  /** Step to the previous slide, wrapping to the last one at the start. */
  protected previous(): void {
    const n = this.items.length;
    if (n === 0) return;
    this.setIndex(this.currentIndex() > 0 ? this.currentIndex() - 1 : n - 1);
  }

  /** Step to the next slide, wrapping back to the first one at the end. */
  protected next(): void {
    const n = this.items.length;
    if (n === 0) return;
    this.setIndex(this.currentIndex() < n - 1 ? this.currentIndex() + 1 : 0);
  }

  /** Dismiss the overlay. No-op visually unless the parent hides the component. */
  protected close(): void {
    if (this.overlay) this.closed.emit();
  }

  /** Close only when the scrim itself is clicked, not the previewer content. */
  protected onBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.close();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close();
  }

  private setIndex(i: number): void {
    this.currentIndex.set(i);
    this.indexChange.emit(i);
  }
}
