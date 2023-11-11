export default class CanvasZoom {

    static canvas = null;

    // coordinates of our cursor
    static cursorX;
    static cursorY;
    static prevCursorX;
    static prevCursorY;

    // distance from origin
    static offsetX = 0;
    static offsetY = 0;

    // zoom amount
    static scale = 10;

    // mouse functions
    static leftMouseDown = false;
    static rightMouseDown = false;

    static init(canvas, cb = () => { }) {

        CanvasZoom.canvas = canvas;

        // Mouse Event Handlers
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('wheel', onMouseWheel, false);

        function onMouseDown(event) {

            // detect left clicks
            if (event.button == 0) {
                CanvasZoom.leftMouseDown = true;
                CanvasZoom.rightMouseDown = false;
            }

            // detect right clicks
            if (event.button == 2) {
                CanvasZoom.rightMouseDown = true;
                CanvasZoom.leftMouseDown = false;
            }

            // update the cursor coordinates
            CanvasZoom.cursorX = event.pageX;
            CanvasZoom.cursorY = event.pageY;
            CanvasZoom.prevCursorX = event.pageX;
            CanvasZoom.prevCursorY = event.pageY;
        }

        function onMouseMove(event) {

            // get mouse position
            CanvasZoom.cursorX = event.pageX;
            CanvasZoom.cursorY = event.pageY;

            if (CanvasZoom.rightMouseDown) {
                // move the screen
                CanvasZoom.offsetX += (CanvasZoom.cursorX - CanvasZoom.prevCursorX) / CanvasZoom.scale;
                CanvasZoom.offsetY += (CanvasZoom.cursorY - CanvasZoom.prevCursorY) / CanvasZoom.scale;
                cb && cb();
            }
            
            CanvasZoom.prevCursorX = CanvasZoom.cursorX;
            CanvasZoom.prevCursorY = CanvasZoom.cursorY;
        }

        function onMouseUp() {
            CanvasZoom.leftMouseDown = false;
            CanvasZoom.rightMouseDown = false;
        }

        function onMouseWheel(event) {

            const deltaY = event.deltaY;
            const scaleAmount = -deltaY / 500;

            CanvasZoom.scale = CanvasZoom.scale * (1 + scaleAmount);

            // zoom the page based on where the cursor is
            var distX = event.pageX / canvas.clientWidth;
            var distY = event.pageY / canvas.clientHeight;

            // calculate how much we need to zoom
            const unitsZoomedX = CanvasZoom.trueWidth() * scaleAmount;
            const unitsZoomedY = CanvasZoom.trueHeight() * scaleAmount;

            const unitsAddLeft = unitsZoomedX * distX;
            const unitsAddTop = unitsZoomedY * distY;

            CanvasZoom.offsetX -= unitsAddLeft;
            CanvasZoom.offsetY -= unitsAddTop;

            cb && cb();
        }
    }

    static toScreenX(xTrue) {
        return (xTrue + CanvasZoom.offsetX) * CanvasZoom.scale;
    }

    static toScreenY(yTrue) {
        return (yTrue + CanvasZoom.offsetY) * CanvasZoom.scale;
    }

    static toTrueX(xScreen) {
        return (xScreen / CanvasZoom.scale) - CanvasZoom.offsetX;
    }

    static toTrueY(yScreen) {
        return (yScreen / CanvasZoom.scale) - CanvasZoom.offsetY;
    }

    static trueHeight() {
        return CanvasZoom.canvas.clientHeight / CanvasZoom.scale;
    }

    static trueWidth() {
        return CanvasZoom.canvas.clientWidth / CanvasZoom.scale;
    }
}