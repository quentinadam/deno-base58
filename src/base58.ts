import assert from '@quentinadam/assert';
import ensure from '@quentinadam/ensure';

function convert({ inputBase, outputBase, input }: {
  inputBase: number;
  outputBase: number;
  input: Iterable<number>;
}) {
  const output = new Array<number>();
  let zeroCounter = 0;
  let encodingFlag = false;
  for (const digit of input) {
    if (!encodingFlag) {
      if (digit === 0) {
        zeroCounter++;
      } else {
        encodingFlag = true;
      }
    }
    if (encodingFlag) {
      let index = 0;
      let carry = digit;
      while (carry > 0 || index < output.length) {
        carry += (output[index] ?? 0) * inputBase;
        const remainder = carry % outputBase;
        carry = (carry - remainder) / outputBase;
        output[index] = remainder;
        index++;
      }
    }
  }
  for (let i = 0; i < zeroCounter; i++) {
    output.push(0);
  }
  return output.reverse();
}

function getAlphabet(alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
  assert(alphabet.length === 58, 'Alphabet must be 58 characters long');
  assert(new Set(alphabet).size === 58, 'Alphabet must not contain duplicate characters');
  return alphabet;
}

/** Options for {@linkcode encode} and {@linkcode decode}. */
export interface Options {
  /**
   * The alphabet to use.
   * The alphabet must be a string of 58 unique characters.
   *
   * @default {'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'}
   */
  alphabet?: string;
}

/**
 * Encodes a Uint8Array buffer into a base58 string.
 *
 * @param buffer The buffer to encode.
 * @param options The options to use for encoding.
 * @returns The base58 encoded string.
 */
export function encode(buffer: Uint8Array, options?: Options): string {
  const alphabet = getAlphabet(options?.alphabet);
  const output = convert({ input: buffer, inputBase: 256, outputBase: 58 });
  return output.map((digit) => ensure(alphabet[digit])).join('');
}

/**
 * Decodes a base58 encoded string into a Uint8Array buffer.
 *
 * @param string The base58 encoded string.
 * @param options The options to use for decoding.
 * @returns The decoded buffer.
 */
export function decode(string: string, options?: Options): Uint8Array {
  const alphabet = getAlphabet(options?.alphabet);
  const map = new Map(Array.from(alphabet).map((character, index) => [character, index]));
  const input = Array.from(string).map((character) => ensure(map.get(character), `Invalid character ${character}`));
  return new Uint8Array(convert({ input, inputBase: 58, outputBase: 256 }));
}
