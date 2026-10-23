import { Fragment } from "react";
import type { HomepageContent, SectionKey } from "@/lib/homepage/types";
import { Hero } from "./Hero";
import { StatsBar } from "./StatsBar";
import { ServicesGrid } from "./ServicesGrid";
import { WhyUs } from "./WhyUs";
import { CoverageSection } from "./CoverageSection";
import { Gallery } from "./Gallery";
import { ClientLogos } from "./ClientLogos";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";

function renderSection(key: SectionKey, c: HomepageContent, edit: boolean) {
  switch (key) {
    case "hero":
      return <Hero content={c.hero} edit={edit} />;
    case "stats":
      return <StatsBar content={c.stats} edit={edit} />;
    case "services":
      return <ServicesGrid content={c.services} edit={edit} />;
    case "whyUs":
      return <WhyUs content={c.whyUs} edit={edit} />;
    case "coverage":
      return <CoverageSection content={c.coverage} edit={edit} />;
    case "gallery":
      return <Gallery content={c.gallery} edit={edit} />;
    case "clients":
      return <ClientLogos content={c.clients} edit={edit} />;
    case "testimonials":
      return <Testimonials content={c.testimonials} edit={edit} />;
    case "faq":
      return <FAQ content={c.faq} edit={edit} />;
    case "finalCta":
      return <FinalCTA content={c.finalCta} edit={edit} />;
  }
}

export function HomeSections({ content, edit = false }: { content: HomepageContent; edit?: boolean }) {
  const visible = content.order.filter((key) => !content.hidden.includes(key));
  if (!edit) {
    return <>{visible.map((key) => <Fragment key={key}>{renderSection(key, content, false)}</Fragment>)}</>;
  }
  return (
    <>
      {visible.map((key) => (
        <div key={key} data-cms-section={key}>
          {renderSection(key, content, true)}
        </div>
      ))}
    </>
  );
}
