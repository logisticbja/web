"use client";
import { fireConversion, fireWAEvent, type ConversionKey } from "@/lib/gtag";
import { appendUTMToWAHref } from "@/lib/utm";

interface WALinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  conversion?: ConversionKey;
  waLabel?: string;
}

export function WALink({ conversion = "waGeneral", waLabel, onClick, href, children, ...props }: WALinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    fireConversion(conversion);
    fireWAEvent(waLabel ?? conversion);
    onClick?.(e);
  }

  const finalHref = href ? appendUTMToWAHref(href) : href;

  return (
    <a {...props} href={finalHref} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
