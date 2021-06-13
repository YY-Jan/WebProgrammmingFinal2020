/* �G���V�q class �w�q */
export default class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    init() {
        this.x = 0;
        this.y = 0;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    clone(v) {
        return new Vec2(v.x, v.y);
    }
    equal(v) {
        return (this.x === v.x && this.y === v.y);
    }
    equal(x, y) {
        return (this.x === x && this.y === y);
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    add(x, y) {
        return new Vec2(this.x + x, this.y + y);
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    sub(x, y) {
        return new Vec2(this.x - x, this.y - y);
    }
    mul(c) {
        return new Vec2(this.x * c, this.y * c);
    }
    div(c) {
        return new Vec2(this.x / c, this.y / c);
    }
    length() { 
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    unit() { // �^�ǳ��V�q
        if (this.length() === 0) return this;
        return this.div(this.length());
    }
    dot(v) { // �p�⤺�n
        return this.x * v.x + this.y * v.y;
    }
    cross(v) { // �p��~�n
        return this.x * v.y - this.y * v.x;
    }
}
