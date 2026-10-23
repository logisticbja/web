"use client";
import { useEffect, useState } from "react";
import { HomeSections } from "./HomeSections";
import { mergeHomepage } from "@/lib/homepage/normalize";
import type { HomepageContent } from "@/lib/homepage/types";

const CRM_ORIGINS = [
  "https://invoice.bjalogistic.id",
  ...(process.env.NEXT_PUBLIC_CRM_ORIGIN ? [process.env.NEXT_PUBLIC_CRM_ORIGIN] : []),
];

type CrmMessage =
  | { source: "bja-crm"; type: "content"; content: unknown }
  | { source: "bja-crm"; type: "focus"; path: string }
  | { source: "bja-crm"; type: "focusSection"; key: string }
  | { source: "bja-crm"; type: "hello" };

function postToCrm(message: Record<string, unknown>) {
  if (typeof window === "undefined" || window.parent === window) return;
  for (const origin of CRM_ORIGINS) {
    try {
      window.parent.postMessage({ source: "bja-preview", ...message }, origin);
    } catch {}
  }
}

function findTarget(selector: (v: string) => string, path: string): Element | null {
  let p = path;
  while (p) {
    const el = document.querySelector(selector(p));
    if (el) return el;
    const cut = p.lastIndexOf(".");
    if (cut < 0) break;
    p = p.slice(0, cut);
  }
  return null;
}

function flash(el: Element, scroll = true) {
  if (scroll) el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("bja-cms-flash");
  window.setTimeout(() => el.classList.remove("bja-cms-flash"), 1400);
}

export function HomePreview({ live, defaults }: { live: HomepageContent; defaults: HomepageContent }) {
  const [content, setContent] = useState<HomepageContent>(live);

  useEffect(() => {
    let hovered: Element | null = null;

    const onMessage = (e: MessageEvent) => {
      if (!CRM_ORIGINS.includes(e.origin)) return;
      const data = e.data as CrmMessage;
      if (!data || data.source !== "bja-crm") return;
      if (data.type === "hello") postToCrm({ type: "ready", live, defaults });
      if (data.type === "content") setContent(mergeHomepage(defaults, data.content));
      if (data.type === "focus" && typeof data.path === "string") {
        const el = findTarget((v) => `[data-cms="${CSS.escape(v)}"]`, data.path);
        if (el) flash(el);
      }
      if (data.type === "focusSection" && typeof data.key === "string") {
        const el = document.querySelector(`[data-cms-section="${CSS.escape(data.key)}"]`);
        if (el) flash(el);
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      if (target.closest("a")) {
        e.preventDefault();
        e.stopPropagation();
      }
      const el = target.closest("[data-cms]");
      if (el) {
        postToCrm({ type: "select", path: el.getAttribute("data-cms") });
        flash(el, false);
      }
    };

    const onSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest("[data-cms]") : null;
      if (target === hovered) return;
      hovered?.classList.remove("bja-cms-hover");
      hovered = target;
      hovered?.classList.add("bja-cms-hover");
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("click", onClick, true);
    window.addEventListener("submit", onSubmit, true);
    window.addEventListener("mouseover", onOver, true);
    postToCrm({ type: "ready", live, defaults });

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("mouseover", onOver, true);
    };
  }, [live, defaults]);

  return (
    <>
      <style>{`
        .bja-cms-hover{outline:2px dashed #CC1F2A!important;outline-offset:3px;cursor:pointer}
        .bja-cms-flash{outline:3px solid #F5C518!important;outline-offset:3px}
      `}</style>
      <HomeSections content={content} edit />
    </>
  );
}
