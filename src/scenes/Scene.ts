import { AnimatedSprite, Container, Graphics, Texture, Text, NineSlicePlane } from "pixi.js";
import { DinoHat } from "../game/DinoHat";

export class Scene extends Container {

    constructor()
    {
        super();
        
        // Class extending from Container
        const dinoWithHat: DinoHat = new DinoHat();
        dinoWithHat.scale.set(0.5);
        dinoWithHat.x = 200;
        dinoWithHat.y = 300;
        this.addChild(dinoWithHat);

        // Animated Sprite
        const dinoAnimated: AnimatedSprite = new AnimatedSprite(
            [
                Texture.from("DinoRun1"),
                Texture.from("DinoRun2"),
                Texture.from("DinoRun3"),
                Texture.from("DinoRun4"),
                Texture.from("DinoRun5"),
                Texture.from("DinoRun6"),
                Texture.from("DinoRun7")
            ],
            true
        );
        dinoAnimated.play();
        dinoAnimated.animationSpeed = 0.35;
        this.addChild(dinoAnimated);

        // Graphics
        const myGraph: Graphics = new Graphics();
        
        myGraph.lineStyle({color: 0xFF00FF, width: 10, alpha:1});
        myGraph.moveTo(0,0);
        myGraph.lineTo(300, 500);
        myGraph.lineTo(300, 100);
        myGraph.lineTo(0,0);

        myGraph.clear();

        myGraph.lineStyle({color: 0xFF00FF, width: 10, alpha:1});
        myGraph.beginFill(0x00FF00,1);
        myGraph.drawCircle(0,0,100);
        myGraph.endFill();
        myGraph.drawCircle(50,50,100);

        myGraph.position.set(1280/2, 720/2);
        this.addChild(myGraph);

        // Text
        const myText: Text = new Text("Hello World", {fontSize: 150, fill: 0xFF0000, fontFamily:"Comic Sans MS"});
        myText.text = "asdasd";
        myText.position.x = 500;
        myText.angle = 75;
        this.addChild(myText);

        // Nine-Slice Plane
        //const panel:Sprite = Sprite.from("Panel");
        const panel = new NineSlicePlane(
            Texture.from("Panel"),
            35,35,35,35
        );
        this.addChild(panel);
        panel.width = 500;
        panel.height = 300;
        panel.scale.set(2);
        panel.position.x = 100;
        panel.position.y = 100;

    }
}