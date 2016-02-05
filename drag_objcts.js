var dNd = function (cont, elms) {
    'use strict';
    var isInMove = false,
        dxl, dxr, dyt, dyb,
        clickedNow = null;


    var DragE = function (elm) {
        this.elm = elm;
    };

    DragE.prototype.initEvHandlers = function () {
        var that = this;
        this.elm.onmousedown = function (e) {
            isInMove = true;
            var c = that.elm.getBoundingClientRect();
            dxl = e.clientX - c.left;
            dyt = e.clientY - c.top;
            dxr = c.right - e.clientX;
            dyb = c.bottom - e.clientY;
            clickedNow = that.elm;
            //e.cancelBuble = true;
            //e.stopPropagation();
        };
        this.elm.onmouseup = function () {
            isInMove = false;
        };
    };


    var Container = function (cont, elms) {
        this.elms = elms;
        this.cont = cont;
        this.dragElms = {};
        this.coords = cont.getBoundingClientRect();
    };

    Container.prototype.constDragElms = function () {
        var elm, obj, drags = this.elms;
        for (elm in drags) {
            if (drags.hasOwnProperty(elm)) {
                obj = new DragE(drags[elm]);
                this.dragElms[elm] = obj;
                obj.initEvHandlers();
            }
        }
    };

    Container.prototype.initEvHandlers = function () {
        var that = this;
        this.cont.onmousemove = function (e) {
            if (isInMove) {

                var x = e.clientX, y = e.clientY;
                var bordLX = that.coords.left + that.cont.clientLeft + dxl,
                    bordRX = that.coords.right - that.cont.clientLeft - dxr;
                var bordTy = that.coords.top + that.cont.clientTop + dyt,
                    bordBy = that.coords.bottom - that.cont.clientTop - dyb;

                if (x > bordLX && x < bordRX) {
                    clickedNow.style.left = x - dxl - that.coords.left - that.cont.clientLeft + 'px';
                }
                if (y > bordTy && y < bordBy) {
                    clickedNow.style.top = y - dyt - that.coords.top - that.cont.clientTop + 'px';
                }

            }
        };
        this.cont.onmouseleave = function () {
            isInMove = false;
        };
    };

    var contain = new Container(cont, elms);
    contain.constDragElms();
    contain.initEvHandlers();

    contain = null;
};

dNd(document.getElementById('outer'), {
    inner: document.getElementById('inner'),
    inn: document.getElementById('in')
});

/*
dNd(document.body, {
    inner: document.getElementById('outer')
});
*/
