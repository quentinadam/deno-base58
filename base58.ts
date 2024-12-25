import assert from '@quentinadam/assert';
import require from '@quentinadam/require';

function convert({ inputBase, outputBase, input }: {
  inputBase: number;
  outputBase: number;
  input: Iterable<number>;
}) {
  const output = new Array<number>();
  let leadingZeros = 0;
  let stillZero = true;
  for (const digit of input) {
    if (stillZero) {
      if (digit === 0) {
        leadingZeros++;
      } else {
        stillZero = false;
      }
    }
    if (!stillZero) {
      let index = 0;
      let carry = digit;
      while (carry > 0 || index < output.length) {
        carry += output[index] !== undefined ? output[index] * inputBase : 0;
        const remainder = carry % outputBase;
        carry = (carry - remainder) / outputBase;
        output[index] = remainder;
        index++;
      }
    }
  }
  for (let i = 0; i < leadingZeros; i++) {
    output.push(0);
  }
  return output.reverse();
}

function getAlphabet(alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
  assert(alphabet.length === 58, `Invalid alphabet ${alphabet}`);
  return alphabet;
}

/**
 * Encodes a Uint8Array buffer into a base58 string.
 *
 * @param buffer The buffer to encode.
 * @param options Optionally specify the alphabet to use.
 * @returns The base58 encoded string.
 */
export function encode(buffer: Uint8Array, options?: { alphabet: string }): string {
  const alphabet = getAlphabet(options?.alphabet);
  const map = new Map(Array.from(alphabet).map((character, index) => [index, character]));
  const digits = convert({ input: buffer, inputBase: 256, outputBase: 58 });
  return digits.map((digit) => require(map.get(digit))).join('');
}

/**
 * Decodes a base58 encoded string into a Uint8Array buffer.
 *
 * @param string The base58 encoded string.
 * @param options Optionally specify the alphabet to use.
 * @returns The decoded buffer.
 */
export function decode(string: string, options?: { alphabet: string }): Uint8Array {
  const alphabet = getAlphabet(options?.alphabet);
  const map = new Map(Array.from(alphabet).map((character, index) => [character, index]));
  const digits = Array.from(string).map((character) => require(map.get(character)));
  return new Uint8Array(convert({ input: digits, inputBase: 58, outputBase: 256 }));
}
