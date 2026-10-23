import {
  Anchor,
  Award,
  Bike,
  Box,
  Building2,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  Home,
  Layers,
  MapPin,
  Package,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Star,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

export type EditProps = { edit?: boolean };

export function cms(edit: boolean | undefined, path: string): { "data-cms"?: string } {
  return edit ? { "data-cms": path } : {};
}

export const HOME_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Ship,
  Truck,
  Plane,
  Bike,
  Car,
  Package,
  Building2,
  MapPin,
  Layers,
  DollarSign,
  Home,
  Globe,
  ShieldCheck,
  Clock,
  Star,
  Users,
  Award,
  Anchor,
  Box,
  Phone,
  CheckCircle,
  Warehouse,
};

export function boldText(text: string, strongClassName: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts
    .map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className={strongClassName}>
          {part}
        </strong>
      ) : (
        part
      )
    )
    .filter((p) => p !== "");
}
