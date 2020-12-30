import { Key, Value, map2, map3 } from './keyvalue';
import * as P from './parser/parser';

test('pict 3factors by 2', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2').parse();

    for (let index = 0; index < 100; index++) {
        sut.setSeed(Math.floor(Math.random() * 10000));
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
        sut.setSeed(Math.floor(Math.random() * 10000));
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
        sut.setSeed(Math.floor(Math.random() * 10000));
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
        sut.setSeed(Math.floor(Math.random() * 10000));
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

function assertContains(
    target: Map<Key, Value>,
    result: Map<Key, Value>[]
): boolean {
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
