import { Combinations } from './combination';
import { AssertionError } from './exception';
import { Key, KeyValueMap, Value } from './keyvalue';

export class PictResult {
    private readonly keys: Key[];

    result: KeyValueMap[] = [];

    // result snapshots
    resultHistory: KeyValueMap[][] = [];

    // put value history
    putValuesHistory: KeyValueMap[] = [];

    // for assertion
    validSlots: KeyValueMap[] = [];
    impossibleSlots: KeyValueMap[] = [];

    constructor(keys: Key[]) {
        this.keys = keys;
    }

    setSlots(combinations: Combinations[]): void {
        combinations.forEach((c) => {
            c.validCombinations.forEach((ic) => {
                this.validSlots.push(ic);
            });

            c.impossibleCombinations.forEach((ic) => {
                this.impossibleSlots.push(ic);
            });
        });
    }

    revert(): KeyValueMap {
        this.resultHistory = this.resultHistory.slice(
            0,
            this.resultHistory.length - 1
        );
        if (this.resultHistory === undefined) {
            this.resultHistory = [];
        }
        if (this.resultHistory[this.resultHistory.length - 1] === undefined) {
            this.result = [];
        } else {
            this.result = this.resultHistory[
                this.resultHistory.length - 1
            ].reduce((acc, map) => {
                acc.push(new KeyValueMap(map)); // need to other instance
                return acc;
            }, [] as KeyValueMap[]);
        }

        const latest = new KeyValueMap(
            this.putValuesHistory[this.putValuesHistory.length - 1]
        );
        this.putValuesHistory = this.putValuesHistory.slice(
            0,
            this.putValuesHistory.length - 1
        );
        if (this.putValuesHistory === undefined) {
            this.putValuesHistory = [];
        }

        return latest;
    }

    put(target: KeyValueMap): void {
        this.putValuesHistory.push(target);
        const line = this.nowLine();

        Array.from(target.keys()).forEach((k) => {
            if (line.get(k) === undefined) {
                line.set(k, target.get(k) as Value);
            }
        });

        // deepcopy
        const newHistory: KeyValueMap[] = [];
        this.result.forEach((element) => {
            newHistory.push(new KeyValueMap(element));
        });
        this.resultHistory.push(newHistory);
    }

    nowIsFull(): boolean {
        const line = this.result[this.result.length - 1];

        if (line === undefined) {
            return true;
        }

        return line.size === this.keys.length;
    }

    nowKey(): Key[] {
        return Array.from(this.nowLine().keys());
    }

    nowLine(): KeyValueMap {
        if (this.nowIsFull()) {
            this.result.push(new KeyValueMap());
        }

        return this.result[this.result.length - 1];
    }

    contains(values: KeyValueMap): boolean {
        const keys = Array.from(values.keys());
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
                    this.result[j] = new KeyValueMap();
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

    assert(): void {
        this.impossibleSlots.forEach((s) => {
            if (this.contains(s)) {
                throw new AssertionError(
                    `Contains impossible slot:${s.toString()}.`
                );
            }
        });

        this.validSlots.forEach((s) => {
            if (!this.contains(s)) {
                throw new AssertionError(
                    `Expected slot:${s.toString()} is not found.`
                );
            }
        });
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
