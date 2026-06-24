import type { Meta, StoryObj } from '@storybook/angular';
import { PolicyCardComponent } from './policy-card.component';

const meta: Meta<PolicyCardComponent> = {
  title: 'Components/PolicyCard',
  component: PolicyCardComponent,
  tags: ['autodocs'],
  argTypes: {
    statusLabel:   { control: 'text' },
    statusVariant: { control: 'select', options: ['success', 'error', 'warning', 'neutral', 'info'] },
    productName:   { control: 'text' },
    footerValue:   { control: 'text' },
    showMore:      { control: 'boolean' },
  },
  args: {
    statusLabel: '正在輸入資料',
    statusVariant: 'success',
    productNameLabel: '產品名稱',
    productName: 'BB TNDS摩托車保險',
    fields: [
      { label: '車牌號碼', value: '27B-0003' },
      { label: '保險購買者', value: 'LAIWEI' },
    ],
    footerLabel: 'Ngày hết hạn',
    footerValue: '14:00 14/10/2025',
    showMore: true,
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="padding:16px;background:var(--color-surface);max-width:375px;">${story().template ?? '<lib-policy-card></lib-policy-card>'}</div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<PolicyCardComponent>;

export const Default: Story = {};

export const UploadFailed: Story = {
  args: {
    statusLabel: '上傳失敗',
    statusVariant: 'error',
  },
};

export const List: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;background:var(--color-surface);max-width:375px;">
        <lib-policy-card
          statusLabel="正在輸入資料" statusVariant="success"
          productName="BB TNDS摩托車保險" footerValue="14:00 14/10/2025"
          [fields]="[{label:'車牌號碼',value:'27B-0003'},{label:'保險購買者',value:'LAIWEI'}]">
        </lib-policy-card>
        <lib-policy-card
          statusLabel="上傳失敗" statusVariant="error"
          productName="BB TNDS摩托車保險" footerValue="14:00 14/10/2025"
          [fields]="[{label:'車牌號碼',value:'27B-0003'},{label:'保險購買者',value:'LAIWEI'}]">
        </lib-policy-card>
      </div>
    `,
    moduleMetadata: { imports: [PolicyCardComponent] },
  }),
};
