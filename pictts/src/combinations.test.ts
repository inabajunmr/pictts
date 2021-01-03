import {
    combinationsBySingleArray,
    allCombinationsByMultipleArray,
    longestCombination,
    Combinations,
} from './combination';
import { Key, map2, Value } from './keyvalue';

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

    expect(actual.allCombinations[0].get(Key.of('A'))?.value).toBe('a');
    expect(actual.allCombinations[0].get(Key.of('X'))?.value).toBe('x');
    expect(actual.allCombinations[1].get(Key.of('A'))?.value).toBe('a');
    expect(actual.allCombinations[1].get(Key.of('X'))?.value).toBe('y');
    expect(actual.allCombinations[2].get(Key.of('A'))?.value).toBe('a');
    expect(actual.allCombinations[2].get(Key.of('X'))?.value).toBe('z');
    expect(actual.allCombinations[3].get(Key.of('A'))?.value).toBe('b');
    expect(actual.allCombinations[3].get(Key.of('X'))?.value).toBe('x');
    expect(actual.allCombinations[4].get(Key.of('A'))?.value).toBe('b');
    expect(actual.allCombinations[4].get(Key.of('X'))?.value).toBe('y');
    expect(actual.allCombinations[5].get(Key.of('A'))?.value).toBe('b');
    expect(actual.allCombinations[5].get(Key.of('X'))?.value).toBe('z');
    expect(actual.allCombinations[6].get(Key.of('A'))?.value).toBe('c');
    expect(actual.allCombinations[6].get(Key.of('X'))?.value).toBe('x');
    expect(actual.allCombinations[7].get(Key.of('A'))?.value).toBe('c');
    expect(actual.allCombinations[7].get(Key.of('X'))?.value).toBe('y');
    expect(actual.allCombinations[8].get(Key.of('A'))?.value).toBe('c');
    expect(actual.allCombinations[8].get(Key.of('X'))?.value).toBe('z');
    expect(actual.allCombinations.length).toBe(9);
});

test('longestCombination no exceptkeys', () => {
    const c = new Combinations([Key.of('A'), Key.of('N')]);
    c.allCombinations.push(map2('A', 'a', 'N', '1'));
    const actual = longestCombination([], [c]);
    expect(actual.keys).toStrictEqual(c.keys);
    expect(actual.allCombinations).toStrictEqual(c.allCombinations);
});

test('longestCombination exceptKeys', () => {
    const c1 = new Combinations([Key.of('A'), Key.of('B')]); // longest but except

    c1.allCombinations.push(map2('A', 'a', 'B', 'b'));
    c1.allCombinations.push(map2('A', 'a', 'B', 'b'));
    c1.allCombinations.push(map2('A', 'a', 'B', 'b'));
    const c2 = new Combinations([Key.of('A'), Key.of('C')]); // longest
    c2.allCombinations.push(map2('A', 'a', 'C', 'c'));
    c2.allCombinations.push(map2('A', 'a', 'C', 'c'));
    const c3 = new Combinations([Key.of('B'), Key.of('C')]);
    c3.allCombinations.push(map2('B', 'b', 'C', 'c'));
    const actual = longestCombination(
        [[Key.of('A'), Key.of('B')]],
        [c1, c2, c3]
    );
    expect(actual.keys).toStrictEqual(c2.keys);
    expect(actual.allCombinations).toStrictEqual(c2.allCombinations);
});
