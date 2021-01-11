import { SentenceParser } from './sentenceParser';

test('nextParametersSentence', () => {
    const sut = new SentenceParser(
        'ABC X : one,two, three \r\n C C:a,b\r\n\r\n  \r\n  選択肢:甲,乙\r\n'
    );
    const actual1 = sut.nextParametersSentence();
    expect(actual1[1]).toBe(false);
    expect(actual1[0].key.key).toBe('ABC X');
    expect(actual1[0].parameters[0].value).toBe('one');
    expect(actual1[0].parameters[1].value).toBe('two');
    expect(actual1[0].parameters[2].value).toBe('three');
    expect(actual1[0].parameters.length).toBe(3);

    const actual2 = sut.nextParametersSentence();
    expect(actual2[1]).toBe(false);
    expect(actual2[0].key.key).toBe('C C');
    expect(actual2[0].parameters[0].value).toBe('a');
    expect(actual2[0].parameters[1].value).toBe('b');
    expect(actual2[0].parameters.length).toBe(2);

    const actual3 = sut.nextParametersSentence();
    expect(actual3[1]).toBe(true);
    expect(actual3[0].key.key).toBe('選択肢');
    expect(actual3[0].parameters[0].value).toBe('甲');
    expect(actual3[0].parameters[1].value).toBe('乙');
    expect(actual3[0].parameters.length).toBe(2);
});

test('nextSubModelSentence', () => {
    const sut = new SentenceParser(
        `AAA:1,2,3,4
BBB:1,2,3, 4
C: 1,2,3,4
IF [A] > 1 THEN [B] = "2";
{ AAA,BBB} @2
{BBB, C } @3
        `
    );
    const actual1 = sut.nextSubModelSentence();
    expect(actual1[1]).toBe(false);
    expect(actual1[0].keys[0].key).toBe('AAA');
    expect(actual1[0].keys[1].key).toBe('BBB');
    expect(actual1[0].keys.length).toBe(2);

    const actual2 = sut.nextSubModelSentence();
    expect(actual2[1]).toBe(true);
    expect(actual2[0].keys[0].key).toBe('BBB');
    expect(actual2[0].keys[1].key).toBe('C');
    expect(actual2[0].keys.length).toBe(2);
});
