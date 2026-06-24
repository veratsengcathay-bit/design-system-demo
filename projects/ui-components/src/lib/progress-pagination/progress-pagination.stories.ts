import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressPaginationComponent } from './progress-pagination.component';

const meta: Meta<ProgressPaginationComponent> = {
  title: 'Components/ProgressPagination',
  component: ProgressPaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages:  { control: { type: 'number', min: 1 } },
  },
  args: { currentPage: 1, totalPages: 3 },
};

export default meta;
type Story = StoryObj<ProgressPaginationComponent>;

export const Default: Story = {};

export const AllPositions: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);">
        <lib-progress-pagination [currentPage]="1" [totalPages]="3"></lib-progress-pagination>
        <lib-progress-pagination [currentPage]="2" [totalPages]="3"></lib-progress-pagination>
        <lib-progress-pagination [currentPage]="3" [totalPages]="3"></lib-progress-pagination>
      </div>
    `,
    moduleMetadata: { imports: [ProgressPaginationComponent] },
  }),
};
