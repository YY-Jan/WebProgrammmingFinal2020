import Vec2 from '../Class/Vec2';
import * as GameObject from '../Class/GameObject';
import constant from '../constant';

export default function Controller(scene, status, setStatus, setting, reset) {
	const mapStart = constant.mapStart;
	const mapEnd = constant.mapStart.add(constant.mapSize.mul(constant.gridWidth));
	const w = constant.gridWidth;
	const copyable = (e, object) => (e.ctrlKey && object.type !== 'portal' && object.type !== 'lockedWall' && object.type !== 'unlocker');

	const mouseMoveHandler = (e) => {
		const mousePos = new Vec2(e.offsetX, e.offsetY);
		if (!status.holding && status.selecting && mousePos.between(mapStart, mapEnd)) {
			/* ��ϥΪ̨S���ޱ�����ɨåB���b��ܮ�l���ɭԡA�b�a�ϪŶ����Y�ɧ�s��ܽd�� */
			let selectGridPos = mousePos.sub(mapStart).toGrid(w);
			status.selectPair[1] = selectGridPos;
		} else if (status.holding) {
			/* ��ϥΪ̥��b�ޱ�����ɡA��s�����l��ƹ���l */
			if (mousePos.between(mapStart, mapEnd)) {
				/* ����b�a�Ϥ��ɥ����Y�ɮե���l */
				status.holdObject.pos = mousePos.sub(mapStart).toGrid(w).mul(w).add(mapStart.add(new Vec2(0.5 * w, 0.5 * w)));
			} else status.holdObject.pos = mousePos.clone();
		}
	};

	const mouseDownHandler = (e) => {
		const mousePos = new Vec2(e.offsetX, e.offsetY);
		if (e.button === 0) {
			if (mousePos.between(mapStart, mapEnd)) {
				/* �b�a�Ϥ����U�ƹ����� */
				if (status.holding) {
					status.holdObject.pos = mousePos.sub(mapStart).toGrid(w).mul(w).add(mapStart.add(new Vec2(0.5 * w, 0.5 * w)));
					/* ���է⪫���b�a�ϤW */
					let newStatus = { ...status };
					newStatus.holding = copyable(e, status.holdObject);
					if (status.holdObject.place(setting.map, setting.objects)) {
						setting.objects.push(status.holdObject);
					}
					newStatus.holdObject = (copyable(e, status.holdObject)) ? status.holdObject.clone() : null;
					setStatus(newStatus);
				} else {
					/* �p�G�S���b�ޱ�����h�}�l��ܮ�l�άO����b�a�ϤW������ */
					let newStatus = { ...status };
					let gridPos = mousePos.sub(mapStart).toGrid(w);
					let topLayer = setting.map[gridPos.y][gridPos.x].layer.top();
					if (topLayer !== -1) { // �N�������|�b��l�W(�u���B�z����ޱ�)
						for (let i = 0; i < setting.objects.length; i++) {
							if (setting.objects[i].gridPos.equal(gridPos) && setting.objects[i].layer.top() === topLayer) {
								newStatus.holding = true;
								newStatus.hold = false;
								newStatus.select = false;
								newStatus.selecting = false;
								if (!copyable(e, setting.objects[i])) setting.objects[i].remove(setting.map, setting.objects);
								newStatus.holdObject = (copyable(e, setting.objects[i])) ? setting.objects[i].clone() : setting.objects[i];
								newStatus.holdObject.pos = mousePos.sub(mapStart).toGrid(w).mul(w).add(mapStart.add(new Vec2(0.5 * w, 0.5 * w)));
								newStatus.holdDetail = setting.objects[i].detailFunction();
								console.log(newStatus.holdDetail);
								if (!copyable(e, setting.objects[i])) setting.objects.splice(i, 1);
								break;
							}
						}
					} else {
						newStatus.select = true;
						newStatus.selecting = true;
						newStatus.selectPair = [gridPos, gridPos];
					}
					setStatus(newStatus);
				}
			} else {
				/* �����I��a�ϥ~�h�N�@�����A�Ѱ�(�I�쪫��s��w�ҥ~) */
				let newStatus = { ...status };
				newStatus.select = false;
				newStatus.selecting = false;
				newStatus.holding = false;
				newStatus.hold = false;
				newStatus.holdObject = null;
				setStatus(newStatus);
				if (mousePos.between(new Vec2(88, 516), new Vec2(1112, 580))) {
					/* �b����s��w���I���h��o�@�ӷs����i��ޱ� */
					let objectIndex = ~~((e.offsetX - 88) / 64);
					let result = '';
					if (objectIndex === 0) result = 'stoporplay';
					else {
						const objectList = [];
						objectList.push('class platform');
						if (status.opt === 1) objectList.push(...constant.editObjectList.platform);
						objectList.push('class covering');
						if (status.opt === 2) objectList.push(...constant.editObjectList.covering);
						objectList.push('class obstacle');
						if (status.opt === 3) objectList.push(...constant.editObjectList.obstacle);
						objectList.push('class special');
						if (status.opt === 4) objectList.push(...constant.editObjectList.special);
						result = (objectList[objectIndex - 1]) ? objectList[objectIndex - 1] : '';
                    }
					switch (result) {
						case 'stoporplay':
							newStatus.active = !newStatus.active;
							reset();
							break;
						case 'class platform':
							newStatus.opt = (status.opt === 1) ? 0 : 1;
							break;
						case 'class covering':
							newStatus.opt = (status.opt === 2) ? 0 : 2;
							break;
						case 'class obstacle':
							newStatus.opt = (status.opt === 3) ? 0 :  3;
							break;
						case 'class special':
							newStatus.opt = (status.opt === 4) ? 0 : 4;
							break;
						case 'spikedBlock':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.spikedBlock(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'platform':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.platform(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'bow':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.bow(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'movingPlatform':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.movingPlatform(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'mucus':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.mucus(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'cymbal':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.cymbal(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'ice':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.ice(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'conveyor':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.conveyor(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'portal':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.portal(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'trapPlatform':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.trapPlatform(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'missileBase':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.missileBase(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'lockedWall':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.lockedWall(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'unlocker':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.unlocker(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'block':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.block(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break; 
						case 'movingPlatform_oblique':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.movingPlatform_oblique(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'movingPlatform_rect':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.movingPlatform_rect(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'woodenBox':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.woodenBox(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'magnet':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.magnet(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'brokenPlatform':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.brokenPlatform(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						case 'deathTotem':
							newStatus.holding = true;
							newStatus.holdObject = new GameObject.deathTotem(new Vec2(e.offsetX, e.offsetY));
							newStatus.holdDetail = newStatus.holdObject.detailFunction();
							newStatus.holdObject.setPerspective(true);
							break;
						default:
							break;
					}
					setStatus(newStatus);
				}
			}
		}
	}

	const mouseUpHandler = (e) => {
		const mousePos = new Vec2(e.offsetX, e.offsetY);
		if (e.button === 0 && status.select && status.selecting && mousePos.between(mapStart, mapEnd)) {
			/* �b���b��ܪ����A�U��}����T�w��ܮ�l���d���Ѱ����b��ܪ����A */
			let newStatus = { ...status };
			newStatus.selecting = false;
			let selectGridPos = mousePos.sub(mapStart).toGrid(w);
			newStatus.selectPair[1] = selectGridPos;
			setStatus(newStatus);
		} else {
			/* �_�h�b�����L���p�������Ѱ����/���b��ܪ����A */
			let newStatus = { ...status };
			newStatus.select = false;
			newStatus.selecting = false;
			setStatus(newStatus);
		}
	}

	const stopContextMenu = (e) => {
		e.preventDefault();
	};

	scene.addEventListener('mousemove', mouseMoveHandler);
	scene.addEventListener('mousedown', mouseDownHandler);
	scene.addEventListener('mouseup', mouseUpHandler);
	scene.addEventListener('contextmenu', stopContextMenu);

	return () => {
		scene.removeEventListener('mousemove', mouseMoveHandler);
		scene.removeEventListener('mousedown', mouseDownHandler);
		scene.removeEventListener('mouseup', mouseUpHandler);
		scene.removeEventListener('contextmenu', stopContextMenu);
	};
};