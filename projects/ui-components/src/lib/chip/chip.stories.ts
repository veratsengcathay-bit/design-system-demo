import type { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clicked:  { action: 'clicked' },
  },
  args: { label: 'Chip', selected: false, disabled: false },
};

export default meta;
type Story = StoryObj<ChipComponent>;

export const Unselected: Story = { args: { label: 'Unselected', selected: false } };
export const Selected:   Story = { args: { label: 'Selected',   selected: true  } };
export const Disabled:   Story = { args: { label: 'Disabled',   disabled: true  } };

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px;background:var(--color-surface);">
        <lib-chip label="全部"   [selected]="true"></lib-chip>
        <lib-chip label="保險"   [selected]="false"></lib-chip>
        <lib-chip label="理賠"   [selected]="false"></lib-chip>
        <lib-chip label="已停用" [disabled]="true"></lib-chip>
      </div>
    `,
    moduleMetadata: { imports: [ChipComponent] },
  }),
};
