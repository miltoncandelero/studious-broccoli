import { Container, Graphics, InteractionEvent, Point, Sprite, Text, Texture, TilingSprite } from "pixi.js";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { Keyboard } from "../utils/Keyboard";

export class UIDemo extends Container {
    private buttonMouse:Button;
    private lastKeyPressed:Text;
    private buttonPointer: Sprite;
    private dragging:boolean =false;
    private toggle: ToggleButton;
    private dialog: Container;
    constructor() {
        super();
        this.dialog = new Container();
        this.dialog.x = 100;
        this.dialog.y = 50;

        const background = Sprite.from("Window");
        this.dialog.addChild(background);

        this.buttonMouse = new Button(
            Texture.from("Button Default Mouse"),
            Texture.from("Button Down Mouse"),
            Texture.from("Button Default Mouse")
        );

        this.buttonMouse.on("buttonClick", this.onButtonClick, this);
        this.buttonMouse.x = background.width / 2 - this.buttonMouse.width * 0.6;
        this.buttonMouse.y = this.buttonMouse.height + 20;
        this.dialog.addChild(this.buttonMouse);

        const buttonTouch = Sprite.from("Button Default Touch");
        buttonTouch.anchor.set(0.5);
        buttonTouch.x = background.width / 2 + buttonTouch.width * 0.6;
        buttonTouch.y = this.buttonMouse.y;
        this.dialog.addChild(buttonTouch);

        this.buttonPointer = Sprite.from("Button Default Pointer");
        this.buttonPointer.anchor.set(0.5);
        this.buttonPointer.x = background.width / 2;
        this.buttonPointer.y = this.buttonMouse.y + 200;
        this.dialog.addChild(this.buttonPointer);
        this.buttonPointer.on("pointerdown", this.beginDrag, this);
        this.buttonPointer.on("pointerup", this.endDrag, this);
        this.buttonPointer.on("pointermove", this.moveDrag, this);
        this.buttonPointer.interactive = true;


        this.lastKeyPressed = new Text("Waiting...", {fontSize: 48});
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.x = background.width / 2;
        this.lastKeyPressed.y = this.buttonPointer.y + 175;
        this.dialog.addChild(this.lastKeyPressed)

        this.addChild(this.dialog);

        Keyboard.down.on("KeyB", this.onKeyB, this);
        Keyboard.up.on("KeyB", this.onKeyBUp, this);


        //ejemplo toggle
        this.toggle = new ToggleButton(
            Texture.from("Button Default Mouse"),
            Texture.from("Button Down Mouse"),
        );
        this.toggle.x = 600;
        this.toggle.y = 600;
        this.toggle.on(ToggleButton.TOGGLE_EVENT, (newState) => {
            console.log("toggle changed to:", newState)
        })
        this.addChild(this.toggle);


        // ejemplo texture fill
        const g = new Graphics();
        g.beginTextureFill({texture:Texture.from("Window")});
        g.drawPolygon(
            [
                new Point(0,0),
                new Point(100,100),
                new Point(300,200),
                new Point(600,-400),
            ]
        );
        g.endFill();
        g.x = 800;
        g.y = 500;
        this.addChild(g);

        //ejemplo mascara!
        const dinoEnmascarado = Sprite.from("Dino");
        dinoEnmascarado.x = 1200;
        dinoEnmascarado.y = 500;

        const mask = new Graphics();
        mask.beginFill(0xff00ff, 0.5);
        mask.drawRect(0,0,200,300);
        // mask.drawCircle(0,0,300);
        mask.endFill();
        mask.x = 150;

        this.addChild(dinoEnmascarado)
        dinoEnmascarado.addChild(mask);
        dinoEnmascarado.mask = mask;

        //ejemplo sprite en repeat
        const sprRepeat = new TilingSprite(Texture.from("Hat"), 800,800);
        sprRepeat.tilePosition.x = -150
        sprRepeat.tileScale.set(0.25);
        this.addChild(sprRepeat);

    }
    private beginDrag() {
        this.dragging = true;
    }

    private moveDrag(e:InteractionEvent) {
        if(this.dragging)
        {
            const newPos = e.data.getLocalPosition(this.buttonPointer.parent);
            this.buttonPointer.x = newPos.x;
            this.buttonPointer.y = newPos.y;

            // const newPosParent = e.data.getLocalPosition(this.dialog.parent);
            // this.dialog.x = newPosParent.x;
            // this.dialog.y = newPosParent.y;
        }
    }

    private endDrag() {
        this.dragging = false;
    }

    private onKeyB() : void{
        console.log("aprete la B", this);
    }
    private onKeyBUp() : void{
        console.log("solte la B", this);
    }

    private onButtonClick():void{
        console.log("my toggle state is", this.toggle.state);
        this.toggle.state = !this.toggle.state;
        console.log("but I changed it to", this.toggle.state);
    }
}