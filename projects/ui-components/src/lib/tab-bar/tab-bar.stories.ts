import type { Meta, StoryObj } from '@storybook/angular';
import { TabBarComponent } from './tab-bar.component';

const meta: Meta<TabBarComponent> = {
  title: 'Components/TabBar',
  component: TabBarComponent,
  tags: ['autodocs'],
  argTypes: {
    activeIndex: { control: 'number' },
    tabChange:   { action: 'tabChange' },
  },
  args: {
    tabs: [
      { label: '全部' },
      { label: '進行中', badgeCount: 3 },
      { label: '已完成' },
    ],
    activeIndex: 0,
  },
};

export default meta;
type Story = StoryObj<TabBarComponent>;

export const Default: Story = {};

export const WithBadges: Story = {
  args: {
    tabs: [
      { label: '全部',   badgeCount: 12 },
      { label: '待處理', badgeCount: 3  },
      { label: '已完成'                 },
      { label: '已取消'                 },
    ],
    activeIndex: 1,
  },
};

export const ManyTabs: Story = {
  render: () => ({
    template: `
      <div style="max-width:375px;">
        <lib-tab-bar
          [tabs]="tabs"
          [activeIndex]="activeIndex"
          (tabChange)="activeIndex = $event"
        ></lib-tab-bar>
      </div>
    `,
    props: {
      tabs: [
        { label: '車險',   badgeCount: 2 },
        { label: '壽險'                  },
        { label: '醫療險', badgeCount: 1 },
        { label: '旅平險'                },
      ],
      activeIndex: 0,
    },
    moduleMetadata: { imports: [TabBarComponent] },
  }),
};
