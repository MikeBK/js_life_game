function LifeGame() {
    this.status = 0; //0 - расстановка / 1 - игра
    this.turn = 0;
    this.fieldCopy = [];

};

LifeGame.prototype.init = function() {
    for (var i = 0; i < Field.width; i++) {
        this.fieldCopy[i] = [];
        for (var j = 0; j < Field.height; j++) {
            this.fieldCopy[i][j] = false;
        }
    }

};


LifeGame.prototype.updateField = function() {

    for (var i = 0; i < Field.width; i++) {
        for (var j = 0; j < Field.height; j++) {
            this.fieldCopy[i][j] = Field.array[i][j];
        }
    }

    for (var i = 0; i < Field.width; i++) {
        for (var j = 0; j < Field.height; j++) {

            var countN = this.countNeighbors(i, j);
            if (this.fieldCopy[i][j]) {
                Field.array[i][j] = (countN === 2 || countN === 3);
            }
            else {
                Field.array[i][j] = (countN === 3);
            }
        }
    }
};

LifeGame.prototype.countNeighbors = function(x, y) {
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

            if (this.fieldCopy[x + i][y + j]) {
                count++;
            }
        }
    }
    return count;
};

LifeGame.prototype.drawField = function() {

    canvas.width = canvas.width;
    ctx.fillStyle = Field.colorFill;
    
    var deltaForLine = 1;
    var side = Field.pixelOnSide + deltaForLine;
    for (var i = 0; i < Field.width; i++) {
        for (var j = 0; j < Field.height; j++) {

            if (Field.array[i][j]) {
                ctx.fillRect(i * side, j * side, side, side);
            }
        }
    }
};

LifeGame.prototype.main = function() {
    if (this.status === 1) {
        this.updateField();
        this.drawField();
        this.turn++;
    }
};

