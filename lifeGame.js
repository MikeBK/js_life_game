var LifeGameStatus = {
    init: 0,
    game: 1
};

var LifeGame = (function () {
    var status = LifeGameStatus.init; //0 - расстановка / 1 - игра
    var turn = 0;
    var fieldCopy = [];

    function countNeighbors(x, y) {
        var count = 0;
        for (var i = -1; i < 2; i++) {
            if (x + i < 0 || x + i > Field.width - 1) {
                continue;
            }
            for (var j = -1; j < 2; j++) {
                if (y + j < 0 || y + j > Field.height - 1
                        || (i === 0 && j === 0))
                {
                    continue;
                }

                if (fieldCopy[x + i][y + j]) {
                    count++;
                }
            }
        }
        return count;
    }

    function updateField() {

        for (var i = 0; i < Field.width; i++) {
            for (var j = 0; j < Field.height; j++) {
                fieldCopy[i][j] = Field.array[i][j];
            }
        }

        for (var i = 0; i < Field.width; i++) {
            for (var j = 0; j < Field.height; j++) {

                var countN = countNeighbors(i, j);
                if (fieldCopy[i][j]) {
                    Field.array[i][j] = (countN === 2 || countN === 3);
                }
                else {
                    Field.array[i][j] = (countN === 3);
                }
            }
        }
    }

    function drawField() {

        CanvasManager.clear();

        var deltaForLine = 1;
        var side = Field.pixelOnSide + deltaForLine;
        for (var i = 0; i < Field.width; i++) {
            for (var j = 0; j < Field.height; j++) {

                if (Field.array[i][j]) {
                    CanvasManager.fillRect(i * side, j * side, side, side);
                }
            }
        }
    }

    return {
        init: function () {

            for (var i = 0; i < Field.width; i++) {
                fieldCopy[i] = [];
                for (var j = 0; j < Field.height; j++) {
                    fieldCopy[i][j] = false;
                }
            }

        },
        main: function () {
            if (status === LifeGameStatus.game) {
                updateField();
                drawField();
                turn++;
            }
        },
        starGame: function () {
            status = LifeGameStatus.game;
        },
        stopGame: function () {
            status = LifeGameStatus.init;
        },
        getStatus: function () {
            return status;
        }

    };

})();

