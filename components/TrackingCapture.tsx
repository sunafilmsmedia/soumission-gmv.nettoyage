"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/tracking";

/**
 * Capture les UTM / fbclid dès le tout premier chargement, quelle que soit
 * la page (la pub pointe vers "/", pas "/soumission") — sinon le fbclid de
 * l'URL est perdu dès qu'on clique vers /soumission, qui ne porte pas le
 * query string. Monté une fois dans le layout racine.
 */
export function TrackingCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}
