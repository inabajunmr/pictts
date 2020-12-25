import * as P from './parser';

test('parse', () => {
    const sut = new P.Parser(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    const actual = sut.parse();
    const abcx = actual.parameters.get('ABC X') as string[];
    expect(abcx.length).toBe(3);
    expect(abcx[0]).toBe('one');
    expect(abcx[1]).toBe('two');
    expect(abcx[2]).toBe('three');

    const cc = actual.parameters.get('C C') as string[];
    expect(cc.length).toBe(2);
    expect(cc[0]).toBe('a');
    expect(cc[1]).toBe('b');

    const sentakushi = actual.parameters.get('選択肢') as string[];
    expect(sentakushi.length).toBe(2);
    expect(sentakushi[0]).toBe('甲');
    expect(sentakushi[1]).toBe('乙');
});
