export default class Loader {
	constructor(onAssetsLoaded) {
		this.loader = PIXI.loader;
		this.loadAssets();
		this.loader.once('complete', onAssetsLoaded);
		this.loader.load();
	}
	
	loadAssets() {
		this.loader.add('BG', require("../assets/bg_final.png"));
		this.loader.add('btn_active', require("../assets/btn_active.png"));
		this.loader.add('btn_inactive', require("../assets/btn_inactive.png"));
		this.loader.add('lowwin_club', require("../assets/lowwin_club.png"));
		this.loader.add('lowwin_diamond', require("../assets/lowwin_diamond.png"));
		this.loader.add('lowwin_heart', require("../assets/lowwin_heart.png"));
		this.loader.add('lowwin_spade', require("../assets/lowwin_spade.png"));
		this.loader.add('lowwin_star', require("../assets/lowwin_star.png"));
		this.loader.add('wild', require("../assets/wild.png"));		
	}
}