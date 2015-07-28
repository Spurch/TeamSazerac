console.log('from optionsScreen');
var optionsScreen = new Kinetic.Layer(),
    CONSTANTS = {
        STAGE_WIDTH: 800,
        STAGE_HEIGHT: 600,
        BUTTONS_WIDTH: 165,
        BUTTONS_HEIGHT: 101
    },
    NAVIGATE_SCREEN_EVENT = {
        HOME: 'navigateToHomeScreen'
    };

//------- start background   
var backround = new Kinetic.Rect({
    width: CONSTANTS.STAGE_WIDTH,
    height: CONSTANTS.STAGE_HEIGHT,
    x: 0,
    y: 0,
    fillPriority: "pattern"
});

var backroundImage = new Image();
backroundImage.src = 'images\\Navigation\\background_options.png';
backroundImage.onload = function() {
    backround.setFillPatternImage(backroundImage);
};
//------- end background   

//------- start btnBack   
var btnBack = new Kinetic.Rect({
    width: CONSTANTS.BUTTONS_WIDTH,
    height: CONSTANTS.BUTTONS_HEIGHT,
    x: CONSTANTS.STAGE_WIDTH * 0.5 - CONSTANTS.BUTTONS_WIDTH * 0.5,
    y: CONSTANTS.STAGE_HEIGHT - CONSTANTS.BUTTONS_HEIGHT * 1.5,
    fillPriority: "pattern"
});

var backButtonsImage = new Image();
backButtonsImage.src = 'images\\Navigation\\buttonBack.png';
backButtonsImage.onload = function() {
    btnBack.setFillPatternImage(backButtonsImage);
};
//------- end btnOptions 


optionsScreen.add(backround);
optionsScreen.add(btnBack);



//--------- start 'creating and dispatching events'
var navToHome = new CustomEvent(NAVIGATE_SCREEN_EVENT.HOME, {
    detail: {},
    bubbles: true,
    cancelable: false
});

btnBack.addEventListener('click', function(ev) {
    window.dispatchEvent(navToHome);
});
//--------- end 'creating and dispatching events'
