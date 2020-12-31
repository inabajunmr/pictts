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
            this.isForce() && b.isForce()
        );
    }

    or(b: ForceBoolean): ForceBoolean {
        return new ForceBoolean(
            this.isTrue() || b.isTrue(),
            this.isForce() && b.isForce()
        );
    }
}
