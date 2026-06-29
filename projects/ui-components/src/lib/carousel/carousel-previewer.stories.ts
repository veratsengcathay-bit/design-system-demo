import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input, signal } from '@angular/core';
import { CarouselPreviewerComponent } from './carousel-previewer.component';
import { CarouselComponent } from './carousel.component';

/** Inline portrait SVG (9:16, 343×610) so stories render without external assets. */
const preview = (label: string, color: string): string =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='343' height='610'>` +
      `<rect width='343' height='610' fill='${color}'/>` +
      `<text x='171' y='305' font-family='sans-serif' font-size='28' fill='white' text-anchor='middle'>${label}</text>` +
      `</svg>`,
  );

/** Small landscape banner (343×80) for the carousel half of the expand demo. */
const banner = (label: string, color: string): string =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='343' height='80'>` +
      `<rect width='343' height='80' fill='${color}'/>` +
      `<text x='171' y='46' font-family='sans-serif' font-size='18' fill='white' text-anchor='middle'>${label}</text>` +
      `</svg>`,
  );

const COLORS = ['#298c7f', '#3a876b', '#50b45c'];

const previewItems = [
  preview('Preview 1', COLORS[0]),
  preview('Preview 2', COLORS[1]),
  preview('Preview 3', COLORS[2]),
];

const meta: Meta<CarouselPreviewerComponent> = {
  title: 'Components/Carousel Previewer',
  component: CarouselPreviewerComponent,
  tags: ['autodocs'],
  argTypes: {
    // items 是內嵌 SVG data-URI 陣列,值極長會塞爆 Controls 面板;隱藏但仍由 args 提供。
    items: { table: { disable: true } },
    indexChange: { action: 'indexChange' },
  },
  args: { items: previewItems, initialIndex: 0 },
};

export default meta;
type Story = StoryObj<CarouselPreviewerComponent>;

/** Large 9:16 previewer. Use the bottom-right icon buttons to switch images. */
export const Default: Story = {};

/** Single image — navigation controls are hidden when there's nothing to switch to. */
export const SingleImage: Story = {
  args: { items: [preview('Single Preview', COLORS[0])] },
};

/** Full-screen overlay (scrim + close button). Dismiss via close / backdrop / Esc. */
export const Overlay: Story = {
  args: { overlay: true },
};

/* ── Click-to-expand demo ──────────────────────────────────────────────────
   Mirrors the Figma Make showcase: clicking a small Carousel banner opens the
   large CarouselPreviewer at the clicked index ("expand" into preview mode).
   `inline` renders the previewer below the carousel (Make behaviour); the
   default shows it as a full-screen overlay (code-side expand mode). */
@Component({
  selector: 'lib-carousel-previewer-expand-demo',
  standalone: true,
  imports: [CarouselComponent, CarouselPreviewerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:20px;">
      <lib-carousel [items]="banners" (itemClick)="open($event)"></lib-carousel>

      @if (expanded()) {
        <lib-carousel-previewer
          [items]="previews"
          [initialIndex]="index()"
          [overlay]="!inline"
          (closed)="expanded.set(false)"
        ></lib-carousel-previewer>
      }
    </div>
  `,
})
class CarouselPreviewerExpandDemo {
  @Input() inline = false;
  banners = [
    banner('Banner 1', COLORS[0]),
    banner('Banner 2', COLORS[1]),
    banner('Banner 3', COLORS[2]),
  ];
  previews = previewItems;
  expanded = signal(false);
  index = signal(0);

  open(i: number): void {
    this.index.set(i);
    this.expanded.set(true);
  }
}

/** Tap/click a banner to expand it into a full-screen previewer at that index. */
export const ExpandFromCarousel: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselPreviewerExpandDemo] })],
  render: () => ({ template: `<lib-carousel-previewer-expand-demo></lib-carousel-previewer-expand-demo>` }),
};

/** Same expand wiring, but the previewer appears inline below (Figma Make behaviour). */
export const ExpandInline: StoryObj = {
  decorators: [moduleMetadata({ imports: [CarouselPreviewerExpandDemo] })],
  render: () => ({
    props: { inline: true },
    template: `<lib-carousel-previewer-expand-demo [inline]="inline"></lib-carousel-previewer-expand-demo>`,
  }),
};
