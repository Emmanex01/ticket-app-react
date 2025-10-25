export function setItem(key: string, value: unknown) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Cannot get item from localStorage: ",error);
    }
}

export function getItem<T = any>(key: string): T[] {
    try {
        const Item = window.localStorage.getItem(key);

        return Item ? JSON.parse(Item) : [];
    } catch (error) {
        console.log(error)
        return []; // ✅ always return []
    }
}