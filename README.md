
# BaseXNumber

## This is

BaseX encoder/decoder for numbers.

## Usage

```ts
import { BaseXNumber } from 'basex-number';

const basex = new BaseXNumber();

const encoded = basex.encode(12345);
const decoded = basex.decode(encoded);

console.log(encoded); // e.g. "anFUbg"
console.log(decoded); // 12345
```

### Custom Callback

As default, encode/decode result is manupulated by `btoa` / `atob` functions.

```ts
// this doesn't use btoa/atob
const encoded = basex.encode(12345, (v) => v);
const decoded = basex.decode(encoded, (v) => v);
```

### Custom Map

```ts
const basex = new BaseXNumber(['a', 'b', 'c']);
const encoded = basex.encode(12345, (v) => v);

console.log(encoded); // e.g. "abbaaabaac"
console.log(/^[abc]+$/.test(encoded)); // true
```