(function () {
    'use strict';
    var Container = function (contId, elmsIds) {
        this.elms = [];
        this.cont = document.getElementById(contId);
        this.coords = null;
        this.delta = ['dxl', 'dxr', 'dyt', 'dyb'];
        this.moveInfo = [false, 'movedNowElm'];

        var that = this;
        (function () {
            that.coords = that.cont.getBoundingClientRect();
            var i, el;
            for (i = 0; i < elmsIds.length; i += 1) {
                el = document.getElementById(elmsIds[i]);
                that.elms.push(el);
            }
        }());

        this.cont.onmousemove = function (e) {
            if (that.moveInfo[0] === true) {
                var x = e.clientX, y = e.clientY;
                var bordLX = that.coords.left + that.cont.clientLeft + that.delta[0],
                    bordRX = that.coords.right - that.cont.clientLeft - that.delta[1];
                var bordTy = that.coords.top + that.cont.clientTop + that.delta[2],
                    bordBy = that.coords.bottom - that.cont.clientTop - that.delta[3];

                if (x > bordLX && x < bordRX) {
                    that.moveInfo[1].style.left = x - that.delta[0] - that.coords.left - that.cont.clientLeft + 'px';
                }
                if (y > bordTy && y < bordBy) {
                    that.moveInfo[1].style.top = y - that.delta[2] - that.coords.top - that.cont.clientTop + 'px';
                }
            }
        };
        this.cont.onmouseleave = function () {
            that.moveInfo[0] = false;
        };
    };

    Container.prototype.initElemsHandl = function () {
        var that = this, i;
        for (i = 0; i < this.elms.length; i += 1) {
            this.elms[i].onmousedown = function (e) {
                that.moveInfo[0] = true;
                var c = this.getBoundingClientRect();
                that.delta[0] = e.clientX - c.left;
                that.delta[2] = e.clientY - c.top;
                that.delta[1] = c.right - e.clientX;
                that.delta[3] = c.bottom - e.clientY;
                that.moveInfo[1] = this;
            };
            this.elms[i].onmouseup = function () {
                that.moveInfo[0] = false;
            };
        }
    };

    var c = new Container('outer', ['inner']);
    c.initElemsHandl();
    c = null;
}());

