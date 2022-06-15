import { Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";


export class TweenScene extends Container {
    public xd:number = 0;
    constructor() {
        super();
        const coin = Sprite.from("Items/bronze_1.png");
        coin.anchor.set(0.5);
        coin.x = 300;
        coin.y = 300;
        this.addChild(coin);

        coin.scale.set(0);
        new Tween(coin)
            .to({scale: {x: 5, y: 5}},2000)
            .delay(500)
            .easing(Easing.Elastic.Out)
            .start();
    }

    public onEnd():void
    {
        console.log("ya paso tiempo");
    }

    public update()
    {
    }
}