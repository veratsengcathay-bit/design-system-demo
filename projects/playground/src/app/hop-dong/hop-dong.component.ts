import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  AppBarComponent,
  ChipComponent,
  PolicyCardComponent,
  MenuItemComponent,
  NavigationBarComponent,
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
  type TagVariant,
  type PolicyCardField,
} from 'ui-components';

interface PolicyCardData {
  status: string;
  variant: TagVariant;
  productName: string;
  fields: PolicyCardField[];
  expiry: string;
}

interface SheetOption {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-hop-dong',
  standalone: true,
  imports: [
    LucideAngularModule,
    AppBarComponent,
    ChipComponent,
    PolicyCardComponent,
    MenuItemComponent,
    NavigationBarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hop-dong.component.html',
  styleUrl: './hop-dong.component.css',
})
export class HopDongComponent {
  @ViewChild('frameEl') frameEl!: ElementRef<HTMLElement>;

  protected readonly chevronDownIcon = ICON_MAP['chevron-down'];

  /** Bottom navigation — Vietnamese labels over the shared nav icons. */
  protected readonly navItems: NavBarItem[] = [
    { label: 'Trang chủ', iconSvg: homeIconDefault, activeIconSvg: homeIconActive },
    { label: 'Hợp đồng', iconSvg: folderIconDefault, activeIconSvg: folderIconActive },
    { label: 'Tạo hợp đồng', iconSvg: plusIconDefault, activeIconSvg: plusIconActive },
    { label: 'Khác', iconSvg: ellipsisIconDefault, activeIconSvg: ellipsisIconActive },
  ];
  protected readonly navActive = 1;

  protected readonly chips = [
    'Đơn nhập liệu (1)',
    'Đơn đã gửi đã thẩm định (12)',
    'Đơn phải bổ sung (0)',
    '快到期 (123)',
    '已過期 (23)',
  ];
  protected activeChip = signal(0);

  protected readonly subFilters = ['商品 (8)', '新增'];

  protected readonly updatedAt = '17:40   14 / 05 / 2020';

  protected readonly cards: PolicyCardData[] = [
    this.makeCard('正在輸入資料', 'success'),
    this.makeCard('正在輸入資料', 'success'),
    this.makeCard('正在輸入資料', 'success'),
    this.makeCard('上傳失敗', 'error'),
  ];

  /** More-actions popover (Figma node 2435:45100). */
  protected readonly moreActions = ['Sao chép', 'Mua thêm', 'Phiếu thu'];
  protected openMenuIndex = signal<number | null>(null);
  protected menuPos = signal<{ top: number; left: number } | null>(null);

  /** Category filter bottom sheet (Figma node 2435:45088). */
  protected sheetOpen = signal(false);
  protected sheetOptions = signal<SheetOption[]>([
    { label: 'CA', selected: true },
    { label: 'CB', selected: false },
    { label: '12345678910', selected: true },
    { label: 'PE', selected: true },
    { label: 'PE', selected: false },
    { label: 'PE', selected: false },
    { label: 'PE', selected: false },
    { label: 'PE', selected: false },
  ]);

  private makeCard(status: string, variant: TagVariant): PolicyCardData {
    return {
      status,
      variant,
      productName: 'BB TNDS摩托車保險',
      fields: [
        { label: '車牌號碼', value: '27B-0003' },
        { label: '保險購買者', value: 'LAIWEI' },
      ],
      expiry: '14:00 14/10/2025',
    };
  }

  protected selectChip(i: number): void {
    this.activeChip.set(i);
  }

  protected onMore(event: MouseEvent, index: number): void {
    const btn =
      (event.currentTarget as HTMLElement | null) ??
      (event.target as HTMLElement).closest('button');
    const frame = this.frameEl?.nativeElement.getBoundingClientRect();
    if (!btn || !frame) return;
    const r = btn.getBoundingClientRect();
    const menuWidth = 120;
    this.menuPos.set({
      top: r.bottom - frame.top + 4,
      left: Math.min(r.right - frame.left - menuWidth, frame.width - menuWidth - 12),
    });
    this.openMenuIndex.set(index);
  }

  protected closePopover(): void {
    this.openMenuIndex.set(null);
  }

  protected runAction(action: string): void {
    // Demo: in the real app this would route per action.
    console.log('action:', action, 'card:', this.openMenuIndex());
    this.closePopover();
  }

  protected openSheet(): void {
    this.sheetOpen.set(true);
  }

  protected closeSheet(): void {
    this.sheetOpen.set(false);
  }

  protected toggleOption(i: number): void {
    this.sheetOptions.update((opts) =>
      opts.map((o, idx) => (idx === i ? { ...o, selected: !o.selected } : o)),
    );
  }
}
