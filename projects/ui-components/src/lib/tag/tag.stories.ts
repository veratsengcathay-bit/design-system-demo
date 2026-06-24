import type { Meta, StoryObj } from '@storybook/angular';
import { TagComponent } from './tag.component';

const meta: Meta<TagComponent> = {
  title: 'Components/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  argTypes: {
    label:   { control: 'text' },
    variant: { control: 'select', options: ['success', 'error', 'warning', 'neutral', 'info'] },
  },
  args: { label: 'Tag', variant: 'success' },
};

export default meta;
type Story = StoryObj<TagComponent>;

export const Success: Story = { args: { variant: 'success', label: '成功' } };
export const Error:   Story = { args: { variant: 'error',   label: '錯誤' } };
export const Warning: Story = { args: { variant: 'warning', label: '警告' } };
export const Neutral: Story = { args: { variant: 'neutral', label: '中性' } };
export const Info:    Story = { args: { variant: 'info',    label: '資訊' } };

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;padding:16px;background:var(--color-surface);flex-wrap:wrap;">
        <lib-tag variant="success" label="啟用中"></lib-tag>
        <lib-tag variant="error"   label="已失效"></lib-tag>
        <lib-tag variant="warning" label="待審核"></lib-tag>
        <lib-tag variant="neutral" label="草稿"></lib-tag>
        <lib-tag variant="info"    label="資訊"></lib-tag>
      </div>
    `,
    moduleMetadata: { imports: [TagComponent] },
  }),
};
