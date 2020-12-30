import { Key, Value } from '../keyvalue';
import { ConstraintsLexer } from '../parser/constrainsLexer';
import { Term } from './term';

test('=', () => {
    const t = new ConstraintsLexer('[A] = "a1"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', 'a1'))).toBe(true);
    expect(sut.ioperate(map('A', 'a2'))).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('= with key', () => {
    const t = new ConstraintsLexer('[A] = [B]').tokens();
    const sut = new Term(t);
    expect(
        sut.ioperate(
            new Map()
                .set(Key.of('A'), Value.of('XXX'))
                .set(Key.of('B'), Value.of('XXX'))
        )
    ).toBe(true);
    expect(
        sut.ioperate(
            new Map()
                .set(Key.of('A'), Value.of('XXX'))
                .set(Key.of('B'), Value.of('YYY'))
        )
    ).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('<>', () => {
    const t = new ConstraintsLexer('[A] <> "a1"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', 'a1'))).toBe(false);
    expect(sut.ioperate(map('A', 'a2'))).toBe(true);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('>', () => {
    const t = new ConstraintsLexer('[A] > "3"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', '3'))).toBe(false);
    expect(sut.ioperate(map('A', '4'))).toBe(true);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('>=', () => {
    const t = new ConstraintsLexer('[A] >= "3"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', '2'))).toBe(false);
    expect(sut.ioperate(map('A', '3'))).toBe(true);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('<', () => {
    const t = new ConstraintsLexer('[A] < "3"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', '2'))).toBe(true);
    expect(sut.ioperate(map('A', '3'))).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('<=', () => {
    const t = new ConstraintsLexer('[A] <= "3"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', '3'))).toBe(true);
    expect(sut.ioperate(map('A', '4'))).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('LIKE', () => {
    const t = new ConstraintsLexer('[A] LIKE "a.*"').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', 'aaa'))).toBe(true);
    expect(sut.ioperate(map('A', 'bbb'))).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('IN', () => {
    const t = new ConstraintsLexer('[A] IN {"aaa", "bbb"}').tokens();
    const sut = new Term(t);
    expect(sut.ioperate(map('A', 'aaa'))).toBe(true);
    expect(sut.ioperate(map('A', 'bbb'))).toBe(true);
    expect(sut.ioperate(map('A', 'ccc'))).toBe(false);
    expect(sut.ioperate(map('B', 'B1'))).toBe(true); // no key matched, true
});

function map(key: string, value: string): Map<Key, Value> {
    return new Map().set(Key.of(key), Value.of(value));
}
