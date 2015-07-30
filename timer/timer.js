var timerSVG = document.getElementById('svg-text');

var Timer = function(){
    this.Interval = 1000;
    this.Enable = new Boolean(false);
    this.Tick;

    var timerId = 0;
    var thisObject;

    this.Start = function()
    {
        this.Enable = new Boolean(true);

        thisObject = this;
        if (thisObject.Enable){
            thisObject.timerId = setInterval(function(){
                thisObject.Tick();
            }, thisObject.Interval);
        }
    };

    this.Stop = function(){
        thisObject.Enable = new Boolean(false);
        clearInterval(thisObject.timerId);
    };
};

var timer = new Timer();
timer.Interval = 1000;
timer.Tick = timerTick;
var seconds = 0;
var minutes = 0;
function timerTick(){
    var times = '';

    seconds += timer.Interval/1000;

    function timerCount(){
        times = minutes + ':' + seconds;
        if(seconds < 59){
        }else{
            seconds = -1;
            minutes++;
        }

        timerSVG.innerHTML = times;

    }
    timerCount();
}


