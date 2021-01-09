import { Key, map, map2, map3 } from './keyvalue';
import { PictResult } from './pictResult';

test('put', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')], 2);

    sut.put(map('A', 'A1'));
    expect(sut.result.length).toBe(1);
    expect(map('A', 'A1') === sut.result[0]).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.put(map('B', 'B1'));
    expect(sut.result.length).toBe(1);
    expect(map2('A', 'A1', 'B', 'B1') === sut.result[0]).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'B', 'B1'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.put(map('C', 'C1'));
    expect(sut.result.length).toBe(1);
    expect(map3('A', 'A1', 'B', 'B1', 'C', 'C1') === sut.result[0]).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'C', 'C1'))).toBe(true);
    expect(sut.contains(map2('B', 'B1', 'C', 'C1'))).toBe(true);

    expect(sut.nowKey().length).toBe(0);

    sut.put(map('A', 'A2'));
    expect(sut.result.length).toBe(2);
    expect(map('A', 'A2') === sut.result[1]).toBe(true);
    expect(sut.contains(map('A', 'A2'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    sut.put(map('B', 'B2'));
    expect(sut.result.length).toBe(2);
    expect(map2('A', 'A2', 'B', 'B2') === sut.result[1]).toBe(true);
    expect(sut.contains(map2('A', 'A2', 'B', 'B2'))).toBe(false);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));
    expect(sut.nowKey()[1]).toBe(Key.of('B'));

    sut.put(map('C', 'C2'));
    expect(sut.result.length).toBe(2);
    expect(map3('A', 'A2', 'B', 'B2', 'C', 'C2') === sut.result[1]).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'C', 'C1'))).toBe(true);
    expect(sut.contains(map2('B', 'B1', 'C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);
});

test('revert', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')], 2);

    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('C', 'C1'));
    sut.put(map('A', 'A2'));
    sut.put(map('B', 'B2'));

    expect(sut.result.length).toBe(2);
    expect(map2('A', 'A2', 'B', 'B2') === sut.result[1]).toBe(true);
    expect(sut.contains(map2('A', 'A2', 'B', 'B2'))).toBe(false);
    expect(sut.contains(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'C', 'C1'))).toBe(true);
    expect(sut.contains(map2('B', 'B1', 'C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey().length).toBe(2);

    expect(map('B', 'B2') === sut.revert()).toBe(true);
    expect(sut.result.length).toBe(2);
    expect(map('A', 'A2') === sut.result[1]).toBe(true);
    expect(sut.nowIsFull()).toBe(false);
    expect(sut.nowKey()[0]).toBe(Key.of('A'));

    expect(map('A', 'A2') === sut.revert()).toBe(true);
    expect(sut.result.length).toBe(1);
    expect(map3('A', 'A1', 'B', 'B1', 'C', 'C1') === sut.result[0]).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    expect(sut.contains(map2('A', 'A1', 'C', 'C1'))).toBe(true);
    expect(sut.contains(map2('B', 'B1', 'C', 'C1'))).toBe(true);
    expect(sut.nowIsFull()).toBe(true);
    expect(sut.nowKey().length).toBe(0);
});

test('assert impossible', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')], 1);

    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('C', 'C1'));
    sut.excludedSlot.add(map('A', 'A1'));
    sut.coveredSlot.add(map('B', 'B1'));
    sut.coveredSlot.add(map('C', 'C1'));
    sut.allSlot.add(map('A', 'A1'));
    sut.allSlot.add(map('B', 'B1'));
    sut.allSlot.add(map('C', 'C1'));

    expect(() => sut.assert()).toThrow('Contains impossible slot:A:A1.');
});

test('assert valid', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')], 2);

    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('C', 'C1'));
    sut.coveredSlot.add(map('A', 'A2'));
    sut.allSlot = sut.coveredSlot;

    expect(() => sut.assert()).toThrow('Expected slot:A:A2 is not found.');
});

test('assert slot exist only all', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B'), Key.of('C')], 2);

    sut.allSlot.add(map('A', 'A1'));
    sut.allSlot.add(map('A', 'A2'));
    sut.allSlot.add(map('A', 'A3'));
    sut.coveredSlot.add(map('A', 'A1'));
    sut.excludedSlot.add(map('A', 'A2'));

    expect(() => sut.assert()).toThrow('Something wrong.');
});
