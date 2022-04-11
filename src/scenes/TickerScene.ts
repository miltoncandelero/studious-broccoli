import { AnimatedSprite, Container, Graphics, Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";

export class TickerScene extends Container implements IUpdateable {

    private dinoAnimated: AnimatedSprite;
    private physDino: PhysicsContainer;

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
        this.dinoAnimated.anchor.set(0.5,1);
        this.dinoAnimated.animationSpeed = 0.2;
        
        this.physDino = new PhysicsContainer();
        this.physDino.speed.x = 250;
        this.physDino.speed.y = 0;
        this.physDino.acceleration.y = 350;

        this.addChild(this.physDino);

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0,0,10);
        auxZero.endFill();

        
        this.physDino.addChild(this.dinoAnimated);
        this.physDino.addChild(auxZero);
    }

    public update(deltaTime: number, deltaFrame: number): void {
        this.dinoAnimated.update(deltaFrame); // update animation

        // craft delta time in seconds
        const dt = deltaTime / 1000
        // update physics
        this.physDino.update(dt);

        // limit horizontal
        if (this.physDino.x > WIDTH)
        {
            // limit right
            this.physDino.x = WIDTH;
            this.physDino.speed.x = Math.abs(this.physDino.speed.x) * -1;
            this.physDino.scale.x = -1;

            this.dinoAnimated.tint = 0xFF00FF;
        }else if (this.physDino.x < 0)
        {
            // limit left
            this.physDino.x = 0;
            this.physDino.speed.x = Math.abs(this.physDino.speed.x);
            this.physDino.scale.x = 1;

            this.dinoAnimated.tint = 0xFF0000;
        }

        // limit vertical
        if (this.physDino.y > HEIGHT)
        {
            this.physDino.y = HEIGHT;
            this.physDino.speed.y = -800 * Math.random();
            this.dinoAnimated.tint = 0x00ff00;
        }
    }
}