import * as P from './parser/parser';

test('taest', () => {
    const sut = new P.Parser('A:A1\nIF [A]="A1" THEN [A]="A2";').parse();

    sut.setRandomSeed(Math.floor(Math.random() * 10000));
    sut.setFactorCount(1);
    const actual = sut.testCases();
    console.log(actual.toString());
    expect(true).toBe(true);
});
