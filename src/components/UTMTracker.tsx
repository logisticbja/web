"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { saveUTM } from "@/lib/utm";

export function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    saveUTM(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  return null;
}
