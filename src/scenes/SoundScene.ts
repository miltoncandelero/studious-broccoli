import { sound } from "@pixi/sound";
import { Container, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";

export class SoundScene extends Container implements IUpdateable {

    constructor()
    {
        super();

        const allCont = new Container();
        this.addChild(allCont);
        allCont.scale.set(3);

        const btnSword = new Button(Texture.from("Button Sword"));
        btnSword.position.set(200,200);
        btnSword.on(Button.CLICKED_EVENT, this.swordSound, this);
        allCont.addChild(btnSword);

        const btnVolumeUp = new Button(Texture.from("Button Plus"));
        btnVolumeUp.position.set(400,150);
        btnVolumeUp.on(Button.CLICKED_EVENT, this.volumeUp, this);
        allCont.addChild(btnVolumeUp);
        const btnVolumeDown = new Button(Texture.from("Button Minus"));
        btnVolumeDown.position.set(400,250);
        btnVolumeDown.on(Button.CLICKED_EVENT, this.volumeDown, this);
        allCont.addChild(btnVolumeDown);

        const toggleMute = new ToggleButton(Texture.from("Button Music On"), Texture.from("Button Music Off"));
        toggleMute.position.set(500,200);
        toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);
        allCont.addChild(toggleMute);
    }
    public toggleMute(unMute:boolean) {
        if (unMute) 
        {
            sound.unmuteAll();
        }else
        {
            sound.muteAll();
        }
    }
    public volumeDown() {
        sound.volumeAll -= 0.05;
        console.log("new volume", sound.volumeAll)
    }
    public volumeUp() {
        sound.volumeAll += 0.05;
        console.log("new volume", sound.volumeAll)
    }
    public swordSound() {
        sound.play("Woosh", {
            loop:true, 
            volume: 0.5,
            singleInstance:true,
            });
    }

    public update(_deltaTime: number, _deltaFrame: number): void {

    }
}