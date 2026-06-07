"use client";

import Image from "next/image";
import { useState } from "react";
import { Package } from "lucide-react";

const categoryGradients: Record<string, string> = {
  "Tips Pengiriman": "from-blue-50 to-blue-100",
  "Info Cargo Laut": "from-cyan-50 to-cyan-100",
  "Update Layanan": "from-green-50 to-green-100",
  "Panduan Packing": "from-purple-50 to-purple-100",
  "Berita & Promo": "from-yellow-50 to-yellow-100",
};

interface Props {
  src?: string;
  alt: string;
  category: string;
  className?: string;
  priority?: boolean;
}

export default function BlogCoverImage({ src, alt, category, className = "", priority }: Props) {
  const [failed, setFailed] = useState(false);
  const gradient = categoryGradients[category] ?? "from-gray-50 to-gray-100";

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}>
        <Package size={32} className="text-gray-300" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
