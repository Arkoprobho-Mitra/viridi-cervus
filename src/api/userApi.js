/**
 * User profile, address, card, and gift card API calls → Spring Boot /api/user
 */
import { springApi } from "./apiClient";

export const userApi = {
  // ---- Profile ----

  getProfile: () =>
    springApi.get("/api/user/profile"),

  updateProfile: (name, phone) =>
    springApi.patch("/api/user/profile", { name, phone }),

  // ---- Addresses ----

  getAddresses: () =>
    springApi.get("/api/user/addresses"),

  addAddress: (address) =>
    springApi.post("/api/user/addresses", address),

  updateAddress: (addressId, address) =>
    springApi.put(`/api/user/addresses/${addressId}`, address),

  deleteAddress: (addressId) =>
    springApi.delete(`/api/user/addresses/${addressId}`),

  // ---- Cards ----

  getCards: () =>
    springApi.get("/api/user/cards"),

  addCard: (card) =>
    springApi.post("/api/user/cards", card),

  deleteCard: (cardId) =>
    springApi.delete(`/api/user/cards/${cardId}`),

  // ---- Gift Cards ----

  getGiftCards: () =>
    springApi.get("/api/user/gift-cards"),

  redeemGiftCard: (code) =>
    springApi.post("/api/user/gift-cards/redeem", { code }),
};
