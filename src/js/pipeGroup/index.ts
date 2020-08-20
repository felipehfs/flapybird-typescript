import { Entity } from '../stages/entity';
import { Rectangle } from '../shapes/rectangle';
 

export class PipeGroup implements Entity {

    public upstairs: Rectangle;
    public downstairs: Rectangle;
    public static readonly MAX_WIDTH : number = 20;
    constructor(
        private x: number,
        private y: number,
        private canvasWidth: number
    ){
        const downstairsHeight = Math.floor(Math.random() * 120) + 50; 
        const upstairsHeight = Math.floor(Math.random() * 150) + 50; 
        this.upstairs = { 
            x: canvasWidth, 
            y: 0, 
            width: PipeGroup.MAX_WIDTH, 
            height: upstairsHeight
        }

        this.downstairs = { 
            x: canvasWidth,
            y: y - downstairsHeight,
            width: PipeGroup.MAX_WIDTH,
            height: downstairsHeight
        }  

    }

    public reset(): void {
        const { x, y } = this;
        const downstairsHeight = Math.floor(Math.random() * 120) + 50; 
        const upstairsHeight = Math.floor(Math.random() * 150) + 50; 

        this.upstairs = { 
            x, 
            y: 0, 
            width: PipeGroup.MAX_WIDTH, 
            height: upstairsHeight
        }

        this.downstairs = { 
            x,
            y: y - downstairsHeight,
            width: PipeGroup.MAX_WIDTH,
            height: downstairsHeight
        }  
    }

    private drawRectangle(paint: CanvasRenderingContext2D, rectangle: Rectangle, color: string): void {
        paint.fillStyle = color;
        paint.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }

    draw(paint: CanvasRenderingContext2D): void {
        this.drawRectangle(paint, this.upstairs, '#fff');
        this.drawRectangle(paint, this.downstairs, "red");
    }

    update(): void {
        if (this.upstairs.x < -PipeGroup.MAX_WIDTH) {
            this.upstairs.x = this.canvasWidth;
            const upstairsHeight = Math.floor(Math.random() * 150) + 50; 
            this.upstairs.height  = upstairsHeight;
        }

        if (this.downstairs.x < -PipeGroup.MAX_WIDTH) {
            this.downstairs.x = this.canvasWidth;
            const downstairsHeight = Math.floor(Math.random() * 200) + 150; 
            this.downstairs.height = downstairsHeight;
        }

        this.upstairs.x -= 5;
        this.downstairs.x -= 5;
    }

}