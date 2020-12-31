import * as C from './combination';
import { Constraint } from './constraint/constraint';
import { Key, Value } from './keyvalue';
import { Random } from './random';
import { EvaluatorException } from './exception';
export class Pict {
    random: Random = new Random();
    readonly parameters: Map<Key, Value[]>;
    readonly constraints: Constraint[];
    factorCount = 2;
    constructor(parameters: Map<Key, Value[]>, constraints: Constraint[]) {
        this.parameters = parameters;
        this.constraints = constraints;
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
        const allCombinations: C.Combinations[] = this.buildAllCombinations(
            keyCombinations
        );

        // consume slots and assemble results
        const result = new PictResult(keys);
        while (
            (this.allDone(allCombinations) && result.nowKey().length === 0) ===
            false
        ) {
            // get next slot from longest combinations
            const exceptKeys = result.nowKey();
            const longest = C.longestCombination(exceptKeys, allCombinations);

            // TODO constraints for nextSlot
            // workingでマッチせずallからとってくるが、resultに全部含まれているとスキップされてremoveもされないのでループする
            const [suitable, fromAll] = this.nextSlot(
                longest,
                result.nowLine()
            );

            // if result already has suitable, skip it
            if (
                result.contains(longest.keys, suitable) &&
                !longest.done &&
                !fromAll
            ) {
                longest.remove(suitable);
                continue;
            }

            // set next slot to result
            const line = result.nowLine();

            Array.from(suitable.keys()).forEach((k) => {
                if (line.get(k) === undefined) {
                    line.set(k, suitable.get(k) as Value);
                }
            });
        }

        return result.clean();
    }

    buildAllCombinations(keyCombinations: Key[][]): C.Combinations[] {
        const allCombinations: C.Combinations[] = [];
        keyCombinations.forEach((kc) => {
            const combinations = C.allCombinationsByMultipleArray(
                kc,
                this.parameters
            );

            // use only constraints matched combinations
            if (this.constraints.length !== 0) {
                combinations.workingCombinations = combinations.workingCombinations.filter(
                    (v) => {
                        return (
                            this.constraints.filter((c) => !c.match(v))
                                .length === 0
                        );
                    }
                );
            }

            combinations.allCombinations = Array.from(
                combinations.workingCombinations
            );
            allCombinations.push(combinations);
        });
        return allCombinations;
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
    nextSlot(
        combinations: C.Combinations,
        line: Map<Key, Value>
    ): [Map<Key, Value>, boolean] {
        if (combinations.workingCombinations.length === 1) {
            combinations.done = true;
            return [combinations.workingCombinations[0], false];
        }

        if (line.size === 0) {
            return [
                combinations.workingCombinations.shift() as Map<Key, Value>,
                false,
            ];
        }

        const alreadyExistedKeys: Key[] = [];
        combinations.keys.forEach((k) => {
            const v = line.get(k);
            if (v !== undefined) {
                alreadyExistedKeys.push(k);
            }
        });

        let suitables = this.matchedSlot(
            combinations.workingCombinations,
            line,
            alreadyExistedKeys
        );

        let fromAll = false;
        if (suitables.length === 0) {
            fromAll = true;
            suitables = this.matchedSlot(
                combinations.allCombinations,
                line,
                alreadyExistedKeys
            );
        }

        if (suitables.length === 0) {
            throw new EvaluatorException(
                'This constraints is something wrong.'
            );
        }

        let result = suitables[this.random.random(0, suitables.length - 1)];
        if (result === undefined) {
            result = combinations.workingCombinations[0];
        }

        // when other combinations are remaining after all combinations are used, any combination is used for others.
        if (combinations.workingCombinations.length === 1) {
            combinations.done = true;
            return [result, fromAll];
        }

        combinations.remove(result);

        return [result, fromAll];
    }

    matchedSlot(
        combinations: Map<Key, Value>[],
        line: Map<Key, Value>,
        alreadyExistedKeys: Key[]
    ): Map<Key, Value>[] {
        const suitables = combinations.filter((c) => {
            let all = true;
            alreadyExistedKeys.forEach((k) => {
                const v = line.get(k);
                if (v !== c.get(k)) {
                    all = false;
                }
            });
            return all;
        });

        if (this.constraints.length === 0) {
            return suitables;
        }

        return suitables.filter(
            (s) => this.constraints.filter((c) => !c.match(s)).length === 0
        );
    }
}

class PictResult {
    private readonly keys: Key[];
    result: Map<Key, Value>[] = [];

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

    contains(keys: Key[], values: Map<Key, Value>) {
        if (values == undefined) {
            console.log();
        }
        return (
            this.result.filter((r) => {
                let contains = true;
                keys.filter((k) => {
                    if (r.get(k) !== values.get(k)) {
                        contains = false;
                    }
                });
                return contains;
            }).length !== 0
        );
    }

    clean(): PictResult {
        // clean duplicated // TODO maybe it's not optimized
        for (let i = 0; i < this.result.length; i++) {
            const r1 = this.result[i];
            for (let j = i + 1; j < this.result.length; j++) {
                const r2 = this.result[j];
                if (this.equalsMap(r1, r2)) {
                    this.result[j] = new Map();
                }
            }
        }
        // clean no element map
        this.result = this.result.filter((v) => v.size !== 0);

        return this;
    }

    equalsMap<K, V>(m1: Map<K, V>, m2: Map<K, V>): boolean {
        if (m1.size !== m2.size) {
            return false;
        }

        return (
            Array.from(m1.keys()).filter((k) => m1.get(k) !== m2.get(k))
                .length === 0
        );
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
