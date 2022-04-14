import {  Container, Graphics, Text } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";

const RED = 0xAA0000;
const GREEN = 0x005500;
export class CollisionTheoryScene extends Container implements IUpdateable {

    private graphicRed:Graphics;
    private graphicGreen:Graphics;
    private dragging: boolean = false;

    private rightmostLeftText:Text;
    private leftmostRightText:Text;
    private bottommostTop:Text;
    private topmostBottom:Text;
    private horizontalResult:Text;
    private verticalResult:Text;
    private finalResult:Text;
    constructor()
    {
        super();

        this.graphicRed = new Graphics();
        this.graphicRed.lineStyle({color:RED, width:10});
        this.graphicRed.beginFill(RED, 0.3);
        this.graphicRed.drawRect(0,0,200,200);
        this.graphicRed.on("pointerdown",()=> this.dragging = true);
        this.graphicRed.on("pointerup",()=> this.dragging = false);
        this.graphicRed.on("pointermove", (e)=> this.dragging ? this.graphicRed.position.copyFrom(e.data.global):null);
        this.graphicRed.interactive = true;
        this.addChild(this.graphicRed);

        this.graphicGreen = new Graphics();
        this.graphicGreen.lineStyle({color:GREEN, width:10});
        this.graphicGreen.beginFill(GREEN, 0.3);
        this.graphicGreen.drawRect(0,0,400,400);
        this.graphicGreen.position.set(1920/2, 1080/2);
        this.addChild(this.graphicGreen);

        
        // const explainCont = new Container();
        this.rightmostLeftText = new Text("Izquierda mas a la derecha", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.leftmostRightText = new Text("Derecha mas a la izquierda", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.horizontalResult = new Text("= true", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.bottommostTop = new Text("Arriba mas hacia abajo", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.topmostBottom = new Text("Abajo mas hacia arriba", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.verticalResult = new Text("= true", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});
        this.finalResult = new Text("Colision? = true", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF});



        const texts = [[this.rightmostLeftText,
            new Text("<", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF}),
                                this.leftmostRightText, this.horizontalResult],
                                [
                                this.bottommostTop,
            new Text("<", {fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF}),
                                this.topmostBottom, this.verticalResult],
                                [this.finalResult]
                                ];
        for (let i = 0; i < texts.length; i++) {
                
            const t = texts[i];
            
            for (let i = 1; i < t.length; i++) {
                
                t[i].x = t[i-1].x + t[i-1].width + ((i < 2|| i == 3)?160:0);
            }
            const aux = new Container();
            aux.addChild(...t);
            aux.y = aux.height * i;
            this.addChild(aux);
        }




    }

    public update(_deltaTime: number, _deltaFrame: number): void {
        const boundsRed = this.graphicRed.getBounds();
        const boundsGreen = this.graphicGreen.getBounds();

        let rightmostLeft;
        let leftmostRight;
        let bottommostTop;
        let topmostBottom;

        if(boundsRed.left > boundsGreen.left) {
            this.rightmostLeftText.tint = RED;
            this.rightmostLeftText.text = "Izquierda mas a la derecha (" + boundsRed.left.toFixed(0) + ")";
            rightmostLeft = boundsRed.left;
        }
        else{
            this.rightmostLeftText.tint = GREEN;
            this.rightmostLeftText.text = "Izquierda mas a la derecha (" + boundsGreen.left.toFixed(0) + ")";
            rightmostLeft = boundsGreen.left;
        }

        if(boundsRed.right < boundsGreen.right){
            this.leftmostRightText.tint = RED;
            this.leftmostRightText.text = "(" + boundsRed.right.toFixed(0) + ")" + "Derecha mas a la izquierda";
            leftmostRight = boundsRed.right;
        }
        else{
            this.leftmostRightText.tint = GREEN;
            this.leftmostRightText.text = "(" + boundsGreen.right.toFixed(0) + ")" + "Derecha mas a la izquierda";
            leftmostRight = boundsGreen.right;
        }

        if(boundsRed.top > boundsGreen.top) {
            this.bottommostTop.tint = RED;
            this.bottommostTop.text = "Arriba mas hacia abajo (" + boundsRed.top.toFixed(0) + ")";
            bottommostTop = boundsRed.top;
        }
        else{
            this.bottommostTop.tint = GREEN;
            this.bottommostTop.text = "Arriba mas hacia abajo (" + boundsGreen.top.toFixed(0) + ")";
            bottommostTop = boundsGreen.top;
        }

        if(boundsRed.bottom < boundsGreen.bottom){
            this.topmostBottom.tint = RED;
            this.topmostBottom.text = "(" + boundsRed.bottom.toFixed(0) + ")" + "Abajo mas hacia arriba";
            topmostBottom = boundsRed.bottom;
        }
        else{
            this.topmostBottom.tint = GREEN;
            this.topmostBottom.text = "(" + boundsGreen.bottom.toFixed(0) + ")" + "Abajo mas hacia arriba";
            topmostBottom = boundsGreen.bottom;
        }

        this.horizontalResult.text = "= " + (rightmostLeft < leftmostRight);
        this.verticalResult.text = "= " + (bottommostTop < topmostBottom);

        this.finalResult.text = "Colision? = " + (rightmostLeft < leftmostRight && bottommostTop < topmostBottom);
    }
}