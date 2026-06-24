import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DS_ICONS, ICON_MAP, type IconType } from '../shared/icons';

@Component({
  selector: 'lib-app-bar',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="appbar">

      <!-- Leading icon button -->
      @if (leadingIcon) {
        <button
          type="button"
          class="appbar__icon-button"
          (click)="leadingAction.emit()"
          [attr.aria-label]="leadingLabel"
        >
          <lucide-icon
            [img]="leadingIconData()"
            [size]="24"
            [strokeWidth]="2"
            color="currentColor"
          ></lucide-icon>
        </button>
      } @else {
        <div class="appbar__icon-slot" aria-hidden="true"></div>
      }

      <!-- Title -->
      <p class="appbar__title" style="margin:0;">{{ title }}</p>

      <!-- Trailing icon button -->
      @if (trailingIcon) {
        <button
          type="button"
          class="appbar__icon-button"
          (click)="trailingAction.emit()"
          [attr.aria-label]="trailingLabel"
        >
          <lucide-icon
            [img]="trailingIconData()"
            [size]="24"
            [strokeWidth]="2"
            color="currentColor"
          ></lucide-icon>
        </button>
      } @else {
        <div class="appbar__icon-slot" aria-hidden="true"></div>
      }
    </div>
  `,
  styles: [`lib-app-bar { display: block; }`],
})
export class AppBarComponent {
  @Input() title = '';
  @Input() leadingIcon: IconType | null = null;
  @Input() trailingIcon: IconType | null = null;
  @Input() leadingLabel  = 'Back';
  @Input() trailingLabel = 'Action';
  @Output() leadingAction  = new EventEmitter<void>();
  @Output() trailingAction = new EventEmitter<void>();

  protected leadingIconData  = computed(() =>
    this.leadingIcon  ? ICON_MAP[this.leadingIcon]  : ICON_MAP['chevron-left']
  );
  protected trailingIconData = computed(() =>
    this.trailingIcon ? ICON_MAP[this.trailingIcon] : ICON_MAP['search']
  );
}
