import Reel from './Reel';

export default class ReelContainer {
	constructor(addToStage) {
		this.addToStage = addToStage;
		this.x = 280;
		this.y = 290;
		this.width = window.innerWidth;
		this.height = 467;
		this.delayStop = 500;
		this.columnPadding = 8;
		this.reelPositions = 5;
		this.reelIds = [0, 1, 2, 3, 4, 5];

		this.reels = Array.from({ length: 5 }, () => new Reel(this.shuffleReelIds()));
	
		this.container = new PIXI.Container();
		this.container.x = this.x;
		this.container.y = this.y;
		this.addReel();
		this.createMask();
	}

	shuffleReelIds() {
		return this.reelIds.sort(() => 0.5 - Math.random());
	}

	addReel() {
		let i;
		for (i = 0; i < this.reels.length; i++) {
			let reel = this.reels[i];
			reel.delayStop = this.delayStop * i;
			reel.container.position.x = (reel.width + this.columnPadding) * i;
			this.container.addChild(reel.container);
		}
	}
	
	rotate(fn) {
		let i;
		for (i = 0; i < this.reels.length; i++) {
			let reel = this.reels[i];
			let random = Math.floor(Math.random() * this.reelPositions);
			reel.startRotation(random, fn);
		}
	}
	
	createMask() {
		let thing = new PIXI.Graphics();
		
		thing.clear();
		thing.drawRect(this.x, this.y, this.width, this.height);
		
		this.container.mask = thing;
		this.addToStage(thing);
	}
}