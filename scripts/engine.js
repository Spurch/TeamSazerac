window.onload = function () {
    var CONSTANTS = {
        STAGE_WIDTH: 800,
        STAGE_HEIGHT: 600,
        JUMP_SPEED: 60,
        INITIAL_BIRD_X: 100,        
        INITIAL_BIRD_RADIUS: 30,
        BIRD_GROW_RATE: 1.25,
        BIRD_SKINNIG_RATE: 1.33,
        MINIMUM_BIRD_RADIUS: 20,
        WON_GAME_BIRD_RADIUS: 80,
        GRAVITY_TO_RADIUS_RATIO: 11,
        INITIAL_BIRD_GRAVITY: 3,
        OBSTACLES_ABOVE_WIDTH: 100,
        OBSTACLES_ABOVE_HEIGHT: 50,
        OBSTACLES_BELOW_WIDTH: 50,
        OBSTACLES_BELOW_HEIGHT: 100,
        DRINK_WIDTH: 30,
        DRINK_HEIGHT: 50
    },
        currentBirdGravity = CONSTANTS.INITIAL_BIRD_GRAVITY,
        gameHasEnded = false;

    var stage = new Kinetic.Stage({
        container: 'container',
        width: CONSTANTS.STAGE_WIDTH,
        height: CONSTANTS.STAGE_HEIGHT
    });

    var birdLayer = new Kinetic.Layer();
    var drinkLayer = new Kinetic.Layer();
    var obstaclesLayer = new Kinetic.Layer();

    var bird = Object.create(drunkBird).init(CONSTANTS.INITIAL_BIRD_X, CONSTANTS.STAGE_HEIGHT / 2, CONSTANTS.INITIAL_BIRD_RADIUS);

    var birdShape = new Kinetic.Circle({
        x: bird.x,
        y: bird.y,
        radius:  bird.radius,
        fillPriority: 'pattern'
    });

    var birdImage = new Image();
    birdImage.onload = function () {
        birdShape.fillPatternImage(birdImage);
        birdShape.fillPatternOffsetX(580);
        birdShape.fillPatternOffsetY(800);
        birdShape.fillPatternScaleX(0.5);
        birdShape.fillPatternScaleY(0.5);
    };
    birdImage.src = "images/Bird/orange_bird.png";

    var divSvgEl = document.getElementById('svg-container');

    function displayFinalResult(text, styleColor) {
        divSvgEl.style.opacity = '1';
        var textEl = document.getElementById('result');
        var canvasEl = document.getElementById('container');
        canvasEl.style.opacity = '0';
        textEl.style.color = styleColor;
        textEl.innerHTML = text;
    }

    // TIMER ---------------------------------

    var timerDiv = document.getElementById('timer-container');
    var timerText = document.getElementById('timer-text');

    var timer = new Timer();
    timer.Interval = 1000;
    timer.Tick = timerTick;
    var seconds = 0;
    var minutes = 0;

    function timerTick(){
        var times = '';

        timerDiv.style.zIndex = 1;

        seconds += timer.Interval/1000;

        function timerCount() {
            times = minutes + ':' + seconds;
            if (seconds < 59) {
                console.log(times);
            } else {
                seconds = -1;
                minutes++;
                console.log(times);

            }

            timerText.innerHTML = times;
        }
        timerCount();
    }
    // TIMER ---------------------------------

    birdLayer.add(birdShape);
    //put kinetic layers here e.g stage.add(layerName);
    function birdAnimationFrame() {
        if(gameHasEnded){
            return;
        }
        
        if (bird.radius > CONSTANTS.INITIAL_BIRD_RADIUS) {
            currentBirdGravity = bird.radius / CONSTANTS.GRAVITY_TO_RADIUS_RATIO;
            // console.log(bird.radius);
        } else {
            currentBirdGravity = CONSTANTS.INITIAL_BIRD_GRAVITY;
        }
        bird.y += currentBirdGravity;

        if (bird.y >= CONSTANTS.STAGE_HEIGHT - bird.radius) {
            bird.y = CONSTANTS.STAGE_HEIGHT - bird.radius;

            birdShape.setY(bird.y);
            birdLayer.draw();
            gameHasEnded = true;

            displayFinalResult('Game Over! Bird is not flying!', 'red');
            // alert('Game Over! Bird is not flying!');
            timer.Stop();
            return;
        }

        if (bird.radius < CONSTANTS.MINIMUM_BIRD_RADIUS) {
            gameHasEnded = true;
            displayFinalResult('Game Over! Bird is starved to dead without alcohol!', 'red');
            // alert('Game Over! Bird is starved to dead without alcohol!');
            timer.Stop();

            return;
        }

        if (bird.radius > CONSTANTS.WON_GAME_BIRD_RADIUS) {
            gameHasEnded = true;
            displayFinalResult('Game Won! You got one happy drunk bird!', 'green');
            // alert('Game Won! You got one happy drunk bird!');
            timer.Stop();

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
    }

    (function () {
        //if you want to jump as long as you press SPACE btn comment 'keyup EventListener'
        //and the logic with btnIsDown
        var btnIsDown = false;
        window.addEventListener('keydown', function (ev) {
            if (ev.keyCode === 32) {
                if (btnIsDown) {
                    return;
                }
                btnIsDown = true;
                performJump(bird);
                birdShape.setY(bird.y);
            }
        });

        window.addEventListener('keyup', function (ev) {
            if (ev.keyCode === 32) {
                btnIsDown = false;
            }
        });
    } ());

    // birdAnimationFrame();

    function areColliding(bird, drawableObject) {
        var inBottomLeft = false,
            inBottomRight = false,
            inTopLeft = false,
            inTopRight = false,
            radiusPow = bird.radius * bird.radius,
            xPow = Math.pow(bird.x - drawableObject.x, 2),
            yPow = Math.pow(bird.y - drawableObject.y, 2),
            xWidth = Math.pow(bird.x - (drawableObject.x + drawableObject.width), 2),
            yHeight = Math.pow(bird.y - (drawableObject.y + drawableObject.height), 2);

        var distanceBottomLeft = xPow + yPow;
        var distanceTopLeft = xPow + yHeight;
        var distanceTopRight = xWidth + yHeight;
        var distanceBottomRight = xWidth + yPow;

        //var distanceBottomLeft = Math.pow(bird.x - drawableObject.x, 2) + Math.pow(bird.y - drawableObject.y, 2);
        //var distanceTopLeft = Math.pow(bird.x - drawableObject.x, 2) + Math.pow(bird.y - (drawableObject.y + drawableObject.height), 2);
        //var distanceTopRight = Math.pow(bird.x - (drawableObject.x + drawableObject.width), 2) + Math.pow(bird.y - (drawableObject.y + drawableObject.height), 2);
        //var distanceBottomRight = Math.pow(bird.x - (drawableObject.x + drawableObject.width), 2) + Math.pow(bird.y - drawableObject.y, 2);

        if (distanceBottomLeft <= radiusPow) {
            inBottomLeft = true;
        }

        if (distanceTopRight <= radiusPow) {
            inTopRight = true;
        }

        if (distanceTopLeft <= radiusPow) {
            inTopLeft = true;
        }

        if (distanceBottomRight <= radiusPow) {
            inBottomRight = true;
        }


        return inTopLeft || inBottomLeft || inTopRight || inBottomRight;
    }
    
    /*    var testBird = drunkBird.init(50, 50);
        var testObstacle = obstacle.init(50, 50, 20, 20);
    
        console.log('collision: ' + areColliding(testBird, testObstacle));*/

    var initialIntervalMaxX = stage.getWidth(),
        initialIntervalMinY = 100,
        initialIntervalMaxY = stage.getHeight() - 100,
        cocktailSources = [
            'images/Cocktails/cocktailOne.png',
            'images/Cocktails/cocktailTwo.png',
            'images/Cocktails/cocktailThree.png',
            'images/Cocktails/cocktailFour.png',
            'images/Cocktails/cocktailFive.png'
        ], softDrinkSources = [
            'images/SoftDrinks/softDrinkOne.png',
            'images/SoftDrinks/softDrinkTwo.png',
            'images/SoftDrinks/softDrinkThree.png',
            'images/SoftDrinks/softDrinkFour.png',
            'images/SoftDrinks/softDrinkFive.png'
        ], obstacleAboveSources = [
            'images/Obstacles/cable_above.png',
            'images/Obstacles/chandelier_above.png',
            'images/Obstacles/speaker_above.png'
        ], obstacleBelowSources = [
            'images/Obstacles/chair_below.png',
            'images/Obstacles/floorSign_below.png',
            'images/Obstacles/bin_below.png'
        ],
        basicSpeed = -3,
        drinkCount = 0,
        drinkArr = [],
        obstaclesArr = [],
        isActive = true,
        timeForObstacles = false;

    function randomNumberInInterval(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        return randomNumber;
    }

    function setSoftDrinkImage(softDrinkObject) {
        var softDrinkImage = new Image();
        var number = randomNumberInInterval(0, softDrinkSources.length - 1);
        softDrinkImage.src = softDrinkSources[number];

        softDrinkImage.onload = function () {
            softDrinkObject.setFillPatternImage(softDrinkImage);
            softDrinkObject.fillPatternScaleX(0.5);
            softDrinkObject.fillPatternScaleY(0.5);
            stage.draw();
        };

        return softDrinkImage;
    }

    function setCocktailImage(cocktailObject) {
        var cocktailImage = new Image();
        var number = randomNumberInInterval(0, cocktailSources.length - 1);
        cocktailImage.src = cocktailSources[number];

        cocktailImage.onload = function () {
            cocktailObject.setFillPatternImage(cocktailImage);
            cocktailObject.fillPatternScaleX(0.5);
            cocktailObject.fillPatternScaleY(0.5);
            stage.draw();
        };

        return cocktailImage;
    }

    function setObstacleImage(obstacleObject) {
        var obstacleImage = new Image();
        var number = Math.round(Math.random() * 2);

        if (obstacleObject.type === 'above') {
            obstacleImage.src = obstacleAboveSources[number];
        }

        if (obstacleObject.type === 'below') {
            obstacleImage.src = obstacleBelowSources[number];
        }

        obstacleImage.onload = function () {
            obstacleObject.setFillPatternImage(obstacleImage);
            obstacleObject.fillPatternScaleX(1);
            obstacleObject.fillPatternScaleY(1);
            stage.draw();
        };

        return obstacleImage;
    }

    function generateDrinkObject(drinkObject) {

        var drink = new Kinetic.Rect({
            x: drinkObject.x,
            y: drinkObject.y,
            width: drinkObject.width,
            height: drinkObject.height,
            fillPriority: 'pattern'
        });

        if (cocktail.isPrototypeOf(drinkObject)) {
            setCocktailImage(drink);
        } else {
            setSoftDrinkImage(drink);
        }
        return drink;
    }

    function generateObstacleObject(initialX, initialY, x, y) {
        var obstacle = new Kinetic.Rect({
            x: initialX,
            y: initialY,
            width: x,
            height: y,
            fillPriority: 'pattern'
        });

        return obstacle;
    }    

    function animateDrinks() {
        if(gameHasEnded){
            return;
        }
        
        drinkArr.forEach(function (drinkObject, index) {

            var updateX = drinkObject.speed;

            var x = drinkObject.kineticObject.getX() + updateX;

            drinkObject.kineticObject.setX(x);
            drinkObject.x = x;

            if (drinkObject.kineticObject.getX() + drinkObject.kineticObject.getWidth() < 0) {
                drinkObject.kineticObject.remove();
                drinkArr.splice(index, 1);
            }

            if (areColliding(bird, drinkObject)) {
                if (cocktail.isPrototypeOf(drinkObject)) {
                    bird.radius *= CONSTANTS.BIRD_GROW_RATE;
                } else {
                    bird.radius /= CONSTANTS.BIRD_SKINNIG_RATE;
                }

                birdShape.setRadius(bird.radius);
                // console.log(bird.radius);
                drinkObject.kineticObject.remove();
                drinkArr.splice(index, 1);
            }
            // console.log(birdArr.length);
        });
        drinkLayer.draw();
        requestAnimationFrame(animateDrinks);
    }        

    function animateObstacleFrame() {
        if(gameHasEnded){
            return;
        }

        obstaclesArr.forEach(function (obstacleObject, index) {
            obstacleObjectX = obstacleObject.kineticObject.getX();
            obstacleObjectX += basicSpeed;
            obstacleObject.x = obstacleObjectX;
            obstacleObject.kineticObject.setX(obstacleObjectX);

            if (obstacleObject.kineticObject.getX() + obstacleObject.kineticObject.getWidth() < 0) {
                obstacleObject.kineticObject.remove();
                obstaclesArr.splice(index, 1);
            }

            if (areColliding(bird, obstacleObject)) {
                gameHasEnded = true;
                displayFinalResult('Game Over! You hit an obstacle', 'red');
                timer.Stop();

                return;
            }            
        });

        obstaclesLayer.draw();
        requestAnimationFrame(animateObstacleFrame);
    }
    //animateObstacleFrame();
    //animateDrinks();

    //stage.add(background);
    //stage.add(drinkLayer);
    //stage.add(obstaclesLayer);
    //uncomment the 2 lines below to see homePage and optionsPage......
   	stage.add(homeScreen);
    //stage.add(birdLayer);

    window.addEventListener('navigateToHomeScreen', function () {
        //hide other elements and show homeScreen
        console.log('we change screen to HOME');
        optionsScreen.clear(); 
        //stage.re
    }, false);
    window.addEventListener('navigateToOptionsScreen', function () {
        //hide other elements and show optionsSCreen
        console.log('we change screen to OPTIONS');
    }, false);
    window.addEventListener('navigateToIngameScreen', function () {
        //hide other elements and show inGameScreen 
        window.onfocus = function () { 
            isActive = true; 
        };
        window.onblur = function () { 
            isActive = false; 
        }; 
        setInterval(function () {
            if (isActive){
                 ++drinkCount;
                if (drinkCount % 3 === 0) {
                    var cocktailObject = Object.create(cocktail).init(initialIntervalMaxX, randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY), CONSTANTS.DRINK_WIDTH, CONSTANTS.DRINK_HEIGHT);
                    cocktailObject.speed = basicSpeed;
                    cocktailObject.kineticObject = generateDrinkObject(cocktailObject);
                    drinkLayer.add(cocktailObject.kineticObject);
                    drinkArr.push(cocktailObject);
                } else {
                    var softDrinkObject = Object.create(softDrink).init(initialIntervalMaxX, randomNumberInInterval(initialIntervalMinY, initialIntervalMaxY), CONSTANTS.DRINK_WIDTH, CONSTANTS.DRINK_HEIGHT);
                    softDrinkObject.speed = basicSpeed;
                    softDrinkObject.kineticObject = generateDrinkObject(softDrinkObject);
                    drinkLayer.add(softDrinkObject.kineticObject);
                    drinkArr.push(softDrinkObject);
                }
            }
            if (isActive && timeForObstacles) 
            {            
                var randomNumber = randomNumberInInterval(0, 100);
                if (randomNumber % 2 === 0) {
                    var aboveObstacleObject = Object.create(obstacle).init(initialIntervalMaxX, initialIntervalMinY, CONSTANTS.OBSTACLES_ABOVE_WIDTH, CONSTANTS.OBSTACLES_ABOVE_HEIGHT);
                    aboveObstacleObject.kineticObject = generateObstacleObject(initialIntervalMaxX, initialIntervalMinY, CONSTANTS.OBSTACLES_ABOVE_WIDTH, CONSTANTS.OBSTACLES_ABOVE_HEIGHT);
                    aboveObstacleObject.kineticObject.type = 'above';
                    obstaclesLayer.add(aboveObstacleObject.kineticObject);
                    obstaclesArr.push(aboveObstacleObject);
                    setObstacleImage(aboveObstacleObject.kineticObject);
                }else{
                    var belowObstacleObject = Object.create(obstacle).init(initialIntervalMaxX, initialIntervalMaxY, CONSTANTS.OBSTACLES_BELOW_WIDTH, CONSTANTS.OBSTACLES_BELOW_HEIGHT);
                    belowObstacleObject.kineticObject = generateObstacleObject(initialIntervalMaxX, initialIntervalMaxY, CONSTANTS.OBSTACLES_BELOW_WIDTH, CONSTANTS.OBSTACLES_BELOW_HEIGHT);
                    belowObstacleObject.kineticObject.type = 'below';
                    obstaclesLayer.add(belowObstacleObject.kineticObject);
                    obstaclesArr.push(belowObstacleObject);
                    setObstacleImage(belowObstacleObject.kineticObject);
                }            
            }           
        }, 1500);
        //Control the time of the obstacles spawn
        setInterval(function (){
            if(timeForObstacles){
                timeForObstacles = false;
            }else{
                timeForObstacles = true;
            }
        },2000);
        /*setInterval(function () {
            if (isActive){                
                var randomNumber = randomNumberInInterval(0, 100);
                if (randomNumber % 2 === 0) {
                    var aboveObstacleObject = Object.create(obstacle).init(initialIntervalMaxX, initialIntervalMinY, CONSTANTS.OBSTACLES_ABOVE_WIDTH, CONSTANTS.OBSTACLES_ABOVE_HEIGHT);
                    aboveObstacleObject.kineticObject = generateObstacleObject(initialIntervalMaxX, initialIntervalMinY, CONSTANTS.OBSTACLES_ABOVE_WIDTH, CONSTANTS.OBSTACLES_ABOVE_HEIGHT);
                    aboveObstacleObject.kineticObject.type = 'above';
                    obstaclesLayer.add(aboveObstacleObject.kineticObject);
                    obstaclesArr.push(aboveObstacleObject);
                    setObstacleImage(aboveObstacleObject.kineticObject);
                }else{
                    var belowObstacleObject = Object.create(obstacle).init(initialIntervalMaxX, initialIntervalMaxY, CONSTANTS.OBSTACLES_BELOW_WIDTH, CONSTANTS.OBSTACLES_BELOW_HEIGHT);
                    belowObstacleObject.kineticObject = generateObstacleObject(initialIntervalMaxX, initialIntervalMaxY, CONSTANTS.OBSTACLES_BELOW_WIDTH, CONSTANTS.OBSTACLES_BELOW_HEIGHT);
                    belowObstacleObject.kineticObject.type = 'below';
                    obstaclesLayer.add(belowObstacleObject.kineticObject);
                    obstaclesArr.push(belowObstacleObject);
                    setObstacleImage(belowObstacleObject.kineticObject);
                }
            }
        }, 1500);*/
        
        //setInterval(function(){if (isFocused) { isFocused = false;}else{isFocused = true;}},4000);
        console.log('we change screen to Ingame and start playing the game');
        homeScreen.clear();
        stage.add(background);
        stage.add(drinkLayer);
        stage.add(obstaclesLayer);
        stage.add(birdLayer);
        birdAnimationFrame();
        animateObstacleFrame();
        animateDrinks();
        timer.Start();

    }, false);

    // test onblur and onfocus
    setInterval(function () { 
      console.log(isActive ? 'active' : 'inactive'); 
    }, 1000);
};
