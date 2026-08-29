import { SupportedLanguage } from '../types';

export interface LocationHierarchyParams {
  village?: string;
  mandal?: string;
  districtName: string;
  stateName: string;
  language?: SupportedLanguage;
}

/**
 * Cleanly formats a location into a proper hierarchy (Village, Mandal/District, State)
 * without duplicating identical names (e.g., prevents "CHAKIPALLI, CHAKIPALLI").
 */
export function formatLocationHierarchy({
  village,
  mandal,
  districtName,
  stateName,
  language = 'Telugu',
}: LocationHierarchyParams): string {
  const parts: string[] = [];
  const seen = new Set<string>();

  const addPart = (val: string | undefined | null) => {
    if (!val) return;
    const clean = val.trim();
    if (!clean) return;
    
    // Normalize to prevent case-insensitive duplicates (e.g. "Chakipalli" vs "CHAKIPALLI")
    const lower = clean.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      parts.push(clean);
    }
  };

  // 1. Village / Habitation
  if (village && village.trim()) {
    addPart(village);
  }

  // 2. Mandal
  if (mandal && mandal.trim()) {
    addPart(mandal);
  }

  // 3. District
  if (districtName && districtName.trim()) {
    addPart(districtName);
  }

  // 4. State
  if (stateName && stateName.trim()) {
    addPart(stateName);
  }

  if (parts.length === 0) {
    return language === 'Telugu' ? 'తెలంగాణ వ్యవసాయ క్షేత్రం' : 'Farm Location';
  }

  return parts.join(', ');
}

/**
 * Formats a short location capsule label (e.g. "Chakipalli, Mancherial" or "Tenali, Guntur")
 * guarantees no duplicate words.
 */
export function formatShortLocation({
  village,
  mandal,
  districtName,
  stateName,
}: LocationHierarchyParams): string {
  const parts: string[] = [];
  const seen = new Set<string>();

  const addPart = (val: string | undefined | null) => {
    if (!val) return;
    const clean = val.trim();
    if (!clean) return;
    const lower = clean.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      parts.push(clean);
    }
  };

  if (village && village.trim()) {
    addPart(village);
  }
  if (mandal && mandal.trim()) {
    addPart(mandal);
  }
  if (parts.length < 2 && districtName && districtName.trim()) {
    addPart(districtName);
  }
  if (parts.length < 2 && stateName && stateName.trim()) {
    addPart(stateName);
  }

  return parts.join(', ');
}
