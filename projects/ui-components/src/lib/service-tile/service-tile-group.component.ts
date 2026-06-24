import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ServiceTileComponent, ServiceTileOrientation } from './service-tile.component';

export interface ServiceTileItem {
  label: string;
  iconSrc?: string;
  disabled?: boolean;
}

type GroupLayout = 'single' | 'row' | 'scroll';

/**
 * ServiceTileGroup — quantity-adaptive row of Service Buttons.
 *
 * Layout is derived from the number of `items`:
 *   - 1 item   → a single full-width horizontal tile
 *   - 2–3 items → vertical tiles sharing the row equally
 *   - 4+ items → fixed-width vertical tiles with horizontal scroll (~4 visible)
 *
 * Figma: 💫 SAG Library — Service Button group (node 463:5086).
 */
@Component({
  selector: 'lib-service-tile-group',
  standalone: true,
  imports: [ServiceTileComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="service-tile-group" [attr.data-service-tile-group-layout]="layout">
      @for (item of items; track $index) {
        <lib-service-tile
          [label]="item.label"
          [iconSrc]="item.iconSrc"
          [orientation]="orientation"
          [disabled]="item.disabled ?? false"
          (clicked)="itemClick.emit($index)"
        ></lib-service-tile>
      }
    </div>
  `,
  styles: [`lib-service-tile-group { display: block; width: 100%; }`],
})
export class ServiceTileGroupComponent {
  @Input() items: ServiceTileItem[] = [];
  /** Emits the index of the clicked tile. */
  @Output() itemClick = new EventEmitter<number>();

  /** Single item renders horizontally; everything else stays vertical. */
  get orientation(): ServiceTileOrientation {
    return this.items.length === 1 ? 'horizontal' : 'vertical';
  }

  get layout(): GroupLayout {
    const n = this.items.length;
    if (n <= 1) return 'single';
    if (n >= 4) return 'scroll';
    return 'row';
  }
}
