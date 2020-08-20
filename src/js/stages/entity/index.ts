export interface Entity {
    draw(paint: CanvasRenderingContext2D): void,
    update(): void
}