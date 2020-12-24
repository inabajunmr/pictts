import * as Token from './token';
import { Lexer } from './lexer';

test('colon and eof token', () => {
    const sut = new Lexer(':');
    expect(sut.nextToken()).toBe(Token.ColonToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.EOFToken());
});

test('comma token', () => {
    expect(new Lexer(',').nextToken()).toBe(Token.CommaToken.TOKEN);
});

test('ident token', () => {
    expect(new Lexer('AAA').nextToken()).toStrictEqual(
        new Token.IdentToken('AAA')
    );
});

test('parameter line', () => {
    const sut = new Lexer(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('ABC X'));
    expect(sut.nextToken()).toStrictEqual(Token.ColonToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('one'));
    expect(sut.nextToken()).toStrictEqual(Token.CommaToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('two'));
    expect(sut.nextToken()).toStrictEqual(Token.CommaToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('three'));
    expect(sut.nextToken()).toStrictEqual(Token.ReturnToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('C C'));
    expect(sut.nextToken()).toStrictEqual(Token.ColonToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('a'));
    expect(sut.nextToken()).toStrictEqual(Token.CommaToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('b'));
    expect(sut.nextToken()).toStrictEqual(Token.ReturnToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('選択肢'));
    expect(sut.nextToken()).toStrictEqual(Token.ColonToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('甲'));
    expect(sut.nextToken()).toStrictEqual(Token.CommaToken.TOKEN);
    expect(sut.nextToken()).toStrictEqual(new Token.IdentToken('乙'));
    expect(sut.nextToken()).toStrictEqual(Token.ReturnToken.TOKEN);
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
