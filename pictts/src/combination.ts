import { Constraint } from './constraint/constraint';
import { Key, KeyValueMap, map, Value } from './keyvalue';
import { matchAllConstraints } from './constraint/constraint';

export class Combinations {
    keys: Key[];
    uncovered: KeyValueMap[] = [];
    covered: KeyValueMap[] = [];
    excluded: KeyValueMap[] = [];
    all: KeyValueMap[] = [];

    // all combinations already applied, true
    done = false;
    constructor(keys: Key[]) {
        this.keys = keys;
    }

    applyConstraints(constraints: Constraint[]): void {
        // filter only constraints matched slot
        const matched = this.all.filter((v) =>
            matchAllConstraints(constraints, v)
        );
        const impossibles = this.all.filter(
            (v) => !matchAllConstraints(constraints, v)
        );

        this.uncovered = matched;
        this.excluded = impossibles;
        if (this.uncovered.length === 0) {
            this.done = true;
        }
    }

    push(combination: KeyValueMap): void {
        this.all.push(combination);
    }

    markAsImpossible(target: KeyValueMap): void {
        this.removeFromUncovered(target);
        this.excluded.push(target);
        if (this.uncovered.length == 0) {
            this.done = true;
        }
    }

    removeFromUncovered(target: KeyValueMap): void {
        const cache = this.uncovered.filter((c) => {
            return !this.equalsAllElements(c, target);
        });

        this.uncovered = cache;
        if (this.uncovered.length === 0) {
            this.done = true;
        }
    }

    markAsUsed(target: KeyValueMap): void {
        this.removeFromUncovered(target);
        this.covered.push(target);
    }

    private equalsAllElements(
        target1: KeyValueMap,
        target2: KeyValueMap
    ): boolean {
        if (target1 === undefined || target2 === undefined) {
            return target1 === target2;
        }

        return target1 === target2;
    }
}

/**
 * All combination by multiple params.
 *
 * Ex. Values is `{'A':['a','b','c'], 'X':['x','y','z'], 'N':['1','2','3']}` and keys is ['A', 'X'],
 * return [['a','x'],['a','y'],['a','z'],['b','x'],['b','y'],['b','z'],['c','x'],['c','y'],['c','z']]
 * @param keys this method build combination by only this keys
 * @param kvs origin
 */
export function allCombinationsByMultipleArray(
    keys: Key[],
    kvs: Map<Key, Value[]>
): Combinations {
    const result = new Combinations(keys);

    // keys to values. ex.[['a','b','c'],['x','y','z']]
    const params = keys.map((k) => {
        return kvs.get(k) as Value[];
    });
    iAllCombinationsByMultipleArray(keys, params, 0, [], result);
    return result;
}

/**
 * Internal method for allCombinationsByMultipleArray
 * @param keys
 * @param parameters all parameters. This parameters index is same as keys.
 * @param keyIndex depth of recursive call
 * @param tmp building combination
 * @param result final result
 */
function iAllCombinationsByMultipleArray(
    keys: Key[],
    parameters: Value[][],
    keyIndex: number,
    tmp: Value[],
    result: Combinations
) {
    // it means tmp has all values of keys
    if (keyIndex == keys.length) {
        result.push(
            // temp lost key information so rebuild map
            tmp.reduce((acc, v, i) => {
                return KeyValueMap.set(acc, keys[i], v);
            }, KeyValueMap.empty())
        );
        return;
    }

    parameters[keyIndex].forEach((p) => {
        tmp[keyIndex] = p;
        iAllCombinationsByMultipleArray(
            keys,
            parameters,
            keyIndex + 1,
            tmp,
            result
        );
    });
}

/**
 * Return all values combination.
 *
 * ex. values is `['a','b','c']` and factorCount is 2, return `[['a','b'],['a','c'],['b','c']]`.
 * @param array
 * @param factorCount
 */
export function combinationsBySingleArray(
    array: Key[],
    factorCount: number
): Key[][] {
    const result = new Array<Array<Key>>();
    iCombinationsBySingleArray(array, [], factorCount, 0, result);
    return result;
}

function iCombinationsBySingleArray(
    input: Key[],
    tmp: Key[],
    factorCount: number,
    depth: number,
    result: Key[][]
) {
    input.forEach((v, i) => {
        tmp[depth] = v;
        if (depth === factorCount - 1) {
            result.push(Array.from(tmp));
            return;
        }

        return iCombinationsBySingleArray(
            input.slice(i + 1, input.length),
            tmp,
            factorCount,
            depth + 1,
            result
        );
    });
}

/**
 * Get longest size combinations(but done is low primary).
 * Result never contains excludeList.
 *
 * @param excludeList
 * @param cs has key and value list
 */
export function longestCombination(
    excludeList: Key[][],
    cs: Combinations[]
): Combinations {
    const equalsKeys = (key1: Key[], key2: Key[]): boolean => {
        for (let index = 0; index < key1.length; index++) {
            if (key2.indexOf(key1[index]) === -1) {
                return false;
            }
        }

        return true;
    };

    // filter excludeList
    const contains = (target: Key[], keyList: Key[][]): boolean => {
        return keyList.filter((k) => equalsKeys(target, k)).length !== 0;
    };
    let nonUsed = cs;
    if (excludeList.length !== 0) {
        nonUsed = cs.filter((c) => {
            return !contains(c.keys, excludeList);
        });
    }

    const withoutDone = nonUsed.filter((e) => !e.done);
    if (withoutDone.length !== 0) {
        // if there are not done combinations, return it
        return withoutDone.reduce((b, a) => {
            return b.uncovered.length >= a.uncovered.length ? b : a;
        });
    }

    // if there are no not done combinations, return done it.
    return nonUsed.reduce((b, a) => {
        return b.uncovered.length >= a.uncovered.length ? b : a;
    });
}
