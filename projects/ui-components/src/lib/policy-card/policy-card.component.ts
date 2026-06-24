import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ICON_MAP } from '../shared/icons';
import { TagComponent, type TagVariant } from '../tag/tag.component';

/** One label/value row shown in the card body. */
export interface PolicyCardField {
  label: string;
  value: string;
}

/**
 * PolicyCard — insurance policy summary card.
 *
 * Composes the design-system `lib-tag` for the status badge and resolves all
 * visuals through `.policy-card*` tokens in components.css.
 *
 * Figma: Workspace_Vera b-04.1 (node 1730:176386).
 */
@Component({
  selector: 'lib-policy-card',
  standalone: true,
  imports: [LucideAngularModule, TagComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="policy-card">
      <div class="policy-card__body">

        <!-- Status tag + more-actions trigger -->
        <div class="policy-card__header">
          <lib-tag [label]="statusLabel" [variant]="statusVariant"></lib-tag>
          @if (showMore) {
            <button
              type="button"
              class="policy-card__more"
              aria-label="更多操作"
              (click)="more.emit($event)"
            >
              <lucide-icon [img]="moreIcon" [size]="24" [strokeWidth]="2" color="currentColor"></lucide-icon>
            </button>
          }
        </div>

        <!-- Product name -->
        <div class="policy-card__product">
          <span class="policy-card__label">{{ productNameLabel }}</span>
          <span class="policy-card__product-name">{{ productName }}</span>
        </div>

        <!-- Field rows -->
        <div class="policy-card__fields">
          @for (field of fields; track field.label) {
            <div class="policy-card__field">
              <span class="policy-card__label">{{ field.label }}</span>
              <span class="policy-card__value">{{ field.value }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Expiry footer -->
      @if (footerValue) {
        <div class="policy-card__footer">
          <span class="policy-card__footer-label">{{ footerLabel }}</span>
          <span class="policy-card__footer-value">{{ footerValue }}</span>
        </div>
      }
    </div>
  `,
  styles: [`lib-policy-card { display: block; width: 100%; }`],
})
export class PolicyCardComponent {
  @Input() statusLabel = '';
  @Input() statusVariant: TagVariant = 'success';
  @Input() productNameLabel = '產品名稱';
  @Input() productName = '';
  @Input() fields: PolicyCardField[] = [];
  @Input() footerLabel = 'Ngày hết hạn';
  @Input() footerValue = '';
  @Input() showMore = true;

  /** Emitted when the more-actions (⋮) button is tapped; carries the click event for popover anchoring. */
  @Output() more = new EventEmitter<MouseEvent>();

  protected readonly moreIcon = ICON_MAP['ellipsis-vertical'];
}
