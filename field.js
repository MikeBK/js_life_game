var Field = {
    width: 50,
    height: 50,
    pixelOnSide: 10,
    colorFill: '#000',
    colorEmpty: '#fff',
    array: [],
    init: function() {
        for (var i = 0; i < this.width; i++) {
            this.array[i] = [];
            for (var j = 0; j < this.height; j++) {
                this.array[i][j] = false;
            }
        }
    }
};

