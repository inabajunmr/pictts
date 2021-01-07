import { Parser } from './parser/parser';

test('benchmark with prof', () => {
    const sut = new Parser(
        `
        Type:           Primary, Logical, Single, Span, Stripe, Mirror, RAID-5
        Size:           10, 100, 500, 1000, 5000, 10000, 40000
        Format method:  quick, slow
        File system:    FAT, FAT32, NTFS
        Cluster size:   512, 1024, 2048, 4096, 8192, 16384, 32768, 65536
        Compression:    on, off
`
    ).parse();
    sut.setFactorCount(5);
    let min = 100000000;
    let max = 0;
    let count = 0;
    const start = performance.now();
    for (let index = 0; index < 1; index++) {
        const actual = sut.testCases();
        if (min > actual.result.length) {
            min = actual.result.length;
        }
        if (max < actual.result.length) {
            max = actual.result.length;
        }
        count += actual.result.length;
    }
    const result = `
-------------
  benchmarkp
=============
time:${performance.now() - start}
min:${min}
max:${max}
avg:${count}
-------------
`;
    console.log(result);
    expect(count).toBeLessThan(2620);
});
