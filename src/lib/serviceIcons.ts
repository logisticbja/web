import {
  Ship, Truck, Plane, Car, Bike, Package, Box, Container, Warehouse, Zap, Clock, Home,
  type LucideIcon,
} from "lucide-react";

// Nama string ini HARUS sinkron dengan SERVICE_ICON_OPTIONS di js/service-pages.js
// (admin CRM). Nambah icon baru: tambah di dua tempat — di sini DAN di CRM.
export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Ship, Truck, Plane, Car, Bike, Package, Box, Container, Warehouse, Zap, Clock, Home,
};

export function getServiceIcon(name?: string): LucideIcon {
  return (name && SERVICE_ICON_MAP[name]) || Ship;
}
