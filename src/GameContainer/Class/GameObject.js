import Vec2 from './Vec2';
import constant from '../constant';
import Layer from './Layer';

const w = constant.gridWidth;

/* �y���� */
export default class spikedBlock {
	constructor(pos) {
		this.pos = pos;

		this.detail = {
			name: 'spikedBlock'
		};

		this.layer = new Layer(3);
		this.perspective = false;
	}
	clone() {
		return Object.assign(Object.create(Object.getPrototypeOf(this)), JSON.parse(JSON.stringify(this)));
    }
	setPerspective(perspective) {
		this.perspective = perspective;
	}
	detailFunction() {
		return {
			name: {type: 'text'}
		};
    }
	draw(ctx) {
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);

		ctx.globalAlpha = (this.perspective)? 0.3: 1;
		ctx.beginPath();
		ctx.moveTo((-0.5) * w, (-0.5) * w);
		for (let i = 1; i <= 8; i++) ctx.lineTo((-0.5 + 0.125 * i) * w, (-0.5 - 0.25 * (i % 2)) * w);
		for (let i = 1; i <= 8; i++) ctx.lineTo((0.5 + 0.25 * (i % 2)) * w, (-0.5 + 0.125 * i) * w);
		for (let i = 1; i <= 8; i++) ctx.lineTo((0.5 - 0.125 * i) * w, (0.5 + 0.25 * (i % 2)) * w);
		for (let i = 1; i <= 8; i++) ctx.lineTo((-0.5 - 0.25 * (i % 2)) * w, (0.5 - 0.125 * i) * w);
		ctx.fillStyle = '#7B7B7B';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.rect(-0.5 * w, -0.5 * w, w, w);
		ctx.fillStyle = '#9D9D9D';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.closePath();

		ctx.restore();
	}
	place(map) {
		let gridPos = this.pos.sub(constant.mapStart).toGrid(constant.gridWidth);
		if ((constant.typeLayerPairs[map[gridPos.y][gridPos.x].type].isOverlap(this.layer)) ||
			(gridPos.x - 1 >= 0 && constant.typeLayerPairs[map[gridPos.y][gridPos.x - 1].type].isOverlap(this.layer)) ||
			(gridPos.y - 1 >= 0 && constant.typeLayerPairs[map[gridPos.y - 1][gridPos.x].type].isOverlap(this.layer)) ||
			(gridPos.x + 1 < constant.mapSize.x && constant.typeLayerPairs[map[gridPos.y][gridPos.x + 1].type].isOverlap(this.layer)) ||
			(gridPos.y + 1 < constant.mapSize.y && constant.typeLayerPairs[map[gridPos.y + 1][gridPos.x].type].isOverlap(this.layer))) {
			return false;
		}
		if ((map[gridPos.y][gridPos.x].layer.isOverlap(this.layer)) ||
			(gridPos.x - 1 >= 0 && map[gridPos.y][gridPos.x - 1].layer.isOverlap(this.layer)) ||
			(gridPos.y - 1 >= 0 && map[gridPos.y - 1][gridPos.x].layer.isOverlap(this.layer)) ||
			(gridPos.x + 1 < constant.mapSize.x && map[gridPos.y][gridPos.x + 1].layer.isOverlap(this.layer)) ||
			(gridPos.y + 1 < constant.mapSize.y && map[gridPos.y + 1][gridPos.x].layer.isOverlap(this.layer))) {
			return false;
		}
		map[gridPos.y][gridPos.x].layer.add(this.layer);
		if (gridPos.x - 1 >= 0) map[gridPos.y][gridPos.x - 1].layer.add(this.layer);
		if (gridPos.y - 1 >= 0) map[gridPos.y - 1][gridPos.x].layer.add(this.layer);
		if (gridPos.x + 1 < constant.mapSize.x) map[gridPos.y][gridPos.x + 1].layer.add(this.layer);
		if (gridPos.y + 1 < constant.mapSize.y) map[gridPos.y + 1][gridPos.x].layer.add(this.layer);
		return true;
	}
	remove(map) {
		let gridPos = this.pos.sub(constant.mapStart).toGrid(constant.gridWidth);
		map[gridPos.y][gridPos.x].layer.sub(this.layer);
		if (gridPos.x - 1 >= 0) map[gridPos.y][gridPos.x - 1].layer.sub(this.layer);
		if (gridPos.y - 1 >= 0) map[gridPos.y - 1][gridPos.x].layer.sub(this.layer);
		if (gridPos.x + 1 < constant.mapSize.x) map[gridPos.y][gridPos.x + 1].layer.sub(this.layer);
		if (gridPos.y + 1 < constant.mapSize.y) map[gridPos.y + 1][gridPos.x].layer.sub(this.layer);
    }
}
