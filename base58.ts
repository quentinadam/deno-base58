import assert from '@quentinadam/assert';
import require from '@quentinadam/require';

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
        carry += output[index] !== undefined ? output[index] * inputBase : 0;
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
  assert(alphabet.length === 58, `Invalid alphabet ${alphabet}`);
  return alphabet;
}

/**
 * Encodes a Uint8Array buffer into a base58 string.
 *
 * @param buffer The buffer to encode.
 * @param options Optionally specify the alphabet to use. The alphabet must be a 58-character string.
 * @returns The base58 encoded string.
 */
export function encode(buffer: Uint8Array, options?: { alphabet?: string }): string {
  const alphabet = getAlphabet(options?.alphabet);
  const output = convert({ input: buffer, inputBase: 256, outputBase: 58 });
  return output.map((digit) => require(alphabet[digit])).join('');
}

/**
 * Decodes a base58 encoded string into a Uint8Array buffer.
 *
 * @param string The base58 encoded string.
 * @param options Optionally specify the alphabet to use. The alphabet must be a 58-character string.
 * @returns The decoded buffer.
 */
export function decode(string: string, options?: { alphabet?: string }): Uint8Array {
  const alphabet = getAlphabet(options?.alphabet);
  const map = new Map(Array.from(alphabet).map((character, index) => [character, index]));
  const input = Array.from(string).map((character) => require(map.get(character), `Invalid character ${character}`));
  return new Uint8Array(convert({ input, inputBase: 58, outputBase: 256 }));
}
