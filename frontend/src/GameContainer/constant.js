import Vec2 from './Class/Vec2';
import Layer from './Class/Layer';

const constant = {
	mapStart: new Vec2(88, 0), // �a�Ϫ��_�l�I��l(���W�y��)
	mapSize: new Vec2(32, 16), // �a�Ϫ�����槽
	gridWidth: 32, // �a�Ϫ��C��e��
	blockColor: '#E0E0E0', // ���~��l����
	startColor: '#DFFFDF', // �_�I��l����
	endColor: '#FFD2D2', // ���I��l����
	noneColor: '#FFFFFF', // �Ŧa��l����
	deadColor: '#EBD3E8', // �r����l����
	iceColor: '#D9FFFF', // �B����l����
	muddyColor: "#D6D6AD", // �d����l����
	boundaryColor: '#0080FF', // ��ɮ�u�C��
	auxiliaryColor: '#D2E9FF', // ���U��u�C��
	typeLayerPairs: { // �U����l���ڪ��h��
		'none': new Layer(),
		'block': new Layer(),
		'start': new Layer(0, 1, 2, 3),
		'end': new Layer(0, 1, 2, 3),
		'dead': new Layer(),
		'ice': new Layer(),
		'muddy': new Layer()
	},
	maxLayer: 5, // �̤j���ڼh��
	editObjectList: {
		platform: ['platform', 'movingPlatform', 'movingPlatform_oblique', 'movingPlatform_rect', 'trapPlatform'],
		covering: ['mucus', 'ice', 'conveyor'],
		obstacle: ['block', 'spikedBlock', 'bow', 'cymbal', 'missileBase'],
		special: ['portal', 'lockedWall', 'unlocker'],
	},
	editFrame: {
		default: { fColor: '#F0F0F0', sColor: '#BEBEBE' },
		platform: { fColor: '#ECECFF', sColor: '#CECEFF' },
		covering: { fColor: '#E8FFF5', sColor: '#96FED1' },
		obstacle: { fColor: '#FFECEC', sColor: '#FFB5B5' },
		special: { fColor: '#FFFFDF', sColor: '#FFFF37' },
    }
};

export default constant;