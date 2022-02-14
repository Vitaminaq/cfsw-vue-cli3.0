export interface SPosition {
	x: number;
	y: number;
}
export default class ScrollPosition {
	public position: SPosition = {
		x: 0,
		y: 0
	};
	public $savePosition(position: Position) {
		return Object.assign(this.position, position);
	}
}