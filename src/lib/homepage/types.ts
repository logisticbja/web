export const SECTION_KEYS = [
  "hero",
  "stats",
  "services",
  "whyUs",
  "coverage",
  "gallery",
  "clients",
  "testimonials",
  "faq",
  "finalCta",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export interface HeroContent {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  trustBadges: string[];
}

export interface StatItem {
  value: string;
  label: string;
  sub: string;
}

export interface StatsContent {
  items: StatItem[];
}

export interface ServiceCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  waService: string;
  highlights: string[];
  variant: "default" | "corporate";
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: ServiceCard[];
}

export interface ReasonItem {
  icon: string;
  title: string;
  desc: string;
}

export interface WhyUsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ReasonItem[];
}

export interface CoverageCity {
  name: string;
  slug: string;
}

export interface CoverageRegion {
  name: string;
  color: "merah" | "merahTua";
  cargoSlug: string;
  cities: CoverageCity[];
}

export interface CoverageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  regions: CoverageRegion[];
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  wide: boolean;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
}

export interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface ClientsContent {
  eyebrow: string;
  title: string;
  logos: ClientLogo[];
  footnote: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  waLabel: string;
  hours: string;
}

export interface HomepageSeo {
  title: string;
  description: string;
}

export interface HomepageContent {
  version: number;
  order: SectionKey[];
  hidden: SectionKey[];
  seo: HomepageSeo;
  hero: HeroContent;
  stats: StatsContent;
  services: ServicesContent;
  whyUs: WhyUsContent;
  coverage: CoverageContent;
  gallery: GalleryContent;
  clients: ClientsContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
}
