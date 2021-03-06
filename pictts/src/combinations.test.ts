import {
    combinationsBySingleArray,
    allCombinationsByMultipleArray,
    longestCombination,
    Combinations,
} from './combination';
import { Key, map, map2, Value } from './keyvalue';
import { Random } from './random';

test('combinationsBySingleArray 2factors', () => {
    const actual = combinationsBySingleArray(
        [Key.of('a'), Key.of('b'), Key.of('c')],
        2
    );
    expect(actual).toStrictEqual([
        [Key.of('a'), Key.of('b')],
        [Key.of('a'), Key.of('c')],
        [Key.of('b'), Key.of('c')],
    ]);
});

test('combinationsBySingleArray 3factors', () => {
    const actual = combinationsBySingleArray(
        [Key.of('a'), Key.of('b'), Key.of('c'), Key.of('d')],
        3
    );
    expect(actual).toStrictEqual([
        [Key.of('a'), Key.of('b'), Key.of('c')],
        [Key.of('a'), Key.of('b'), Key.of('d')],
        [Key.of('a'), Key.of('c'), Key.of('d')],
        [Key.of('b'), Key.of('c'), Key.of('d')],
    ]);
});

test('allCombinationsByMultipleArray', () => {
    // {'A':['a','b','c'], 'X':['x','y','z'], 'N':['1','2','3']}` and keys is ['A', 'X'],
    const map = new Map<Key, Value[]>();
    map.set(Key.of('A'), [Value.of('a'), Value.of('b'), Value.of('c')]);
    map.set(Key.of('X'), [Value.of('x'), Value.of('y'), Value.of('z')]);
    map.set(Key.of('N'), [Value.of('1'), Value.of('2'), Value.of('3')]);

    const actual = allCombinationsByMultipleArray(
        [Key.of('A'), Key.of('X')],
        map
    );
    expect(actual.keys).toStrictEqual([Key.of('A'), Key.of('X')]);

    expect(actual.all[0].get(Key.of('A'))?.value).toBe('a');
    expect(actual.all[0].get(Key.of('X'))?.value).toBe('x');
    expect(actual.all[1].get(Key.of('A'))?.value).toBe('a');
    expect(actual.all[1].get(Key.of('X'))?.value).toBe('y');
    expect(actual.all[2].get(Key.of('A'))?.value).toBe('a');
    expect(actual.all[2].get(Key.of('X'))?.value).toBe('z');
    expect(actual.all[3].get(Key.of('A'))?.value).toBe('b');
    expect(actual.all[3].get(Key.of('X'))?.value).toBe('x');
    expect(actual.all[4].get(Key.of('A'))?.value).toBe('b');
    expect(actual.all[4].get(Key.of('X'))?.value).toBe('y');
    expect(actual.all[5].get(Key.of('A'))?.value).toBe('b');
    expect(actual.all[5].get(Key.of('X'))?.value).toBe('z');
    expect(actual.all[6].get(Key.of('A'))?.value).toBe('c');
    expect(actual.all[6].get(Key.of('X'))?.value).toBe('x');
    expect(actual.all[7].get(Key.of('A'))?.value).toBe('c');
    expect(actual.all[7].get(Key.of('X'))?.value).toBe('y');
    expect(actual.all[8].get(Key.of('A'))?.value).toBe('c');
    expect(actual.all[8].get(Key.of('X'))?.value).toBe('z');
    expect(actual.all.length).toBe(9);
});

test('longestCombination no exceptkeys', () => {
    const c = new Combinations([Key.of('A'), Key.of('N')]);
    c.uncovered.push(map2('A', 'a', 'N', '1'));
    const actual = longestCombination([], [c]);
    expect(actual.keys).toStrictEqual(c.keys);
    expect(actual.uncovered).toStrictEqual(c.uncovered);
});

test('longestCombination exceptKeys', () => {
    const c1 = new Combinations([Key.of('A'), Key.of('B')]); // longest but except

    c1.uncovered.push(map2('A', 'a', 'B', 'b'));
    c1.uncovered.push(map2('A', 'a', 'B', 'b'));
    c1.uncovered.push(map2('A', 'a', 'B', 'b'));
    const c2 = new Combinations([Key.of('A'), Key.of('C')]); // longest
    c2.uncovered.push(map2('A', 'a', 'C', 'c'));
    c2.uncovered.push(map2('A', 'a', 'C', 'c'));
    const c3 = new Combinations([Key.of('B'), Key.of('C')]);
    c3.uncovered.push(map2('B', 'b', 'C', 'c'));
    const actual = longestCombination(
        [[Key.of('A'), Key.of('B')]],
        [c1, c2, c3]
    );
    expect(actual.keys).toStrictEqual(c2.keys);
    expect(actual.uncovered).toStrictEqual(c2.uncovered);
});

test('shuffle', () => {
    const random = new Random();
    for (let index = 0; index < 1000; index++) {
        const c1 = new Combinations([Key.of('A')]);

        c1.uncovered.push(map('A', '1'));
        c1.uncovered.push(map('B', '2'));
        c1.uncovered.push(map('C', '3'));
        c1.uncovered.push(map('D', '4'));

        c1.shuffle(random);
        expect(c1.uncovered.length).toBe(4);
        expect(c1.uncovered.indexOf(map('A', '1'))).not.toBe(-1);
        expect(c1.uncovered.indexOf(map('B', '2'))).not.toBe(-1);
        expect(c1.uncovered.indexOf(map('C', '3'))).not.toBe(-1);
        expect(c1.uncovered.indexOf(map('D', '4'))).not.toBe(-1);
    }
});
