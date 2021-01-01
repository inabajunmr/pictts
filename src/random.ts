// xorshift sbfl.net/blog/2017/06/01/javascript-reproducible-random/
export class Random {
    private x: number;
    private y: number;
    private z: number;
    private w: number;

    constructor(seed = 88675123) {
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }

    // XorShift
    private iRandom() {
        const t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
    }

    random(min: number, max: number): number {
        const r = Math.abs(this.iRandom());
        return min + (r % (max + 1 - min));
    }
}
