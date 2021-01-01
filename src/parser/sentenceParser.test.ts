import * as Token from './token';
import {
    ConstraintsSentence,
    ParametersSentence,
    SentenceParser,
} from './sentenceParser';
import { Key, Value } from '../keyvalue';

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
