var background = new Kinetic.Layer(),
    BACKGROUND_CONSTANTS = {
        SKY_WIDTH: 800,
        SKY_HEIGHT: 600,
        CLOUD_VELOCITY: 50
    },
    sky,
    grass,
    cloudsCollection,
    randomCloud,
    cloudsAnimation;


sky = new Kinetic.Rect({
    fill: '#00FFFF',
    stroke: 'black',
    x: 0,
    y: 0,
    width: BACKGROUND_CONSTANTS.SKY_WIDTH,
    height: BACKGROUND_CONSTANTS.SKY_HEIGHT
});

background.add(sky);

clouds = new Kinetic.Layer();


cloudsCollection = ["images/Clouds/CL02.png", "images/Clouds/CL03.png", "images/Clouds/CL07.png"];

//function for a random integer start inclusive, end excluded
function generateRandomIntegerPosition(start, end) {

    return Math.floor(Math.random() * (end - start)) + start;
}

//creates a cloud object
cloud = (function () {
    var img = new Image(),
        newCloud,
        cloud = Object.create({});

    Object.defineProperty(cloud, 'init', {
        value: function (image, x, y, speed) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.speed = speed;
            return this;
        }

    });

    Object.defineProperty(cloud, 'draw', {
        value: function () {
            var x = this.x,
                y = this.y,
                speed = this.speed;

            img.onload = function () {
                newCloud = new Kinetic.Image({
                    x: x,
                    y: y,
                    image: img,
                    width: 70,
                    height: 40
                });
                background.add(newCloud);
            };

            img.src = this.image;
        }
    });


    return cloud;
}());


function generateCloud() {
    return Object.create(cloud).init(cloudsCollection[generateRandomIntegerPosition(0, cloudsCollection.length)], 801, generateRandomIntegerPosition(5, 35), 1);
}

var cloud = generateCloud();
//var secondCloud = generateCloud();

cloudsAnimation = new Kinetic.Animation(function () {
    cloud.draw();
    cloud.x -= cloud.speed;

    if (cloud.x < 0) {
        cloud = generateCloud();
    }

    background.draw();
    background.add(sky);

});

cloudsAnimation.start();



