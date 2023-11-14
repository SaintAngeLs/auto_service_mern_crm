/**
 * HmacSHA224 Function Documentation
 * ---------------------------------
 * The `HmacSHA224` function is used to compute a Hash-based Message Authentication Code (HMAC) using
 * the SHA-224 hash function. This function is instrumental in verifying message integrity and authenticity
 * by providing a digest that can be used to ensure the message has not been tampered with in transit.
 *
 * Prerequisites:
 * - `Hmac` class from "./Hmac"
 * - `SHA224` class from "./SHA224"
 * - `Word32Array` type from "./lib/Word32Array"
 *
 * @param {Word32Array|string} message - The message for which the HMAC is to be computed. This parameter
 *                                       can be of type `Word32Array` for byte-level control or a string for
 *                                       convenience.
 * @param {Word32Array|string} key - The secret key used for generating the HMAC. As with the message,
 *                                   the key can be provided as a `Word32Array` or a string.
 *
 * @returns {Word32Array} - The resulting HMAC from the SHA-224 hashing function, returned as a `Word32Array`.
 *
 * @example
 * ```
 * // Example of computing HMAC-SHA224 for a specific message and key
 * const message = "Example message for HMAC";
 * const key = "secret-key";
 * const hmacDigest = HmacSHA224(message, key);
 * // hmacDigest is now a Word32Array representing the HMAC
 * ```
 *
 * @description
 * The `HmacSHA224` function combines the security of the SHA-224 hash algorithm with a secret key to
 * generate a message authentication code. This code acts as a cryptographic signature for data, which
 * ensures that the message sent is authentic and has not been altered.
 *
 * Note on Security:
 * - SHA-224 is a truncated version of SHA-256 and offers a similar level of security, making it resistant
 *   to known hash attack vectors.
 * - For highly secure environments, consider using HMAC with SHA-256 or SHA-3 to ensure a higher security
 *   standard.
 * - The secrecy of the HMAC key is crucial for maintaining the security of the HMAC. Exposure of the key
 *   can compromise the security of the authentication process.
 *
 * The `HmacSHA224` function is a practical choice for ensuring data integrity and authentication in
 * systems where SHA-224 is an accepted standard for hash functions.
 */

import {Hmac} from "./Hmac";
import {SHA224} from "./SHA224";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA224(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA224(), key).finalize(message);
}
