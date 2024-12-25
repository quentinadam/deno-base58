# base58

[![JSR](https://jsr.io/badges/@quentinadam/base58)](https://jsr.io/@quentinadam/base58)
[![CI](https://github.com/quentinadam/deno-base58/actions/workflows/ci.yml/badge.svg)](https://github.com/quentinadam/deno-base58/actions/workflows/ci.yml)

A simple library to encode and decode base58 strings.

Optionnaly supports specifying the alphabet to use.

## Usage

```ts
import * as base58 from '@quentinadam/base58';

base58.encode(new Uint8Array([72, 101, 108, 108, 111])); // returns '9Ajdvzr'

base58.decode('9Ajdvzr'); // returns Uint8Array([72, 101, 108, 108, 111])
```
