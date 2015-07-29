var BIRD_DATA = {
    initialRadius: 30,
    isFlyingDefault: true,
};

//isFlaying -> is the state of the bird, it will be manipulated by the engine

var drunkBird = (function () {

    var bird = {
        init: function (x, y) {
            this.x = x;
            this.y = y;
            this.radius = BIRD_DATA.initialRadius;
            this.isFlying = BIRD_DATA.isFlyingDefault;
            return this;
        },
        get x() {
            return this._x
        },
        set x(value) {
            this._x = value;
        },
        get y() {
            return this._y
        },
        set y(value) {
            this._y = value;
        },
        get radius() {
            return this._radius
        },
        set radius(value) {
            this._radius = value;
        },
        get isFlying() {
            return this._isFlying
        },
        set isFlying(value) {
            this._isFlying = value;
        }
    };
    
    return bird;
}());
