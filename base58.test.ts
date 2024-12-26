import * as base58 from './base58.ts';
import assert from '@quentinadam/assert';
import * as hex from '@quentinadam/hex';
import Uit8ArrayExtension from '@quentinadam/uint8array-extension';

const vectors = [
  { decoded: 'Hello', encoded: '9Ajdvzr' },
  { decoded: 'Hello World!', encoded: '2NEpo7TZRRrLZSi2U' },
  {
    decoded: 'The quick brown fox jumps over the lazy dog.',
    encoded: 'USm3fpXnKG5EUBx2ndxBDMPVciP5hGey2Jh4NDv6gmeo1LkMeiKrLJUUBk6Z',
  },
  { decoded: hex.decode('61'), encoded: '2g' },
  { decoded: hex.decode('626262'), encoded: 'a3gV' },
  { decoded: hex.decode('636363'), encoded: 'aPEr' },
  {
    decoded: hex.decode('73696d706c792061206c6f6e6720737472696e67'),
    encoded: '2cFupjhnEsSn59qHXstmK2ffpLv2',
  },
  {
    decoded: hex.decode('00eb15231dfceb60925886b67d065299925915aeb172c06647'),
    encoded: '1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L',
  },
  { decoded: hex.decode('516b6fcd0f'), encoded: 'ABnLTmg' },
  { decoded: hex.decode('bf4f89001e670274dd'), encoded: '3SEo3LWLoPntC' },
  { decoded: hex.decode('572e4794'), encoded: '3EFU7m' },
  { decoded: hex.decode('ecac89cad93923c02321'), encoded: 'EJDM8drfXA6uyA' },
  { decoded: hex.decode('10c8511e'), encoded: 'Rt5zm' },
  { decoded: new Uint8Array(10), encoded: '1111111111' },
  {
    decoded: hex.decode('000111d38e5fc9071ffcd20b4a763cc9ae4f252bb4e48fd66a835e252ada93ff480d6dd43dc62a641155a5'),
    encoded: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
  },
  {
    decoded: new Uint8Array(Array.from({ length: 256 }, (_, i) => i)),
    // deno-fmt-ignore
    encoded: '1cWB5HCBdLjAuqGGReWE3R3CguuwSjw6RHn39s2yuDRTS5NsBgNiFpWgAnEx6VQi8csexkgYw3mdYrMHr8x9i7aEwP8kZ7vccXWqKDvGv3u1GxFKPuAkn8JCPPGDMf3vMMnbzm6Nh9zh1gcNsMvH3ZNLmP5fSG6DGbbi2tuwMWPthr4boWwCxf7ewSgNQeacyozhKDDQQ1qL5fQFUW52QKUZDZ5fw3KXNQJMcNTcaB723LchjeKun7MuGW5qyCBZYzA1KjofN1gYBV3NqyhQJ3Ns746GNuf9N2pQPmHz4xpnSrrfCvy6TVVz5d4PdrjeshsWQwpZsZGzvbdAdN8MKV5QsBDY',
  },
];

Deno.test('encode', () => {
  for (const { decoded, encoded } of vectors) {
    const buffer = typeof decoded === 'string' ? new TextEncoder().encode(decoded) : decoded;
    const result = base58.encode(buffer);
    assert(result === encoded, `Expected ${JSON.stringify(encoded)} but got ${JSON.stringify(result)}`);
  }
});

Deno.test('decode', () => {
  for (const { decoded, encoded } of vectors) {
    if (typeof decoded === 'string') {
      const result = new TextDecoder().decode(base58.decode(encoded));
      assert(result === decoded, `Expected ${JSON.stringify(decoded)} but got ${JSON.stringify(result)}`);
    } else {
      const result = base58.decode(encoded);
      assert(
        new Uit8ArrayExtension(result).equals(decoded),
        `Expected [${hex.encode(decoded)}] but got [${hex.encode(result)}]`,
      );
    }
  }
});
