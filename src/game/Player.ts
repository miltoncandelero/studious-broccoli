import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer implements IHitbox
{
    private static readonly GRAVITY = 500;
    private static readonly MOVE_SPEED = 0;
    private static readonly JUMP_SPEED = 600;
    
    public canJump = true;
    private dinoAnimated: AnimatedSprite;
    private hitbox:Graphics;
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
        this.dinoAnimated.anchor.set(0.3,1);
        this.dinoAnimated.animationSpeed = 0.2;

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0,0,10);
        auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0,0,250,350);
        this.hitbox.endFill();
        this.hitbox.x = -125;
        this.hitbox.y = -400;
        
        this.addChild(this.dinoAnimated);
        this.addChild(auxZero);
        this.dinoAnimated.addChild(this.hitbox);

        this.acceleration.y = Player.GRAVITY;
        
        Keyboard.down.on("ArrowUp", this.jump, this);
    }

    public override destroy(options:any) {
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
    }

    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
        this.dinoAnimated.update(deltaMS / (1000/60));

        if (Keyboard.state.get("ArrowRight"))
        {
            this.speed.x = Player.MOVE_SPEED;
            this.dinoAnimated.scale.x = 1;
        }else if (Keyboard.state.get("ArrowLeft"))
        {
            this.speed.x = -Player.MOVE_SPEED;
            this.dinoAnimated.scale.x = -1;
        }else{
            this.speed.x = 0;
        }

        if (Keyboard.state.get("ArrowDown"))
        {
            this.acceleration.y = Player.GRAVITY * 5;
        }else
        {
            this.acceleration.y = Player.GRAVITY;
        }

    }

    private jump()
    {
        if (this.canJump)
        {
            this.canJump = false;
            this.speed.y = -Player.JUMP_SPEED;
        }
    }

    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }

    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height)
                {
                    if (this.x > platform.x)
                    {
                        this.x += overlap.width;
                    }else if (this.x < platform.x)
                    {
                        this.x -= overlap.width;
                    }

                }
                else
                {
                    if (this.y > platform.y)
                    {
                        this.y -= overlap.height;
                        this.speed.y = 0;
                        this.canJump = true;
                    }else if (this.y < platform.y)
                    {
                        this.y += overlap.height;
                    }
                }
    }

}