import * as C from './combination';
import { Constraint } from './constraint/constraint';
import { Key, Value } from './keyvalue';
import { Random } from './random';
import { PictResult } from './pictResult';
export class Pict {
    random: Random = new Random();
    readonly parameters: Map<Key, Value[]>;
    readonly constraints: Constraint[];
    readonly impossibles: Map<Key, Value>[] = [];
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
            const exceptKeys = result.nowKey(); // if longest combinations is the same as result, it will be skipped.
            const [suitable, longest, fromAll] = this.nextSlot(
                allCombinations,
                exceptKeys,
                [exceptKeys],
                result.nowLine(),
                result
            );

            if (suitable.size == 0) {
                continue;
            }

            // if result already has suitable, skip it
            if (result.contains(suitable) && !longest.done && !fromAll) {
                longest.removeFromWorking(suitable);
                continue;
            }

            // set next slot to result
            result.put(suitable);
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
        allCombinations: C.Combinations[],
        exceptKeys: Key[],
        usedKeyCombinations: Key[][],
        line: Map<Key, Value>,
        result: PictResult
    ): [Map<Key, Value>, C.Combinations, boolean] {
        const combinations = C.longestCombination(
            exceptKeys,
            usedKeyCombinations,
            allCombinations
        );
        usedKeyCombinations.push(combinations.keys);

        if (combinations.workingCombinations.length === 1) {
            combinations.done = true;
            return [combinations.workingCombinations[0], combinations, false];
        }

        if (line.size === 0) {
            return [
                combinations.workingCombinations.shift() as Map<Key, Value>,
                combinations,
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
            if (allCombinations.length !== usedKeyCombinations.length) {
                // using next combinations
                return this.nextSlot(
                    allCombinations,
                    exceptKeys,
                    usedKeyCombinations,
                    line,
                    result
                );
            }

            // all slot in all combinations aren't matched so current line is impossible
            // TODO impossibleの重複は消したい
            this.impossibles.push(line);

            // reput revert to matched combination
            const revert = result.revert();
            allCombinations
                .filter((c) => {
                    return c.keys.filter((k) => !revert.has(k)).length === 0;
                })[0]
                .allCombinations.push(revert);

            if (this.factorCount === line.size) {
                const revertTarget = allCombinations.filter((c) => {
                    return (
                        c.keys.filter((k) => {
                            return revert.has(k) === false;
                        }).length === 0
                    );
                })[0];

                revertTarget.removeFromWorking(line);
                revertTarget.removeFromAll(line);
            }

            return [new Map<Key, Value>(), combinations, false];
        }

        let nextSlot = suitables[this.random.random(0, suitables.length - 1)];
        if (nextSlot === undefined) {
            nextSlot = combinations.workingCombinations[0];
        }

        // when other combinations are remaining after all combinations are used, any combination is used for others.
        if (combinations.workingCombinations.length === 1) {
            combinations.done = true;
            return [nextSlot, combinations, fromAll];
        }

        combinations.removeFromWorking(nextSlot);

        return [nextSlot, combinations, fromAll];
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

        const constraintsFiltered = suitables.filter((s) => {
            const merge = new Map(s);

            Array.from(line).forEach((k) => {
                merge.set(k[0], k[1]);
            });
            return this.constraints.filter((c) => !c.match(merge)).length === 0;
        });

        if (this.impossibles.length === 0) {
            return constraintsFiltered;
        }

        const mapEquals = (
            m1: Map<Key, Value>,
            m2: Map<Key, Value>
        ): boolean => {
            if (m1.size !== m2.size) {
                return false;
            }

            let result = true;
            Array.from(m1.keys()).forEach((k) => {
                if (m1.get(k) !== m2.get(k)) {
                    result = false;
                }
            });

            return result;
        };

        const contains = (target: Map<Key, Value>, maps: Map<Key, Value>[]) => {
            return maps.filter((m) => mapEquals(m, target)).length !== 0;
        };

        return constraintsFiltered.filter((c) => {
            return !contains(c, this.impossibles);
        });
    }
}
