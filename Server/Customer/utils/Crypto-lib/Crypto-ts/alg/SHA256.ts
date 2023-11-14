import { Hasher } from '../lib/Hasher';
import { WordArray } from '../lib/WordArray';

// Initialization and round constants tables
const H: Array<number> = [];
const K: Array<number> = [];

// Reusable object
const W: Array<number> = [];

/**
 * SHA-256 hash algorithm implementation.
 * 
 * Inherits all the methods and properties of the Hasher class.
 * 
 * @extends {Hasher}
 */
export class SHA256 extends Hasher {
    public _hash!: WordArray;

    /**
     * Resets the SHA256 instance to its initial state, ready for a new hashing operation.
     * 
     * Overrides the reset method of the Hasher base class.
     */
    public reset() {
        // reset core values
        super.reset();

        this._hash = new WordArray(H.slice(0));
    }

    /**
     * Processes a block of the message to update the hash's internal state.
     * 
     * @param {Array<number>} M - The message represented as an array of 32-bit words.
     * @param {number} offset - The position in the message where the current block starts.
     */
    public _doProcessBlock(M: Array<number>, offset: number) {
        // Shortcut
        const Hl = this._hash.words;

        // Working variables
        let a = Hl[0];
        let b = Hl[1];
        let c = Hl[2];
        let d = Hl[3];
        let e = Hl[4];
        let f = Hl[5];
        let g = Hl[6];
        let h = Hl[7];

        // Computation
        for(let i = 0; i < 64; i++) {
            if(i < 16) {
                W[i] = M[offset + i] | 0;
            } else {
                const gamma0x = W[i - 15];
                const gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
                              ((gamma0x << 14) | (gamma0x >>> 18)) ^
                               (gamma0x >>> 3);

                const gamma1x = W[i - 2];
                const gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                              ((gamma1x << 13) | (gamma1x >>> 19)) ^
                               (gamma1x >>> 10);

                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }

            const ch  = (e & f) ^ (~e & g);
            const maj = (a & b) ^ (a & c) ^ (b & c);

            const sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
            const sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

            const t1 = h + sigma1 + ch + K[i] + W[i];
            const t2 = sigma0 + maj;

            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }

        // Intermediate hash value
        Hl[0] = (Hl[0] + a) | 0;
        Hl[1] = (Hl[1] + b) | 0;
        Hl[2] = (Hl[2] + c) | 0;
        Hl[3] = (Hl[3] + d) | 0;
        Hl[4] = (Hl[4] + e) | 0;
        Hl[5] = (Hl[5] + f) | 0;
        Hl[6] = (Hl[6] + g) | 0;
        Hl[7] = (Hl[7] + h) | 0;
    }

    /**
     * Finalizes the hash and returns the SHA-256 digest.
     * 
     * Adds the padding to the data, processes additional blocks if needed, and finalizes the hash.
     * 
     * @returns {WordArray} - The final hash value as a WordArray.
     */
    public _doFinalize(): WordArray {
        const nBitsTotal = this._nDataBytes * 8;
        const nBitsLeft = this._data.sigBytes * 8;

        // Add padding
        this._data.words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.sigBytes = this._data.words.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
    }
}