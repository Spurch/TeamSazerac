var drawableObject = (function () {
    var drawableObject = {
        init: function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        },
        get x() {
            return this._x;
        },
        set x(value) {
            this._x = value;
        },
        get y() {
            return this._y;
        },
        set y(value) {
            this._y = value;
        },
        get width() {
            return this._width;
        },
        set width(value) {
            this._width = value;
        },
        get height() {
            return this._height;
        },
        set height(value) {
            this._height = value;
        }
    };

    return drawableObject;

}());

var cocktail = (function (parent) {

    var cocktail = Object.create(parent);

    cocktail.init = function (x, y, width, height) {
        parent.init.call(this, x, y, width, height);

        return this;
    };

    return cocktail;
}(drawableObject));

var softDrink = (function (parent) {

    var softDrink = Object.create(parent);

    softDrink.init = function (x, y, width, height) {
        parent.init.call(this, x, y, width, height);

        return this;
    };

    return softDrink;
}(drawableObject));

var obstacle = (function(parent){
    var obstacle = Object.create(parent);
    
    obstacle.init = function (x, y, width, height) {
        parent.init.call(this, x, y, width, height);

        return this;
    };
    
    return obstacle;
}(drawableObject));

/*var bloodyMarry = Object.create(cocktail).init(20, 30, 50, 100);
var pepsi = Object.create(softDrink).init(20, 30, 50, 100);
var barrier = Object.create(obstacle).init(20, 30, 50, 100);*/

/*console.log(drawableObject.isPrototypeOf(bloodyMarry)); //true
console.log(cocktail.isPrototypeOf(bloodyMarry)); //true
console.log(drawableObject.isPrototypeOf(pepsi)); //true
console.log(softDrink.isPrototypeOf(pepsi)); //true
console.log(drawableObject.isPrototypeOf(barrier)); //true
console.log(obstacle.isPrototypeOf(barrier)); //true*/