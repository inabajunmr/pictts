# pictts

[![CI](https://github.com/inabajunmr/pictts/workflows/CI/badge.svg)](https://github.com/inabajunmr/pictts/actions?query=branch%3Amain)

[PICT](https://github.com/microsoft/pict) clone in TypeScript.

* [Library implementation & documentation](./pictts)
* [UI implementation](./pages)
* [npm](https://www.npmjs.com/package/pictts)
## Try it on browser

https://inabajunmr.github.io/pictts/pages/public/

## Features

| Features                               | pictts      | [microsoft/pict](https://github.com/microsoft/pict) |
| -------------------------------------- | ----------- | --------------------------------------------------- |
| Conditional Constraints                | ✅          | ✅                                                  |
| Unconditional Constraints (Invariants) | Unsupported | ✅                                                  |
| Re-using Parameter Definitions         | Unsupported | ✅                                                  |
| Sub-Models                             | Unsupported | ✅                                                  |
| Aliasing                               | Unsupported | ✅                                                  |
| Negative Testing                       | Unsupported | ✅                                                  |
| Weighting                              | Unsupported | ✅                                                  |
| Seeding                                | Unsupported | ✅                                                  |


## Example

[Read it for other usage.](./pictts)

```typescript
const pictts = require("pictts")
const pict = new pictts.Parser(
`
Type:           Primary, Logical, Single, Span, Stripe, Mirror, RAID-5
Size:           10, 100, 500, 1000, 5000, 10000, 40000
Format method:  quick, slow
File system:    FAT, FAT32, NTFS
Cluster size:   512, 1024, 2048, 4096, 8192, 16384, 32768, 65536
Compression:    on, off

IF [File system] = "FAT"   THEN [Size] <= 4096 ;
IF [File system] = "FAT32" THEN [Size] <= 32000 ;
`
).parse();
const testCases = pict.testCases();
testCases.toString();
```

[try it on RunKit.](https://npm.runkit.com/pictts)
