import * as P from 'pictts'

export function pict(input:string):void {
    const pict = new P.Parser(input).parse();
    var e = (document.getElementById("power")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    pict.setPower(parseInt(opt.value));
    const order = document.getElementById('order') as HTMLInputElement
    pict.setFactorCount(parseInt(order.value));

    document.getElementById("result")!.textContent = pict.testCases().toString();
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
pict((document.getElementById("input") as any).value);

document.getElementById("input")!.addEventListener("input", () => {
    pict((document.getElementById("input") as any).value);
})

document.getElementById("order")!.addEventListener("input", () => {
    pict((document.getElementById("input") as any).value);
})

document.getElementById("power")!.addEventListener("input", () => {
    pict((document.getElementById("input") as any).value);
})
