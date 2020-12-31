import { map, map2, map3 } from '../keyvalue';
import { ConstraintsLexer } from '../parser/constrainsLexer';
import { Predicate } from './predicate';

test('term', () => {
    const t = new ConstraintsLexer('[A] = "a1"').tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true);
    expect(sut.ioperate(map('A', 'a2')).isTrue()).toBe(false);
    expect(sut.ioperate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('NOT term', () => {
    const t = new ConstraintsLexer('NOT [A] = "a1"').tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(false);
    expect(sut.ioperate(map('A', 'a2')).isTrue()).toBe(true);
    expect(sut.ioperate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('NOT (term)', () => {
    const t = new ConstraintsLexer('NOT ([A] = "a1")').tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(false);
    expect(sut.ioperate(map('A', 'a2')).isTrue()).toBe(true);
    expect(sut.ioperate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
    // TODO NOTの場合キーが存在しないケースで逆転しちゃう
    // TODO 実際の挙動を確認
    // TODO マッチしないパラメーターが1つでも存在したらもう常にtrueでいいのでは
});

test('term and term', () => {
    const t = new ConstraintsLexer('[A] = "a1" AND [B] = "b1"').tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map2('A', 'a1', 'B', 'b1')).isTrue()).toBe(true);
    expect(sut.ioperate(map2('A', 'a1', 'B', 'b2')).isTrue()).toBe(false);
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true); // no key matched, true
});

test('term and (term or term)', () => {
    const t = new ConstraintsLexer(
        '[A] = "a1" AND ([B] = "b1" OR [C] = "c1")'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c1')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2')).isTrue()).toBe(
        false
    );
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true); // no key matched, true
});

test('term and NOT (term or term)', () => {
    const t = new ConstraintsLexer(
        '[A] = "a1" AND NOT ([B] = "b1" OR [C] = "c1")'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c1')).isTrue()).toBe(
        false
    );
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true); // no key matched, true
});

test('(term and term) or term', () => {
    const t = new ConstraintsLexer(
        '([A] = "a1" AND [B] = "b1") OR [C] = "c1"'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b1', 'C', 'c2')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map3('A', 'a2', 'B', 'b2', 'C', 'c1')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2')).isTrue()).toBe(
        false
    );
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true); // no key matched, true
});

test('NOT (term and term) or term', () => {
    const t = new ConstraintsLexer(
        'NOT ([A] = "a1" AND [B] = "b1") OR [C] = "c1"'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b1', 'C', 'c2')).isTrue()).toBe(
        false
    );
    expect(sut.ioperate(map3('A', 'a2', 'B', 'b2', 'C', 'c1')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true); // no key matched, true
});

test('(term and (term or term))', () => {
    const t = new ConstraintsLexer(
        '([A] = "a1" AND ([B] = "b1" OR [C] = "c1"))'
    ).tokens();
    const sut = new Predicate(false, t);
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c1')).isTrue()).toBe(
        true
    );
    expect(sut.ioperate(map3('A', 'a1', 'B', 'b2', 'C', 'c2')).isTrue()).toBe(
        false
    );
    expect(sut.ioperate(map('A', 'a1')).isTrue()).toBe(true); // no key matched, true
});
