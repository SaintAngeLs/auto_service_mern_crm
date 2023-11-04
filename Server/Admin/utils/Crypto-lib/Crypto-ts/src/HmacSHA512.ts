/**
 * HmacSHA512 Function
 * -------------------
 * The `HmacSHA512` function computes the HMAC (Hash-based Message Authentication Code) using the SHA512 hash function.
 * HMAC is a mechanism for message authentication using cryptographic hash functions.
 *
 * Imports:
 * - Hmac from "./Hmac"
 * - SHA512 from "./SHA512"
 * - Word32Array (type) from "./lib/Word32Array"
 *
 * Function Parameters:
 * @param {Word32Array|string} message - The message to be authenticated. This can be provided as a string or a Word32Array.
 * @param {Word32Array|string} key - The secret key for HMAC generation. This can also be a string or a Word32Array.
 *
 * Returns:
 * @returns {Word32Array} - The HMAC-SHA512 digest as a Word32Array.
 *
 * Example Usage:
 * ```javascript
 * const message = 'The quick brown fox jumps over the lazy dog';
 * const secretKey = 'mySecretKey';
 * const hmacDigest = HmacSHA512(message, secretKey);
 * // hmacDigest is now a Word32Array containing the HMAC-SHA512 digest
 * ```
 *
 * Explanation:
 * The `HmacSHA512` function uses the provided message and key to compute a HMAC digest. The message and key can
 * be input as either strings or Word32Arrays. The SHA512 hash function from the "SHA512" module is instantiated and 
 * passed along with the key to the Hmac constructor. The `finalize` method is then called with the message to produce
 * the HMAC digest.
 *
 * The SHA512 algorithm is part of the SHA-2 family of cryptographic hash functions and outputs a digest that is 512 bits (64 bytes) long.
 * It is commonly used in various security protocols and systems to ensure data integrity and authentication.
 *
 * Security Note:
 * The security of the HMAC process relies on the secrecy of the key. It should never be transmitted or stored in an insecure manner.
 * Always ensure best practices for key management and security are followed.
 */

import {Hmac} from "./Hmac";
import {SHA512} from "./SHA512";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA512(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA512(), key).finalize(message);
}
