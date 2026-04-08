/**
 * Cart API calls → Spring Boot /api/cart
 */
import { springApi } from "./apiClient";

export const cartApi = {
  getCart: () =>
    springApi.get("/api/cart"),

  addItem: (productId, quantity, size) =>
    springApi.post("/api/cart/items", { productId, quantity, size }),

  updateItem: (itemId, quantity) =>
    springApi.patch(`/api/cart/items/${itemId}`, { quantity }),

  removeItem: (itemId) =>
    springApi.delete(`/api/cart/items/${itemId}`),

  /**
   * Merge guest cart items after login.
   * guestItems: [{ productId, quantity, size }]
   */
  mergeGuestCart: (guestItems) =>
    springApi.post("/api/cart/merge", guestItems),

  clearCart: () =>
    springApi.delete("/api/cart"),
};
