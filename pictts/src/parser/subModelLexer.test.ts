import { SubModelLexer } from './subModelLexer';
import * as T from './token';

test('subModel', () => {
    const sut = new SubModelLexer('{ PLATFORM, CPUS, RAM, HDD } @ 3');

    const actual = sut.tokens();

    expect(actual[0]).toBe(T.LCurlyBraceToken.TOKEN);
    expect(actual[1]).toBeInstanceOf(T.IdentToken);
    expect((actual[1] as T.IdentToken).literal).toBe('PLATFORM');
    expect(actual[2]).toBe(T.CommaToken.TOKEN);
    expect(actual[3]).toBeInstanceOf(T.IdentToken);
    expect((actual[3] as T.IdentToken).literal).toBe('CPUS');
    expect(actual[4]).toBe(T.CommaToken.TOKEN);
    expect(actual[5]).toBeInstanceOf(T.IdentToken);
    expect((actual[5] as T.IdentToken).literal).toBe('RAM');
    expect(actual[6]).toBe(T.CommaToken.TOKEN);
    expect(actual[5]).toBeInstanceOf(T.IdentToken);
    expect((actual[7] as T.IdentToken).literal).toBe('HDD');
    expect(actual[8]).toBe(T.RCurlyBraceToken.TOKEN);
    expect(actual[9]).toBe(T.AtMarkToken.TOKEN);
    expect(actual[10]).toBeInstanceOf(T.IdentToken);
    expect((actual[10] as T.IdentToken).literal).toBe('3');
    expect(actual[11]).toBeInstanceOf(T.EOFToken);
    expect(actual.length).toBe(12);
});
