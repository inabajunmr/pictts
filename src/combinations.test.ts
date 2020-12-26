import {
    combinationsBySingleArray,
    allCombinationsByMultipleArray,
} from './combination';

test('combinationsBySingleArray 2factors', () => {
    const actual = combinationsBySingleArray(['a', 'b', 'c'], 2);
    expect(actual).toStrictEqual([
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'c'],
    ]);
});

test('combinationsBySingleArray 3factors', () => {
    const actual = combinationsBySingleArray(['a', 'b', 'c', 'd'], 3);
    expect(actual).toStrictEqual([
        ['a', 'b', 'c'],
        ['a', 'b', 'd'],
        ['a', 'c', 'd'],
        ['b', 'c', 'd'],
    ]);
});

test('allCombinationsByMultipleArray', () => {
    // {'A':['a','b','c'], 'X':['x','y','z'], 'N':['1','2','3']}` and keys is ['A', 'X'],
    const map = new Map<string, string[]>();
    map.set('A', ['a', 'b', 'c']);
    map.set('X', ['x', 'y', 'z']);
    map.set('N', ['1', '2', '3']);
    const actual = allCombinationsByMultipleArray(['A', 'X', 'N'], map);
    console.log(actual);
});
