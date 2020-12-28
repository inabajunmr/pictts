import * as P from './parser';

test('pict', () => {
    const sut = new P.Parser('A:A1,A2\nB:B1,B2\nC:C1,C2').parse();
    console.log(sut.testCases().toString());

    const actual = sut.testCases();

    // contains all combinations
    expect(assertContains(map('A', 'A1', 'B', 'B1'), actual.result)).toBe(true); // TODO
    expect(assertContains(map('A', 'A1', 'B', 'B2'), actual.result)).toBe(true);
    expect(assertContains(map('A', 'A2', 'B', 'B1'), actual.result)).toBe(true);
    expect(assertContains(map('A', 'A2', 'B', 'B2'), actual.result)).toBe(true);

    expect(assertContains(map('A', 'A1', 'C', 'C1'), actual.result)).toBe(true);
    expect(assertContains(map('A', 'A1', 'C', 'C2'), actual.result)).toBe(true);
    expect(assertContains(map('A', 'A2', 'C', 'C1'), actual.result)).toBe(true);
    expect(assertContains(map('A', 'A2', 'C', 'C2'), actual.result)).toBe(true);

    expect(assertContains(map('B', 'B1', 'C', 'C1'), actual.result)).toBe(true);
    expect(assertContains(map('B', 'B1', 'C', 'C2'), actual.result)).toBe(true);
    expect(assertContains(map('B', 'B2', 'C', 'C1'), actual.result)).toBe(true);
    expect(assertContains(map('B', 'B2', 'C', 'C2'), actual.result)).toBe(true);
});

function map(
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
