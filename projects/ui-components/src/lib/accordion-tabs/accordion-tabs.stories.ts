import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AccordionTabsComponent } from './accordion-tabs.component';
import { AccordionTabComponent } from './accordion-tab.component';

const meta: Meta<AccordionTabsComponent> = {
  title: 'Components/AccordionTabs',
  component: AccordionTabsComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [AccordionTabsComponent, AccordionTabComponent] })],
  argTypes: {
    fill:          { control: 'boolean' },
    selectedIndex: { control: { type: 'number', min: 0 } },
  },
  args: { fill: false, selectedIndex: 0 },
};
export default meta;
type Story = StoryObj<AccordionTabsComponent>;

const panels = `
  <lib-accordion-tab label="產品">產品內容:壽險、醫療險、意外險等商品列表與保障說明。</lib-accordion-tab>
  <lib-accordion-tab label="服務">服務內容:理賠申請、保單批改、繳費與帳戶管理。</lib-accordion-tab>
  <lib-accordion-tab label="關於">關於我們:公司簡介、服務據點與經營理念。</lib-accordion-tab>
  <lib-accordion-tab label="聯絡" [disabled]="true">聯絡我們:客服專線 0800-000-000。</lib-accordion-tab>
`;

/** Default — content-width headers, left-aligned (matches Figma Interactive Tab Bar). */
export const ContentWidth: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width:375px;max-width:100%;font-family:var(--font-family-roboto);font-size:14px;color:var(--color-on-surface);">
        <lib-accordion-tabs [fill]="fill" [selectedIndex]="selectedIndex">${panels}</lib-accordion-tabs>
      </div>`,
  }),
};

/** Fill — headers share the row equally and stretch to fill the width. */
export const Fill: Story = {
  args: { fill: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:375px;max-width:100%;font-family:var(--font-family-roboto);font-size:14px;color:var(--color-on-surface);">
        <lib-accordion-tabs [fill]="fill" [selectedIndex]="selectedIndex">${panels}</lib-accordion-tabs>
      </div>`,
  }),
};
