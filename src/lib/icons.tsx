import {
  Layers,
  LayoutPanelLeft,
  Grid2x2,
  Brush,
  PaintRoller,
  Building2,
  Hammer,
  Wrench,
  HardHat,
  Ruler,
  PaintBucket,
  Home,
  type LucideIcon,
} from 'lucide-react'

// String key -> lucide component. Used to render service icons stored in the DB.
export const iconMap: Record<string, LucideIcon> = {
  Layers,
  LayoutPanelLeft,
  Grid2x2,
  Brush,
  PaintRoller,
  Building2,
  Hammer,
  Wrench,
  HardHat,
  Ruler,
  PaintBucket,
  Home,
}

// Options shown in the admin icon picker
export const iconOptions = Object.keys(iconMap)

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Building2
}
