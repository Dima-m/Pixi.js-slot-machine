export default class Background {
	constructor() {
		this.container = new PIXI.Container();
		this.background = PIXI.loader.resources["BG"].texture;
		this.setBackground();
	}
	
	setBackground() {
		const BG = new PIXI.Sprite(this.background);
		this.container.addChild(BG);
	}
}