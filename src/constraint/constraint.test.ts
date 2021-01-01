import { map, map2 } from '../keyvalue';
import { SentenceParser } from '../parser/sentenceParser';
import { Constraint } from './constraint';

test('constraints1', () => {
    const sut = new Constraint(
        new SentenceParser(
            'IF [A] = "A1" THEN [B] = "B1";'
        ).nextConstraintsSentence()[0]
    );

    expect(sut.match(map('B', 'B2'))).toBe(true);
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

    expect(sut.match(map2('A', '1', 'C', 'C2'))).toBe(true);
});
