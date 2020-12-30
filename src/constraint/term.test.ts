import { Key, Value } from '../keyvalue';
import { Term } from './term';

// type Relation = '=' | '<>' | '>' | '>=' | '<' | '<=' | 'LIKE' | 'IN';

test('=', () => {
    const sut = new Term(Key.of('A'), [Value.of('a1')], [], '=');
    expect(sut.operate(map('A', 'a1'))).toBe(true);
    expect(sut.operate(map('A', 'a2'))).toBe(false);
    expect(sut.operate(map('B', 'B1'))).toBe(true);
});

function map(key: string, value: string): Map<Key, Value> {
    return new Map().set(Key.of(key), Value.of(value));
}
