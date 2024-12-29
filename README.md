# @quentinadam/base58

[![JSR][jsr-image]][jsr-url] [![NPM][npm-image]][npm-url] [![CI][ci-image]][ci-url]

A simple library to encode and decode base58 strings.

Optionnaly supports specifying the alphabet to use.

## Usage

```ts
import * as base58 from '@quentinadam/base58';

base58.encode(new Uint8Array([72, 101, 108, 108, 111])); // returns '9Ajdvzr'

base58.decode('9Ajdvzr'); // returns Uint8Array([72, 101, 108, 108, 111])
```

[ci-image]: https://img.shields.io/github/actions/workflow/status/quentinadam/deno-base58/ci.yml?branch=main&logo=github&style=flat-square
[ci-url]: https://github.com/quentinadam/deno-base58/actions/workflows/ci.yml
[npm-image]: https://img.shields.io/npm/v/@quentinadam/base58.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@quentinadam/base58
[jsr-image]: https://jsr.io/badges/@quentinadam/base58?style=flat-square
[jsr-url]: https://jsr.io/@quentinadam/base58
