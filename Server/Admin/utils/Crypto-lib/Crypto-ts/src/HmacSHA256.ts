/**
 * HmacSHA256 Function Documentation
 * ----------------------------------
 * The `HmacSHA256` function computes a Hash-based Message Authentication Code (HMAC) using the SHA-256 hash function.
 * This cryptographic function is widely used for message authentication and integrity verification. HMAC with SHA-256 is
 * considered secure for current standards and is commonly used for cryptographic purposes where robustness is essential.
 *
 * Prerequisites:
 * - `Hmac` class from "./Hmac"
 * - `SHA256` class from "./SHA256"
 * - `Word32Array` type from "./lib/Word32Array"
 *
 * Parameters:
 * @param {Word32Array|string} message - The input message for which the HMAC is to be computed. This can either be
 *                                       a `Word32Array` for direct binary input, or a string for textual input.
 * @param {Word32Array|string} key - The secret cryptographic key used for the HMAC process. Similar to the message,
 *                                   it can be a `Word32Array` or a string.
 *
 * Returns:
 * @returns {Word32Array} - A `Word32Array` representing the HMAC produced using the SHA-256 hash function.
 *
 * Usage Example:
 * ```javascript
 * // Using a string message and key
 * const message = "The quick brown fox jumps over the lazy dog";
 * const key = "secret_key";
 * const hmacOutput = HmacSHA256(message, key);
 * // hmacOutput now contains the HMAC as a Word32Array
 * ```
 *
 * Description:
 * The `HmacSHA256` function leverages the security of SHA-256 for HMAC computation. SHA-256 is a member of the SHA-2
 * family of cryptographic hash functions designed by the National Security Agency (NSA) and is a cornerstone of modern
 * cryptographic protocols.
 *
 * Security Considerations:
 * - SHA-256 is currently considered cryptographically secure, and no practical attack against it is known as of the last update.
 * - The strength of the HMAC is contingent on the security of the hash function and the secrecy and strength of the key.
 *   It is crucial to use a key with high entropy and to keep it confidential.
 * - The length of the HMAC output is the same as the underlying hash function (256 bits for SHA-256).
 *
 * The `HmacSHA256` function is suitable for security-sensitive applications requiring robust message authentication
 * and integrity verification.
 */


import {Hmac} from "./Hmac";
import {SHA256} from "./SHA256";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA256(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA256(), key).finalize(message);
}
