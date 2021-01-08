import { map, map2 } from '../keyvalue/keyvalue';
import { ConstraintsLexer } from '../parser/constrainsLexer';
import { Term } from './term';

test('=', () => {
    const t = new ConstraintsLexer('[A] = "a1"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', 'a1')).isTrue()).toBe(true);
    expect(sut.operate(map('A', 'a2')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('= with key', () => {
    const t = new ConstraintsLexer('[A] = [B]').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map2('A', 'XXX', 'B', 'XXX')).isTrue()).toBe(true);
    expect(sut.operate(map2('A', 'XXX', 'B', 'YYY')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('<>', () => {
    const t = new ConstraintsLexer('[A] <> "a1"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', 'a1')).isTrue()).toBe(false);
    expect(sut.operate(map('A', 'a2')).isTrue()).toBe(true);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('>', () => {
    const t = new ConstraintsLexer('[A] > "3"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', '3')).isTrue()).toBe(false);
    expect(sut.operate(map('A', '4')).isTrue()).toBe(true);
    expect(sut.operate(map('A', '10')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('>=', () => {
    const t = new ConstraintsLexer('[A] >= "3"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', '2')).isTrue()).toBe(false);
    expect(sut.operate(map('A', '3')).isTrue()).toBe(true);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('<', () => {
    const t = new ConstraintsLexer('[A] < "3"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', '2')).isTrue()).toBe(true);
    expect(sut.operate(map('A', '3')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('<=', () => {
    const t = new ConstraintsLexer('[A] <= "3"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', '3')).isTrue()).toBe(true);
    expect(sut.operate(map('A', '4')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('LIKE', () => {
    const t = new ConstraintsLexer('[A] LIKE "a.*"').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', 'aaa')).isTrue()).toBe(true);
    expect(sut.operate(map('A', 'bbb')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('IN', () => {
    const t = new ConstraintsLexer('[A] IN {"aaa", "bbb"}').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', 'aaa')).isTrue()).toBe(true);
    expect(sut.operate(map('A', 'bbb')).isTrue()).toBe(true);
    expect(sut.operate(map('A', 'ccc')).isTrue()).toBe(false);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});

test('number', () => {
    const t = new ConstraintsLexer('[A] > 3').tokens();
    const sut = new Term(false, t);
    expect(sut.operate(map('A', '3')).isTrue()).toBe(false);
    expect(sut.operate(map('A', '4')).isTrue()).toBe(true);
    expect(sut.operate(map('A', '10')).isTrue()).toBe(true);
    expect(sut.operate(map('B', 'B1')).isTrue()).toBe(true); // no key matched, true
});
