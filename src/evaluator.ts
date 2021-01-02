import * as C from './combination';
import { Constraint } from './constraint/constraint';
import { Key, KeyValueMap, Value } from './keyvalue';
import { Random } from './random';
import { PictResult } from './pictResult';
export class Pict {
    random: Random = new Random();

    // like `A:A1,A2\nB:B1,B2`
    readonly parameters: Map<Key, Value[]>;
    // like `IF [A] = "A1" THEN [B] = "B1";`
    readonly constraints: Constraint[];

    // constraints sometimes never allows the combination.
    // impossibles has disallowed combinations.
    readonly impossibles: KeyValueMap[] = [];

    // If PAIRwise, 2. If TRIOwise, 3
    factorCount = 2;

    constructor(parameters: Map<Key, Value[]>, constraints: Constraint[]) {
        this.parameters = parameters;
        this.constraints = constraints;
    }

    setFactorCount(factorCount: number): Pict {
        this.factorCount = factorCount;
        return this;
    }

    setRandomSeed(seed: number): void {
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

        // create all combinations(by factor count)
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
        return keyCombinations.reduce((acc, kc) => {
            const combinations = C.allCombinationsByMultipleArray(
                kc,
                this.parameters
            );

            // filter only constraints matched combinations
            if (this.constraints.length !== 0) {
                combinations.set(
                    combinations.allCombinations.filter((v) =>
                        this.matchAllConstraints(v)
                    )
                );
            }
            acc.push(combinations);
            return acc;
        }, [] as C.Combinations[]);
    }

    matchAllConstraints(record: KeyValueMap): boolean {
        return (
            this.constraints.filter((c) => c.match(record)).length ===
            this.constraints.length
        );
    }

    allDone(c: C.Combinations[]): boolean {
        return (
            c.filter((c) => {
                return c.done;
            }).length === c.length
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
     * @param usedKeyCombinations
     * @param line
     * @param result
     */
    nextSlot(
        allCombinations: C.Combinations[],
        usedKeyCombinations: Key[][],
        line: KeyValueMap,
        result: PictResult
    ): [KeyValueMap, C.Combinations, boolean] {
        // choice next keys combination
        const combinations = C.longestCombination(
            usedKeyCombinations,
            allCombinations
        );
        usedKeyCombinations.push(combinations.keys);

        if (line.size === 0) {
            if (combinations.workingCombinations.length === 1) {
                combinations.done = true;
            }

            // next line equals combinations.workingCombinations[0]
            // workingCombinations already omitted constraints violation
            return [
                (combinations // TODO should be random but something wrong
                    .workingCombinations[0] as KeyValueMap) as KeyValueMap,
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

            return [new KeyValueMap(), combinations, false];
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
        combinations: KeyValueMap[],
        line: KeyValueMap,
        alreadyExistedKeys: Key[]
    ): KeyValueMap[] {
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
            const merge = new KeyValueMap(s);

            Array.from(line).forEach((k) => {
                merge.set(k[0], k[1]);
            });
            return this.constraints.filter((c) => !c.match(merge)).length === 0;
        });

        if (this.impossibles.length === 0) {
            return constraintsFiltered;
        }

        const contains = (target: KeyValueMap, maps: KeyValueMap[]) => {
            return maps.filter((m) => m.equals(target)).length !== 0;
        };

        return constraintsFiltered.filter((c) => {
            return !contains(c, this.impossibles);
        });
    }
}
