import { map, map2, map3 } from '../keyvalue';
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

// TODO 入れ子
