import { Key, map } from './keyvalue';
import { PictResult } from './pictResult';

test('PictResult', () => {
    const sut = new PictResult([Key.of('A'), Key.of('B')]);
    sut.put(map('A', 'A1'));
    sut.put(map('B', 'B1'));
    sut.put(map('A', 'A2'));
    sut.put(map('B', 'B2'));
    sut.revert();
    console.log(''); // TODO
});
