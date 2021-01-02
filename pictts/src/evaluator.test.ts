import { map2, map3, KeyValueMap } from './keyvalue';
import * as P from './parser/parser';

test('pict 3factors by 2', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2').parse();

    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'C', 'C2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'C', 'C2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('B', 'B1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B1', 'C', 'C2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'C', 'C2'), actual.result)).toBe(
            true
        );
    }
});

test('pict 2factors by 2', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2').parse();
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );
    }
});

test('pict 3factors by 3', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2').parse();
    sut.setFactorCount(3);
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'C', 'C1'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'C', 'C2'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'C', 'C1'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'C', 'C2'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'C', 'C1'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'C', 'C2'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'C', 'C1'), actual.result)
        ).toBe(true);
        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'C', 'C2'), actual.result)
        ).toBe(true);
    }
});

test('pict 4factors by 3', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2\nD:D1,D2,D3').parse();
    sut.setFactorCount(3);
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'C', 'C1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'C', 'C1', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B1', 'C', 'C1', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'C', 'C2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'C', 'C1', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B1', 'C', 'C1', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'C', 'C1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'C', 'C1', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B1', 'C', 'C1', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'C', 'C2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'C', 'C2', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B1', 'C', 'C2', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'C', 'C1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'C', 'C2', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B1', 'C', 'C2', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'C', 'C2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'C', 'C2', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B1', 'C', 'C2', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'C', 'C1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'C', 'C1', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B2', 'C', 'C1', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'C', 'C2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'C', 'C1', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B2', 'C', 'C1', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'C', 'C1', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B1', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B2', 'C', 'C1', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'C', 'C2', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B2', 'C', 'C2', 'D', 'D1'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'C', 'C2', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B2', 'C', 'C2', 'D', 'D2'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'C', 'C2', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('A', 'A2', 'B', 'B2', 'D', 'D3'), actual.result)
        ).toBe(true);

        expect(
            assertContains(map3('B', 'B2', 'C', 'C2', 'D', 'D3'), actual.result)
        ).toBe(true);
    }
});

test('pict 2factors with 1 constraints(no else)', () => {
    const sut = new P.Parser(
        'A:A1,A2\nB:B1,B2\nIF [A] = "A1" THEN [B] = "B1";'
    ).parse();
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B2'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );
    }
});

test('pict 2factors with 2 constraints(no else)', () => {
    const sut = new P.Parser(
        `A:A1,A2
        B:B1,B2
        IF [A] = "A1" THEN [B] = "B1";
        IF [A] = "A2" THEN [B] = "B2";`
    ).parse();
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B2'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B1'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );
    }
});

test('pict 3factors by 2 with nested constraints', () => {
    const sut = new P.Parser(`
    A:A1,A2
    B:B1,B2
    C:C1,C2
    IF [A] = "A1" AND ([B] = "B1" OR [B] = "B2" ) THEN [C] = "C1";`).parse();
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        // contains all combinations
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('A', 'A1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'C', 'C2'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', 'A2', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'C', 'C2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('B', 'B1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B1', 'C', 'C2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'C', 'C2'), actual.result)).toBe(
            true
        );
        expect(
            assertContains(map3('A', 'A1', 'B', 'B2', 'C', 'C2'), actual.result)
        ).toBe(false); // constraints violation
        expect(
            assertContains(map3('A', 'A1', 'B', 'B1', 'C', 'C2'), actual.result)
        ).toBe(false); // constraints violation
    }
});

test('pict 1factor 1parameters all invalid', () => {
    const sut = new P.Parser('A:A1\nIF [A]="A1" THEN [A]="A2";').parse();
    sut.setFactorCount(1);
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();
        expect(actual.result.length).toBe(0);
    }
});

test('pict 2factor 2parameters all invalid', () => {
    const sut = new P.Parser(
        `A:A1,A2
        B:B1,B2
        IF [A]="A1" THEN [A]="A2";
        IF [A]="A2" THEN [A]="A1";`
    ).parse();
    sut.setFactorCount(1);
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();
        expect(actual.result.length).toBe(0);
    }
});

test('pict 2factor all invalid', () => {
    const sut = new P.Parser(
        `A:A1,A2
        B:B1,B2
        IF [A]="A1" THEN [A]="A2";
        IF [A]="A2" THEN [A]="A1";`
    ).parse();
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();
        expect(actual.result.length).toBe(0);
    }
});

function assertContains(target: KeyValueMap, result: KeyValueMap[]): boolean {
    return (
        result.filter((r) => {
            let assert = true;
            Array.from(target.keys()).forEach((k) => {
                if (target.get(k) !== r.get(k)) {
                    assert = false;
                }
            });
            return assert;
        }).length !== 0
    );
}
