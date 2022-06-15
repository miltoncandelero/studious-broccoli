import { Container, Texture } from "pixi.js";
import { StateAnimation } from "../game/StateAnimation";


export class AnimationScene extends Container {


    private robot:StateAnimation;
    constructor() {
        super();

        this.robot = new StateAnimation();
        this.robot.position.set(200,200)
        this.robot.scale.set(3);
        this.addChild(this.robot)

        this.robot.addState("run", [
            Texture.from("Robot/36.png"),
            Texture.from("Robot/37.png"),
            Texture.from("Robot/38.png"),
            Texture.from("Robot/39.png"),
            Texture.from("Robot/40.png"),
            Texture.from("Robot/41.png"),
            Texture.from("Robot/42.png"),
            Texture.from("Robot/43.png"),
        ], 0.1, true);

        this.robot.addState("jump",
        [
            "Robot/01.png", 
            "Robot/02.png", 
            "Robot/03.png"
        ])

        this.robot.addState("idle",
        [
            "Robot/00.png"
        ])

        this.robot.playState("run", true);
    }

    public update(frame:number)
    {
        this.robot.update(frame);
    }
}