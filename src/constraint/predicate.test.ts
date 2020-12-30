import { Key, Value } from '../keyvalue';
import { ConstraintsLexer } from '../parser/constrainsLexer';
import { Predicate } from './predicate';

test('term', () => {
    const t = new ConstraintsLexer('[A] = "a1"').tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map('A', 'a1'))).toBe(true);
    expect(sut.ioperate(map('A', 'a2'))).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('term and term', () => {
    const t = new ConstraintsLexer('[A] = "a1" AND [B] = "b1"').tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map2('A', 'a1', 'B', 'b1'))).toBe(true);
    expect(sut.ioperate(map2('A', 'a1', 'B', 'b2'))).toBe(false);
    expect(sut.ioperate(map('A', 'a1'))).toBe(true); // no key matched, true
});

test('term and (term or term)', () => {
    const t = new ConstraintsLexer(
        '[A] = "a1" AND ([B] = "b1" OR [C] = "c1")'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c1'))).toBe(true);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2'))).toBe(false);
    expect(sut.ioperate(map('A', 'a1'))).toBe(true); // no key matched, true
});

test('(term and term) or term', () => {
    const t = new ConstraintsLexer(
        '([A] = "a1" AND [B] = "b1") OR [C] = "c1"'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b1', 'C', 'c2'))).toBe(true);
    expect(sut.ioperate(map3('A', 'a2', 'B', 'b2', 'C', 'c1'))).toBe(true);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2'))).toBe(false);
    expect(sut.ioperate(map('A', 'a1'))).toBe(true); // no key matched, true
});

function map(key: string, value: string): Map<Key, Value> {
    return new Map().set(Key.of(key), Value.of(value));
}

function map2(k1: string, v1: string, k2: string, v2: string): Map<Key, Value> {
    const result = new Map<Key, Value>();
    result.set(Key.of(k1), Value.of(v1));
    result.set(Key.of(k2), Value.of(v2));
    return result;
}

function map3(
    k1: string,
    v1: string,
    k2: string,
    v2: string,
    k3: string,
    v3: string
): Map<Key, Value> {
    const result = new Map<Key, Value>();
    result.set(Key.of(k1), Value.of(v1));
    result.set(Key.of(k2), Value.of(v2));
    result.set(Key.of(k3), Value.of(v3));
    return result;
}
