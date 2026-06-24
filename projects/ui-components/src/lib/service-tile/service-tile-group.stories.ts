import type { Meta, StoryObj } from '@storybook/angular';
import { ServiceTileGroupComponent, ServiceTileItem } from './service-tile-group.component';

/** Inline SVG circle icon so stories render without external assets. */
const icon = (color: string): string =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'>` +
      `<circle cx='16' cy='16' r='15' fill='${color}'/>` +
      `<text x='16' y='21' font-family='sans-serif' font-size='14' fill='white' text-anchor='middle'>$</text>` +
      `</svg>`,
  );

const pool: ServiceTileItem[] = [
  { label: '繳費', iconSrc: icon('#2e9f6d') },
  { label: '理賠', iconSrc: icon('#3a876b') },
  { label: '批改', iconSrc: icon('#50b45c') },
  { label: 'DM',   iconSrc: icon('#3b74df') },
  { label: '保單', iconSrc: icon('#298c7f') },
  { label: '帳戶', iconSrc: icon('#1f7a5a') },
];

const meta: Meta<ServiceTileGroupComponent> = {
  title: 'Components/ServiceTileGroup',
  component: ServiceTileGroupComponent,
  tags: ['autodocs'],
  args: { items: pool.slice(0, 4) },
};
export default meta;
type Story = StoryObj<ServiceTileGroupComponent>;

const wrap = (items: ServiceTileItem[]) => ({
  props: { items },
  template: `<div style="width:343px;padding:16px;background:var(--color-surface);">
    <lib-service-tile-group [items]="items"></lib-service-tile-group>
  </div>`,
  moduleMetadata: { imports: [ServiceTileGroupComponent] },
});

export const Single: Story = { render: () => wrap(pool.slice(0, 1)) };   // horizontal full width
export const Two: Story    = { render: () => wrap(pool.slice(0, 2)) };
export const Three: Story  = { render: () => wrap(pool.slice(0, 3)) };
export const Four: Story   = { render: () => wrap(pool.slice(0, 4)) };
export const Scroll: Story = { render: () => wrap(pool.slice(0, 6)) };   // 4+ → horizontal scroll
