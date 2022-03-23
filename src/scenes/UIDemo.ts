import { Container, Sprite, Text, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { Keyboard } from "../utils/Keyboard";

export class UIDemo extends Container {
    private buttonMouse:Button;
    private lastKeyPressed:Text;
    constructor() {
        super();
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;

        const background = Sprite.from("Window");
        dialog.addChild(background);

        this.buttonMouse = new Button(
            Texture.from("Button Default Mouse"),
            Texture.from("Button Down Mouse"),
            Texture.from("Button Default Mouse")
        );
        this.buttonMouse.on("buttonClick", this.onButtonClick, this);
        this.buttonMouse.x = background.width / 2 - this.buttonMouse.width * 0.6;
        this.buttonMouse.y = this.buttonMouse.height + 20;
        dialog.addChild(this.buttonMouse);

        const buttonTouch = Sprite.from("Button Default Touch");
        buttonTouch.anchor.set(0.5);
        buttonTouch.x = background.width / 2 + buttonTouch.width * 0.6;
        buttonTouch.y = this.buttonMouse.y;
        dialog.addChild(buttonTouch);

        const buttonPointer = Sprite.from("Button Default Pointer");
        buttonPointer.anchor.set(0.5);
        buttonPointer.x = background.width / 2;
        buttonPointer.y = this.buttonMouse.y + 200;
        dialog.addChild(buttonPointer);


        this.lastKeyPressed = new Text("Waiting...", {fontSize: 48});
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.x = background.width / 2;
        this.lastKeyPressed.y = buttonPointer.y + 175;
        dialog.addChild(this.lastKeyPressed)

        this.addChild(dialog);

        Keyboard.down.on("KeyB", this.onKeyB, this);
        Keyboard.up.on("KeyB", this.onKeyBUp, this);
    }

    private onKeyB() : void{
        console.log("aprete la B", this);
    }
    private onKeyBUp() : void{
        console.log("solte la B", this);
    }

    private onButtonClick():void{
        console.log("my new button clicked!", this);
    }
}