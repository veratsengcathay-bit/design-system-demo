import type { Meta, StoryObj } from '@storybook/angular';
import { NavigationBarComponent } from './navigation-bar.component';
import { defaultNavBarItems } from './navbar-icons';

const meta: Meta<NavigationBarComponent> = {
  title: 'Components/NavigationBar',
  component: NavigationBarComponent,
  tags: ['autodocs'],
  argTypes: {
    activeIndex:       { control: { type: 'number', min: 0, max: 3 } },
    showHomeIndicator: { control: 'boolean' },
    itemChange:        { action: 'itemChange' },
  },
  args: {
    items: defaultNavBarItems,
    activeIndex: 0,
    showHomeIndicator: true,
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="max-width:375px;">${(story() as any).template ?? ''}</div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<NavigationBarComponent>;

export const Home:   Story = { args: { activeIndex: 0 } };
export const Policy: Story = { args: { activeIndex: 1 } };
export const Add:    Story = { args: { activeIndex: 2 } };
export const More:   Story = { args: { activeIndex: 3 } };
export const NoHomeIndicator: Story = {
  args: { activeIndex: 0, showHomeIndicator: false },
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <div style="max-width:375px;">
        <lib-navigation-bar
          [items]="items"
          [activeIndex]="activeIndex"
          [showHomeIndicator]="true"
          (itemChange)="activeIndex = $event"
        ></lib-navigation-bar>
      </div>
    `,
    props: {
      items: defaultNavBarItems,
      activeIndex: 0,
    },
    moduleMetadata: { imports: [NavigationBarComponent] },
  }),
};
