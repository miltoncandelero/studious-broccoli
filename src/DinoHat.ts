import { Container, Sprite } from "pixi.js";

export class DinoHat extends Container {

    constructor(){
        super();

        const dino: Sprite = Sprite.from("Dino");
	
        const hat: Sprite = Sprite.from("Hat");
        
        hat.position.set(50,-130);
        hat.scale.set(0.9);
        
        this.addChild(dino);
        this.addChild(hat);
    }
}