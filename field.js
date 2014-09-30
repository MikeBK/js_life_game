var Field = (function () {
    var arrayCopy;
    var array;
    var width = 50;
    var height = 50;
    var pixelOnSide = 10;
    var deltaForLine = 1;
    var colorFill = '#000';
    var colorEmpty = '#fff';

    return {
        init: function () {
            for (var i = 0; i < width; i++) {
                array[i] = [];
                for (var j = 0; j < height; j++) {
                    array[i][j] = false;
                }
            }

            arrayCopy = array.slice(0);
        },
        getCell: function (i, j) {
            return array[i][j];
        },
        getColorFill: function(){
            return colorFill;
        },
        getColorEmpty: function(){
            return colorEmpty;
        },
        drawField: function () {
            CanvasManager.clear();

            var side = pixelOnSide - deltaForLine;
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    if (array[i][j]) {
                        CanvasManager.fillRect(i * pixelOnSide + deltaForLine, j * pixelOnSide + deltaForLine, side, side);
                    }
                }
            }
        },
        countNear1: function (x, y) {
            var count = 0;
            for (var i = -1; i < 2; i++) {
                if (x + i < 0 || x + i > width - 1) {
                    continue;
                }
                for (var j = -1; j < 2; j++) {
                    if (y + j < 0 || y + j > height - 1
                            || (i === 0 && j === 0))
                    {
                        continue;
                    }

                    if (array[x + i][y + j]) {
                        count++;
                    }
                }
            }
            return count;
        },
        fillCellOnMousePos: function (event) {

            if (!Input.getIsMouseDown()) {
                return;
            }

            if (LifeGame.getStatus() !== LifeGameStatus.FIELD_SET) {
                return;
            }

            var mousePos = getCanvasCursorPosition(event);

            mousePos.x = parseInt(mousePos.x / Field.pixelOnSide);
            mousePos.y = parseInt(mousePos.y / Field.pixelOnSide);

            if (mousePos.x > width - 1 || mousePos.y > height - 1)
            {
                return;
            }

            var side = pixelOnSide - deltaForLine;

            var rectangle = {
                left: mousePos.x * pixelOnSide + deltaForLine,
                top: mousePos.y * pixelOnSide + deltaForLine
            };

            if (event.shiftKey) {
                array[mousePos.x][mousePos.y] = false;
            } else {
                array[mousePos.x][mousePos.y] = true;
            }

            CanvasManager.setFillStyle(array[mousePos.x][mousePos.y] ? colorFill : colorEmpty);
            CanvasManager.fillRect(rectangle.left, rectangle.top, side, side);
        }



    };
})();
