import * as C from './combination';
import { Constraint, matchAllConstraints } from './constraint/constraint';

import { containsKey1InKey2, Key, KeyValueMap, Value } from './keyvalue';
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
    readonly impossibleCombinations: KeyValueMap[] = [];

    // If PAIRwise, 2. If TRIOwise, 3
    factorCount = 2;

    power = 1;

    constructor(parameters: Map<Key, Value[]>, constraints: Constraint[]) {
        this.parameters = parameters;
        this.constraints = constraints;
    }

    pushImpossibles(impossible: KeyValueMap): void {
        if (
            this.impossibleCombinations.filter((i) => i === impossible)
                .length === 0
        ) {
            this.impossibleCombinations.push(impossible);
        }
    }

    setFactorCount(factorCount: number): Pict {
        this.factorCount = factorCount;
        return this;
    }

    setRandomSeed(seed: number): void {
        this.random = new Random(seed);
    }

    setPower(power: number): Pict {
        this.power = power;
        return this;
    }

    testCases(): PictResult {
        let min = this.itestCases();
        for (let index = 0; index < this.power - 1; index++) {
            const next = this.itestCases();
            if (next.result.length < min.result.length) {
                min = next;
            }
        }
        return min;
    }

    /**
     * Create all test case
     */
    itestCases(): PictResult {
        const keys: Key[] = [];
        this.parameters.forEach((_, k) => {
            keys.push(k);
        });

        // create all slots for all key combination
        const keyCombinations = C.combinationsBySingleArray(
            keys,
            this.factorCount
        );

        // create all slot(by factor count)
        const allCombinations: C.Combinations[] = this.buildAllSlot(
            keyCombinations
        );
        allCombinations.forEach((c) => c.applyConstraints(this.constraints));

        // consume slots and assemble results
        const result = new PictResult(keys, this.factorCount);
        while (
            (this.allDone(allCombinations) && result.nowKey().length === 0) ===
            false
        ) {
            // get next slot from longest combinations
            const exceptKeys = result.nowKey(); // if longest combinations is the same as result, it will be skipped.
            const [suitable, fromAll] = this.nextSlot(
                allCombinations,
                [exceptKeys],
                result.nowLine(),
                result
            );

            if (suitable.size == 0) {
                continue;
            }

            // if result already has suitable, skip it
            if (result.contains(suitable) && !fromAll) {
                continue;
            }

            // set next slot to result
            result.put(suitable);
        }

        result.clean();

        // assertion
        result.setSlots(allCombinations);
        result.assert();

        return result;
    }

    buildAllSlot(keyCombinations: Key[][]): C.Combinations[] {
        return keyCombinations.reduce((acc, kc) => {
            const combinations = C.allCombinationsByMultipleArray(
                kc,
                this.parameters
            );

            acc.push(combinations);
            return acc;
        }, [] as C.Combinations[]);
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
    ): [KeyValueMap, boolean] {
        // choice next keys combination
        const combinations = C.longestCombination(
            usedKeyCombinations,
            allCombinations
        );
        usedKeyCombinations.push(combinations.keys);

        if (line.size === 0) {
            // next line equals combinations.workingCombinations[0]
            // workingCombinations already omitted constraints violation
            const result = this.random.randomElement(
                combinations.workingCombinations
            );
            combinations.removeFromWorking(result);
            return [result, false];
        }

        // from working
        let suitables = this.matchedSlot(
            combinations.workingCombinations,
            line
        );

        let fromAll = false;
        if (suitables.length === 0) {
            // if all working aren't matched, from all
            fromAll = true;
            suitables = this.matchedSlot(combinations.validCombinations, line);
        }

        if (suitables.length === 0) {
            if (allCombinations.length !== usedKeyCombinations.length) {
                // find other combinations
                return this.nextSlot(
                    allCombinations,
                    usedKeyCombinations,
                    line,
                    result
                );
            }

            // all slot in all combinations aren't matched so current line is impossible
            this.pushImpossibles(line);

            // pop latest
            const revert = result.revert();
            // find keys matched combinations(revert target)
            const revertTargetCombinations = allCombinations.filter((c) => {
                return containsKey1InKey2(c.keys, Array.from(revert.keys()));
            })[0];

            if (this.factorCount === line.size) {
                // minimum slot doesn't revert because it's impossible
                // mark as impossible
                revertTargetCombinations.markAsImpossible(line);
            }

            return [KeyValueMap.empty(), false];
        }

        const nextSlot = this.random.randomElement(suitables);

        // mark as used
        combinations.removeFromWorking(nextSlot);
        return [nextSlot, fromAll];
    }

    matchedSlot(combinations: KeyValueMap[], line: KeyValueMap): KeyValueMap[] {
        if (combinations.length === 0) {
            return [];
        }
        // if line has keys['A', 'B', 'C'] and combinations has keys ['A', 'C', 'D'], mutualKeys are ['A', 'C']
        // mutualKeys matched value need to be same between combinations and line
        const mutualKeys = Array.from(combinations[0].keys()).filter((k) =>
            line.has(k)
        );

        // combinations values and lines values matched in a range of mutual keys

        // filtering by impossibles
        const contains = (target: KeyValueMap, maps: KeyValueMap[]) => {
            if (maps.length === 0) {
                return false;
            }
            return maps.filter((m) => m === target).length !== 0;
        };

        const valueMatched = combinations.find((c) => {
            const allMatched = mutualKeys.reduce((acc, k) => {
                if (line.get(k) !== c.get(k)) {
                    // if at least one value don't match, this combinations is invalid
                    return false;
                }
                return acc;
            }, true);

            let merge = c;

            if (this.constraints.length === 0) {
                return allMatched;
            }

            Array.from(line).forEach((k) => {
                merge = KeyValueMap.set(merge, k[0], k[1]);
            });

            return (
                allMatched &&
                matchAllConstraints(this.constraints, merge) &&
                !contains(c, this.impossibleCombinations)
            );
        }) as KeyValueMap;

        if (valueMatched === undefined) {
            return [];
        }
        return [valueMatched];
    }
}
