"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/store/auth";

export function AuthHydrator() {
  const hydrate = useAuth((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return null;
}
