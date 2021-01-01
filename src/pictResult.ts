import { Key, Value } from './keyvalue';

export class PictResult {
    private readonly keys: Key[];

    result: Map<Key, Value>[] = [];

    // result snapshots
    resultHistory: Map<Key, Value>[][] = [];

    // put value history
    putValuesHistory: Map<Key, Value>[] = [];

    constructor(keys: Key[]) {
        this.keys = keys;
    }

    revert(): Map<Key, Value> {
        this.resultHistory = this.resultHistory.slice(
            0,
            this.resultHistory.length - 1
        );
        if (this.resultHistory === undefined) {
            this.resultHistory = [];
        }
        this.result = this.resultHistory[this.resultHistory.length - 1];
        if (this.result === undefined) {
            this.result = [];
        }
        const latest = this.putValuesHistory[this.putValuesHistory.length - 1];
        this.putValuesHistory = this.putValuesHistory.slice(
            0,
            this.putValuesHistory.length - 1
        );
        if (this.putValuesHistory === undefined) {
            this.putValuesHistory = [];
        }

        return latest;
    }

    put(target: Map<Key, Value>): void {
        this.putValuesHistory.push(target);
        const line = this.nowLine();

        Array.from(target.keys()).forEach((k) => {
            if (line.get(k) === undefined) {
                line.set(k, target.get(k) as Value);
            }
        });

        // deepcopy
        const newHistory: Map<Key, Value>[] = [];
        this.result.forEach((element) => {
            newHistory.push(new Map(element));
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

    nowLine(): Map<Key, Value> {
        if (this.nowIsFull()) {
            this.result.push(new Map<Key, Value>());
        }

        return this.result[this.result.length - 1];
    }

    contains(values: Map<Key, Value>): boolean {
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
