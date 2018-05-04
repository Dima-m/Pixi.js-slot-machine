export default class Button {
	constructor(onSpin) {
		this.onSpin = onSpin;
		this.button = null;
		this.position = {
			x: 750,
			y: 820
		};

		this.container = new PIXI.Container();
		this.active = true;

		this.initialize();
		this.bindClick();
	}
	
	initialize() {
		this.activeBtn = PIXI.loader.resources['btn_active'].texture;
		this.inactiveBtn = PIXI.loader.resources['btn_inactive'].texture;
		
		this.container.position.x = this.position.x;
		this.container.position.y = this.position.y;
		
		this.button = this.createButton();
		
		this.container.addChild(this.button);
	}

	createButton() {
		let btn = new PIXI.Sprite(this.activeBtn);
		btn.buttonMode = true;
		btn.interactive = true;
		btn.anchor.set(0.5);
		return btn;
	}
	
	bindClick() {
		this.button.on('click', this.onButtonClick.bind(this));
	}
	
	onButtonClick() {
		if (!this.active) return;
		this.buttonActiveToggle();
		this.onSpin();
	}

	buttonActiveToggle() {
		this.active = !this.active;
		this.button.texture = this.active ? this.activeBtn : this.inactiveBtn;
	}
}