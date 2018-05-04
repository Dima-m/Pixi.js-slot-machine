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
		this.textStyle = {
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: '76px',
			"fill": [
				"#7979c4",
				"#e1e1e1"
			],
			stroke: '#4a1850',
			strokeThickness: 5,
			wordWrap: true,
			wordWrapWidth: 440
		};

		this.reelIds = [4, 5, 3, 2, 0, 1];

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
		this.finalResult = [];

		if (this.text && this.text.text) {
			this.text.text = ''
		};

		for (i = 0; i < this.reels.length; i++) {
			let reel = this.reels[i];
			let random = Math.floor(Math.random() * this.reelPositions);
			reel.startRotation(random, fn);
			this.finalResult.push(reel.result);
		}
	}

	checkResult(result, length) {
		let count = 0,
			value = result;
		
		return result.some(a => {
			if (value !== a) {
				count = 0;
				value = a;
			}
			return ++count === length;
		});
	}

	checkRows(result) {
		let middleRow = result.map(res => res.middleRow);
		let firstRow = result.map(res => res.firstRow);
		let lastRow = result.map(res => res.lastRow);
		
		if (
			this.checkResult(middleRow, 5) ||
			this.checkResult(firstRow, 5) ||
			this.checkResult(lastRow, 5)
		) {
			this.showWinningText('EPIC WIN!');
		} else if (
			this.checkResult(middleRow, 4) ||
			this.checkResult(firstRow, 4) ||
			this.checkResult(lastRow, 4)
		) {
			this.showWinningText('VERY NICE!');
		} else if (
			this.checkResult(middleRow, 3) ||
			this.checkResult(firstRow, 3) ||
			this.checkResult(lastRow, 3)
		) {
			this.showWinningText('NOT BAD!');
		} 
	}

	showWinningText(text) {
		this.text = new PIXI.Text(text, this.textStyle);
		this.text.position.x = 290;
		this.text.position.y = 200;
		this.container.addChild(this.text);
	}
	
	createMask() {
		let thing = new PIXI.Graphics();
		
		thing.clear();
		thing.drawRect(this.x, this.y, this.width, this.height);
		
		this.container.mask = thing;
		this.addToStage(thing);
	}
}