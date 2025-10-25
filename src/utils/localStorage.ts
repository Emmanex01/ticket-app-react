export function getItem<T = any>(key: string): T[] {
  try {
    const item = window.localStorage.getItem(key);
    console.log(item)
    if (!item) return [];
    
    const parsed = JSON.parse(item);
      console.log(parsed)
    // ✅ Ensure it’s actually an array
    // return Array.isArray(parsed) ? parsed as T[] : [];
    if (Array.isArray(parsed)) return parsed as T[];
    if (typeof parsed === "object") return parsed as T[];
    return [];
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
