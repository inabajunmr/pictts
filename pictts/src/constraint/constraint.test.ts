import { map, map2, map3 } from '../keyvalue/keyvalue';
import { SentenceParser } from '../parser/sentenceParser';
import { Constraint } from './constraint';

test('constraints1', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" THEN [B] = "B1";'
        ).nextConstraintsSentence()[0]
    );

    expect(sut.match(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    expect(sut.match(map('B', 'B2'))).toBe(true);
    expect(sut.match(map2('A', 'A1', 'B', 'B2'))).toBe(false);
});

test('constraints2', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" AND ([B] = "B1" OR [B] = "B2" ) THEN [C] = "C1";'
        ).nextConstraintsSentence()[0]
    );

    expect(sut.match(map2('B', 'B2', 'C', 'C2'))).toBe(true);
});

test('constraints3', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" AND ([B] = "B1" OR [B] = "B2" ) THEN [C] = "C1";'
        ).nextConstraintsSentence()[0]
    );

    // IF matched but no related THEN
    expect(sut.match(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    // IF matched and THEN matched
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C1'))).toBe(true);
    // IF matched and THEN unmatched
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C2'))).toBe(false);
    // IF unmatched
    expect(sut.match(map3('A', 'A2', 'B', 'B1', 'C', 'C2'))).toBe(true);
    // can't fix ([B] = "B1" OR [B] = "B2" ) yet so always true.
    expect(sut.match(map2('A', 'A1', 'C', 'C2'))).toBe(true);
});

test('constraints4', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" OR ([B] = "B1" OR [B] = "B2" ) THEN [C] = "C1";'
        ).nextConstraintsSentence()[0]
    );

    // IF matched but no related THEN
    expect(sut.match(map2('A', 'A1', 'B', 'B1'))).toBe(true); // A,B matched
    expect(sut.match(map2('A', 'A1', 'B', 'B3'))).toBe(true); // only A
    expect(sut.match(map2('A', 'A2', 'B', 'B1'))).toBe(true); // only B
    expect(sut.match(map2('A', 'A2', 'B', 'B1'))).toBe(true); // only B
    // IF matched and THEN matched
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C1'))).toBe(true); // A,B matched
    expect(sut.match(map3('A', 'A1', 'B', 'B3', 'C', 'C1'))).toBe(true); // only A
    expect(sut.match(map3('A', 'A2', 'B', 'B1', 'C', 'C1'))).toBe(true); // only B
    // IF matched and THEN unmatched
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C2'))).toBe(false); // A,B matched
    expect(sut.match(map3('A', 'A1', 'B', 'B3', 'C', 'C2'))).toBe(false); // only A
    expect(sut.match(map3('A', 'A2', 'B', 'B1', 'C', 'C2'))).toBe(false); // only B
    // IF unmatched
    expect(sut.match(map3('A', 'A2', 'B', 'B3', 'C', 'C2'))).toBe(true);
    // can't fix ([B] = "B1" OR [B] = "B2" ) but [A] = "A1" is true
    expect(sut.match(map2('A', 'A1', 'C', 'C2'))).toBe(false);
    // can't fix ([A] = "A1") but [B] = "B1" OR [B] = "B2" is true
    expect(sut.match(map2('B', 'B1', 'C', 'C2'))).toBe(false);
});

test('constraints5', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" AND ([B] = "B1" OR [B] = "B2" ) THEN [C] = "C1" ELSE [D] = "D1";'
        ).nextConstraintsSentence()[0]
    );

    // IF matched but no related THEN
    expect(sut.match(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    // IF matched and THEN matched
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C1'))).toBe(true);
    // IF matched and THEN unmatched
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C2'))).toBe(false);
    // IF unmatched and not related ELSE
    expect(sut.match(map3('A', 'A2', 'B', 'B1', 'C', 'C2'))).toBe(true);
    // IF unmatched and related ELSE
    expect(sut.match(map3('A', 'A2', 'B', 'B1', 'D', 'D1'))).toBe(true);
    // IF unmatched and related ELSE(but false)
    expect(sut.match(map3('A', 'A2', 'B', 'B1', 'D', 'D2'))).toBe(false);
    // can't fix ([B] = "B1" OR [B] = "B2" )
    expect(sut.match(map2('A', 'A1', 'C', 'C2'))).toBe(true);
    // can't fix ([A] = "A1")
    expect(sut.match(map2('B', 'B1', 'C', 'C2'))).toBe(true);
    // can't fix ([B] = "B1" OR [B] = "B2" ) but [A] = "A1" is false(fixed false if)
    expect(sut.match(map2('A', 'A2', 'D', 'D1'))).toBe(true);
    expect(sut.match(map2('A', 'A2', 'D', 'D2'))).toBe(false);
    // can't fix ([A] = "A1") but [B] = "B1" OR [B] = "B2" is false(fixed false if)
    expect(sut.match(map2('B', 'B3', 'D', 'D1'))).toBe(true);
    expect(sut.match(map2('B', 'B3', 'D', 'D2'))).toBe(false);
});

test('constraints6', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" THEN [B] IN {"B1","B2"};'
        ).nextConstraintsSentence()[0]
    );

    // IF matched and THEN matched
    expect(sut.match(map2('A', 'A1', 'B', 'B1'))).toBe(true);
    expect(sut.match(map2('A', 'A1', 'B', 'B2'))).toBe(true);
    // IF matched and THEN matched and unrelated
    expect(sut.match(map3('A', 'A1', 'B', 'B1', 'C', 'C1'))).toBe(true);
    // IF matched and THEN unmatched
    expect(sut.match(map3('A', 'A1', 'B', 'B3', 'C', 'C2'))).toBe(false);
    expect(sut.match(map2('A', 'A1', 'B', 'B3'))).toBe(false);
});
