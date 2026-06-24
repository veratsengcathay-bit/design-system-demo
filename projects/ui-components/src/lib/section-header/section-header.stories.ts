import type { Meta, StoryObj } from '@storybook/angular';
import { SectionHeaderComponent } from './section-header.component';

const meta: Meta<SectionHeaderComponent> = {
  title: 'Components/SectionHeader',
  component: SectionHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: { title: '快捷服務', actionLabel: 'More' },
  decorators: [
    (story) => ({ ...story(), template: `<div style="padding:16px;max-width:375px;background:var(--color-surface);">${story().template ?? '<lib-section-header></lib-section-header>'}</div>` }),
  ],
};
export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const More: Story = { args: { title: '快捷服務', actionLabel: 'More' } };
export const NoAction: Story = { args: { title: '開始續保', actionLabel: '' } };
