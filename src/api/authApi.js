/**
 * Auth API calls → Spring Boot /api/auth
 */
import { springApi } from "./apiClient";

export const authApi = {
  /**
   * Login with email/password.
   * Returns { token, id, name, email, phone, viridiCredit }
   */
  login: (email, password) =>
    springApi.post("/api/auth/login", { email, password }),

  /**
   * Register a new user.
   * Returns { token, id, name, email, phone, viridiCredit }
   */
  register: (name, email, password, phone) =>
    springApi.post("/api/auth/register", { name, email, password, phone }),
};
