import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    type:           { control: 'radio',  options: ['numeric', 'dot'] },
    numericVariant: { control: 'radio',  options: ['success', 'neutral'] },
    dotVariant:     { control: 'radio',  options: ['warning', 'error'] },
    dotSize:        { control: 'radio',  options: ['sm', 'md'] },
    count:          { control: 'number' },
  },
  args: { type: 'numeric', count: 5, numericVariant: 'success' },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const NumericSuccess: Story = { args: { type: 'numeric', count: 5,   numericVariant: 'success' } };
export const NumericNeutral: Story = { args: { type: 'numeric', count: 12,  numericVariant: 'neutral' } };
export const NumericOverflow: Story = { args: { type: 'numeric', count: 100, numericVariant: 'success' } };
export const DotWarning: Story = { args: { type: 'dot', dotVariant: 'warning', dotSize: 'md' } };
export const DotError:   Story = { args: { type: 'dot', dotVariant: 'error',   dotSize: 'md' } };

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);flex-wrap:wrap;">
        <lib-badge type="numeric" [count]="5"   numericVariant="success"></lib-badge>
        <lib-badge type="numeric" [count]="12"  numericVariant="neutral"></lib-badge>
        <lib-badge type="numeric" [count]="100" numericVariant="success"></lib-badge>
        <lib-badge type="dot" dotVariant="warning" dotSize="md"></lib-badge>
        <lib-badge type="dot" dotVariant="error"   dotSize="md"></lib-badge>
        <lib-badge type="dot" dotVariant="error"   dotSize="sm"></lib-badge>
      </div>
    `,
    moduleMetadata: { imports: [BadgeComponent] },
  }),
};
