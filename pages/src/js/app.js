var pictts = require("pictts")
var pict = new pictts.Parser(
`
A:A1,A2
B:B1,B2
`
).parse();
var testCases = pict.testCases();
alert(testCases.toString());