/**
 * Product API calls → Spring Boot /api/products
 * Search & recommendations → FastAPI /api/search, /api/recommendations
 */
import { springApi, fastapiApi } from "./apiClient";

export const productApi = {
  // ---- Spring Boot (CRUD) ----

  getAll: (page = 0, size = 20, sortBy = "id", direction = "asc") =>
    springApi.get(`/api/products?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`),

  getById: (id) =>
    springApi.get(`/api/products/${id}`),

  getByCategory: (category, page = 0, size = 20) =>
    springApi.get(`/api/products/category/${encodeURIComponent(category)}?page=${page}&size=${size}`),

  getByGroup: (group, page = 0, size = 20) =>
    springApi.get(`/api/products/group/${encodeURIComponent(group)}?page=${page}&size=${size}`),

  // ---- FastAPI (Search & AI) ----

  search: ({ q, page = 0, size = 20, category, minPrice, maxPrice, sortBy = "rating", direction = "desc" }) => {
    const params = new URLSearchParams({ q, page, size, sort_by: sortBy, direction });
    if (category) params.append("category", category);
    if (minPrice != null) params.append("min_price", minPrice);
    if (maxPrice != null) params.append("max_price", maxPrice);
    return fastapiApi.get(`/api/search?${params.toString()}`);
  },

  getSuggestions: (q, limit = 8) =>
    fastapiApi.get(`/api/search/suggestions?q=${encodeURIComponent(q)}&limit=${limit}`),

  getRecommendationsByProduct: (productId, limit = 10) =>
    fastapiApi.get(`/api/recommendations/product/${productId}?limit=${limit}`),

  getRecommendationsByHistory: (productIds, limit = 20) =>
    fastapiApi.post(`/api/recommendations/history?limit=${limit}`, { product_ids: productIds }),

  getTrending: (limit = 20) =>
    fastapiApi.get(`/api/recommendations/trending?limit=${limit}`),
};
