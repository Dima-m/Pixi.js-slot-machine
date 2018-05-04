export default class Controller {
	constructor() {
		this.width = null;
		this.height = null;
		this.stopCount = 0;
		this.stage = new PIXI.Container();
	}

	createRenderer() {
		this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
		
		document.body.appendChild(this.renderer.view);
		
		this.renderer.render(this.stage);
	}

	stageAdd(item) {
		this.stage.addChild(item);
		this.renderer.render(this.stage);
	}

	onStartSpin() {
		this.stopCount = 0;
		this.reels.rotate(this.onEndSpin.bind(this));
	}

	onEndSpin() {
		this.stopCount++;
		if (this.stopCount === 5) {
			this.button.buttonActiveToggle();
		}
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.stage);
	}
}