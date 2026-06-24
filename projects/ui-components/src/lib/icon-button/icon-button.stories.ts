import type { Meta, StoryObj } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';

const meta: Meta<IconButtonComponent> = {
  title: 'Components/IconButton',
  component: IconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['bell', 'eye', 'eye-off', 'chevron-left', 'chevron-right', 'search', 'user'],
    },
    size:          { control: 'radio',   options: ['xs', 'sm', 'md'] },
    borderVariant: { control: 'radio',   options: ['outline', 'white', 'none'] },
    showDot:       { control: 'boolean' },
    dotSize:       { control: 'radio',   options: ['sm', 'md'] },
    disabled:      { control: 'boolean' },
    clicked:       { action: 'clicked' },
  },
  args: {
    icon: 'bell',
    size: 'sm',
    borderVariant: 'white',
    showDot: false,
    dotSize: 'sm',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<IconButtonComponent>;

export const Default:  Story = { args: { icon: 'bell', size: 'sm', borderVariant: 'white' } };
export const WithDot:  Story = { args: { icon: 'bell', size: 'sm', showDot: true, dotSize: 'sm' } };
export const Outline:  Story = { args: { icon: 'search', borderVariant: 'outline' } };
export const NoBorder: Story = { args: { icon: 'user', borderVariant: 'none' } };
export const Disabled: Story = { args: { icon: 'bell', disabled: true } };

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);">
        <lib-icon-button icon="bell" size="xs" borderVariant="white"></lib-icon-button>
        <lib-icon-button icon="bell" size="sm" borderVariant="white"></lib-icon-button>
        <lib-icon-button icon="bell" size="md" borderVariant="white"></lib-icon-button>
      </div>
    `,
    moduleMetadata: { imports: [IconButtonComponent] },
  }),
};

export const AllIcons: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px;background:var(--color-surface);">
        <lib-icon-button icon="bell"          size="sm" borderVariant="outline"></lib-icon-button>
        <lib-icon-button icon="eye"           size="sm" borderVariant="outline"></lib-icon-button>
        <lib-icon-button icon="eye-closed"    size="sm" borderVariant="outline"></lib-icon-button>
        <lib-icon-button icon="chevron-left"  size="sm" borderVariant="outline"></lib-icon-button>
        <lib-icon-button icon="chevron-right" size="sm" borderVariant="outline"></lib-icon-button>
        <lib-icon-button icon="search"        size="sm" borderVariant="outline"></lib-icon-button>
        <lib-icon-button icon="user"          size="sm" borderVariant="outline"></lib-icon-button>
      </div>
    `,
    moduleMetadata: { imports: [IconButtonComponent] },
  }),
};

export const WithBadgeDot: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);">
        <lib-icon-button icon="bell" size="xs" [showDot]="true" dotSize="sm"></lib-icon-button>
        <lib-icon-button icon="bell" size="sm" [showDot]="true" dotSize="sm"></lib-icon-button>
        <lib-icon-button icon="bell" size="sm" [showDot]="true" dotSize="md"></lib-icon-button>
        <lib-icon-button icon="bell" size="md" [showDot]="true" dotSize="md"></lib-icon-button>
      </div>
    `,
    moduleMetadata: { imports: [IconButtonComponent] },
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;color:#888;">
          <lib-icon-button icon="bell" size="sm" borderVariant="outline"></lib-icon-button>
          Default
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;color:#888;">
          <lib-icon-button icon="bell" size="sm" borderVariant="outline" [disabled]="true"></lib-icon-button>
          Disabled
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;color:#888;">
          <lib-icon-button icon="bell" size="sm" [showDot]="true"></lib-icon-button>
          With dot
        </div>
      </div>
    `,
    moduleMetadata: { imports: [IconButtonComponent] },
  }),
};
