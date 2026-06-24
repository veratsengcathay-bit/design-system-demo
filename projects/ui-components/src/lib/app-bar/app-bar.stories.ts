import type { Meta, StoryObj } from '@storybook/angular';
import { AppBarComponent } from './app-bar.component';

const meta: Meta<AppBarComponent> = {
  title: 'Components/AppBar',
  component: AppBarComponent,
  tags: ['autodocs'],
  argTypes: {
    title:         { control: 'text' },
    leadingIcon:   { control: 'select', options: [null, 'chevron-left', 'chevron-right', 'search', 'bell', 'user'] },
    trailingIcon:  { control: 'select', options: [null, 'search', 'bell', 'chevron-right', 'user'] },
    leadingLabel:  { control: 'text' },
    trailingLabel: { control: 'text' },
    leadingAction:  { action: 'leadingAction' },
    trailingAction: { action: 'trailingAction' },
  },
  args: {
    title: '我的保單',
    leadingIcon:  'chevron-left',
    trailingIcon: 'search',
    leadingLabel:  'Back',
    trailingLabel: 'Search',
  },
  decorators: [
    (story) => ({
      ...story(),
      styles: ['div { max-width: 375px; }'],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppBarComponent>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    title: '保險總覽',
    leadingIcon:  null,
    trailingIcon: null,
  },
};

export const LeadingOnly: Story = {
  args: {
    title: '返回',
    leadingIcon:  'chevron-left',
    trailingIcon: null,
  },
};

export const TrailingOnly: Story = {
  args: {
    title: '通知',
    leadingIcon:  null,
    trailingIcon: 'bell',
  },
};

export const BothIcons: Story = {
  args: {
    title: '理賠申請',
    leadingIcon:  'chevron-left',
    trailingIcon: 'search',
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:375px;">
        <lib-app-bar title="僅標題"></lib-app-bar>
        <lib-app-bar title="左側返回" leadingIcon="chevron-left"></lib-app-bar>
        <lib-app-bar title="右側搜尋" trailingIcon="search"></lib-app-bar>
        <lib-app-bar title="理賠申請" leadingIcon="chevron-left" trailingIcon="search"></lib-app-bar>
        <lib-app-bar title="通知中心" leadingIcon="chevron-left" trailingIcon="bell"></lib-app-bar>
      </div>
    `,
    moduleMetadata: { imports: [AppBarComponent] },
  }),
};
