import * as Token from './token';
import { Lexer } from './lexer';

test('colon and eof token', () => {
    const sut = new Lexer(':');
    const actual = sut.tokens();
    expect(actual[0]).toBe(Token.ColonToken.TOKEN);
    expect(actual[1]).toStrictEqual(new Token.EOFToken());
});

test('comma token', () => {
    expect(new Lexer(',').tokens()[0]).toBe(Token.CommaToken.TOKEN);
});

test('ident token', () => {
    expect(new Lexer('AAA').tokens()[0]).toStrictEqual(
        new Token.IdentToken('AAA')
    );
});

test('parameter line', () => {
    const sut = new Lexer(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    const actual = sut.tokens();
    expect(actual[0]).toStrictEqual(new Token.IdentToken('ABC X'));
    expect(actual[1]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual[2]).toStrictEqual(new Token.IdentToken('one'));
    expect(actual[3]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual[4]).toStrictEqual(new Token.IdentToken('two'));
    expect(actual[5]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual[6]).toStrictEqual(new Token.IdentToken('three'));
    expect(actual[7]).toStrictEqual(Token.ReturnToken.TOKEN);
    expect(actual[8]).toStrictEqual(new Token.IdentToken('C C'));
    expect(actual[9]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual[10]).toStrictEqual(new Token.IdentToken('a'));
    expect(actual[11]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual[12]).toStrictEqual(new Token.IdentToken('b'));
    expect(actual[13]).toStrictEqual(Token.ReturnToken.TOKEN);
    expect(actual[14]).toStrictEqual(new Token.IdentToken('選択肢'));
    expect(actual[15]).toStrictEqual(Token.ColonToken.TOKEN);
    expect(actual[16]).toStrictEqual(new Token.IdentToken('甲'));
    expect(actual[17]).toStrictEqual(Token.CommaToken.TOKEN);
    expect(actual[18]).toStrictEqual(new Token.IdentToken('乙'));
    expect(actual[19]).toStrictEqual(Token.ReturnToken.TOKEN);
});

// private

test('lastChar', () => {
    const sut: any = new Lexer('abc');
    expect(sut.lastChar()).toBe(false);
    expect(sut.now).toBe('a');
    sut.nextChar();
    expect(sut.lastChar()).toBe(false);
    expect(sut.now).toBe('b');
    sut.nextChar();
    expect(sut.lastChar()).toBe(true);
    expect(sut.now).toBe('c');
});

test('readString', () => {
    const sut1: any = new Lexer('abc:');
    expect(sut1.readString()).toBe('abc');
    const sut2: any = new Lexer('abc :');
    expect(sut2.readString()).toBe('abc');
    const sut3: any = new Lexer('abc');
    expect(sut3.readString()).toBe('abc');
});

test('skipWhitespace', () => {
    const sut: any = new Lexer('   abc:');
    sut.skipWhitespace();
    expect(sut.readString()).toBe('abc');
});
