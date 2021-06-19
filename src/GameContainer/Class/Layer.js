const maxLayer = 5;

export default class Layer {
    constructor(...status) { // new Layer(0, 1, 3) �гy���ڼh�� 0, 1, 3 ������
        this.status = [false, false, false, false, false];
        if (status.length !== 0) this.fill(...status);
    }
    fill(...targets) { // fill(2, 4) ��h�� 2, 4 ���� (�w�]��������) * �ݱj���л\
        if (targets.length !== 0) {
            for (let i = 0; i < targets.length; i++) {
                if (targets[i] < maxLayer && targets[i] >= 0) {
                    this.status[targets[i]] = true;
                }
            }
        } else this.status = [true, true, true, true, true];
    }
    clear(...targets) { // claer(0, 1, 3) ��h�� 0, 1, 3 �Ѱ����� (�w�]�������M��) * �ݱj��M��
        if (targets.length !== 0) {
            for (let i = 0; i < targets.length; i++) {
                if (targets[i] < maxLayer && targets[i] >= 0) {
                    this.status[targets[i]] = false;
                }
            }
        } else this.status = [false, false, false, false, false];
    }
    isOverlap(that) { // �T�{�O�_��Ӽh�ƪ���O�_���|
        for (let i = 0; i < maxLayer; i++) {
            if (this.status[i] && that.status[i]) return true;
        }
        return false;
    }
    add(that) { // �N���󪺼h���|�[ * �����ݩ�D���|����~�i�H�|�[
        if (this.isOverlap(that)) return false;
        for (let i = 0; i < maxLayer; i++) {
            if (that.status[i]) this.status[i] = true;
        }
        return true;
    }
    sub(that) { // �N���󪺼h�Ʈ���
        for (let i = 0; i < maxLayer; i++) {
            if (that.status[i]) this.status[i] = false;
        }
    } 
    clone() { 
        let status = [];
        for (let i = 0; i < maxLayer; i++) {
            if (this.status[i]) status.push(i);
        }
        return new Layer(...status);
    }
    top() { // �^�ǳQ���ڳ̰��h�Ҧb�h��
        for (let i = 0; i < maxLayer; i++) {
            if (this.status[maxLayer - 1 - i]) return maxLayer - 1 - i;
        }
        return -1;
    }
    bottom() { // �^�ǳQ���ڳ̩��h�Ҧb�h��
        for (let i = 0; i < maxLayer; i++) {
            if (this.status[i]) return i;
        }
        return -1;
    }
}
