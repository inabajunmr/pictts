import * as P from './parser';

test('pict', () => {
    const sut = new P.Parser(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    ).parse();
    console.log(sut.combination());
});
