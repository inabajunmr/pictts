export class Pict {
    readonly parameters: Map<string, Array<string>>;
    constructor(parameters: Map<string, Array<string>>) {
        this.parameters = parameters;
    }

    private allSlotCombination(factorCount: number) {
        const keyCombinations = this.allFactorCombination(factorCount);
        return;
    }

    private allFactorCombination(factorCount: number): string[][] {
        const parray = new Array<string>();
        for (const key in this.parameters.keys) {
            parray.push(key);
        }
        return this.bind(parray, factorCount);
    }

    private bind(input: string[], fcount: number): string[][] {
        const result = new Array<Array<string>>();
        this.ibind(input, [], fcount, 0, result);
        return result;
    }

    private ibind(
        input: string[],
        tmp: string[],
        fcount: number,
        depth: number,
        a: string[][]
    ) {
        input.forEach((v, i) => {
            tmp[depth] = v;
            if (depth === fcount - 1) {
                a.push(Array.from(tmp));
                return;
            }

            return this.ibind(
                input.slice(i + 1, input.length),
                tmp,
                fcount,
                depth + 1,
                a
            );
        });
    }
}
