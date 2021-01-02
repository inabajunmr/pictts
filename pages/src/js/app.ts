import * as P from 'pictts'

export function pict(input:string):P.PictResult {
    const pict = new P.Parser(input).parse();
    return pict.testCases();
}

document.getElementById("input")!.addEventListener("input", () => {
    document.getElementById("result")!.textContent = pict((document.getElementById("input") as any).value).toString()
})    
