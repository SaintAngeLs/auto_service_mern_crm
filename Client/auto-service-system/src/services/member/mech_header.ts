/**
 * @file mech_header.ts
 * 
 * @description Provides an authentication header based on the mechanics's token.
 * 
 */

/**
 * Generates an authentication header containing the token of the authenticated mechanic.
 * @returns A header object with the token or an empty object.
 */
export default function mechHeader(): { "x-access-token"?: string } {
  const manager: { token?: string } | null = JSON.parse(localStorage.getItem("manager") || 'null');

  if (manager && manager.token) {
    // for Node.js Express back-end
    console.log('Mechanick tocken:', manager.token);
    return { "x-access-token": manager.token };
  } else {
    return {};
  }
}

