/**
 * HmacMD5 Function Documentation
 * -----------------------------
 * The `HmacMD5` function generates a Hash-based Message Authentication Code (HMAC) using the MD5
 * hash function. This function is commonly used to verify the data integrity and authenticity of a message.
 *
 * Imports required:
 * - Hmac from "./Hmac"
 * - MD5 from "./MD5"
 * - Word32Array type from "./lib/Word32Array"
 *
 * @param {Word32Array|string} message - The message for which the HMAC is to be computed. 
 *                                       This can be a Word32Array or a string.
 * @param {Word32Array|string} key - The secret key used for HMAC generation. 
 *                                   This can also be a Word32Array or a string.
 *
 * @returns {Word32Array} - The HMAC value of the message as a Word32Array.
 *
 * @description
 * The `HmacMD5` function combines the message and the key using the MD5 hashing algorithm, 
 * then produces an HMAC that can be used to verify the integrity and authenticity of the message. 
 * The function is flexible in accepting both strings and Word32Array objects for the message and key.
 *
 * Usage example:
 * ```
 * const myHmac = HmacMD5('My message', 'mysecretkey');
 * ```
 * This will compute the HMAC for 'My message' using the secret key 'mysecretkey'.
 *
 * Security considerations:
 * - MD5 is known to have vulnerabilities and is not recommended for security-critical applications.
 *   Consider using stronger hash functions like SHA-256 for improved security.
 * - Keep the secret key confidential to ensure the HMAC remains secure.
 *
 * This function is typically used in scenarios where a quick and simple method of verification 
 * is needed rather than absolute cryptographic security, due to the weaknesses identified in MD5.
 */

import {Hmac} from "./Hmac";
import {MD5} from "./MD5";
import type {Word32Array} from "./lib/Word32Array";

export function HmacMD5(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new MD5(), key).finalize(message);
}
