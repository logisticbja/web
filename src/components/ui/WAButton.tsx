"use client";
import { MessageCircle } from "lucide-react";

interface WAButtonProps {
  href: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "white";
  className?: string;
}

export function WAButton({
  href,
  label = "Chat WhatsApp",
  size = "md",
  variant = "primary",
  className = "",
}: WAButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const variantClasses = {
    primary: "bg-[#25D366] hover:bg-[#20bc59] text-white",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white",
    white: "bg-white text-[#CC1F2A] hover:bg-gray-100",
  };

  const iconSizes = { sm: 16, md: 18, lg: 22 };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <MessageCircle size={iconSizes[size]} />
      {label}
    </a>
  );
}
