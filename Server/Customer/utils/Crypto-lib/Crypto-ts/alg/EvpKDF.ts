import { WordArray } from '../lib/WordArray';
import { Hasher } from '../lib/Hasher';
import { MD5 } from '../alg/MD5';

/**
 * An optional configuration object for EvpKDF.
 * @interface
 * 
 * @property {number} [keySize] - The size in words of the key to generate. Default is 128 / 32.
 * @property {typeof Hasher} [hasher] - The hashing algorithm to use. Default is MD5.
 * @property {number} [iterations] - The number of iterations to perform. Default is 1.
 */
export interface OptionalEvpKDFConfig {
    keySize?: number;
    hasher?: typeof Hasher;
    iterations?: number;
}

/**
 * The mandatory configuration object for EvpKDF.
 * @interface
 * 
 * @property {number} keySize - The size in words of the key to generate.
 * @property {typeof Hasher} hasher - The hashing algorithm to use.
 * @property {number} iterations - The number of iterations to perform.
 */
export interface EvpKDFConfig extends OptionalEvpKDFConfig {
    keySize: number;
    hasher: typeof Hasher;
    iterations: number;
}

/**
 * Implementation of the EVP Key Derivation Function as defined by OpenSSL.
 * 
 * @class
 * 
 * @property {EvpKDFConfig} cfg - The configuration options for key derivation.
 */
export class EvpKDF {
    public cfg: EvpKDFConfig;

    /**
     * Initializes a newly created key derivation function.
     *
     * @param cfg (Optional) The configuration options to use for the derivation.
     *
     * @example
     *
     *     let kdf = EvpKDF.create();
     *     let kdf = EvpKDF.create({ keySize: 8 });
     *     let kdf = EvpKDF.create({ keySize: 8, iterations: 1000 });
     */
    constructor(cfg?: OptionalEvpKDFConfig) {
        this.cfg = Object.assign({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
        }, cfg);
    }

    /**
     * Derives a key from a password.
     *
     * @param password The password.
     * @param salt A salt.
     *
     * @return The derived key.
     *
     * @example
     *
     *     let key = kdf.compute(password, salt);
     */
    compute(password: WordArray | string, salt: WordArray | string): WordArray {
        // Init hasher
        const hasher = new (<any> this.cfg.hasher)();

        // Initial values
        const derivedKey = new WordArray();

        // Generate key
        let block;
        while(derivedKey.words.length < this.cfg.keySize) {
            if(block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();

            // Iterations
            for(let i = 1; i < this.cfg.iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }

            derivedKey.concat(block);
        }
        derivedKey.sigBytes = this.cfg.keySize * 4;

        return derivedKey;
    }
}