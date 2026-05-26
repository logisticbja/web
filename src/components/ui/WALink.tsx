"use client";
import { fireConversion, type ConversionKey } from "@/lib/gtag";

interface WALinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  conversion?: ConversionKey;
}

export function WALink({ conversion = "waGeneral", onClick, children, ...props }: WALinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    fireConversion(conversion);
    onClick?.(e);
  }

  return (
    <a {...props} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
