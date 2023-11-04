/**
 * HmacSHA1 Function Documentation
 * ------------------------------
 * The `HmacSHA1` function computes a Hash-based Message Authentication Code (HMAC) using the SHA-1
 * hash function. It is used for message verification to ensure data integrity and authenticity.
 *
 * Prerequisites:
 * - Hmac from "./Hmac"
 * - SHA1 from "./SHA1"
 * - Word32Array type from "./lib/Word32Array"
 *
 * @param {Word32Array|string} message - The input message for which the HMAC is to be computed.
 *                                       It accepts both a string or a Word32Array instance.
 * @param {Word32Array|string} key - The secret key for HMAC computation. Similar to the message,
 *                                   it can be a string or a Word32Array.
 *
 * @returns {Word32Array} - The resulting HMAC from the computation as a Word32Array.
 *
 * @example
 * ```
 * // To compute HMAC-SHA1 for a given message and a key
 * const message = "The quick brown fox jumps over the lazy dog";
 * const key = "key";
 * const hmacValue = HmacSHA1(message, key);
 * ```
 *
 * @description
 * The `HmacSHA1` function uses the SHA-1 hashing algorithm in conjunction with a secret key to create
 * an HMAC. This HMAC can be used to verify the message's integrity and authenticity when it is
 * transmitted over insecure channels. The message and key can be provided as either strings or Word32Array objects.
 * It's a simple, yet effective way to check data integrity and authenticity.
 *
 * Note on Security:
 * - Although SHA-1 is more secure than MD5, it has been shown to have vulnerabilities and it's 
 *   recommended to use more secure hashing algorithms like SHA-256 or SHA-3 for better security.
 * - Always keep the secret key confidential to maintain the security of the HMAC.
 *
 * The `HmacSHA1` function is suitable for applications where SHA-1 is considered an acceptable level
 * of security for HMAC generation.
 */

import {Hmac} from "./Hmac";
import {SHA1} from "./SHA1";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA1(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA1(), key).finalize(message);
}
