"use client";
import { fireConversion, fireWAEvent, type ConversionKey } from "@/lib/gtag";

interface WALinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  conversion?: ConversionKey;
  waLabel?: string;
}

export function WALink({ conversion = "waGeneral", waLabel, onClick, children, ...props }: WALinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    fireConversion(conversion);
    fireWAEvent(waLabel ?? conversion);
    onClick?.(e);
  }

  return (
    <a {...props} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
