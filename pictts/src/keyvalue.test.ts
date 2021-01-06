import { KeyValueMap, Key, Value } from './keyvalue';

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
