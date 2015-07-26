window.onload = function () {
    var CONSTANTS = {
        STAGE_WIDTH: 800,
        STAGE_HEIGHT: 600,
        JUMP_SPEED: 75,
        GRAVITY: 3
    }

    var stage = new Kinetic.Stage({
        container: 'container',
        width: CONSTANTS.STAGE_WIDTH,
        height: CONSTANTS.STAGE_HEIGHT
    });

    var birdLayer = new Kinetic.Layer();

    var bird = drunkBird.init(50, 50);

    var birdShape = new Kinetic.Circle({
        x: bird.x,
        y: bird.y,
        radius: bird.radius,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
    });
    
    birdLayer.add(birdShape);
    //put kinetic layers here e.g stage.add(layerName);
    function birdAnimationFrame() {
        bird.y += CONSTANTS.GRAVITY;
        if (bird.y - bird.radius > CONSTANTS.STAGE_HEIGHT) {
            bird.y = CONSTANTS.STAGE_HEIGHT - bird.radius;
            bird.isFlying = false;

            birdShape.setY(bird.y);
            birdLayer.draw();

            alert('Game Over bird is not flying');
            return;
        }

        birdShape.setY(bird.y);

        birdLayer.draw();

        requestAnimationFrame(birdAnimationFrame);
    }

    function performJump(bird) {
        if (bird.y - bird.radius >= CONSTANTS.JUMP_SPEED) {
            bird.y -= CONSTANTS.JUMP_SPEED;
        } else {
            bird.y = 0 + bird.radius;
        }

        birdShape.setY(bird.y);
    }

    window.addEventListener('keydown', function (ev) {
        if (ev.keyCode === 32) {
            performJump(bird);
        }
    });

    birdAnimationFrame();
    
    stage.add(background);
    stage.add(birdLayer);

    
};