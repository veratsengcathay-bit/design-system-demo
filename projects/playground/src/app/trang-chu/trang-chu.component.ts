import {
  Component,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { LucideAngularModule, CalendarDays } from 'lucide-angular';
import {
  IconButtonComponent,
  AvatarComponent,
  NavigationButtonComponent,
  SectionHeaderComponent,
  ServiceTileComponent,
  NavigationBarComponent,
  CarouselComponent,
  ICON_MAP,
  homeIconDefault,
  homeIconActive,
  folderIconDefault,
  folderIconActive,
  plusIconDefault,
  plusIconActive,
  ellipsisIconDefault,
  ellipsisIconActive,
  type NavBarItem,
} from 'ui-components';

interface ServiceItem {
  label: string;
  icon: string;
}

interface DayCell {
  n: string;
  status?: 'current' | 'disabled';
  dot?: boolean;
}

@Component({
  selector: 'app-trang-chu',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconButtonComponent,
    AvatarComponent,
    NavigationButtonComponent,
    SectionHeaderComponent,
    ServiceTileComponent,
    NavigationBarComponent,
    CarouselComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trang-chu.component.html',
  styleUrl: './trang-chu.component.css',
})
export class TrangChuComponent {
  protected readonly asset = 'assets/trang-chu/';

  protected readonly chevronRight = ICON_MAP['chevron-right'];
  protected readonly eyeIcon = ICON_MAP['eye'];
  protected readonly eyeClosedIcon = ICON_MAP['eye-closed'];
  protected readonly calendarIcon = CalendarDays;

  protected readonly navItems: NavBarItem[] = [
    { label: 'Trang chủ', iconSvg: homeIconDefault, activeIconSvg: homeIconActive },
    { label: 'Hợp đồng', iconSvg: folderIconDefault, activeIconSvg: folderIconActive },
    { label: 'Tạo hợp đồng', iconSvg: plusIconDefault, activeIconSvg: plusIconActive },
    { label: 'Khác', iconSvg: ellipsisIconDefault, activeIconSvg: ellipsisIconActive },
  ];
  protected readonly navActive = 0;

  protected balanceVisible = signal(true);
  protected readonly balance = '972.000.000';
  protected readonly currency = 'đ';
  protected readonly salesRange = '14/09/2025~14/10/2025';

  protected readonly services: ServiceItem[] = [
    { label: 'Nộp phí', icon: 'icon-pay.png' },
    { label: 'Bồi thường', icon: 'icon-claim.png' },
    { label: 'Sửa đổi bổ sung', icon: 'icon-correction.png' },
    { label: 'DM', icon: 'icon-dm.png' },
  ];

  protected readonly weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  protected readonly days: DayCell[] = [
    { n: '01', status: 'disabled' },
    { n: '02', dot: true },
    { n: '03', status: 'disabled' },
    { n: '04', status: 'current' },
    { n: '05', status: 'disabled' },
    { n: '06', status: 'disabled' },
    { n: '07' },
  ];

  /** Banner carousel slides (最新消息). */
  protected readonly banners = [
    this.asset + 'banner-promo.png',
    this.asset + 'banner-2.svg',
    this.asset + 'banner-3.svg',
  ];

  protected toggleBalance(): void {
    this.balanceVisible.update((v) => !v);
  }
}
