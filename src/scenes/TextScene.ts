import { BitmapText, Container, Text, TextStyle } from "pixi.js";


export class TextScene extends Container {
    private t:Text;
    private bt: BitmapText;
    constructor() {
        super();
        const scaleAux = new Container();
        scaleAux.scale.set(5);
        this.addChild(scaleAux);

        const tStyle = new TextStyle({
            fontSize: 15,
            dropShadow: true,
            fill: "red",
            lineJoin: "round",
            stroke: "#15be09",
            fontFamily: "Kanit",
        })
        this.t = new Text("Hola Mundo! ♪ 🤣", tStyle);
        this.t.style.fill= "blue";
        //scaleAux.addChild(this.t);

        // Mi bitmapfont
        this.bt = new BitmapText("Hola Mundo! ♪ 🤣", {fontName:"Mi BitmapFont",fontSize: 15});
        this.bt.y = this.t.height;
        //scaleAux.addChild(this.bt);

        // desyrel
        const desyrel = new BitmapText("Hola Mundo! ♪ 🤣", {fontName:"Desyrel",fontSize: 15});
        desyrel.y = 0;
        scaleAux.addChild(desyrel);

        // super text
        const macondo = new BitmapText("Hola Mundo! ♪ 🤣", {fontName:"macondo",fontSize: 15, tint:0xFF0000});
        macondo.y = desyrel.y + desyrel.height;
        scaleAux.addChild(macondo);
    }

    public update()
    {
        //this.t.text = Math.random().toString();
        //this.bt.text = Math.random().toString();
    }
}