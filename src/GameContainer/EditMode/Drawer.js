import * as api from '../Drawer';
import Vec2 from '../Class/Vec2';
import constant from '../constant';

function Drawer(ctx, setting, status) {
	let mapSize = setting.mapSize;
	let map = setting.map;

	/* �M�ŵe�� */
	api.clear(ctx);

	/* ø�s�a�� */
	ctx.save();
	ctx.translate(88, 44); // �Ȯɼg��
	const w = constant.gridWidth;
	api.drawMap(ctx, mapSize, map);

	/* ø�s��ܮ� */
	const leftUpPos = (p1, p2) => (new Vec2(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y)));
	const RightDownPos = (p1, p2) => (new Vec2(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y)));

	if (status.select) {
		let luPos = leftUpPos(status.selectPair[0], status.selectPair[1]);
		let rdPos = RightDownPos(status.selectPair[0], status.selectPair[1]);
		let range = rdPos.sub(luPos).add(new Vec2(1, 1));

		ctx.beginPath();
		ctx.rect(luPos.x * w, luPos.y * w, range.x * w, range.y * w);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.closePath();
	}
	
	ctx.restore();
}

export default Drawer;