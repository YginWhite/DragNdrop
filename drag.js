(function () {
    'use strict';
    var outerElmIn, isClickedInner, move = null, dxl, dyl, dxr, dyr, isInMove;

    var outer = document.getElementById('outer');
    var inner = document.getElementById('inner');
    var outerCoords = outer.getBoundingClientRect();
    var outerCT = outer.clientTop, outerCL = outer.clientLeft;

    var findCoords = function (e) {
        var coords = inner.getBoundingClientRect();
        var y = coords.top;
        var x = coords.left;

        dxl = e.clientX - x;
        dyl = e.clientY - y;
        dxr = coords.right - e.clientX;
        dyr = coords.bottom - e.clientY;
    };

    var mouseMove = function () {
        return (outerElmIn && isClickedInner) && function (e) {

            var x = e.clientX, y = e.clientY;
            var bordLX = outerCoords.left + outerCL + dxl,
                bordRX = outerCoords.right - outerCL - dxr;
            var bordTy = outerCoords.top + outerCT + dyl,
                bordBy = outerCoords.bottom - outerCT - dyr;

            if (!isInMove) {

                if (x > bordLX && x < bordRX) {
                    inner.style.left = x - dxl - outerCoords.left - outerCL + 'px';
                }
                if (y > bordTy && y < bordBy) {
                    inner.style.top = y - dyl - outerCoords.top - outerCT + 'px';
                }

            }

        };
    };

    outer.onmouseenter = function () {
        outerElmIn = true;
    };

    inner.onmousedown = function (e) {
        isClickedInner = true;
        isInMove = false;
        findCoords(e);
    };

    var flag = true;
    outer.onmousemove = function () {
        if (isClickedInner && flag) {
            move = mouseMove();
            flag = false;
            outer.onmousemove = move;
        }
    };

    inner.onmouseup = function () {
        isInMove = true;
        isClickedInner = false;
    };

    outer.onmouseleave = function () {
        outerElmIn = false;
        isInMove = true;
    };

}());