export class Pict {
    readonly parameters: Map<string, Array<string>>;
    constructor(parameters: Map<string, Array<string>>) {
        this.parameters = parameters;
    }

    private allSlotCombination(factorCount: number) {
        const keyCombinations = this.allFactorCombination(factorCount);
        keyCombinations.map((c) => this.allSlot(c)); // TODO
        // キーの組み合わせに対して全パターンの組み合わせを作る
        // keyCはa,b,cで2であれば[a,b][a,c][b,c]
        // a=[a1,a2] b=[b1,b2] c=[c1,c2]であれば[a,b]=[[a1,b1],[a1,b2],[a2,b2]]

        return;
    }

    private allSlot(keys: string[]) {
        const result = new Array<Array<string>>();

        const a = keys.map((k) => {
            return this.parameters.get(k) as string[];
        });
        this.iAllSlot(a, 0, [], result);
    }

    private iAllSlot(
        // TODO test
        parameters: string[][],
        depth: number,
        tmp: string[],
        result: string[][]
    ) {
        if (depth == parameters.length) {
            result.push(tmp);
        }

        parameters[depth].forEach((p) => {
            tmp.push(p);
            this.iAllSlot(parameters, depth + 1, tmp, result);
        });
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
