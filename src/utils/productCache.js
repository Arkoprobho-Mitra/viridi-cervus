const API_BASE = process.env.REACT_APP_SPRING_BASE_URL || 'http://localhost:8081';
const cache = new Map();

export async function fetchProductById(id) {
    if (cache.has(id)) return cache.get(id);
    try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) return null;
        const json = await res.json();
        const product = json?.data ?? json;
        if (product && product.id != null) {
            cache.set(id, product);
            return product;
        }
    } catch {
        // network error — return null so callers can handle gracefully
    }
    return null;
}

export async function prefetchProductsByIds(ids) {
    const unique = [...new Set(ids)].filter(id => id != null && !cache.has(id));
    if (unique.length === 0) return;
    await Promise.all(unique.map(fetchProductById));
}

export function getCachedProduct(id) {
    return cache.get(id) ?? null;
}
