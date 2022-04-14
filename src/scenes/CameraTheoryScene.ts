import {  Container, Graphics, Text } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";

const RED = 0xAA0000;
const GREEN = 0x005500;
export class CameraTheoryScene extends Container implements IUpdateable {

    private graphicRed:Graphics;
    private infoText:Text;
    private world:Container;
    constructor()
    {
        super();

        this.world = new Container();
        this.addChild(this.world)

        for (let i = 0; i < 10; i++) {
            const auxGreen = new Graphics();
            auxGreen.lineStyle({color:GREEN, width:10});
            auxGreen.beginFill(GREEN, 0.3);
            auxGreen.drawRect(0,0,100,100);
            auxGreen.position.x = (Math.random()-0.5) * 1920 + i * 200;
            auxGreen.position.y = (Math.random()-0.5) * 1080 + i * 200;
            this.world.addChild(auxGreen);
        }

        this.graphicRed = new Graphics();
        this.graphicRed.lineStyle({color:RED, width:10});
        this.graphicRed.beginFill(RED, 0.3);
        this.graphicRed.drawRect(-50,-50,100,100);
        this.world.addChild(this.graphicRed);

        this.infoText = new Text("", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.addChild(this.infoText);

        Keyboard.down.on("NumpadAdd", ()=>this.world.scale.set(this.world.scale.x + 0.1));
        Keyboard.down.on("NumpadSubtract", ()=>this.world.scale.set(this.world.scale.x - 0.1));
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.infoText.text = "Player position inside the world: " + 
                            this.graphicRed.x.toFixed(1) + ", " + this.graphicRed.y.toFixed(1);

        if (Keyboard.state.get("ArrowRight")){
            this.graphicRed.x += 0.1 * deltaTime;
            this.infoText.text += " ➡"
        }
        if (Keyboard.state.get("ArrowLeft")){
            this.graphicRed.x -= 0.1 * deltaTime;
            this.infoText.text += " ⬅"
        }
        if (Keyboard.state.get("ArrowDown")){
            this.graphicRed.y += 0.1 * deltaTime;
            this.infoText.text += " ⬇"
        }
        if (Keyboard.state.get("ArrowUp")){
            this.graphicRed.y -= 0.1 * deltaTime;
            this.infoText.text += " ⬆"
        }

        this.infoText.text += "\nWorld position: " + 
                            this.world.x.toFixed(1) + ", " + this.world.y.toFixed(1)

        if (Keyboard.state.get("KeyD")){
             this.world.x -= 0.1 * deltaTime;
             this.infoText.text += " ⬅"
        }
        if (Keyboard.state.get("KeyA")){
             this.world.x += 0.1 * deltaTime;
             this.infoText.text += " ➡"
        }
        if (Keyboard.state.get("KeyS")){
             this.world.y -= 0.1 * deltaTime;
             this.infoText.text += " ⬆"
        }
        if (Keyboard.state.get("KeyW")){
             this.world.y += 0.1 * deltaTime;
             this.infoText.text += " ⬇"
        }

        this.infoText.text += "\nWorld scale: " +
                            this.world.scale.x.toFixed(1) + ", " + this.world.scale.y.toFixed(1);

        if (Keyboard.state.get("KeyF"))
        {
            this.world.x = -this.graphicRed.x * this.graphicRed.worldTransform.a + 1920/2;
            this.world.y = -this.graphicRed.y * this.graphicRed.worldTransform.d + 1080/2;
        }

    }
}