/**
 * GMAC Function Documentation
 * ---------------------------
 * The `GMAC` function is utilized to compute a Message Authentication Code (MAC) using the
 * Galois/Counter Mode (GCM), which is a mode of operation for symmetric key cryptographic block ciphers.
 * This function is especially designed for ensuring the integrity and authenticity of a message.
 *
 * Imports required:
 * - Utf8 from "./lib/encoder/Utf8"
 * - Word32Array from "./lib/Word32Array"
 * - AES from "./AES"
 * - GCM from "./mode/GCM"
 * - BlockCipher from "./lib/algorithm/cipher/BlockCipher"
 *
 * @param {Word32Array|string} message - The message for which you want to generate a MAC.
 *                                       This can either be a Word32Array or a string.
 * @param {Word32Array|string} key - The key to use for generating the MAC, which can be
 *                                   provided as a Word32Array or a string.
 * @param {Word32Array} [iv] - (Optional) The initialization vector to use for GCM, if not
 *                              provided a default value of 0s will be used.
 * @param {number} [tagLength] - (Optional) The desired length of the MAC tag, defaulting to 16.
 * @param {Partial<GMACProps>} [props] - (Optional) Additional properties to use for the GMAC
 *                                       calculation, with `Cipher` being a customizable property.
 *
 * @returns {Word32Array} - The computed MAC for the message.
 *
 * @description
 * `GMAC` computes a MAC that can be used to verify both the integrity and the authenticity
 * of a message. It takes a message and a key (both of which can be strings or Word32Array objects),
 * and an optional initialization vector and tag length. If the message is a string, it is first
 * converted into a Word32Array using UTF-8 encoding. By default, AES is used as the cipher
 * unless specified otherwise in the `props`.
 *
 * Usage example:
 * ```
 * const mac = GMAC('Message', 'SecretKey');
 * ```
 * This will compute the MAC for the message 'Message' with the key 'SecretKey'.
 *
 * Security considerations:
 * - Ensure that the IV is unique for each operation to maintain GCM's security guarantees.
 * - Keep the key secret and secure to prevent any unauthorized access or attacks.
 * - The tag length should balance between performance and security needs; a longer tag provides
 *   stronger security guarantees.
 *
 * This function is typically used in scenarios where data integrity and authentication are of paramount
 * importance, such as in secure communication channels.
 */

import {Utf8} from "./lib/encoder/Utf8";
import {Word32Array} from "./lib/Word32Array";
import {AES} from "./AES";
import {GCM} from "./mode/GCM";
import {BlockCipher} from "./lib/algorithm/cipher/BlockCipher";

export type GMACProps = {
  Cipher: typeof BlockCipher;
};

export function GMAC(
  message: Word32Array|string,
  key: Word32Array|string,
  iv?: Word32Array,
  tagLength?: number,
  props?: Partial<GMACProps>,
){
  const aad = typeof message === "string" ? Utf8.parse(message) : message;
  const initializingVector = iv ? iv : new Word32Array([0, 0, 0, 0]);
  const Cipher = (props && props.Cipher) ? props.Cipher : AES;
  const wKey = typeof key === "string" ? Utf8.parse(key) : key;
  const t = tagLength || 16;
  
  return GCM.mac(Cipher, wKey, initializingVector, aad, undefined, t);
}