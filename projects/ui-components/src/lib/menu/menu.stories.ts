import type { Meta, StoryObj } from '@storybook/angular';
import { MenuItemComponent } from './menu.component';

const meta: Meta<MenuItemComponent> = {
  title: 'Components/MenuItem',
  component: MenuItemComponent,
  tags: ['autodocs'],
  argTypes: {
    text:     { control: 'text'    },
    size:     { control: 'radio', options: ['M', 'S'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clicked:  { action: 'clicked'  },
  },
  args: {
    text: '保單總覽',
    size: 'M',
    selected: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<MenuItemComponent>;

export const Default:  Story = { args: { text: '保單總覽' } };
export const Selected: Story = { args: { text: '理賠申請', selected: true } };
export const SizeS:    Story = { args: { text: 'Sao chép', size: 'S' } };
export const Disabled: Story = { args: { text: '暫停功能', disabled: true } };

export const MenuList: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;max-width:375px;">
        <lib-menu-item text="保單總覽"></lib-menu-item>
        <lib-menu-item text="理賠申請" [selected]="true"></lib-menu-item>
        <lib-menu-item text="繳費方式"></lib-menu-item>
        <lib-menu-item text="帳號設定"></lib-menu-item>
        <lib-menu-item text="暫停中" [disabled]="true"></lib-menu-item>
      </div>
    `,
    moduleMetadata: { imports: [MenuItemComponent] },
  }),
};

export const SmallMenu: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;width:120px;">
        <lib-menu-item text="複製" size="S"></lib-menu-item>
        <lib-menu-item text="貼上" size="S"></lib-menu-item>
        <lib-menu-item text="刪除" size="S"></lib-menu-item>
      </div>
    `,
    moduleMetadata: { imports: [MenuItemComponent] },
  }),
};
