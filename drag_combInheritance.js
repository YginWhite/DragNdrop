var Container = function (contId) {
    var that = this;
    var cont = document.getElementById(contId);
    this.cont = cont;
    this.coords = cont.getBoundingClientRect();
    this.cont.onmousemove = this.move(that);
    this.cont.onmouseleave = function () {
        that.moveInfo[0] = false;
    };
};
Container.prototype = {
    constructor: Container,
    delta: ['dxl', 'dxr', 'dyt', 'dyb'],
    moveInfo: [false, 'movingElm'],
    move: function (that) {
        return function (e) {
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
    }
}

var ElmForMoving = function (id, contId) {
    var that = this;
    var elm = document.getElementById(id);
    Container.call(this, contId);
    this.elm = elm;
    this.elm.onmousedown = this.findDelta(that);
    this.elm.onmouseup = function () {
        that.moveInfo[0] = false;
    }
};
ElmForMoving.prototype = Container.prototype;

ElmForMoving.prototype.findDelta = function(that) {
    return function (e) {
        that.moveInfo[0] = true;
        var c = this.getBoundingClientRect();
        that.delta[0] = e.clientX - c.left;
        that.delta[2] = e.clientY - c.top;
        that.delta[1] = c.right - e.clientX;
        that.delta[3] = c.bottom - e.clientY;
        that.moveInfo[1] = this;
    };
};

console.log(new ElmForMoving('inner', 'outer'));