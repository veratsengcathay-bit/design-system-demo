/**
 * Design system icon registry — powered by lucide-angular
 * All icon-consuming components import LucideAngularModule.pick(DS_ICONS)
 */
import {
  Bell,
  Eye,
  EyeClosed,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  User,
  EllipsisVertical,
} from 'lucide-angular';

/** All icons used across the design system */
export const DS_ICONS = {
  Bell,
  Eye,
  EyeClosed,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  User,
  EllipsisVertical,
} as const;

/**
 * Map from kebab-case name → Lucide icon data object
 * Used by components that accept an @Input() icon name.
 */
export const ICON_MAP = {
  'bell':          Bell,
  'eye':           Eye,
  'eye-closed':    EyeClosed,
  'eye-off':       EyeOff,
  'chevron-left':  ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down':  ChevronDown,
  'search':        Search,
  'user':          User,
  'ellipsis-vertical': EllipsisVertical,
} as const;

export type IconType = keyof typeof ICON_MAP;
