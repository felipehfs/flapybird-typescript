import { Entity } from '../entity'
import { GameState } from '../gameState';
import { KeyboardListener } from '../../control/keyboardListener';
import { GamePad } from '../../control/gamePad';
import { Bird } from '../../bird';
import { PipeGroup } from '../../pipeGroup';

export class Game implements Entity, KeyboardListener {

    public actualState: GameState = GameState.MENU;
    public bird: Bird;
    public pipes: PipeGroup[] = [];


    constructor(
        private width: number,
        private height: number
    ){
        this.bird = new Bird(10, 0); 

        this.pipes.push(new PipeGroup(width - PipeGroup.MAX_WIDTH, height, width));
    }
    
    keyUp(key: string): void {
        switch(key) {
            case GamePad.UP: 
                if (this.actualState === GameState.GAME) {
                    this.bird.isJumping = true;
                }
                break;
            case GamePad.ENTER:
                if (this.actualState === GameState.MENU) {
                    this.actualState = GameState.GAME;
                } else if (this.actualState === GameState.GAME_OVER) {
                    this.actualState = GameState.GAME;
                    this.pipes.forEach(pipe => pipe.reset());
                    this.bird.reset();
                }
        }
    }

    keyDown(key: string): void {
        switch(key) {
            case GamePad.UP: 
                if (this.actualState === GameState.GAME) {
                    this.bird.isJumping = false;
                }
                break;
        }
    }


    draw(paint: CanvasRenderingContext2D): void {
        if (this.actualState === GameState.GAME) {
            paint.beginPath();
            paint.fillStyle = "#000";
            paint.fillRect(0, 0, this.width, this.height);
            paint.closePath();
            paint.fill();
            
            for (let pipe of this.pipes) {
                pipe.draw(paint);
            }

            this.bird.draw(paint);
        } else if (this.actualState === GameState.GAME_OVER) {
            paint.beginPath()
            paint.fillStyle = "red";
            paint.font = "20px Arial"
            paint.fillText("Game Over", this.width / 2 - 50, this.height / 2);
            paint.fill()
        } else if (this.actualState === GameState.MENU) {
            paint.beginPath();
            
            paint.fillStyle = "#000";
            paint.fillRect(0, 0, this.width, this.height);

            paint.fillStyle = "red";
            paint.font = "20px Arial"
            paint.fillText("FlappyBird", this.width / 2 - 50, this.height / 2);
            
            paint.fillStyle = "#fff";
            paint.font = "15px Arial"
            paint.fillText("Aperte enter para começar", this.width / 2 - 100, this.height / 2 + 30);

            paint.fill();
        }
    }
    
    update(): void {
        if (this.actualState === GameState.GAME) {
            this.bird.update();

            for (let pipe of this.pipes) {
                pipe.update();

                if (this.bird.hasCollision(pipe.downstairs)) {
                    this.actualState = GameState.GAME_OVER;
                }

                if (this.bird.hasCollision(pipe.upstairs)) {
                    this.actualState = GameState.GAME_OVER;
                }
            }

            if (this.bird.position.y > this.height) {
                this.actualState = GameState.GAME_OVER;
            }
        } else if (this.actualState === GameState.MENU) {

        } 
    }

}