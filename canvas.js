var CanvasManager = (function () {

    var canvas;
    var ctx;
    var canvasPosition = {x: 0, y: 0};
    var defaultColor = '#000';

    return {
        init: function (canvasId) {

            canvas = document.getElementById(canvasId);
            ctx = canvas.getContext('2d');

            canvasPosition.x = canvas.offsetLeft;
            canvasPosition.y = canvas.offsetTop;

            canvas.addEventListener('mousemove', Field.fillCellOnMousePos, false);
            // canvas.addEventListener('click', Field.countNear1OnClick, false);

        },
        getCanvasCursorPosition: function (mousePos) {

            mousePos.x -= canvasPosition.x;
            mousePos.y -= canvasPosition.y;

            return mousePos;
        },
        clear: function () {
            canvas.width = canvas.width;
            ctx.fillStyle = defaultColor;
        },
        fillRect: function (left, top, width, height) {
            ctx.fillRect(left, top, width, height);
        },
        setFillStyle: function (newStyle) {
            ctx.fillStyle = newStyle;
        },
        line: function (x, y, toX, toY) {
            ctx.moveTo(x, y);
            ctx.lineTo(toX, toY);
        },
        stroke: function (color) {
            if (typeof color !== "undefined") {
                ctx.strokeStyle = color;
            }
            ctx.stroke();
        }

    };

})();
