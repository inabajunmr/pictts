import * as P from 'pictts'

export function pict(input:string):P.PictResult {
    const pict = new P.Parser(input).parse();
    pict.setPower(10);
    return pict.testCases();
}

const sample = `Type:           Primary, Logical, Single, Span, Stripe, Mirror, RAID-5
Size:           10, 100, 500, 1000, 5000, 10000, 40000
Format method:  quick, slow
File system:    FAT, FAT32, NTFS
Cluster size:   512, 1024, 2048, 4096, 8192, 16384, 32768, 65536
Compression:    on, off

IF [File system] = "FAT"   THEN [Size] <= 4096 ;
IF [File system] = "FAT32" THEN [Size] <= 32000 ;`

document.getElementById("input")!.textContent = sample;
document.getElementById("result")!.textContent = pict((document.getElementById("input") as any).value).toString();

document.getElementById("input")!.addEventListener("input", () => {
    document.getElementById("result")!.textContent = pict((document.getElementById("input") as any).value).toString();
})    
