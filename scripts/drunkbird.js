var BIRD_DATA = {
    x: 60, 
    initialRadius: 20,
    flies: false
};

//flies -> if set to false the bird will fall
//else when pressing the space key will climb up

var drunkBird = (function () {

    var bird = {
        init: function (y) {
            this.x = BIRD_DATA.x;
            this.y = y;
            this.radius = BIRD_DATA.initialRadius;
            this.flies = BIRD_DATA.flies;
            return this;
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
        get flies() {
            return this._flies
        },
        set flies(value) {
            this._flies = value;
        }
    };

    Object.defineProperties(drunkBird, {
        'draw': {
            value: function () {
                var birdObj = new Kinetic.Circle({
                    x: this.x,
                    y: this.y,
                    radius: this.radius,
                    fill: 'green'
                });
                birdLayer.add(birdObj);
            }
        },
        'updatePosition': {
            value: function (flies, gravity) {
                if (flies) {
                    this.y -= gravity;
                    this.flies = BIRD_DATA.flies;
                } else {
                    this.y += gravity / 2;
                }
                this.draw();
            }
        },
        'drinkCocktail': {
            value: function (growRate) {
                this.radius *= growRate;
                this.draw();
            }
        },
        'drinkSoftDrink': {
            value: function (skinRate) {
                this.radius /= skinRate;
                this.draw();
            }
        }
    });
    return bird;
}());


