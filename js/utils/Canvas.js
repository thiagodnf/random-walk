import CanvasZoom from "./CanvasZoom.js";

export default class Canvas {

    static init(canvas) {
        CanvasZoom.init(canvas);
    }

    static clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    static drawRect(ctx, x, y, width, height) {

        ctx.lineWidth = 1
        ctx.strokeStyle = "black";

        ctx.rect(CanvasZoom.toScreenX(x + 0.5), CanvasZoom.toScreenY(y + 0.5), width, height);
        ctx.stroke();
    }

    static drawSquare(ctx, x, y, side) {
        Canvas.drawRect(ctx, x, y, side, side);
    }

    static drawCircle(ctx, x, y, radius = 50) {

        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(CanvasZoom.toScreenX(x + 0.5), CanvasZoom.toScreenY(y + 0.5), CanvasZoom.scale / radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    static drawLine(ctx, x0, y0, x1, y1) {

        ctx.lineWidth = 1
        ctx.strokeStyle = "blue";

        // Start a new Path
        ctx.beginPath();
        ctx.moveTo(CanvasZoom.toScreenX(x0 + 0.5), CanvasZoom.toScreenY(y0 + 0.5));
        ctx.lineTo(CanvasZoom.toScreenX(x1 + 0.5), CanvasZoom.toScreenY(y1 + 0.5));

        // Draw the Path
        ctx.stroke();
    }
}