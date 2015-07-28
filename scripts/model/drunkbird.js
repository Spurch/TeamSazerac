var BIRD_DATA = {
    initialRadius: 30,
    isFlayingDefault: false,
    isAliveDefault: true
};

//isFlaying -> is the state of the bird, it will be manipulated by the engine

//isAlive -> is the state of the bird, it will be manipulated by the engine

var drunkBird = (function () {

    var bird = {
        init: function (x, y) {
            this.x = x;
            this.y = y;
            this.radius = BIRD_DATA.initialRadius;
            this.isFlying = BIRD_DATA.isFlyingDefault;
            this.isAlive = BIRD_DATA.isAliveDefault;
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
        }        ,
        get isAlive() {
            return this._isAlive
        },
        set isAlive(value) {
            this._isAlive = value;
        }
    };

    Object.defineProperties(bird, {
        'updateYPosition': {
            value: function (flies, gravity) {
                if (flies) {
                    this.y -= gravity;
                    this.isFlaying = false;
                } else {
                    this.y += gravity / 2;
                }                
            }
        }
    });
    
    return bird;
}());
