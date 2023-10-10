/**
 * @file auth_header.ts
 * 
 * @description Provides an authentication header based on the admin's token.
 */

/**
 * Generates an authentication header containing the token of the authenticated customer.
 * @returns A header object with the token or an empty object.
 */

export default function authHeader(): { "x-access-token"?: string } | null {
  const customer: { token?: string } | null = JSON.parse(localStorage.getItem("admin") || 'null');

  if (customer && customer.token) {
    return { "x-access-token": customer.token };
  } else {
    console.warn('No token found in local storage.');
    return null;
  }
}

