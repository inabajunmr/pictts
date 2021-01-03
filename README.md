# pictts

[PICT](https://github.com/microsoft/pict) clone by TypeScript.

* [Library implementation & documentation](./pictts)
* [UI implementation](./pages)
* [npm](https://www.npmjs.com/package/pictts)
## Try it on browser

https://inabajunmr.github.io/pictts/pages/public/

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