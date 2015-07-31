var background = new Kinetic.Layer({

    }),

    BACKGROUND_CONSTANTS = {
        BAR_WIDTH: 800,
        BAR_HEIGHT: 600,
        BAR_LOOP_SPEED: 1

    },
    bar,
    image,
    backGroundBar;



bar = (function () {
    var img = new Image(),
        newBar,
        bar = Object.create({});

    Object.defineProperty(bar, 'init', {
        value: function (image, x, y, speed) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.speed = speed;
            return this;
        }

    });

    Object.defineProperty(bar, 'draw', {
        value: function () {
            var x = this.x,
                y = this.y,
                speed = this.speed;

            img.onload = function () {
                newBar = new Kinetic.Image({
                    x: x,
                    y: y,
                    image: img,
                    width: BACKGROUND_CONSTANTS.BAR_WIDTH,
                    height: BACKGROUND_CONSTANTS.BAR_HEIGHT
                });

                background.add(newBar);
                // stage.add(background);
            };

            img.src = this.image;

        }
    });


    return bar;
}());


function generateBar(x, y, speed) {
    return Object.create(bar).init('images/Bar/bar3.png', x, y, speed);
}

backGroundBar = generateBar(0, 0, 1);
backGroundBar.draw();






