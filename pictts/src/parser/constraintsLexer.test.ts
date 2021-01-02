import { ConstraintsLexer } from './constrainsLexer';
import * as T from './token';

test('constraints', () => {
    const sut = new ConstraintsLexer('IF [A] = "a1";');

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.IfToken.TOKEN);
    expect(actual[1]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[1] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[2]).toBe(T.EqualToken.TOKEN);
    expect(actual[3]).toBeInstanceOf(T.StringToken);
    expect((actual[3] as T.StringToken).literal).toBe('a1');
    expect(actual[4]).toBe(T.SemicolonToken.TOKEN);
    expect(actual[5]).toStrictEqual(new T.EOFToken());
    expect(actual.length).toBe(6);
});

test('constraints2', () => {
    const sut = new ConstraintsLexer(
        `IF ([A] = "a1") AND [B] > "b1" OR [A] >= "a2" AND [B] < "b2" OR [B] <= "b1" AND [A] <> "a1"
        THEN [B] = "b1"
        ELSE [A] = "a1";`
    );

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.IfToken.TOKEN);
    expect(actual[1]).toBe(T.LParenthesesToken.TOKEN);
    expect(actual[2]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[2] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[3]).toBe(T.EqualToken.TOKEN);
    expect(actual[4]).toBeInstanceOf(T.StringToken);
    expect((actual[4] as T.StringToken).literal).toBe('a1');
    expect(actual[5]).toBe(T.RParenthesesToken.TOKEN);
    expect(actual[6]).toBe(T.AndToken.TOKEN);
    expect(actual[7]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[7] as T.ParameterNameToken).literal).toBe('B');
    expect(actual[8]).toBe(T.GreaterThanToken.TOKEN);
    expect(actual[9]).toBeInstanceOf(T.StringToken);
    expect((actual[9] as T.StringToken).literal).toBe('b1');
    expect(actual[10]).toBe(T.OrToken.TOKEN);
    expect(actual[11]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[11] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[12]).toBe(T.GreaterThanEqualToken.TOKEN);
    expect(actual[13]).toBeInstanceOf(T.StringToken);
    expect((actual[13] as T.StringToken).literal).toBe('a2');
    expect(actual[14]).toBe(T.AndToken.TOKEN);
    expect(actual[15]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[15] as T.ParameterNameToken).literal).toBe('B');
    expect(actual[16]).toBe(T.LessThanToken.TOKEN);
    expect(actual[17]).toBeInstanceOf(T.StringToken);
    expect((actual[17] as T.StringToken).literal).toBe('b2');
    expect(actual[18]).toBe(T.OrToken.TOKEN);
    expect(actual[19]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[19] as T.ParameterNameToken).literal).toBe('B');
    expect(actual[20]).toBe(T.LessThanEqualToken.TOKEN);
    expect(actual[21]).toBeInstanceOf(T.StringToken);
    expect((actual[21] as T.ParameterNameToken).literal).toBe('b1');
    expect(actual[22]).toBe(T.AndToken.TOKEN);
    expect(actual[23]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[23] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[24]).toBe(T.NotEqualToken.TOKEN);
    expect(actual[25]).toBeInstanceOf(T.StringToken);
    expect((actual[25] as T.ParameterNameToken).literal).toBe('a1');
    expect(actual[26]).toBe(T.ThenToken.TOKEN);
    expect(actual[27]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[27] as T.ParameterNameToken).literal).toBe('B');
    expect(actual[28]).toBe(T.EqualToken.TOKEN);
    expect(actual[29]).toBeInstanceOf(T.StringToken);
    expect((actual[29] as T.ParameterNameToken).literal).toBe('b1');
    expect(actual[30]).toBe(T.ElseToken.TOKEN);
    expect(actual[31]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[31] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[32]).toBe(T.EqualToken.TOKEN);
    expect(actual[33]).toBeInstanceOf(T.StringToken);
    expect((actual[33] as T.ParameterNameToken).literal).toBe('a1');
    expect(actual[34]).toBe(T.SemicolonToken.TOKEN);
    expect(actual[35]).toStrictEqual(new T.EOFToken());
    expect(actual.length).toBe(36);
});

test('constraints3', () => {
    const sut = new ConstraintsLexer(
        'IF [A] IN {"a1","a2"} AND [B] LIKE "b1" THEN [C] = "c1";'
    );

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.IfToken.TOKEN);
    expect(actual[1]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[1] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[2]).toBe(T.InToken.TOKEN);
    expect(actual[3]).toBe(T.LCurlyBraceToken.TOKEN);
    expect(actual[4]).toBeInstanceOf(T.StringToken);
    expect((actual[4] as T.StringToken).literal).toBe('a1');
    expect(actual[5]).toBe(T.CommaToken.TOKEN);
    expect(actual[6]).toBeInstanceOf(T.StringToken);
    expect((actual[6] as T.StringToken).literal).toBe('a2');
    expect(actual[7]).toBe(T.RCurlyBraceToken.TOKEN);
    expect(actual[8]).toBe(T.AndToken.TOKEN);
    expect(actual[9]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[9] as T.ParameterNameToken).literal).toBe('B');
    expect(actual[10]).toBe(T.LikeToken.TOKEN);
    expect(actual[11]).toBeInstanceOf(T.StringToken);
    expect((actual[11] as T.StringToken).literal).toBe('b1');
    expect(actual[12]).toBe(T.ThenToken.TOKEN);
    expect(actual[13]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[13] as T.ParameterNameToken).literal).toBe('C');
    expect(actual[14]).toBe(T.EqualToken.TOKEN);
    expect(actual[15]).toBeInstanceOf(T.StringToken);
    expect((actual[15] as T.StringToken).literal).toBe('c1');
    expect(actual[16]).toBeInstanceOf(T.SemicolonToken);
    expect(actual[17]).toBeInstanceOf(T.EOFToken);
    expect(actual.length).toBe(18);
});

test('constraints 4', () => {
    const sut = new ConstraintsLexer('IF [A] > 1;');

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.IfToken.TOKEN);
    expect(actual[1]).toBeInstanceOf(T.ParameterNameToken);
    expect((actual[1] as T.ParameterNameToken).literal).toBe('A');
    expect(actual[2]).toBe(T.GreaterThanToken.TOKEN);
    expect(actual[3]).toBeInstanceOf(T.NumberToken);
    expect((actual[3] as T.NumberToken).literal).toBe('1');
    expect(actual[4]).toBe(T.SemicolonToken.TOKEN);
    expect(actual[5]).toStrictEqual(new T.EOFToken());
    expect(actual.length).toBe(6);
});
