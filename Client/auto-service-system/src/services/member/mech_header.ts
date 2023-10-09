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
  const mechanic: { token?: string } | null = JSON.parse(localStorage.getItem("mechanic") || 'null');

  if (mechanic && mechanic.token) {
    // for Node.js Express back-end
    console.log('Mechanick tocken:', mechanic.token);
    return { "x-access-token": mechanic.token };
  } else {
    return {};
  }
}

