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
    expect(actual[0].values).toStrictEqual(['a', 'x']);
    expect(actual[1].values).toStrictEqual(['a', 'y']);
    expect(actual[2].values).toStrictEqual(['a', 'z']);
    expect(actual[3].values).toStrictEqual(['b', 'x']);
    expect(actual[4].values).toStrictEqual(['b', 'y']);
    expect(actual[5].values).toStrictEqual(['b', 'z']);
    expect(actual[6].values).toStrictEqual(['c', 'x']);
    expect(actual[7].values).toStrictEqual(['c', 'y']);
    expect(actual[8].values).toStrictEqual(['c', 'z']);

    actual.forEach((v) => {
        expect(v.keys).toStrictEqual(['A', 'X']);
    });
});
