
var Field = {};
Field.width = 50;
Field.height = 50;
Field.pixelOnSide = 10;
Field.array = [];

for (var i = 0; i < Field.width; i++) {
    Field.array[i] = [];
    for (var j = 0; j < Field.height; j++) {
        Field.array[i][j] = false;
    }
}