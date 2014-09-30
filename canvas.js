var CanvasManager = (function() {

    var canvas;
    var ctx;
    var canvasPosition = {};

    return {
        init: function(canvasId) {

            canvas = document.getElementById(canvasId);
            ctx = canvas.getContext('2d');

            canvasPosition.x = canvas.offsetTop;
            canvasPosition.y = canvas.offsetLeft;

            canvas.addEventListener('mousemove', fillCellOnMousePos, false);

            this.drawGrid();

        },
        drawGrid: function() {

            for (var x = 0.5; x <= Field.width * Field.pixelOnSide + 1;
                    x += Field.pixelOnSide) {
                ctx.moveTo(0, x);
                ctx.lineTo(Field.width * Field.pixelOnSide, x);
            }

            for (var y = 0.5; y < Field.height * Field.pixelOnSide + 1;
                    y += Field.pixelOnSide) {
                ctx.moveTo(y, 0);
                ctx.lineTo(y, Field.height * Field.pixelOnSide);
            }

            ctx.strokeStyle = Field.getColorFill();
            ctx.stroke();

        },
        clear: function() {
            canvas.width = canvas.width;
            ctx.fillStyle = Field.getColorFill();
        },
        fillRect: function(left, top, width, height) {
            ctx.fillRect(left, top, width, height);
        },
        setFillStyle: function(newStyle){
            ctx.fillStyle = newStyle;
        }

    };

})();
