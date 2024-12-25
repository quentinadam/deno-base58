import * as base58 from './base58.ts';
import assert from '@quentinadam/assert';

const vectors = [
  { decoded: 'Hello', encoded: '9Ajdvzr' },
  { decoded: 'Hello world', encoded: 'JxF12TrwXzT5jvT' },
  {
    decoded: 'The quick brown fox jumps over the lazy dog',
    encoded: '7DdiPPYtxLjCD3wA1po2rvZHTDYjkZYiEtazrfiwJcwnKCizhGFhBGHeRdx',
  },
];

Deno.test('encode', () => {
  for (const { decoded, encoded } of vectors) {
    assert(base58.encode(new TextEncoder().encode(decoded)) === encoded);
  }
});

Deno.test('decode', () => {
  for (const { decoded, encoded } of vectors) {
    assert(new TextDecoder().decode(base58.decode(encoded)) === decoded);
  }
});
