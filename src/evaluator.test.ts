import * as P from './parser';

test('pict 3factors by 2', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2').parse();
    for (let index = 0; index < 100; index++) {
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
    const actual = sut.testCases();
    console.log(actual);

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
});

test('pict 4factors by 3', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2\nD:D1,D2,D3').parse();
    sut.setFactorCount(3);
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
});

function map2(
    k1: string,
    v1: string,
    k2: string,
    v2: string
): Map<string, string> {
    const result = new Map<string, string>();
    result.set(k1, v1);
    result.set(k2, v2);
    return result;
}

function map3(
    k1: string,
    v1: string,
    k2: string,
    v2: string,
    k3: string,
    v3: string
): Map<string, string> {
    const result = new Map<string, string>();
    result.set(k1, v1);
    result.set(k2, v2);
    result.set(k3, v3);
    return result;
}

function assertContains(
    target: Map<string, string>,
    result: Array<Map<string, string>>
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
