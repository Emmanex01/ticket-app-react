export function getItem<T = any>(key: string): T[] {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return [];
    
    const parsed = JSON.parse(item);

    // ✅ Ensure it’s actually an array
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return [];
  }
}

export function setItem<T = any>(key: string, value: T): void {
  try {
    // const lastStoredItem = getItem<T>(key);

    // ✅ Always treat it as an array
    // const newItem = [...lastStoredItem, value];
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Cannot set item in localStorage:", error);
  }
}
