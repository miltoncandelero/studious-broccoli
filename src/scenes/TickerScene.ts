import { AnimatedSprite, Container, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";

export class TickerScene extends Container implements IUpdateable {

    private dinoAnimated: AnimatedSprite;
    constructor()
    {
        super();

        // Animated Sprite
        this.dinoAnimated = new AnimatedSprite(
            [
                Texture.from("DinoRun1"),
                Texture.from("DinoRun2"),
                Texture.from("DinoRun3"),
                Texture.from("DinoRun4"),
                Texture.from("DinoRun5"),
                Texture.from("DinoRun6"),
                Texture.from("DinoRun7")
            ],
            false
        );
        this.dinoAnimated.play();
        this.dinoAnimated.animationSpeed = 0.35;
        this.addChild(this.dinoAnimated);
    }

    public update(_deltaTime: number, deltaFrame: number): void {
        this.dinoAnimated.update(deltaFrame);
        this.dinoAnimated.x += 10;
    }
}