import type { Metadata } from "next";
import { TrackingView } from "@/components/tools/TrackingView";
import { loadTracking } from "@/lib/sitePages/fetch";
import { siteMetadata } from "@/lib/sitePages/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadTracking();
  return siteMetadata(live, "/tracking", "Tracking Resi", { robots: { index: false, follow: true } });
}

export default async function TrackingPage() {
  const { live } = await loadTracking();
  return <TrackingView content={live} />;
}
