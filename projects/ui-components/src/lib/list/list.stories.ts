import type { Meta, StoryObj } from '@storybook/angular';
import { ListItemComponent, type IconType } from './list.component';

const meta: Meta<ListItemComponent> = {
  title: 'Components/ListItem',
  component: ListItemComponent,
  tags: ['autodocs'],
  argTypes: {
    title:         { control: 'text'    },
    iconName:      { control: { type: 'select' }, options: ['bell', 'user', 'search', 'eye', 'chevron-right', 'chevron-left'] },
    showChevron:   { control: 'boolean' },
    trailingCount: { control: 'number'  },
    trailingText:  { control: 'text'    },
    disabled:      { control: 'boolean' },
    viewOnly:      { control: 'boolean' },
    clicked:       { action: 'clicked'  },
  },
  args: {
    title: '保險理賠',
    showChevron: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ListItemComponent>;

export const Default:      Story = { args: { title: '保險理賠' } };
export const WithIcon:     Story = { args: { title: '帳號設定', iconName: 'user' } };
export const WithCount:    Story = { args: { title: '未讀通知', trailingCount: 5 } };
export const WithText:     Story = { args: { title: '繳費方式', iconName: 'eye', trailingText: '信用卡', showChevron: false, viewOnly: true } };
export const Disabled:     Story = { args: { title: '暫停功能', iconName: 'bell', disabled: true } };

export const ListView: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;padding:16px;background:var(--color-surface);max-width:375px;">
        <lib-list-item title="保單總覽"   iconName="bell"   [showChevron]="true"></lib-list-item>
        <lib-list-item title="理賠申請"   iconName="search" [trailingCount]="3"></lib-list-item>
        <lib-list-item title="繳費方式"   iconName="eye"    trailingText="信用卡" [showChevron]="false" [viewOnly]="true"></lib-list-item>
        <lib-list-item title="帳號設定"   iconName="user"   [showChevron]="true"></lib-list-item>
        <lib-list-item title="暫停中"     iconName="bell"   [disabled]="true"></lib-list-item>
      </div>
    `,
    moduleMetadata: { imports: [ListItemComponent] },
  }),
};
