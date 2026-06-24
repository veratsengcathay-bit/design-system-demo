import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ICON_MAP, type IconType } from '../shared/icons';

/**
 * SectionHeader — a section title with an optional trailing action.
 *
 * Default action renders `{{ actionLabel }}` + a trailing icon (chevron-right by
 * default, e.g. "More ›"). For a fully custom action (icon-first pills such as
 * "Calendar 📅"), project content via `[action]` instead.
 *
 * Figma: Workspace_Vera b-01.1 (sectionName).
 */
@Component({
  selector: 'lib-section-header',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-header">
      <span class="section-header__title">{{ title }}</span>

      <ng-content select="[action]"></ng-content>

      @if (actionLabel && !hasProjectedAction) {
        <button type="button" class="section-header__action" (click)="action.emit()">
          <span>{{ actionLabel }}</span>
          @if (actionIcon) {
            <lucide-icon [img]="actionIconData" [size]="20" [strokeWidth]="2" color="currentColor"></lucide-icon>
          }
        </button>
      }
    </div>
  `,
  styles: [`lib-section-header { display: block; width: 100%; }`],
})
export class SectionHeaderComponent {
  @Input() title = '';
  @Input() actionLabel = '';
  @Input() actionIcon: IconType | null = 'chevron-right';
  /** Set true when supplying a custom action via the `[action]` slot. */
  @Input() hasProjectedAction = false;
  @Output() action = new EventEmitter<void>();

  protected get actionIconData() {
    return this.actionIcon ? ICON_MAP[this.actionIcon] : ICON_MAP['chevron-right'];
  }
}
