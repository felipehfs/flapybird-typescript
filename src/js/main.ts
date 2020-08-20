import { Game } from './stages/game';
const canvas = <HTMLCanvasElement>document.getElementById('game');
const context = <CanvasRenderingContext2D>canvas.getContext('2d');

const WIDTH = 128;
const HEIGHT = 160;
const SCALE = 3;

canvas.width = WIDTH * SCALE;
canvas.height = HEIGHT * SCALE;

const game = new Game(canvas.width, canvas.height);

function update() {
    game.update();
}

function draw() {
    game.draw(context);
}

window.addEventListener("keyup", (event: KeyboardEvent) => {
    game.keyUp(event.key);
})

window.addEventListener("keydown", (event: KeyboardEvent) => {
    game.keyDown(event.key);
})

function mainLoop() {
    update();
    draw();

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);