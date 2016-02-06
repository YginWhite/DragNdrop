(function () {
    'use strict';
    var outerElmIn, // флаг свидетельствующий о том, что курсор мышки зашел на контейнер
        isClickedInner, // флаг, указывает был ли mousedown на элементе внутри контейнера
        move = null, // сюда будет запиана функция, отвечающая за перемещение єлемента
        dxl, dyt, dxr, dyb, // смещения относительно точки нажания на элементе
        isInMove; // флаг показывающий, что элемент готов к перемещению

    var outer = document.getElementById('outer'); // контейнер
    var inner = document.getElementById('inner'); // элемент
    var outerCoords = outer.getBoundingClientRect(); // координаты контейнра относительно окна браузера
    var outerCT = outer.clientTop, outerCL = outer.clientLeft; // толщина рамки контейнера

    var findCoords = function (e) { // опрееляет смещения относительно точки нажатия на элементе
        var coords = inner.getBoundingClientRect();

        dxl = e.clientX - coords.left;
        dyt = e.clientY - coords.top;
        dxr = coords.right - e.clientX;
        dyb = coords.bottom - e.clientY;
    };

    var mouseMove = function () { // возвращает функцию, которая осуществляет перемещение элемента относительно контейнера
        return (outerElmIn && isClickedInner) && function (e) { // возвращает ф-ю только кокда мышка зайшла на контейнер и было нажатие на элементе
            if (isInMove) {

                var x = e.clientX, y = e.clientY;
                var bordLX = outerCoords.left + outerCL + dxl, // граничная точка приближения мишки(точки нажатия) внутри контейнера влево 
                    bordRX = outerCoords.right - outerCL - dxr; // вправо
                var bordTy = outerCoords.top + outerCT + dyt, // вверх
                    bordBy = outerCoords.bottom - outerCT - dyb; // вниз

                if (x > bordLX && x < bordRX) {
                    inner.style.left = x - dxl - outerCoords.left - outerCL + 'px'; // вычисляется перемещение элемента относительно оси X в середине контейнера 
                }
                if (y > bordTy && y < bordBy) {
                    inner.style.top = y - dyt - outerCoords.top - outerCT + 'px'; // относительно оси Y
                }

            }

        };
    };

    outer.onmouseenter = function () { // мышка зайшла на контейнер
        outerElmIn = true;
    };

    inner.onmousedown = function (e) { // нажатие на элементе
        isClickedInner = true;
        isInMove = true;
        findCoords(e);
    };

    var flag = true; // флаг служит для того чтобы mouseMove вычислилась только раз
    outer.onmousemove = function () { // 
        if (isClickedInner && flag) {
            move = mouseMove(); 
            flag = false;
            outer.onmousemove = move; // ставит обработчиком move для перемещения мыши в контейнере (только после ервого клика на элементе)
        }
    };

    inner.onmouseup = function () { // элемент отпущен
        isInMove = false;
        isClickedInner = false;
    };

    outer.onmouseleave = function () { // мышка ушла с контейнера
        outerElmIn = false;
        isInMove = false;
    };

}());