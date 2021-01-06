import { KeyValueMap, Key, Value, map2, map3 } from './keyvalue';

test('empty', () => {
    expect(KeyValueMap.empty() === KeyValueMap.empty()).toBe(true);
});

test('of', () => {
    const a11 = KeyValueMap.of(Key.of('A'), Value.of('A1'));
    const a21 = KeyValueMap.of(Key.of('A'), Value.of('A2'));
    const a31 = KeyValueMap.of(Key.of('A'), Value.of('A3'));
    const a12 = KeyValueMap.of(Key.of('A'), Value.of('A1'));
    const a22 = KeyValueMap.of(Key.of('A'), Value.of('A2'));
    const a32 = KeyValueMap.of(Key.of('A'), Value.of('A3'));

    expect(a11 === a12).toBe(true);
    expect(a21 === a22).toBe(true);
    expect(a31 === a32).toBe(true);
    expect(a11 !== a21).toBe(true);
    expect(a21 !== a31).toBe(true);
    expect(a31 !== a11).toBe(true);
});

test('allCombinations', () => {
    const actual = map3('A', 'A1', 'B', 'B1', 'C', 'C1').allCombinations(2);
    expect(actual.length).toBe(3);
    expect(actual[0] === map2('A', 'A1', 'B', 'B1')).toBe(true);
    expect(actual[1] === map2('A', 'A1', 'C', 'C1')).toBe(true);
    expect(actual[2] === map2('B', 'B1', 'C', 'C1')).toBe(true);
});
