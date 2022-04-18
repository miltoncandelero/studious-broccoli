import { Container, Texture, TilingSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";
import { Platform } from "../game/Platform";
import { Player } from "../game/Player";
import { IUpdateable } from "../utils/IUpdateable";

export class TickerScene extends Container implements IUpdateable {

    private playerDino: Player;

    private platforms:Platform[];

    private world:Container;
    private background: TilingSprite;

    private gameSpeed:number = 200;

    private timePassed:number = 0;

    constructor()
    {
        super();

        this.world = new Container();

        this.background = new TilingSprite(Texture.from("Background"), WIDTH, HEIGHT);
        this.addChild(this.background);

        this.platforms = [];

        let plat = new Platform()
        plat.position.set(150,700);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1000,600);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1800,500);
        this.world.addChild(plat);
        this.platforms.push(plat);

        this.playerDino = new Player();
        this.playerDino.x = 300;
        this.playerDino.y = 300;
        this.playerDino.scale.set(0.5);
        this.world.addChild(this.playerDino);

        this.addChild(this.world);

    }

    public update(deltaTime: number, _deltaFrame: number): void {

        this.timePassed += deltaTime;

        if (this.timePassed > (2000 * 200/this.gameSpeed))
        {
            this.gameSpeed += 50;
            this.timePassed = 0;
            const plat = new Platform()
            plat.position.set(WIDTH,Math.random()*1080);
            this.world.addChild(plat);
            this.platforms.push(plat);
        }

        this.playerDino.update(deltaTime); // update animation

        for (let platform of this.platforms) {
            platform.speed.x = - this.gameSpeed;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerDino, platform);
            if (overlap != null)
            {
                this.playerDino.separate(overlap, platform.position);
            }


            if (platform.getHitbox().right < 0)
            {
                platform.destroy();
            }
        }

        this.platforms = this.platforms.filter((elem) => !elem.destroyed);
        console.log(this.platforms.length);
        this.background.tilePosition.x -= this.gameSpeed * deltaTime/1000;
    }
}