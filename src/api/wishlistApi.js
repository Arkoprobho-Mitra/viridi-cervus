/**
 * Wishlist API calls → Spring Boot /api/wishlist
 */
import { springApi } from "./apiClient";

export const wishlistApi = {
  getWishlist: () =>
    springApi.get("/api/wishlist"),

  addItem: (productId) =>
    springApi.post(`/api/wishlist/items/${productId}`),

  removeItem: (productId) =>
    springApi.delete(`/api/wishlist/items/${productId}`),

  /**
   * Merge guest wishlist after login.
   * productIds: number[]
   */
  mergeGuestWishlist: (productIds) =>
    springApi.post("/api/wishlist/merge", productIds),
};
