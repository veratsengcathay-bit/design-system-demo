/**
 * Lucide-style SVG icon paths for IconButton
 * Matches icon-registry.ts from Figma Make "Testing Library"
 */

const attr = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;

export type IconType =
  | 'bell'
  | 'eye'
  | 'eye-off'
  | 'eye-closed'
  | 'chevron-left'
  | 'chevron-right'
  | 'search'
  | 'user';

export const iconSvgMap: Record<IconType, string> = {
  bell: `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>`,

  eye: `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`,

  'eye-closed': `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <path d="M15 18l-.722-3.25M2 8c.748 2.051 2.109 3.822 3.898 5.073C7.687 14.325 9.817 14.996 12 14.996s4.313-.671 6.102-1.923C19.891 11.822 21.252 10.051 22 8M20 15l-1.726-2.05M4 15l1.726-2.05M9 18l.722-3.25"/>
  </svg>`,

  'eye-off': `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>`,

  'chevron-left': `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <polyline points="15 18 9 12 15 6"/>
  </svg>`,

  'chevron-right': `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <polyline points="9 18 15 12 9 6"/>
  </svg>`,

  search: `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`,

  user: `<svg viewBox="0 0 24 24" ${attr} style="width:100%;height:100%;display:block;">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>`,
};
