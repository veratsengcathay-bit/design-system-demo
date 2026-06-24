import type { Meta, StoryObj } from '@storybook/angular';
import { NavigationButtonComponent } from './navigation-button.component';

const meta: Meta<NavigationButtonComponent> = {
  title: 'Components/NavigationButton',
  component: NavigationButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['stat', 'pill'] },
    title: { control: 'text' },
    amount: { control: 'text' },
  },
  args: { variant: 'stat', title: 'Đơn nhập liệu', amount: '10' },
  decorators: [
    (story) => ({ ...story(), template: `<div style="padding:16px;max-width:375px;background:var(--color-surface);">${story().template ?? '<lib-navigation-button></lib-navigation-button>'}</div>` }),
  ],
};
export default meta;
type Story = StoryObj<NavigationButtonComponent>;

export const Stat: Story = { args: { variant: 'stat', title: 'Đơn nhập liệu', amount: '10' } };

export const Pill: Story = {
  render: () => ({
    template: `
      <div style="padding:16px;max-width:375px;background:var(--color-surface);">
        <lib-navigation-button variant="pill" title="Chờ thanh toán" amount="20"></lib-navigation-button>
      </div>
    `,
    moduleMetadata: { imports: [NavigationButtonComponent] },
  }),
};

export const StatPair: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;padding:16px;max-width:375px;background:var(--color-surface);">
        <lib-navigation-button variant="stat" title="Đơn nhập liệu" amount="10"></lib-navigation-button>
        <lib-navigation-button variant="stat" title="Đơn cần bổ sung" amount="2"></lib-navigation-button>
      </div>
    `,
    moduleMetadata: { imports: [NavigationButtonComponent] },
  }),
};
