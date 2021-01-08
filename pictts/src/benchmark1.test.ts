import { Parser } from './parser/parser';
import fs from 'fs';

test('benchmark1', () => {
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
    sut.setFactorCount(2);
    let min = 100000000;
    let max = 0;
    let count = 0;
    const start = performance.now();
    for (let index = 0; index < 200; index++) {
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
### benchmark1(order=2)
time:${performance.now() - start}
min:${min}
max:${max}
avg:${count / 200}
`;
    console.log(result);
    fs.appendFileSync('benchmark.txt', result);
    expect(count / 200).toBeLessThan(68);
});

test('benchmark2', () => {
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
    sut.setFactorCount(3);
    let min = 100000000;
    let max = 0;
    let count = 0;
    const start = performance.now();
    for (let index = 0; index < 10; index++) {
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
### benchmark2(order=3)
time:${performance.now() - start}
min:${min}
max:${max}
avg:${count / 10}
`;
    console.log(result);
    fs.appendFileSync('benchmark.txt', result);
    expect(count / 10).toBeLessThan(400);
});

test('benchmark3', () => {
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
    sut.setFactorCount(4);
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
### benchmark3(order=4)
time:${performance.now() - start}
min:${min}
max:${max}
avg:${count}
`;
    console.log(result);
    fs.appendFileSync('benchmark.txt', result);
    expect(count).toBeLessThan(1250);
});

test('benchmark4', () => {
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
### benchmark4(order=5)
time:${performance.now() - start}
min:${min}
max:${max}
avg:${count}
`;
    console.log(result);
    fs.appendFileSync('benchmark.txt', result);
    expect(count).toBeLessThan(2600);
});
