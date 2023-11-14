import {Utf8} from "./lib/encoder/Utf8";
import {Word32Array} from "./lib/Word32Array";
import {AES} from "./AES";
import {CCM} from "./mode/CCM";
import {BlockCipher} from "./lib/algorithm/cipher/BlockCipher";

/**
 * The `CBCMACProps` type defines an object with a `Cipher` property that must be a subclass of `BlockCipher`.
 */
export type CBCMACProps = {
  Cipher: typeof BlockCipher;
};

/**
 * Computes the Cipher Block Chaining Message Authentication Code (CBC-MAC) for the given plaintext and associated data.
 *
 * @param {Word32Array|string} plainText - The plaintext data to authenticate. Can be a string or a `Word32Array`.
 * @param {Word32Array|string} associatedData - Additional data that is authenticated but not encrypted.
 * Can be a string or a `Word32Array`.
 * @param {Word32Array|string} key - The key to use for authentication. Can be a string or a `Word32Array`.
 * @param {Word32Array|null} iv - The initialization vector (IV). Should be a `Word32Array` or `null` for default value.
 * @param {number} [tagLength=16] - The desired length of the authentication tag.
 * @param {Partial<CBCMACProps>} [props] - Optional additional properties. If a `Cipher` is provided,
 * it will be used instead of the default AES cipher.
 * @returns {Word32Array} - The authentication tag as a `Word32Array`.
 */
export function CBCMAC(
  plainText: Word32Array|string,
  associatedData: Word32Array|string,
  key: Word32Array|string,
  iv: Word32Array|null,
  tagLength?: number,
  props?: Partial<CBCMACProps>,
){
  // If a custom cipher is provided via props, use it; otherwise, default to AES.
  const Cipher = (props && props.Cipher) ? props.Cipher : AES;
  // Parse the key into a Word32Array if it's a string.
  const K = typeof key === "string" ? Utf8.parse(key) : key;
  // Use a default IV if not provided.
  const N = iv ? iv : new Word32Array([0, 0]);
  // Parse associated data into a Word32Array if it's a string.
  const A = typeof associatedData === "string" ? Utf8.parse(associatedData) : associatedData;
  // Parse the plaintext into a Word32Array if it's a string.
  const P = typeof plainText === "string" ? Utf8.parse(plainText) : plainText;
  // The tag length defaults to 16 bytes.
  const t = tagLength || 16;

  // Perform the CCM MAC calculation and return the result.
  return CCM.mac(Cipher, K, N, A, P, t);
}