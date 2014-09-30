var LifeGameStatus = {
    FIELD_SET: 0,
    GAME_ON: 1
};

var LifeGame = (function () {
    var status = LifeGameStatus.FIELD_SET; //0 - расстановка / 1 - игра
    var turn = 0;
    var fieldCopy = [];

    function updateField() {

        for (var i = 0; i < Field.width; i++) {
            for (var j = 0; j < Field.height; j++) {
                fieldCopy[i][j] = Field.array[i][j];
            }
        }

        for (var i = 0; i < Field.width; i++) {
            for (var j = 0; j < Field.height; j++) {

                var countN = Field.countNear1(i, j);
                if (fieldCopy[i][j]) {
                    Field.array[i][j] = (countN === 2 || countN === 3);
                }
                else {
                    Field.array[i][j] = (countN === 3);
                }
            }
        }
    }

    return {
        init: function () {
            fieldCopy = Field.array.slice(0);
        },
        main: function () {
            if (status === LifeGameStatus.GAME_ON) {
                updateField();
                Field.drawField();
                turn++;
            }
        },
        starGame: function () {
            status = LifeGameStatus.GAME_ON;
        },
        stopGame: function () {
            status = LifeGameStatus.FIELD_SET;
        },
        getStatus: function () {
            return status;
        }

    };

})();

