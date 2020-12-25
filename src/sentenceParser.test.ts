import * as Token from './token';
import { SentenceParser } from './sentenceParser';

test('nextSentence', () => {
    const sut = new SentenceParser(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    const actual1 = sut.nextSentence();
    expect(actual1[1]).toBe(false);
    expect(actual1[0].tokens[0]).toStrictEqual(new Token.IdentToken('ABC X'));
    expect(actual1[0].tokens[1]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual1[0].tokens[2]).toStrictEqual(new Token.IdentToken('one'));
    expect(actual1[0].tokens[3]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual1[0].tokens[4]).toStrictEqual(new Token.IdentToken('two'));
    expect(actual1[0].tokens[5]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual1[0].tokens[6]).toStrictEqual(new Token.IdentToken('three'));
    const actual2 = sut.nextSentence();
    expect(actual2[1]).toBe(false);
    expect(actual2[0].tokens[0]).toStrictEqual(new Token.IdentToken('C C'));
    expect(actual2[0].tokens[1]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual2[0].tokens[2]).toStrictEqual(new Token.IdentToken('a'));
    expect(actual2[0].tokens[3]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual2[0].tokens[4]).toStrictEqual(new Token.IdentToken('b'));
    const actual3 = sut.nextSentence();
    expect(actual3[1]).toBe(true);
    expect(actual3[0].tokens[0]).toStrictEqual(new Token.IdentToken('選択肢'));
    expect(actual3[0].tokens[1]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual3[0].tokens[2]).toStrictEqual(new Token.IdentToken('甲'));
    expect(actual3[0].tokens[3]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual3[0].tokens[4]).toStrictEqual(new Token.IdentToken('乙'));

    // TODO size
});
