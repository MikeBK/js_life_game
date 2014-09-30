var Input = (function () {
    var isMouseDown = false;

    function mouseDown() {
        isMouseDown = true;
    }

    function mouseUp() {
        isMouseDown = false;
    }

    return {
        init: function () {
            document.addEventListener('mousedown', mouseDown, false);
            document.addEventListener('mouseup', mouseUp, false);
        },
        getIsMouseDown: function () {
            return isMouseDown;
        },
        getCursorPosition: function (e) {
            var mousePos = {};
            if (e.pageX !== undefined && e.pageY !== undefined) {
                mousePos.x = e.pageX;
                mousePos.y = e.pageY;
            }
            else {
                mousePos.x = e.clientX + document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                mousePos.y = e.clientY + document.body.scrollTop +
                        document.documentElement.scrollTop;
            }

            return mousePos;
        }

    };
})();