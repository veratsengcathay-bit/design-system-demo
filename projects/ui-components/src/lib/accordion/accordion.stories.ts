import { Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text'    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clicked:  { action: 'clicked'  },
  },
  args: { label: '全部', selected: false, disabled: false },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Unselected: Story = { args: { label: '全部',   selected: false } };
export const Selected:   Story = { args: { label: '進行中', selected: true  } };
export const Disabled:   Story = { args: { label: '停用',   disabled: true  } };

/**
 * Static tab row — shows selected / unselected / disabled side by side
 * (visual reference only; selection is fixed).
 */
export const TabGroup: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:0;border-bottom:1px solid var(--color-outline-grey);padding:0 16px;background:#fff;">
        <lib-accordion label="全部"   [selected]="true"></lib-accordion>
        <lib-accordion label="進行中" [selected]="false"></lib-accordion>
        <lib-accordion label="已完成" [selected]="false"></lib-accordion>
        <lib-accordion label="已取消" [disabled]="true"></lib-accordion>
      </div>
    `,
    moduleMetadata: { imports: [AccordionComponent] },
  }),
};

/* ────────────────────────────────────────────────────────────────────────────
   Interactive Tab Bar — mirrors the Figma Make "Accordion → Interactive Tab Bar"
   example: Accordion items act as clickable tabs; a content panel below updates
   to the active tab. Demonstrates real selection + ripple interaction.
   ──────────────────────────────────────────────────────────────────────────── */

interface DemoTab { id: string; label: string; content: string; }

@Component({
  selector: 'sb-accordion-tabbar-demo',
  standalone: true,
  imports: [AccordionComponent],
  template: `
    <div style="width:375px;max-width:100%;background:#fff;border:1px solid var(--color-outline-grey);border-radius:var(--radius-md);overflow:hidden;">
      <!-- Tab headers -->
      <div style="display:flex;gap:0;border-bottom:1px solid var(--color-outline-grey);padding:0 16px;">
        @for (t of tabs; track t.id) {
          <lib-accordion
            [label]="t.label"
            [selected]="active() === t.id"
            (clicked)="active.set(t.id)"
          ></lib-accordion>
        }
      </div>

      <!-- Content panel — switches with the active tab -->
      <div style="padding:16px;background:var(--color-surface-container);min-height:96px;">
        <p style="margin:0;font-family:var(--font-family-roboto);font-size:14px;line-height:1.5;color:var(--color-on-surface);">
          {{ activeContent() }}
        </p>
      </div>
    </div>
  `,
})
class AccordionTabBarDemo {
  readonly tabs: DemoTab[] = [
    { id: 'products', label: '產品', content: '產品內容:壽險、醫療險、意外險等商品列表與保障說明。' },
    { id: 'services', label: '服務', content: '服務內容:理賠申請、保單批改、繳費與帳戶管理。' },
    { id: 'about',    label: '關於', content: '關於我們:公司簡介、服務據點與經營理念。' },
    { id: 'contact',  label: '聯絡', content: '聯絡我們:客服專線 0800-000-000 與線上表單。' },
  ];
  readonly active = signal('products');
  readonly activeContent = () =>
    this.tabs.find(t => t.id === this.active())?.content ?? '';
}

export const InteractiveTabBar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Accordion 當作 tab header,點擊切換選取狀態(含 ripple),下方內容面板隨之更新。對應 Figma Make 的 Accordion → Interactive Tab Bar 範例。',
      },
    },
  },
  decorators: [moduleMetadata({ imports: [AccordionTabBarDemo] })],
  render: () => ({
    template: `<sb-accordion-tabbar-demo></sb-accordion-tabbar-demo>`,
  }),
};
