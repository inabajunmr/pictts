import * as C from './combination';
import { Key, Value } from './keyvalue';
import { Random } from './random';
export class Pict {
    random: Random = new Random();
    readonly parameters: Map<Key, Value[]>;
    factorCount = 2;
    constructor(parameters: Map<Key, Value[]>) {
        this.parameters = parameters;
    }

    setFactorCount(factorCount: number): Pict {
        this.factorCount = factorCount;
        return this;
    }

    setSeed(seed: number): void {
        this.random = new Random(seed);
    }

    /**
     * Create all test case
     */
    testCases(): PictResult {
        const keys: Key[] = [];
        this.parameters.forEach((_, k) => {
            keys.push(k);
        });

        // create all slots for all key combination
        const keyCombinations = C.combinationsBySingleArray(
            keys,
            this.factorCount
        );
        const allCombinations: C.Combinations[] = [];
        keyCombinations.forEach((kc) => {
            const combinations = C.allCombinationsByMultipleArray(
                kc,
                this.parameters
            );
            allCombinations.push(combinations);
        });

        // consume slots and assemble results
        const result = new PictResult(keys);
        while (
            (this.allDone(allCombinations) && result.nowKey().length === 0) ===
            false
        ) {
            // get next slot from longest combinations
            const exceptKeys = result.nowKey();
            const longest = C.longestCombination(exceptKeys, allCombinations);
            const suitable = this.nextSlot(longest, result.nowLine());

            // if result already has suitable, skip it
            if (result.contains(longest.keys, suitable) && !longest.done) {
                // suitableはマッチしてないけどcontainsの場合はつぶす
                longest.remove(suitable);
                continue;
            }

            // TODO nowLineにマッチしないスロットがsuitableで返ってくることがあるが、そのスロットが使用済みになってしまう
            // set next slot to result
            const line = result.nowLine();
            for (let index = 0; index < longest.keys.length; index++) {
                if (line.get(longest.keys[index]) === undefined) {
                    line.set(longest.keys[index], suitable[index]);
                }
            }
        }

        return result.clean();
    }

    allDone(c: C.Combinations[]): boolean {
        return (
            c.filter((c) => {
                return !c.done;
            }).length === 0
        );
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
    nextSlot(combinations: C.Combinations, line: Map<Key, Value>): Value[] {
        if (combinations.allCombinations.length === 1) {
            combinations.done = true;
            return combinations.allCombinations[0];
        }

        if (line.size === 0) {
            const a = combinations.allCombinations.shift() as Value[];
            return a;
        }

        const alreadyExistedKeys: Key[] = [];
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

        const result = suitables[this.random.random(0, suitables.length - 1)];
        // let result = suitables[Math.floor(Math.random() * suitables.length)];
        if (result === undefined) {
            return combinations.allCombinations[0];
        }

        // when other combinations are remaining after all combinations are used, any combination is used for others.
        if (combinations.allCombinations.length === 1) {
            combinations.done = true;
            return result;
        }

        combinations.remove(result);

        return result;
    }

    equalsAllElements<T>(array1: T[], array2: T[]): boolean {
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
    private readonly keys: Key[];
    result = new Array<Map<Key, Value>>();

    constructor(keys: Key[]) {
        this.keys = keys;
    }

    newLine(): boolean {
        const line = this.result[this.result.length - 1];

        if (line === undefined) {
            return true;
        }

        return line.size === this.keys.length;
    }

    nowKey(): Key[] {
        return Array.from(this.nowLine().keys());
    }

    nowLine(): Map<Key, Value> {
        if (this.newLine()) {
            this.result.push(new Map<Key, Value>());
        }

        return this.result[this.result.length - 1];
    }

    contains(keys: Key[], values: Value[]) {
        if (values == undefined) {
            console.log();
        }
        return (
            this.result.filter((r) => {
                let contains = true;
                keys.filter((k, i) => {
                    if (r.get(k) !== values[i]) {
                        contains = false;
                    }
                });
                return contains;
            }).length !== 0
        );
    }

    clean(): PictResult {
        this.result = this.result.filter((v) => v.size !== 0);
        return this;
    }

    toString(delimiter = ','): string {
        let result = this.keys.map((k) => k.key).join(delimiter) + '\n';

        this.result.forEach((c) => {
            const array: Value[] = [];
            this.keys.forEach((k) => {
                array.push(c.get(k) as Value);
            });
            result += array.map((v) => v.value).join(delimiter) + '\n';
        });
        return result;
    }
}
