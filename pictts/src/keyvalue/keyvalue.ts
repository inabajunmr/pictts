import { combinationsBySingleArray } from '../combination';
import { Key } from './key';
import { Value } from './value';

export class KeyValueMap {
    private source: Map<Key, Value> = new Map();
    static cache = new Map<string, KeyValueMap>();

    private static fromCache(map: KeyValueMap) {
        const cacheKey = map.cacheKey();
        const cache = this.cache.get(cacheKey);
        if (cache !== undefined) {
            return cache;
        }
        this.cache.set(cacheKey, map);
        return map;
    }

    static empty(): KeyValueMap {
        return this.fromCache(new KeyValueMap());
    }

    static of(key: Key, value: Value): KeyValueMap {
        const map = new KeyValueMap();
        map.source.set(key, value);
        return this.fromCache(map);
    }

    static set(map: KeyValueMap, key: Key, value: Value): KeyValueMap {
        const kv = new KeyValueMap();
        kv.source = new Map(map.source);
        kv.source.set(key, value);
        return this.fromCache(kv);
    }

    entries(): [Key, Value][] {
        return Array.from(this.source);
    }

    size(): number {
        return this.source.size;
    }

    get(key: Key): Value | undefined {
        return this.source.get(key);
    }

    has(key: Key): boolean {
        return this.source.has(key);
    }

    keys(): IterableIterator<Key> {
        return this.source.keys();
    }

    cacheKey(): string {
        return JSON.stringify(
            Array.from(this.source).sort((a, b) => {
                if (a[0].key > b[0].key) {
                    return 1;
                } else {
                    return -1;
                }
            })
        );
    }

    /**
     * All combinations in Map by specified order.
     *
     * If Map={'A','A1','B','B1','C','C1'} and order=2,
     * result=[{'A','A1','B','B1'},{'A','A1','C','C1'},{'B','B1','C','C1'}]
     * @param order
     */
    allCombinations(order: number): KeyValueMap[] {
        const keys = Array.from(this.source.keys());
        const b = combinationsBySingleArray(keys, order).reduce((acc, kc) => {
            const aa = kc.reduce((acc, k) => {
                return KeyValueMap.set(acc, k, this.source.get(k) as Value);
            }, KeyValueMap.empty());
            acc.push(aa);
            return acc;
        }, [] as KeyValueMap[]);

        return b;
    }

    /**
     * All this keyvalue contains argument.
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1', 'B':'B1'}, true
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1', 'B':'B1', 'C':'C1'}, true
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1', 'B':'B2', 'C':'C1'}, false
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1'}, false
     * @param m
     */
    contains(m: KeyValueMap): boolean {
        const result = Array.from(this.source.entries()).reduce((acc, kv) => {
            return acc && kv[1] === m.source.get(kv[0]);
        }, true);
        return result;
    }

    toString(): string {
        return Array.from(this.source.entries())
            .map((kv) => {
                return `${kv[0].key}:${kv[1].value}`;
            })
            .join(',');
    }
}

/**
 * contains keys1 in keys2
 * keys1:['a','b','c'], keys2:['a','b','c'] true
 * keys1:['a','b','c'], keys2:['a','b','c','d'] true
 * keys1:['a','b','c'], keys2:['a','b'] false
 * @param keys1
 * @param keys2
 */
export function containsKey1InKey2(keys1: Key[], keys2: Key[]): boolean {
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let index = 0; index < keys1.length; index++) {
        if (keys1[index] !== keys2[index]) {
            return false;
        }
    }

    return true;
}

export function map(key: string, value: string): KeyValueMap {
    return KeyValueMap.of(Key.of(key), Value.of(value));
}

export function map2(
    k1: string,
    v1: string,
    k2: string,
    v2: string
): KeyValueMap {
    let result = KeyValueMap.empty();
    result = KeyValueMap.set(result, Key.of(k1), Value.of(v1));
    result = KeyValueMap.set(result, Key.of(k2), Value.of(v2));
    return result;
}

export function map3(
    k1: string,
    v1: string,
    k2: string,
    v2: string,
    k3: string,
    v3: string
): KeyValueMap {
    let result = KeyValueMap.empty();
    result = KeyValueMap.set(result, Key.of(k1), Value.of(v1));
    result = KeyValueMap.set(result, Key.of(k2), Value.of(v2));
    result = KeyValueMap.set(result, Key.of(k3), Value.of(v3));
    return result;
}
