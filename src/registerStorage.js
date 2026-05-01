// ==========================================================================
// localStorage utility for register flow
// ==========================================================================

const STORAGE_KEY = "tapme_register_draft";

export function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

export function saveDraft(partial) {
  try {
    const current = loadDraft();
    const next = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    // noop
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // noop
  }
}
