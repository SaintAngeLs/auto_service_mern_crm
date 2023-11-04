/**
 * HmacSHA384 Function Documentation
 * ----------------------------------
 * The `HmacSHA384` function is used to compute a Hash-based Message Authentication Code (HMAC) utilizing the SHA-384 hash function.
 * SHA-384 is a variant of the SHA-2 algorithm with a truncated output. This function is part of cryptographic operations that ensure
 * message integrity and authentication. HMAC with SHA-384 offers a higher level of security compared to SHA-256 and is often used in
 * situations requiring additional security measures.
 *
 * Prerequisites:
 * - `Hmac` class from "./Hmac"
 * - `SHA384` class from "./SHA384"
 * - `Word32Array` type from "./lib/Word32Array"
 *
 * Parameters:
 * @param {Word32Array|string} message - The input message for which the HMAC is to be computed. This can be provided
 *                                       as either a `Word32Array` for binary inputs or a string for text inputs.
 * @param {Word32Array|string} key - The secret cryptographic key for HMAC generation. The key can be a `Word32Array` or
 *                                   a string.
 *
 * Returns:
 * @returns {Word32Array} - The resulting HMAC value as a `Word32Array`. This is the computed HMAC using the SHA-384 hash function.
 *
 * Usage Example:
 * ```javascript
 * // Example of using a string message and key
 * const message = "Some message text";
 * const key = "very_secret_key";
 * const hmacResult = HmacSHA384(message, key);
 * // hmacResult is a Word32Array containing the HMAC computed value
 * ```
 *
 * Description:
 * The `HmacSHA384` function enables HMAC computation using the SHA-384 hash function. SHA-384 is designed to be a reliable
 * cryptographic hash function with no known practical vulnerabilities as of the last update. It is a standardized cryptographic
 * tool for data integrity and authentication checks.
 *
 * Security Considerations:
 * - While SHA-384 is currently secure, it is always advised to stay updated with the latest security advisories.
 * - The strength of the generated HMAC is dependent on the cryptographic strength of the hash function and the security of the key.
 *   It is essential to ensure the key is kept secret and is of sufficient length and complexity.
 * - The output length of SHA-384 is 384 bits, hence providing a substantial level of security against brute-force collision attacks.
 *
 * The `HmacSHA384` function is designed for applications where security is a priority and is commonly used in enterprise-level systems
 * and secure communications protocols.
 */

import {Hmac} from "./Hmac";
import {SHA384} from "./SHA384";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA384(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA384(), key).finalize(message);
}
