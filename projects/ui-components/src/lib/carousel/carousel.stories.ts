import type { Meta, StoryObj } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';

/** Inline SVG banner so stories render without external assets. */
const banner = (label: string, color: string): string =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='343' height='80'>` +
      `<rect width='343' height='80' fill='${color}'/>` +
      `<text x='171' y='46' font-family='sans-serif' font-size='18' fill='white' text-anchor='middle'>${label}</text>` +
      `</svg>`,
  );

const sampleItems = [
  banner('Banner 1', '#298c7f'),
  banner('Banner 2', '#3a876b'),
  banner('Banner 3', '#50b45c'),
];

const meta: Meta<CarouselComponent> = {
  title: 'Components/Carousel',
  component: CarouselComponent,
  tags: ['autodocs'],
  argTypes: {
    // items 是內嵌 SVG data-URI 陣列,值極長會塞爆 Controls 面板;
    // 從 Controls/autodocs 隱藏,值仍由 args 提供,預覽照常。
    items:     { table: { disable: true } },
    itemClick: { action: 'itemClick' },
  },
  args: { items: sampleItems },
};

export default meta;
type Story = StoryObj<CarouselComponent>;

export const Default: Story = {};

export const SingleBanner: Story = {
  args: { items: [banner('Single Banner', '#298c7f')] },
};
