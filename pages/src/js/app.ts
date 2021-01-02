import * as P from 'pictts'

const pict = new P.Parser(
`
A:A1,A2
B:B1,B2
`
).parse();
const testCases = pict.testCases();
alert(testCases.toString());
