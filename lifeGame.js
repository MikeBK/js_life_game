var LifeGameSTATUS = {
    FIELD_SET: 0,
    GAME_ON: 1
};

var LifeGame = (function() {
    var status;
    var turn = 0;
    var fieldCopy = [];

    function updateField() {

        for (var i = 0; i < Field.width; i++) {
            for (var j = 0; j < Field.height; j++) {
                Field.arrayCopy[i][j] = Field.array[i][j];
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
        init: function() {
            status = LifeGameSTATUS.FIELD_SET;
        },
        main: function() {
            if (status === LifeGameSTATUS.GAME_ON) {
                updateField();
                Field.drawField();
                turn++;
            }
        },
        starGame: function() {
            status = LifeGameSTATUS.GAME_ON;
        },
        stopGame: function() {
            status = LifeGameSTATUS.FIELD_SET;
        },
        getStatus: function() {
            return status;
        }
    };

})();

