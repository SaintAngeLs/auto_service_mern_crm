/**
 * @file auth_header.ts
 * 
 * @description Provides an authentication header based on the admin's token.
 */

/**
 * Generates an authentication header containing the token of the authenticated admin.
 * @returns A header object with the token or an empty object.
 */

export default function authHeader(): { "Authorization"?: string } {
  const admin_user: { token?: string } | null = JSON.parse(localStorage.getItem("admin") || 'null');

  if (admin_user && admin_user.token) {
    return { "Authorization": "Bearer " + admin_user.token };
  } else {
    return {};
  }
}