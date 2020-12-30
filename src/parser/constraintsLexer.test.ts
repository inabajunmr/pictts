import { ConstraintsLexer } from './constrainsLexer';
import * as T from './token';

test('constraints', () => {
    const sut = new ConstraintsLexer('IF [A] = "a1";');

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.IfToken.TOKEN);
    expect(actual[1]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[2]).toBe(T.EqualToken.TOKEN);
    expect(actual[3]).toBeInstanceOf(T.StringToken);
    expect(actual[4]).toBe(T.SemicolonToken.TOKEN);
    expect(actual[5]).toStrictEqual(new T.EOFToken());
    expect(actual.length).toBe(6);
});

test('constraints2', () => {
    const sut = new ConstraintsLexer(
        `IF ([A] = "a1") and [B] > "b1" or [A] >= "a2" and [B] < "b2" or [B] <= "b1" [A] <> "a1"
        THEN [B] = "b1"
        ELSE [A] = "a1";`
    );

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.IfToken.TOKEN);
    expect(actual[1]).toBe(T.LParenthesesToken.TOKEN);
    expect(actual[2]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[3]).toBe(T.EqualToken.TOKEN);
    expect(actual[4]).toBeInstanceOf(T.StringToken);
    expect(actual[5]).toBe(T.RParenthesesToken.TOKEN);
    expect(actual[6]).toBe(T.AndToken.TOKEN);
    expect(actual[7]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[8]).toBe(T.GreaterThanToken.TOKEN);
    expect(actual[9]).toBeInstanceOf(T.StringToken);
    expect(actual[10]).toBe(T.OrToken.TOKEN);
    expect(actual[11]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[12]).toBe(T.GreaterThanEqualToken.TOKEN);
    expect(actual[13]).toBeInstanceOf(T.StringToken);
    expect(actual[14]).toBe(T.AndToken.TOKEN);
    expect(actual[15]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[16]).toBe(T.LessThanToken.TOKEN);
    expect(actual[17]).toBeInstanceOf(T.StringToken);
    expect(actual[18]).toBe(T.OrToken.TOKEN);
    expect(actual[19]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[20]).toBe(T.LessThanEqualToken.TOKEN);
    expect(actual[21]).toBeInstanceOf(T.StringToken);
    expect(actual[22]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[23]).toBe(T.NotEqualToken.TOKEN);
    expect(actual[24]).toBeInstanceOf(T.StringToken);
    expect(actual[25]).toBe(T.ThenToken.TOKEN);
    expect(actual[26]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[27]).toBe(T.EqualToken.TOKEN);
    expect(actual[28]).toBeInstanceOf(T.StringToken);
    expect(actual[29]).toBe(T.ElseToken.TOKEN);
    expect(actual[30]).toBeInstanceOf(T.ParameterNameToken);
    expect(actual[31]).toBe(T.EqualToken.TOKEN);
    expect(actual[32]).toBeInstanceOf(T.StringToken);
    expect(actual[33]).toBe(T.SemicolonToken.TOKEN);
    expect(actual[34]).toStrictEqual(new T.EOFToken());
    expect(actual.length).toBe(35);
});
