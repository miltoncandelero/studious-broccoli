import { Application, Container, Loader, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

window.addEventListener("resize", ()=>{
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX, scaleY);

	const gameWidth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);

	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal + "px";
	app.view.style.marginRight = marginHorizontal + "px";

	app.view.style.marginTop = marginVertical + "px";
	app.view.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));

Loader.shared.add({url: "./dino.png", name: "Dino"});
Loader.shared.add({url: "./dinohat.png", name: "Hat"});

Loader.shared.onComplete.add(()=>{
	
	const dino: Sprite = Sprite.from("Dino");
	
	const hat: Sprite = Sprite.from("Hat");
	
	hat.position.set(50,-130);
	hat.scale.set(0.9);
	
	const dinoWithHat: Container = new Container();

	dinoWithHat.addChild(dino);
	dinoWithHat.addChild(hat);

	dinoWithHat.scale.set(0.5);
	dinoWithHat.x = 200;
	dinoWithHat.y = 300;
	
	app.stage.addChild(dinoWithHat);
});

Loader.shared.load();
