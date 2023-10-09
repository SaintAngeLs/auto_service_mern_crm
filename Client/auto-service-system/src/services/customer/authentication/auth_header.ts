/**
 * @file auth_header.ts
 * 
 * @description Provides an authentication header based on the customer's token.
 * 
 */

/**
 * Generates an authentication header containing the token of the authenticated customer.
 * @returns A header object with the token or an empty object.
 */
export default function authHeader(): { "x-access-token"?: string } {
  const customer: { token?: string } | null = JSON.parse(localStorage.getItem("customer") || 'null');

  if (customer && customer.token) {
    // for Node.js Express back-end
    return { "x-access-token": customer.token };
  } else {
    return {};
  }
}
