import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    size:   { control: 'radio', options: ['sm', 'md', 'lg'] },
    gender: { control: 'radio', options: ['female', 'male'] },
    name:   { control: 'text' },
  },
  args: { size: 'md', gender: 'female' },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Female: Story = { args: { gender: 'female', name: 'Jean Doe', size: 'md' } };
export const Male:   Story = { args: { gender: 'male',   name: 'John Doe', size: 'md' } };

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);">
        <lib-avatar size="sm" gender="female"></lib-avatar>
        <lib-avatar size="md" gender="female"></lib-avatar>
        <lib-avatar size="lg" gender="female"></lib-avatar>
      </div>
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--color-surface);margin-top:8px;">
        <lib-avatar size="sm" gender="male"></lib-avatar>
        <lib-avatar size="md" gender="male"></lib-avatar>
        <lib-avatar size="lg" gender="male"></lib-avatar>
      </div>
    `,
    moduleMetadata: { imports: [AvatarComponent] },
  }),
};

export const WithName: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--color-surface);">
        <lib-avatar size="md" gender="female" name="Jean Doe"></lib-avatar>
        <lib-avatar size="md" gender="male"   name="John Doe"></lib-avatar>
      </div>
    `,
    moduleMetadata: { imports: [AvatarComponent] },
  }),
};
