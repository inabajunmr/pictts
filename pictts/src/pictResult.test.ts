import { Key, KeyValueMap, map, map2, map3 } from './keyvalue';
import { PictResult } from './pictResult';

test('put', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')]);

    sut.put(map('A', 'A1'));
    expect(sut.result.length).toBe(1);
    expect(assertEquals(map('A', 'A1'), sut.result[0])).toBe(true);
    expect(sut.contains(map('A', 'A1'))).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.put(map('B', 'B1'));
    expect(sut.result.length).toBe(1);
    expect(assertEquals(map2('A', 'A1', 'B', 'B1'), sut.result[0])).toBe(true);
    expect(sut.contains(map('B', 'B1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.put(map('C', 'C1'));
    expect(sut.result.length).toBe(1);
    expect(
        assertEquals(map3('A', 'A1', 'B', 'B1', 'C', 'C1'), sut.result[0])
    ).toBe(true);
    expect(sut.contains(map('C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);

    sut.put(map('A', 'A2'));
    expect(sut.result.length).toBe(2);
    expect(assertEquals(map('A', 'A2'), sut.result[1])).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.put(map('B', 'B2'));
    expect(sut.result.length).toBe(2);
    expect(assertEquals(map2('A', 'A2', 'B', 'B2'), sut.result[1])).toBe(true);
    expect(sut.contains(map('B', 'B2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.put(map('C', 'C2'));
    expect(sut.result.length).toBe(2);
    expect(
        assertEquals(map3('A', 'A2', 'B', 'B2', 'C', 'C2'), sut.result[1])
    ).toBe(true);
    expect(sut.contains(map('C', 'C2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);
});

test('revert', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')]);

    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('C', 'C1'));
    sut.put(map('A', 'A2'));
    sut.put(map('B', 'B2'));
    sut.put(map('C', 'C2'));

    expect(sut.result.length).toBe(2);
    expect(
        assertEquals(map3('A', 'A2', 'B', 'B2', 'C', 'C2'), sut.result[1])
    ).toBe(true);
    expect(sut.contains(map('C', 'C2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);

    sut.revert();
    expect(sut.result.length).toBe(2);
    expect(assertEquals(map2('A', 'A2', 'B', 'B2'), sut.result[1])).toBe(true);
    expect(sut.contains(map('B', 'B2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.revert();
    expect(sut.result.length).toBe(2);
    expect(assertEquals(map('A', 'A2'), sut.result[1])).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.revert();
    expect(sut.result.length).toBe(1);
    expect(
        assertEquals(map3('A', 'A1', 'B', 'B1', 'C', 'C1'), sut.result[0])
    ).toBe(true);
    expect(sut.contains(map('C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);

    sut.revert();
    expect(sut.result.length).toBe(1);
    expect(assertEquals(map2('A', 'A1', 'B', 'B1'), sut.result[0])).toBe(true);
    expect(sut.contains(map('B', 'B1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.revert();
    expect(sut.result.length).toBe(1);
    expect(assertEquals(map('A', 'A1'), sut.result[0])).toBe(true);
    expect(sut.contains(map('A', 'A1'))).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
});

function assertEquals(target: KeyValueMap, result: KeyValueMap): boolean {
    let assert = true;
    Array.from(target.keys()).forEach((k) => {
        if (target.get(k) !== result.get(k)) {
            assert = false;
        }
    });
    return assert;
}
