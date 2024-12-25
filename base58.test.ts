import * as base58 from './base58.ts';
import assert from '@quentinadam/assert';

const vectors = [
  { decoded: 'Hello', encoded: '9Ajdvzr' },
  { decoded: 'Hello World!', encoded: '2NEpo7TZRRrLZSi2U' },
  {
    decoded: 'The quick brown fox jumps over the lazy dog.',
    encoded: 'USm3fpXnKG5EUBx2ndxBDMPVciP5hGey2Jh4NDv6gmeo1LkMeiKrLJUUBk6Z',
  },
  { decoded: new Uint8Array([0x61]), encoded: '2g' },
  { decoded: new Uint8Array([0x62, 0x62, 0x62]), encoded: 'a3gV' },
  { decoded: new Uint8Array([0x63, 0x63, 0x63]), encoded: 'aPEr' },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x73, 0x69, 0x6d, 0x70, 0x6c, 0x79, 0x20, 0x61, 0x20, 0x6c, 0x6f, 0x6e, 0x67, 0x20, 0x73, 0x74, 
      0x72, 0x69, 0x6e, 0x67
    ]),
    encoded: '2cFupjhnEsSn59qHXstmK2ffpLv2',
  },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0xeb, 0x15, 0x23, 0x1d, 0xfc, 0xeb, 0x60, 0x92, 0x58, 0x86, 0xb6, 0x7d, 0x06, 0x52, 0x99,
      0x92, 0x59, 0x15, 0xae, 0xb1, 0x72, 0xc0, 0x66, 0x47
    ]),
    encoded: '1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L',
  },
  { decoded: new Uint8Array([0x51, 0x6b, 0x6f, 0xcd, 0x0f]), encoded: 'ABnLTmg' },
  { decoded: new Uint8Array([0xbf, 0x4f, 0x89, 0x00, 0x1e, 0x67, 0x02, 0x74, 0xdd]), encoded: '3SEo3LWLoPntC' },
  { decoded: new Uint8Array([0x57, 0x2e, 0x47, 0x94]), encoded: '3EFU7m' },
  { decoded: new Uint8Array([0xec, 0xac, 0x89, 0xca, 0xd9, 0x39, 0x23, 0xc0, 0x23, 0x21]), encoded: 'EJDM8drfXA6uyA' },
  { decoded: new Uint8Array([0x10, 0xc8, 0x51, 0x1e]), encoded: 'Rt5zm' },
  { decoded: new Uint8Array(10), encoded: '1111111111' },
  {
    // deno-fmt-ignore
    decoded: new Uint8Array([
      0x00, 0x01, 0x11, 0xd3, 0x8e, 0x5f, 0xc9, 0x07, 0x1f, 0xfc, 0xd2, 0x0b, 0x4a, 0x76, 0x3c, 0xc9,
      0xae, 0x4f, 0x25, 0x2b, 0xb4, 0xe4, 0x8f, 0xd6, 0x6a, 0x83, 0x5e, 0x25, 0x2a, 0xda, 0x93, 0xff,
      0x48, 0x0d, 0x6d, 0xd4, 0x3d, 0xc6, 0x2a, 0x64, 0x11, 0x55, 0xa5
    ]),
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
    assert(result === encoded, `Expected ${encoded} but got ${result}`);
  }
});

Deno.test('decode', () => {
  for (const { decoded, encoded } of vectors) {
    const result = base58.decode(encoded);
    if (typeof decoded === 'string') {
      assert(new TextDecoder().decode(result) === decoded);
    } else {
      assert(result.length === decoded.length);
      for (let i = 0; i < result.length; i++) {
        assert(result[i] === decoded[i]);
      }
    }
  }
});
