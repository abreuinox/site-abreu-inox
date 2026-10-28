"use client";

import { useEffect } from "react";
import { type EventName, type EventParams, track } from "@/lib/analytics";

/** Registra a visualização de uma página de serviço ou projeto. */
export function TrackView({ event, params }: { event: EventName; params: EventParams }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, JSON.parse(key) as EventParams);
  }, [event, key]);
  return null;
}

