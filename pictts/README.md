# pictts

PICT clone by TypeScript.

## Example

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

## Usage

### Parse and Generate test cases

```typescript
const pictts = require("pictts")
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
A,B,C
A2,B1,C1
A1,B2,C1
A2,B2,C2
A1,B1,C2
A1,B2,C2
```

### Change order of combinations

If you want to triplewise test case like `/o:3`.

```typescript
const pictts = require("pictts")
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
A,B,C
A2,B2,C1
A1,B2,C2
A2,B1,C2
A2,B1,C1
A1,B2,C1
A1,B1,C1
A2,B2,C2
A1,B1,C2
```

### Change delimiter

Changing delimiter like `/d:|`.
Default is `,`.

```typescript
const pictts = require("pictts")
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
