/**
 * Order API calls → Spring Boot /api/orders
 */
import { springApi } from "./apiClient";

export const orderApi = {
  getOrders: () =>
    springApi.get("/api/orders"),

  getOrder: (orderId) =>
    springApi.get(`/api/orders/${orderId}`),

  /**
   * Place an order using the current cart.
   * @param {number} addressId - ID of the delivery address
   * @param {string} paymentMethod - e.g. "UPI", "COD", "Card"
   */
  placeOrder: (addressId, paymentMethod) =>
    springApi.post("/api/orders", { addressId, paymentMethod }),

  requestReturn: (orderId, itemId) =>
    springApi.post(`/api/orders/${orderId}/items/${itemId}/return`),
};
