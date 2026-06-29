import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

/**
 * ProgressPagination — non-interactive pagination indicator.
 *
 * A fixed-width segment slides horizontally inside the pill container based on
 * the current page. Position is purely derived (no internal state); all visuals
 * resolve through the `--progress-pagination-*` L3 tokens.
 *
 * Travel distance = container(44) − padding*2(8) − segment(19) = 17px.
 */
@Component({
  selector: 'lib-progress-pagination',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="progress-pagination"
      role="presentation"
      [attr.aria-label]="totalPages > 1 ? currentPage + ' / ' + totalPages : null"
    >
      <div
        class="progress-pagination__segment"
        [style.transform]="'translateX(' + translateX + 'px)'"
      ></div>
    </div>
  `,
  styles: [`lib-progress-pagination { display: inline-block; }`],
})
export class ProgressPaginationComponent {
  /** Current page index (1-based). */
  @Input() currentPage = 1;
  /** Total number of pages. */
  @Input() totalPages = 1;
  /**
   * Optional continuous progress ratio (0–1). When set (e.g. driven by a live
   * scroll/drag position), the segment slides proportionally instead of
   * snapping per page. Falls back to the discrete `currentPage` calc when null.
   */
  @Input() progress: number | null = null;

  /** Token measurements (kept in sync with --progress-pagination-* tokens). */
  private readonly containerWidth = 44;
  private readonly padding = 4;
  private readonly segmentWidth = 19;

  get translateX(): number {
    const available = this.containerWidth - this.padding * 2 - this.segmentWidth; // 17px
    const ratio =
      this.progress !== null
        ? this.progress
        : this.totalPages > 1
          ? (this.currentPage - 1) / (this.totalPages - 1)
          : 0;
    const clamped = Math.min(1, Math.max(0, ratio));
    return clamped * available;
  }
}
