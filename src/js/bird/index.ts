import { Entity } from '../stages/entity';
import { Rectangle } from '../shapes/rectangle'

export class Bird  implements Entity{

    public isJumping: boolean = false;
    public color = "green";
    private size = 18;

    constructor(
        private x: number,
        private y: number
    ){}

    draw(paint: CanvasRenderingContext2D): void {
       paint.fillStyle = this.color;
       paint.fillRect(this.x, this.y, this.size, this.size);
    }

    hasCollision(other: Rectangle): boolean {
        const birdRectangle: Rectangle = {
            x: this.x,
            y: this.y,
            width: this.size,
            height: this.size
        };

        if (birdRectangle.x < other.x + other.width &&
            birdRectangle.x + birdRectangle.width > other.x &&
            birdRectangle.y < other.y + other.height &&
            birdRectangle.y + birdRectangle.height > other.y) {
            return true;
         }

        return false;
    }

    reset() {
        this.x = 10;
        this.y = 0;
    }

    get position() {
        return {
            x: this.x,
            y: this.y
        }
    }
    
    update(): void {
        if (this.isJumping) {
            this.y -= 80;
            this.isJumping = false;
        }
        this.y += 2
    }

}