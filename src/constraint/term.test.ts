import { Key, Value } from '../keyvalue';
import { Term } from './term';

test('=', () => {
    const sut = new Term(Key.of('A'), [Value.of('a1')], [], '=');
    expect(sut.operate(map('A', 'a1'))).toBe(true);
    expect(sut.operate(map('A', 'a2'))).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('= with key', () => {
    const sut = new Term(Key.of('A'), [], [Key.of('B')], '=');
    expect(
        sut.operate(
            new Map()
                .set(Key.of('A'), Value.of('XXX'))
                .set(Key.of('B'), Value.of('XXX'))
        )
    ).toBe(true);
    expect(
        sut.operate(
            new Map()
                .set(Key.of('A'), Value.of('XXX'))
                .set(Key.of('B'), Value.of('YYY'))
        )
    ).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('<>', () => {
    const sut = new Term(Key.of('A'), [Value.of('a1')], [], '<>');
    expect(sut.operate(map('A', 'a1'))).toBe(false);
    expect(sut.operate(map('A', 'a2'))).toBe(true);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('>', () => {
    const sut = new Term(Key.of('A'), [Value.of('3')], [], '>');
    expect(sut.operate(map('A', '3'))).toBe(false);
    expect(sut.operate(map('A', '4'))).toBe(true);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('>=', () => {
    const sut = new Term(Key.of('A'), [Value.of('3')], [], '>=');
    expect(sut.operate(map('A', '2'))).toBe(false);
    expect(sut.operate(map('A', '3'))).toBe(true);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('<', () => {
    const sut = new Term(Key.of('A'), [Value.of('3')], [], '<');
    expect(sut.operate(map('A', '2'))).toBe(true);
    expect(sut.operate(map('A', '3'))).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('<=', () => {
    const sut = new Term(Key.of('A'), [Value.of('3')], [], '<=');
    expect(sut.operate(map('A', '3'))).toBe(true);
    expect(sut.operate(map('A', '4'))).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('LIKE', () => {
    const sut = new Term(Key.of('A'), [Value.of('a.*')], [], 'LIKE');
    expect(sut.operate(map('A', 'aaa'))).toBe(true);
    expect(sut.operate(map('A', 'bbb'))).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

test('IN', () => {
    const sut = new Term(
        Key.of('A'),
        [Value.of('aaa'), Value.of('bbb')],
        [],
        'IN'
    );
    expect(sut.operate(map('A', 'aaa'))).toBe(true);
    expect(sut.operate(map('A', 'bbb'))).toBe(true);
    expect(sut.operate(map('A', 'ccc'))).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true); // no key matched, true
});

function map(key: string, value: string): Map<Key, Value> {
    return new Map().set(Key.of(key), Value.of(value));
}
