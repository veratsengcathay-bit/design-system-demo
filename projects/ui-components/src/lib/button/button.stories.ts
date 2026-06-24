import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    appearance:   { control: 'select', options: ['outline', 'tonal', 'filled', 'text'] },
    size:         { control: 'radio',  options: ['sm', 'md', 'lg', 'xl'] },
    leadingIcon:  { control: 'select', options: [null, 'chevron-left', 'chevron-right', 'search', 'bell', 'user'] },
    trailingIcon: { control: 'select', options: [null, 'chevron-right', 'chevron-left', 'search', 'bell', 'user'] },
    disabled:     { control: 'boolean' },
    label:        { control: 'text' },
    clicked:      { action: 'clicked' },
  },
  args: {
    label: 'Label',
    appearance: 'outline',
    size: 'sm',
    disabled: false,
    leadingIcon: null,
    trailingIcon: null,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Outline: Story = { args: { appearance: 'outline' } };
export const Tonal:   Story = { args: { appearance: 'tonal'   } };
export const Filled:  Story = { args: { appearance: 'filled'  } };
export const Text:    Story = { args: { appearance: 'text'    } };
export const Disabled: Story = { args: { appearance: 'filled', disabled: true } };

export const WithLeadingIcon: Story = {
  args: { appearance: 'outline', leadingIcon: 'chevron-left', label: 'Back' },
};
export const WithTrailingIcon: Story = {
  args: { appearance: 'outline', trailingIcon: 'chevron-right', label: 'Next' },
};
export const WithBothIcons: Story = {
  args: {
    appearance: 'outline',
    leadingIcon: 'chevron-left',
    trailingIcon: 'chevron-right',
    label: 'Label',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px;background:var(--color-surface);">
        <lib-button appearance="filled" size="sm" label="Small"  leadingIcon="chevron-left"></lib-button>
        <lib-button appearance="filled" size="md" label="Medium" leadingIcon="chevron-left"></lib-button>
        <lib-button appearance="filled" size="lg" label="Large"  leadingIcon="chevron-left"></lib-button>
        <lib-button appearance="filled" size="xl" label="X-Large" leadingIcon="chevron-left"></lib-button>
      </div>
    `,
    moduleMetadata: { imports: [ButtonComponent] },
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px;background:var(--color-surface);">
        <lib-button appearance="outline"  label="Outline"  leadingIcon="chevron-left" trailingIcon="chevron-right"></lib-button>
        <lib-button appearance="tonal"    label="Tonal"    leadingIcon="chevron-left" trailingIcon="chevron-right"></lib-button>
        <lib-button appearance="filled"   label="Filled"   leadingIcon="chevron-left" trailingIcon="chevron-right"></lib-button>
        <lib-button appearance="text"     label="Text"     leadingIcon="chevron-left" trailingIcon="chevron-right"></lib-button>
        <lib-button appearance="filled"   label="Disabled" [disabled]="true"></lib-button>
      </div>
    `,
    moduleMetadata: { imports: [ButtonComponent] },
  }),
};
