import * as Token from './token';
import {
    ConstraintsSentence,
    ParametersSentence,
    SentenceParser,
} from './sentenceParser';
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

test('constraints', () => {
    const sut = new SentenceParser('IF [A] = "a1";');
    const actual = sut.nextSentence();
    expect(actual[0]).toBeInstanceOf(ConstraintsSentence);
    expect(actual[1]).toBe(true);
    expect(actual[0].tokens[0]).toBe(Token.IfToken.TOKEN);
    expect(actual[0].tokens[1]).toBeInstanceOf(Token.ParameterNameToken);
    expect(actual[0].tokens[2]).toBe(Token.EqualToken.TOKEN);
    expect(actual[0].tokens[3]).toBeInstanceOf(Token.StringToken);
    expect(actual[0].tokens[4]).toBe(Token.SemicolonToken.TOKEN);
    expect(actual[0].tokens.length).toBe(5);
});

// test('parametersSentence with constraints', () => {
//     const sut = new SentenceParser(
//         `A:a1,a2
//         B:b1,b2
//         IF ([A] = "a1") and [B] > "b1" or [A] >= "a2" and [B] < "b2" or [B] <= "b1" [A] <> "a1"
//         THEN [B] = "b1"
//         ELSE [A] = "a1";`
//     );

//     const actual1 = sut.nextSentence();
//     expect(actual1[0]).toBeInstanceOf(ParametersSentence);
//     const sentence1 = actual1[0] as ParametersSentence;
//     expect(sentence1.key).toBe(Key.of('A'));
//     expect(sentence1.parameters[0]).toBe(Value.of('a1'));
//     expect(sentence1.parameters[1]).toBe(Value.of('a2'));
//     expect(sentence1.parameters.length).toBe(2);

//     const actual2 = sut.nextSentence();
//     expect(actual2[0]).toBeInstanceOf(ParametersSentence);
//     const sentence2 = actual2[0] as ParametersSentence;
//     expect(sentence2.key).toBe(Key.of('B'));
//     expect(sentence2.parameters[0]).toBe(Value.of('b1'));
//     expect(sentence2.parameters[1]).toBe(Value.of('b2'));
//     expect(sentence2.parameters.length).toBe(2);

//     const actual3 = sut.nextSentence();
//     expect(actual3[0]).toBeInstanceOf(ConstraintsSentence);
//     const sentence3 = actual3[0] as ConstraintsSentence;
//     expect(sentence3.tokens[0]).toBeInstanceOf(Token.IfToken);
//     expect(sentence3.tokens[1]).toBeInstanceOf(Token.LParenthesesToken);
//     expect(sentence3.tokens[2]).toBeInstanceOf(Token.ParameterNameToken); // TODO literal
//     expect(sentence3.tokens[3]).toBeInstanceOf(Token.EqualToken);
//     expect(sentence3.tokens[4]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[5]).toBeInstanceOf(Token.RParenthesesToken);
//     expect(sentence3.tokens[6]).toBeInstanceOf(Token.AndToken);
//     expect(sentence3.tokens[7]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[8]).toBeInstanceOf(Token.GreaterThanToken);
//     expect(sentence3.tokens[9]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[10]).toBeInstanceOf(Token.OrToken);
//     expect(sentence3.tokens[11]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[12]).toBeInstanceOf(Token.GreaterThanEqualToken);
//     expect(sentence3.tokens[13]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[14]).toBeInstanceOf(Token.AndToken);
//     expect(sentence3.tokens[15]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[16]).toBeInstanceOf(Token.LessThanToken);
//     expect(sentence3.tokens[17]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[18]).toBeInstanceOf(Token.OrToken);
//     expect(sentence3.tokens[19]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[20]).toBeInstanceOf(Token.LessThanEqualToken);
//     expect(sentence3.tokens[21]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[22]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[23]).toBeInstanceOf(Token.NotEqualToken);
//     expect(sentence3.tokens[24]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[25]).toBeInstanceOf(Token.ThenToken);
//     expect(sentence3.tokens[26]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[27]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[28]).toBeInstanceOf(Token.ElseToken);
//     expect(sentence3.tokens[29]).toBeInstanceOf(Token.ParameterNameToken);
//     expect(sentence3.tokens[30]).toBeInstanceOf(Token.StringToken);
//     expect(sentence3.tokens[31]).toBeInstanceOf(Token.SemicolonToken);
//     expect(sentence2.parameters.length).toBe(32);
// });
