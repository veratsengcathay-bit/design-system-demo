import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text'    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clicked:  { action: 'clicked'  },
  },
  args: { label: '全部', selected: false, disabled: false },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Unselected: Story = { args: { label: '全部',   selected: false } };
export const Selected:   Story = { args: { label: '進行中', selected: true  } };
export const Disabled:   Story = { args: { label: '停用',   disabled: true  } };

export const TabGroup: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:0;border-bottom:1px solid var(--color-outline-grey);padding:0 16px;background:#fff;">
        <lib-accordion label="全部"   [selected]="true"></lib-accordion>
        <lib-accordion label="進行中" [selected]="false"></lib-accordion>
        <lib-accordion label="已完成" [selected]="false"></lib-accordion>
        <lib-accordion label="已取消" [disabled]="true"></lib-accordion>
      </div>
    `,
    moduleMetadata: { imports: [AccordionComponent] },
  }),
};
