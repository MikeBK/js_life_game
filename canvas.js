var CanvasManager = (function () {

    var canvas;
    var ctx;
    var canvasPosition = {};

    function getCanvasCursorPosition(e) {
        var mousePos = {};
        if (e.pageX !== undefined && e.pageY !== undefined) {
            mousePos.x = e.pageX - canvasPosition.x;
            mousePos.y = e.pageY - canvasPosition.y;
        }
        else {
            mousePos.x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            mousePos.y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
        }

        var fieldCoord = {};
        fieldCoord.x = parseInt(mousePos.x / Field.pixelOnSide);
        fieldCoord.y = parseInt(mousePos.y / Field.pixelOnSide);

        return fieldCoord;
    }

    function fillCellOnMousePos(event) {

        if (LifeGame.getStatus() !== LifeGameStatus.init) {
            return;
        }

        var mousePos = getCanvasCursorPosition(event);

        if (mousePos.x > Field.width || mousePos.y > Field.height)
        {
            return;
        }

        var deltaForLine = 1;
        var side = Field.pixelOnSide - deltaForLine;

        var rectangle = {
            left: mousePos.x * Field.pixelOnSide + deltaForLine,
            top: mousePos.y * Field.pixelOnSide + deltaForLine
        };

        Field.array[mousePos.x][mousePos.y] = !Field.array[mousePos.x][mousePos.y];

        ctx.fillStyle = (Field.array[mousePos.x][mousePos.y] ? Field.colorFill : Field.colorEmpty);
        ctx.fillRect(rectangle.left, rectangle.top, side, side);
    }


    return {
        init: function (canvasId) {

            canvas = document.getElementById(canvasId);
            ctx = canvas.getContext('2d');

            canvasPosition.x = canvas.offsetTop;
            canvasPosition.y = canvas.offsetLeft;

            canvas.addEventListener('click', fillCellOnMousePos, false);

            this.drawGrid();

        },
        drawGrid : function(){
            
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

            ctx.strokeStyle = "#000";
            ctx.stroke();

        },
        clear : function(){
            canvas.width = canvas.width;
            ctx.fillStyle = Field.colorFill;
        },
        fillRect: function (left, top, width, height){
            ctx.fillRect(left, top, width, height);
        }

    };

})();
