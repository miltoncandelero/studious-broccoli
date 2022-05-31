import { Container, Sprite, Spritesheet, Texture } from "pixi.js";


export class SpritesheetScene extends Container {
    constructor() {
        super();
        // const coin = Sprite.from("Robot/00.png");
        // this.addChild(coin);
        
        const spritesheet = new Spritesheet(Texture.from("robot spritesheet"),
        {
            frames: {
                "robot1":{
                    frame:{
                        x:0,
                        y:0,
                        w: 192,
                        h: 256
                    }
                },
            },
            meta:{
                scale: "1"
            }
        });
        spritesheet.parse(()=>{
            const robo = Sprite.from("robot1");
            this.addChild(robo);
        });
    }

    public update()
    {
    }
}