import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DS_ICONS } from '../shared/icons';
import { AVATAR_SRC_MAP } from './avatar-images';

export type AvatarSize   = 'sm' | 'md' | 'lg';
export type AvatarGender = 'female' | 'male';

const SIZE_MAP: Record<AvatarSize, { containerPx: number; iconPx: number }> = {
  sm: { containerPx: 24, iconPx: 14 },
  md: { containerPx: 32, iconPx: 20 },
  lg: { containerPx: 40, iconPx: 24 },
};


@Component({
  selector: 'lib-avatar',
  standalone: true,
  imports: [LucideAngularModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--
      Avatar — Figma spec (node 63:4339):
        Circle:  32px md / 24px sm / 40px lg, border-radius 99px
        Gender:  female (63:4235) / male (63:4252) — local PNG asset 96×96
        Fallback: Lucide user icon
        Name:    Be Vietnam Pro Medium 14px, color on-surface (#2E5245)
    -->
    <div style="display:inline-flex;align-items:center;gap:var(--avatar-name-gap);">

      <!-- Avatar circle -->
      <div
        class="avatar"
        [style.width.px]="cfg.containerPx"
        [style.height.px]="cfg.containerPx"
        [attr.aria-label]="name || gender || 'Avatar'"
      >
        @if (imageUrl) {
          <!-- Custom image -->
          <img class="avatar__image" [src]="imageUrl" [alt]="name || 'Avatar'" />

        } @else if (avatarSrc()) {
          <!-- Gender illustration from local asset -->
          <img
            class="avatar__image"
            [src]="avatarSrc()!"
            [alt]="gender === 'female' ? 'Female avatar' : 'Male avatar'"
          />

        } @else {
          <!-- Fallback: Lucide user icon via lucide-angular -->
          <lucide-icon
            class="avatar__icon"
            [img]="userIcon"
            [size]="cfg.iconPx"
            [strokeWidth]="2"
            color="currentColor"
          ></lucide-icon>
        }
      </div>

      <!-- Optional name label -->
      @if (name) {
        <span
          class="avatar__name"
          style="
            font-family: var(--font-family-be-vietnam-pro);
            font-size: var(--avatar-name-font-size);
            font-weight: var(--avatar-name-font-weight);
            white-space: nowrap;
            line-height: normal;
          "
        >{{ name }}</span>
      }
    </div>
  `,
  styles: [`lib-avatar { display: inline-block; }`],
})
export class AvatarComponent {
  @Input() size: AvatarSize = 'md';
  @Input() gender: AvatarGender | null = null;
  @Input() imageUrl?: string;
  @Input() name?: string;

  protected readonly userIcon = DS_ICONS.User;

  protected avatarSrc = computed<string | null>(() =>
    this.gender ? AVATAR_SRC_MAP[this.gender] : null
  );

  get cfg() { return SIZE_MAP[this.size]; }
}
