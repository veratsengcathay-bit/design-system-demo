/**
 * NavigationBar Icon SVG strings
 * Converted from Figma Make "Testing Library" navbar-icons.tsx
 * Each icon has default (outline) and active (filled) variants.
 */
import { navbarIconPaths as p } from './navbar-icon-paths';

/** Home icon — outline (inactive) */
export const homeIconDefault = `
<svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <path d="${p.homeOutline}"
    stroke="#1F3C33" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round"/>
  <mask id="home-mask" fill="white">
    <rect x="9" y="12" width="6" height="8" rx="1"/>
  </mask>
  <rect x="9" y="12" width="6" height="8" rx="1"
    mask="url(#home-mask)" stroke="#1F3C33" stroke-width="3"/>
</svg>`;

/** Home icon — filled (active/selected) */
export const homeIconActive = `
<svg viewBox="0 0 25 25" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg">
  <path d="${p.homeFilledShape}" fill="#1F3C33"/>
  <path d="${p.homeFilledStroke}" fill="white"/>
  <path d="${p.homeFilledDoor}" fill="#1F3C33" stroke="white"/>
</svg>`;

/** Folder icon — outline (inactive) */
export const folderIconDefault = `
<svg viewBox="0 0 21.5 18.5" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <path d="${p.folderOutline}"
    stroke="#1F3C33" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** Folder icon — filled (active/selected) */
export const folderIconActive = `
<svg viewBox="0 0 25 25" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg">
  <path d="${p.folderFilledShape}" fill="#1F3C33"/>
  <path d="${p.folderFilledStroke}"
    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** Plus / Add icon — outline (inactive) */
export const plusIconDefault = `
<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;padding:5px;border-radius:99px;">
  <div style="width:22px;height:22px;border-radius:99px;border:1.5px solid #1f3c33;display:flex;align-items:center;justify-content:center;">
    <svg viewBox="0 0 14.3333 14.3333" fill="none" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
      <path d="${p.plusCross}"
        stroke="#1F3C33" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</div>`;

/** Plus / Add icon — filled with gradient (active/selected) */
export const plusIconActive = `
<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;padding:5px;">
  <svg viewBox="0 0 25 25" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="plus-grad" x1="12.5" y1="0.5" x2="14.5165" y2="10.0078" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9EEB5F"/>
        <stop offset="1" stop-color="#0BAE7D"/>
      </linearGradient>
    </defs>
    <path d="${p.plusCircle}" fill="url(#plus-grad)" fill-opacity="0.9"/>
    <path d="${p.plusCircle}" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.5 12.5H18.5M12.5 6.5V18.5"
      stroke="white" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>`;

/** Ellipsis / More icon — 3 dots (inactive) */
export const ellipsisIconDefault = `
<svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <path d="${p.ellipsisDot1}" fill="#1F3C33"/>
  <path d="${p.ellipsisDot2}" fill="#1F3C33"/>
  <path d="${p.ellipsisDot3}" fill="#1F3C33"/>
</svg>`;

/** Ellipsis / More icon — vertical dots, rotated (active/selected) */
export const ellipsisIconActive = `
<svg viewBox="0 0 24 24" fill="none" width="24" height="24"
  style="transform:rotate(-90deg);transition:transform 300ms cubic-bezier(0.4,0,0.2,1);"
  xmlns="http://www.w3.org/2000/svg">
  <path d="${p.ellipsisActiveDots}" fill="#1F3C33" stroke="white"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** Pre-built items array ready for use in NavigationBarComponent */
export const defaultNavBarItems = [
  {
    label: '首頁',
    iconSvg:       homeIconDefault,
    activeIconSvg: homeIconActive,
  },
  {
    label: '保單',
    iconSvg:       folderIconDefault,
    activeIconSvg: folderIconActive,
  },
  {
    label: '新增',
    iconSvg:       plusIconDefault,
    activeIconSvg: plusIconActive,
  },
  {
    label: '更多',
    iconSvg:       ellipsisIconDefault,
    activeIconSvg: ellipsisIconActive,
  },
];
