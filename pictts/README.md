# pictts

PICT clone in TypeScript.

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

```typescript
const pictts = require('pictts');
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

## Usage

### Parse and Generate test cases

```typescript
const pictts = require('pictts');
const pict = new pictts.Parser(
    `
A:A1,A2
B:B1,B2
C:C1,C2
`
).parse();
const testCases = pict.testCases();
testCases.toString();
```

#### Result

```
A	B	C
A2	B1	C1
A1	B2	C1
A2	B2	C2
A1	B1	C2
A1	B2	C2
```

### Change order of combinations

If you want to triplewise test case like `/o:3`.

```typescript
const pictts = require('pictts');
const pict = new pictts.Parser(
    `
A:A1,A2
B:B1,B2
C:C1,C2
`
).parse();
pict.setFactorCount(3); // All combinations between 3 factors
const testCases = pict.testCases();
testCases.toString();
```

#### Result

```
A	B	C
A2	B2	C1
A1	B2	C2
A2	B1	C2
A2	B1	C1
A1	B2	C1
A1	B1	C1
A2	B2	C2
A1	B1	C2
```

### Change delimiter

Changing delimiter.
Default is `\t`.

```typescript
const pictts = require('pictts');
const pict = new pictts.Parser(
    `
A:A1,A2
B:B1,B2
C:C1,C2
`
).parse();
const testCases = pict.testCases();
testCases.toString('|'); // specify `|` as delimiter
```

#### Result

```
A|B|C
A2|B1|C1
A1|B2|C1
A2|B2|C2
A1|B1|C2
A1|B2|C2
```

### Optimizing result

Number of test cases by PICT depends on random seed.
It means changing seed changes number of test.

When `power` parameters increases, pictts repeat generating test cases and search less number of test cases.

```typescript
const pictts = require('pictts');
const pict = new pictts.Parser(
    `
A:A1,A2
B:B1,B2
C:C1,C2
`
).parse();
pict.setPower(100); // specify repeat count
const testCases = pict.testCases();
testCases.toString();
```

## Development

### test

```
npm test
```

### lint

```
npm run lint
```

### publish

Build and publish to npm.

```
npm publish
```
