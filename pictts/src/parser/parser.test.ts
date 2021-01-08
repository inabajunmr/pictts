import { Key } from '../keyvalue/key';
import { Value } from '../keyvalue/value';
import * as P from './parser';

test('parse', () => {
    const sut = new P.Parser(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    const actual = sut.parse();
    const abcx = actual.parameters.get(Key.of('ABC X')) as Value[];
    expect(abcx.length).toBe(3);
    expect(abcx[0]).toBe(Value.of('one'));
    expect(abcx[1]).toBe(Value.of('two'));
    expect(abcx[2]).toBe(Value.of('three'));

    const cc = actual.parameters.get(Key.of('C C')) as Value[];
    expect(cc.length).toBe(2);
    expect(cc[0]).toBe(Value.of('a'));
    expect(cc[1]).toBe(Value.of('b'));

    const sentakushi = actual.parameters.get(Key.of('選択肢')) as Value[];
    expect(sentakushi.length).toBe(2);
    expect(sentakushi[0]).toBe(Value.of('甲'));
    expect(sentakushi[1]).toBe(Value.of('乙'));
});
