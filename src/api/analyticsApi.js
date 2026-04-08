/**
 * Analytics event tracking → FastAPI /api/analytics
 */
import { fastapiApi } from "./apiClient";

export const analyticsApi = {
  /**
   * Track a user interaction event.
   * @param {"view"|"add_to_cart"|"purchase"|"search"} eventType
   * @param {object} payload - { productId?, searchQuery?, userId?, category? }
   */
  trackEvent: (eventType, payload = {}) =>
    fastapiApi.post("/api/analytics/event", {
      event_type: eventType,
      product_id: payload.productId || null,
      search_query: payload.searchQuery || null,
      user_id: payload.userId || null,
      category: payload.category || null,
    }),

  getCategoryBreakdown: () =>
    fastapiApi.get("/api/analytics/category-breakdown"),

  getTopBrands: (limit = 10) =>
    fastapiApi.get(`/api/analytics/top-brands?limit=${limit}`),

  getPriceDistribution: () =>
    fastapiApi.get("/api/analytics/price-distribution"),
};
