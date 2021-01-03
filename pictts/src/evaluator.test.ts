import { map2, map3, KeyValueMap } from './keyvalue';
import * as P from './parser/parser';
import { PictResult } from './pictResult';

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

test('pict 4factor', () => {
    const sut = new P.Parser(
        `
    A:A1,A2
    B:B1,B2
    C:C1,C2
    D:D1,D2
    `
    ).parse();

    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('A', 'A1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'C', 'C2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'C', 'C2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('A', 'A1', 'D', 'D1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'D', 'D1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'D', 'D2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'D', 'D2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('B', 'B1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B1', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'C', 'C2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'C', 'C2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('B', 'B1', 'D', 'D1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B1', 'D', 'D1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'D', 'D2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B2', 'D', 'D2'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('C', 'C1', 'D', 'D1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('C', 'C1', 'D', 'D1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('C', 'C2', 'D', 'D2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('C', 'C2', 'D', 'D2'), actual.result)).toBe(
            true
        );
    }
});

test('pict 3factor with IN constraints', () => {
    const sut = new P.Parser(
        `
        A:A1,A2,A3
        B:B1,B2,B3
        C:C1,C2
        IF [A] = "A1" THEN [B] IN {"B1","B2"};
        `
    ).parse();
    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));
        const actual = sut.testCases();

        expect(assertContains(map2('A', 'A1', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A1', 'B', 'B3'), actual.result)).toBe(
            false
        ); // constraints violation
        expect(assertContains(map2('A', 'A2', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A2', 'B', 'B3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A3', 'B', 'B1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A3', 'B', 'B2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A3', 'B', 'B3'), actual.result)).toBe(
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
        expect(assertContains(map2('A', 'A3', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', 'A3', 'C', 'C2'), actual.result)).toBe(
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
        expect(assertContains(map2('B', 'B3', 'C', 'C1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', 'B3', 'C', 'C2'), actual.result)).toBe(
            true
        );
    }
});

test('number constraints', () => {
    const sut = new P.Parser(`
    A:1,2,3
    B:1,2,3
    C:1,2,3
    IF [A] > 2 THEN [B] > 2 ELSE [C] > 2;
    `).parse();

    for (let index = 0; index < 100; index++) {
        sut.setRandomSeed(Math.floor(Math.random() * 10000));

        const actual = sut.testCases();
        if (assertContains(map2('A', '2', 'B', '1'), actual.result) == false) {
            console.log('');
        }

        // contains all combinations
        expect(assertContains(map2('A', '1', 'B', '1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '1', 'B', '2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '1', 'B', '3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '2', 'B', '1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '2', 'B', '2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '2', 'B', '3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '3', 'B', '1'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', '3', 'B', '2'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', '3', 'B', '3'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('A', '1', 'C', '1'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', '1', 'C', '2'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', '1', 'C', '3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '2', 'C', '1'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', '2', 'C', '2'), actual.result)).toBe(
            false // constraints violation
        );
        expect(assertContains(map2('A', '2', 'C', '3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '3', 'C', '1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '3', 'C', '2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('A', '3', 'C', '3'), actual.result)).toBe(
            true
        );

        expect(assertContains(map2('B', '1', 'C', '1'), actual.result)).toBe(
            false // constraints impossible
        );
        expect(assertContains(map2('B', '1', 'C', '2'), actual.result)).toBe(
            false // constraints impossible
        );
        expect(assertContains(map2('B', '1', 'C', '3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', '2', 'C', '1'), actual.result)).toBe(
            false // constraints impossible
        );
        expect(assertContains(map2('B', '2', 'C', '2'), actual.result)).toBe(
            false // constraints impossible
        );
        expect(assertContains(map2('B', '2', 'C', '3'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', '3', 'C', '1'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', '3', 'C', '2'), actual.result)).toBe(
            true
        );
        expect(assertContains(map2('B', '3', 'C', '3'), actual.result)).toBe(
            true
        );
    }
});

test('todo', () => {
    const sut = new P.Parser(
        `
Type:           Primary, Logical, Single, Span, Stripe, Mirror, RAID-5
Size:           10, 100, 500, 1000, 5000, 10000, 40000
Format method:  quick, slow
File system:    FAT, FAT32, NTFS
Cluster size:   512, 1024, 2048, 4096, 8192, 16384, 32768, 65536
Compression:    on, off
`
    ).parse();
    let min = 1000000;
    let max = 0;
    let count = 0;
    let a: PictResult | undefined = undefined;
    let b: PictResult | undefined = undefined;
    for (let index = 0; index < 200; index++) {
        const actual = sut.testCases();
        if (min > actual.result.length) {
            min = actual.result.length;
            a = actual;
        }
        if (max < actual.result.length) {
            max = actual.result.length;
            b = actual;
        }
        count += actual.result.length;
        console.log(actual.result.length);
    }

    console.log(
        `min:${min}
max:${max}
${count / 200}`
    );
    // console.log(a!.toString());
    // console.log(b!.toString());
    expect(true).toBe(true);
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
