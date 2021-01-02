export class ForceBoolean {
    private readonly force: boolean;
    private readonly value: boolean;
    constructor(value: boolean, force: boolean) {
        this.force = force;
        this.value = value;
    }

    isTrue(): boolean {
        return this.value;
    }

    isForce(): boolean {
        return this.force;
    }

    flip(): ForceBoolean {
        return new ForceBoolean(!this.value, this.force);
    }

    and(b: ForceBoolean): ForceBoolean {
        return new ForceBoolean(
            this.isTrue() && b.isTrue(),
            // if either this or b is false, this bool is always false so force is disabled.
            (this.isForce() || b.isForce()) && this.isTrue() && b.isTrue()
        );
    }

    or(b: ForceBoolean): ForceBoolean {
        return new ForceBoolean(
            this.isTrue() || b.isTrue(),
            this.isForce() && b.isForce()
        );
    }
}
