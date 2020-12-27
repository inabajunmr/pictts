import * as C from './combination';
export class Pict {
    readonly parameters: Map<string, Array<string>>;
    constructor(parameters: Map<string, Array<string>>) {
        this.parameters = parameters;
    }

    combination() {
        const keys: string[] = [];
        this.parameters.forEach((v, k) => {
            keys.push(k);
        });

        const keyCombinations = C.combinationsBySingleArray(keys, 2);
        const allCombinations: C.Combinations[] = [];
        keyCombinations.forEach((kc) => {
            const combinations = C.allCombinationsByMultipleArray(
                kc,
                this.parameters
            );
            allCombinations.push(combinations);
        });

        let a = true;
        const result = new PictResult(keys);
        while (a) {
            const exceptKeys = result.nowKey();
            const longest = C.longestCombination(exceptKeys, allCombinations);
            if (longest.allCombinations.length === 0) {
                // TODO longestが0だけど他の項目が残っているケースがある
                // 全部0じゃないとbreakしちゃだめ
                // Combinationsに完了フラグつける & nextSlotで1でとっといて全部完了フラグたってたらbreak
                a = false;
                break;
            }
            const suitable = this.nextSlot(longest, result.nowLine());

            for (let index = 0; index < longest.keys.length; index++) {
                result.nowLine().set(longest.keys[index], suitable[index]);
            }
        }
        return result;
    }

    /**
     * Get next slot
     *
     * If line has no item, return first combination in combinations.
     * If line has item, return all matched combination with line except for item without line.
     *
     * ex. combinations keys={'A','N'} and values=[['a','1'],['b','1']]
     * and line={A:'a',X:'x'},
     * return ['a','1'] because combinations.A and line.A are matched.
     * @param combinations
     * @param line
     */
    nextSlot(
        combinations: C.Combinations,
        line: Map<string, string>
    ): string[] {
        if (line.size === 0) {
            const a = combinations.allCombinations.shift() as string[];
            return a;
        }

        const alreadyExistedKeys: string[] = [];
        combinations.keys.forEach((k) => {
            const v = line.get(k);
            if (v !== undefined) {
                alreadyExistedKeys.push(k);
            }
        });
        const suitables = combinations.allCombinations.filter((c) => {
            let all = true;
            alreadyExistedKeys.forEach((k) => {
                const v = line.get(k);
                if (v !== c[combinations.keys.indexOf(k)]) {
                    all = false;
                }
            });
            return all;
        });

        const result = suitables[0]; // TODO randomize
        combinations.allCombinations = combinations.allCombinations.filter(
            (c) => {
                !this.equalsAllElements(c, result);
            }
        );

        return result;
    }

    equalsAllElements(array1: any[], array2: any[]): boolean {
        if (array1 === undefined || array2 === undefined) {
            return array2 === array1;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        for (let index = 0; index < array1.length; index++) {
            if (array1[index] !== array2[index]) {
                return false;
            }
        }

        return true;
    }
}

class PictResult {
    private readonly keys: string[];
    private readonly result = new Array<Map<string, string>>();

    constructor(keys: string[]) {
        this.keys = keys;
    }

    newLine(): boolean {
        const line = this.result[this.result.length - 1];

        if (line === undefined) {
            return true;
        }

        return line.size === this.keys.length;
    }

    nowKey(): string[] {
        return Array.from(this.nowLine().keys());
    }

    nowLine(): Map<string, string> {
        if (this.newLine()) {
            this.result.push(new Map<string, string>());
        }

        return this.result[this.result.length - 1];
    }

    put(key: string, value: string) {
        const line = this.nowLine();
        line.set(key, value);
    }
}
