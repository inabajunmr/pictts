import { Key, KeyValueMap, map, map2, map3 } from './keyvalue';
import { PictResult } from './pictResult';

test('put', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')]);

    sut.put(map('A', 'A1'));
    expect(sut.result.length).toBe(1);
    expect(map('A', 'A1').equals(sut.result[0])).toBe(true);
    expect(sut.contains(map('A', 'A1'))).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.put(map('B', 'B1'));
    expect(sut.result.length).toBe(1);
    expect(map2('A', 'A1', 'B', 'B1').equals(sut.result[0])).toBe(true);
    expect(sut.contains(map('B', 'B1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.put(map('C', 'C1'));
    expect(sut.result.length).toBe(1);
    expect(map3('A', 'A1', 'B', 'B1', 'C', 'C1').equals(sut.result[0])).toBe(
        true
    );
    expect(sut.contains(map('C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);

    sut.put(map('A', 'A2'));
    expect(sut.result.length).toBe(2);
    expect(map('A', 'A2').equals(sut.result[1])).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.put(map('B', 'B2'));
    expect(sut.result.length).toBe(2);
    expect(map2('A', 'A2', 'B', 'B2').equals(sut.result[1])).toBe(true);
    expect(sut.contains(map('B', 'B2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.put(map('C', 'C2'));
    expect(sut.result.length).toBe(2);
    expect(map3('A', 'A2', 'B', 'B2', 'C', 'C2').equals(sut.result[1])).toBe(
        true
    );
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
    expect(map3('A', 'A2', 'B', 'B2', 'C', 'C2').equals(sut.result[1])).toBe(
        true
    );
    expect(sut.contains(map('C', 'C2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);

    expect(map('C', 'C2').equals(sut.revert())).toBe(true);
    expect(sut.result.length).toBe(2);
    expect(map2('A', 'A2', 'B', 'B2').equals(sut.result[1])).toBe(true);
    expect(sut.contains(map('B', 'B2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    expect(map('B', 'B2').equals(sut.revert())).toBe(true);
    expect(sut.result.length).toBe(2);
    expect(map('A', 'A2').equals(sut.result[1])).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    expect(map('A', 'A2').equals(sut.revert())).toBe(true);
    expect(sut.result.length).toBe(1);
    expect(map3('A', 'A1', 'B', 'B1', 'C', 'C1').equals(sut.result[0])).toBe(
        true
    );
    expect(sut.contains(map('C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);

    expect(map('C', 'C1').equals(sut.revert())).toBe(true);
    expect(sut.result.length).toBe(1);
    expect(map2('A', 'A1', 'B', 'B1').equals(sut.result[0])).toBe(true);
    expect(sut.contains(map('B', 'B1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    expect(map('B', 'B1').equals(sut.revert())).toBe(true);
    expect(sut.result.length).toBe(1);
    expect(map('A', 'A1').equals(sut.result[0])).toBe(true);
    expect(sut.contains(map('A', 'A1'))).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(map('A', 'A1').equals(sut.revert())).toBe(true);
});

test('assert impossible', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')]);

    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('C', 'C1'));
    sut.impossibleSlots.push(map('A', 'A1'));
    sut.allSlots = sut.impossibleSlots;

    expect(() => sut.assert()).toThrow('Contains impossible slot:A:A1.');
});

test('assert valid', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')]);

    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('C', 'C1'));
    sut.validSlots.push(map('A', 'A2'));
    sut.allSlots = sut.validSlots;

    expect(() => sut.assert()).toThrow('Expected slot:A:A2 is not found.');
});

test('assert slot exist only all', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')]);

    sut.allSlots.push(map('A', 'A1'));
    sut.allSlots.push(map('A', 'A2'));
    sut.allSlots.push(map('A', 'A3'));
    sut.validSlots.push(map('A', 'A1'));
    sut.impossibleSlots.push(map('A', 'A2'));

    expect(() => sut.assert()).toThrow('Something wrong.');
});
