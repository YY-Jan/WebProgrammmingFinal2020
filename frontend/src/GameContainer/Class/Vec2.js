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
    clone() {
        return new Vec2(this.x, this.y);
    }
    equal(v) {
        return (this.x === v.x && this.y === v.y);
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
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
    ortho(v) { // ��o���V�q�b v �W�����g�v���
        if (v.length() === 0) return 0;
        return this.dot(v) / v.length() / v.length();
    }
    radian() { // �^�ǩ��ר�
        if (this.x === 0) return (this.y > 0) ? 0.5 * Math.PI : 1.5 * Math.PI;
        if (this.x > 0) return (this.y > 0) ? Math.atan(this.y / this.x) : 2 * Math.PI + Math.atan(this.y / this.x);
        return Math.PI + Math.atan(this.y / this.x);
    }
    between(v1, v2) { // �b���I��X���x�ΪŶ���
        return this.x >= Math.min(v1.x, v2.x) && this.x <= Math.max(v1.x, v2.x) && this.y >= Math.min(v1.y, v2.y) && this.y <= Math.max(v1.y, v2.y);
    }
    toGrid(w) { // �^�ǱN�y�ХH w ���e�׳���ন����y��
        return new Vec2(~~(this.x / w), ~~(this.y / w));
    }
    static up() {
        return new Vec2(0, -1);
    }
    static down() {
        return new Vec2(0, 1);
    }
    static left() {
        return new Vec2(-1, 0);
    }
    static right() {
        return new Vec2(1, 0);
    }
    static direction(dir) {
        return (dir === 'up') ? Vec2.up() : (dir === 'down') ? Vec2.down() : (dir === 'left') ? Vec2.left() : Vec2.right();
    }
    static leftUp(v1, v2) { // �^�Ǩ��I�򦨪��x�Ϊ����W�y��
        return new Vec2(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
    }
    static rightDown(v1, v2) { // �^�Ǩ��I�򦨪��x�Ϊ��k�U�y��
        return new Vec2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
    }
}
