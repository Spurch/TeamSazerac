var drink = (function () {
    var drink = {
        init: function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
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

    return drink;

}());

var cocktail = (function (parent) {

    var cocktail = Object.create(parent);

    cocktail.init = function (x, y, width, height) {
        parent.init.call(this, x, y, width, height);

        return this;
    };

    return cocktail;
}(drink));

var softDrink = (function (parent) {

    var softDrink = Object.create(parent);

    softDrink.init = function (x, y, width, height) {
        parent.init.call(this, x, y, width, height);

        return this;
    };

    return softDrink;
}(drink));

var bloodyMarry = Object.create(softDrink).init(20, 30, 50, 100);
var pepsi = Object.create(cocktail).init(20, 30, 50, 100);

console.log(drink.isPrototypeOf(bloodyMarry)); //true
console.log(cocktail.isPrototypeOf(bloodyMarry)); //false
console.log(bloodyMarry instanceof cocktail); // throw error



console.log(drink.isPrototypeOf(pepsi)); //false

//console.log(cocktail.getPrototypeOf(bloodyMarry));