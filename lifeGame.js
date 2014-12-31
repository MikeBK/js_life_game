var LifeGameSTATUS = {
    FIELD_SET: 0,
    GAME_ON: 1
};

var LifeGame = (function () {
    var status;
    var turn = 0;

    function updateField() {

        Field.fieldArrayToCopy();

        Field.fieldMap(function (i, j) {
            var countN = Field.countNear1(i, j);
            if (Field.getCellCopy(i, j)) {
                Field.setCell(i, j, (countN === 2 || countN === 3));
            }
            else {
                Field.setCell(i, j, (countN === 3));
            }
        });

    }

    return {
        init: function () {
            status = LifeGameSTATUS.FIELD_SET;
        },
        main: function () {
            if (status === LifeGameSTATUS.GAME_ON) {
                updateField();
                Field.drawField();
                turn++;
            }
        },
        starGame: function () {
            status = LifeGameSTATUS.GAME_ON;
        },
        stopGame: function () {
            status = LifeGameSTATUS.FIELD_SET;
        },
        getStatus: function () {
            return status;
        }
    };

})();

