import type { Meta, StoryObj } from '@storybook/angular';
import { ServiceTileComponent } from './service-tile.component';

const meta: Meta<ServiceTileComponent> = {
  title: 'Components/ServiceTile',
  component: ServiceTileComponent,
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    iconSrc:     { control: 'text' },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    disabled:    { control: 'boolean' },
  },
  args: { label: 'Nộp phí', orientation: 'vertical', disabled: false },
};
export default meta;
type Story = StoryObj<ServiceTileComponent>;

const dollarIcon =
  `<div style="width:32px;height:32px;border-radius:99px;background:linear-gradient(168deg,#9eeb5f,#0bae7d);"></div>`;

export const Vertical: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:16px;width:120px;background:var(--color-surface);">
        <lib-service-tile [label]="label" [disabled]="disabled" orientation="vertical">${dollarIcon}</lib-service-tile>
      </div>`,
    moduleMetadata: { imports: [ServiceTileComponent] },
  }),
};

export const Horizontal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:16px;width:343px;background:var(--color-surface);">
        <lib-service-tile [label]="label" [disabled]="disabled" orientation="horizontal">${dollarIcon}</lib-service-tile>
      </div>`,
    moduleMetadata: { imports: [ServiceTileComponent] },
  }),
};

export const Row: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;padding:16px;max-width:375px;background:var(--color-surface);">
        <lib-service-tile label="Nộp phí"><div style="width:32px;height:32px;border-radius:99px;background:linear-gradient(168deg,#9eeb5f,#0bae7d);"></div></lib-service-tile>
        <lib-service-tile label="Bồi thường"><div style="width:32px;height:32px;border-radius:8px;background:#36b0ce;"></div></lib-service-tile>
        <lib-service-tile label="Sửa đổi bổ sung"><div style="width:32px;height:32px;border-radius:8px;background:#3b74df;"></div></lib-service-tile>
        <lib-service-tile label="DM"><div style="width:32px;height:32px;border-radius:8px;background:#f5a623;"></div></lib-service-tile>
      </div>
    `,
    moduleMetadata: { imports: [ServiceTileComponent] },
  }),
};
