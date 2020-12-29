import * as Token from './token';
import { ParametersSentence, SentenceParser } from './sentenceParser';
import { Key, Value } from '../keyvalue';

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
    expect(actual1[0].tokens.length).toBe(7);

    const actual2 = sut.nextSentence();
    expect(actual2[1]).toBe(false);
    expect(actual2[0].tokens[0]).toStrictEqual(new Token.IdentToken('C C'));
    expect(actual2[0].tokens[1]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual2[0].tokens[2]).toStrictEqual(new Token.IdentToken('a'));
    expect(actual2[0].tokens[3]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual2[0].tokens[4]).toStrictEqual(new Token.IdentToken('b'));
    expect(actual2[0].tokens.length).toBe(5);

    const actual3 = sut.nextSentence();
    expect(actual3[1]).toBe(true);
    expect(actual3[0].tokens[0]).toStrictEqual(new Token.IdentToken('選択肢'));
    expect(actual3[0].tokens[1]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual3[0].tokens[2]).toStrictEqual(new Token.IdentToken('甲'));
    expect(actual3[0].tokens[3]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual3[0].tokens[4]).toStrictEqual(new Token.IdentToken('乙'));
    expect(actual3[0].tokens.length).toBe(5);
});

test('parametersSentence', () => {
    const sut = new SentenceParser(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    const actual1 = sut.nextSentence();
    expect(actual1[0]).toBeInstanceOf(ParametersSentence);
    const sentence1 = actual1[0] as ParametersSentence;
    expect(sentence1.key).toBe(Key.of('ABC X'));
    expect(sentence1.parameters[0]).toBe(Value.of('one'));
    expect(sentence1.parameters[1]).toBe(Value.of('two'));
    expect(sentence1.parameters[2]).toBe(Value.of('three'));
    expect(sentence1.parameters.length).toBe(3);

    const actual2 = sut.nextSentence();
    expect(actual2[0]).toBeInstanceOf(ParametersSentence);
    const sentence2 = actual2[0] as ParametersSentence;
    expect(sentence2.key).toBe(Key.of('C C'));
    expect(sentence2.parameters[0]).toBe(Value.of('a'));
    expect(sentence2.parameters[1]).toBe(Value.of('b'));
    expect(sentence2.parameters.length).toBe(2);

    const actual3 = sut.nextSentence();
    expect(actual3[0]).toBeInstanceOf(ParametersSentence);
    const sentence3 = actual3[0] as ParametersSentence;
    expect(sentence3.key).toBe(Key.of('選択肢'));
    expect(sentence3.parameters[0]).toBe(Value.of('甲'));
    expect(sentence3.parameters[1]).toBe(Value.of('乙'));
    expect(sentence3.parameters.length).toBe(2);
});
