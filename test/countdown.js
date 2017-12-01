/**
 * Created by hasee on 2016/11/21.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
WINDOW_WIDTH = document.body.clientWidth;
WINDOW_HEIGHT = document.body.clientHeight;
MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1
MARGIN_TOP = Math.round(WINDOW_HEIGHT /8);
var WINDOW_LEFT1 = WINDOW_WIDTH/10*2;
var WINDOW_TOP1 = WINDOW_HEIGHT/5;
RADIUS1 = Math.round(WINDOW_WIDTH * 5 / 5 / 165)-1
var n = true;



const  endTime = new Date();
endTime.setTime(endTime.getTime()+10000)
var residueSecond = 0;

var ballsName = [];
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000","blue","yellow","gray","purple"]

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    residueSecond = getResidueSecond();

    setInterval(
        function () {
            if(residueSecond!=0){
                render(context);
                update();
            }else {
                render1(context);
                update1();
            }


        },
        50
    )


}

function  getResidueSecond() {
    var currentTime = new Date();
    var ret = endTime.getTime() - currentTime.getTime();
    ret = Math.round(ret/1000);

    return ret>=0 ? ret : 0 ;
}

function render( cxt ){
    cxt.clearRect(0 , 0 , WINDOW_WIDTH , WINDOW_HEIGHT)

    var hours = parseInt(residueSecond/3600)
    var minutes = parseInt( (residueSecond-hours*3600)/60 )
    var seconds = parseInt(residueSecond%60)



    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

function update() {
    var nextShowTimeSeconds = getResidueSecond();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( residueSecond/ 3600);
    var curMinutes = parseInt( (residueSecond - curHours * 3600)/60 )
    var curSeconds = residueSecond % 60

    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(nextHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(nextHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

        residueSecond = nextShowTimeSeconds;
    }

    updateBalls();
    console.log(balls.length);
}

function addBalls(x , y , num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * ( 6 + 2*Math.random() ),
                    vy: -10,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall)
            }
        }
    }

}

function updateBalls() {

    for( var i = 0 ; i < balls.length ; i ++ ) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.7;
        }
        if (balls[i].vx <= 3 && balls[i].vx >= -3) {
            balls[i].vx = balls[i].vx * 2;
        }
    }

        var cnt = 0
        for( var i = 0 ; i < balls.length ; i ++ ) {
            if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
                balls[cnt++] = balls[i]
        }
        while( balls.length > cnt ){
            balls.pop();
        }

}

function renderDigit( x , y , num , cxt ){
    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}



//name
function render1(cxt) {
    cxt.clearRect(0 , 0 , WINDOW_WIDTH , WINDOW_HEIGHT)
    console.log(ballsName.length)

    renderName(cxt, WINDOW_LEFT1, WINDOW_TOP1, 17);
    renderName(cxt, WINDOW_LEFT1 + 28 * (RADIUS1+1), WINDOW_TOP1, 18);
    renderName(cxt, WINDOW_LEFT1 + 56 * (RADIUS1+1), WINDOW_TOP1, 21);
    renderName(cxt, WINDOW_LEFT1 + 28 * (RADIUS1+1), WINDOW_TOP1+22*(RADIUS1+1), 19);
    renderName(cxt, WINDOW_LEFT1 + 56 * (RADIUS1+1), WINDOW_TOP1+22*(RADIUS1+1), 20);

    if (n) {
        addBallsName(WINDOW_LEFT1 + 100*(RADIUS1+1) , WINDOW_TOP1 , 14);
        addBallsName(WINDOW_LEFT1 + 100*(RADIUS1+1) , WINDOW_TOP1+44*(RADIUS1+1) , 14);
        ballsName[0].vx = -10-4;
        ballsName[0].vy =  5+2;
        ballsName[1].vx = -10-4;
        ballsName[1].vy =  -5-2;
        addBallsName(WINDOW_LEFT1, WINDOW_TOP1, 17);
        addBallsName(WINDOW_LEFT1 + 28 * (RADIUS1+1), WINDOW_TOP1, 18);
        addBallsName(WINDOW_LEFT1 + 56 * (RADIUS1+1), WINDOW_TOP1, 21);
        addBallsName(WINDOW_LEFT1, WINDOW_TOP1+22*(RADIUS1+1) , 16);
        addBallsName(WINDOW_LEFT1 + 28 * (RADIUS1+1), WINDOW_TOP1+22*(RADIUS1+1), 19);
        addBallsName(WINDOW_LEFT1 + 56 * (RADIUS1+1), WINDOW_TOP1+22*(RADIUS1+1), 20);
        n=false;
    }

    for (var i = 0; i < ballsName.length; i++) {
        cxt.fillStyle = ballsName[i].color;
        cxt.beginPath()
        cxt.arc(ballsName[i].x, ballsName[i].y, RADIUS1, 0, 2 * Math.PI, true);
        cxt.fill();
    }
}
function renderName(cxt , x , y , num) {
    for(var i=0 ; i<digit[num].length ; i++){
        for(var j=0 ; j<digit[num][i].length ; j++){
            if (digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS1+1)+(RADIUS1+1) , y+i*2*(RADIUS1+1)+(RADIUS1+1) , RADIUS1 , 0 , 2*Math.PI )
                cxt.fillStyle = colors[Math.floor(parseInt(i*j%10))];
                cxt.fill();
            }
        }
    }
}
function addBallsName( x , y , num) {
    for(var i=0 ; i<digit[num].length ; i++){
        for(var j=0 ; j<digit[num][i].length ; j++){
            if (digit[num][i][j]==0){
                var aBall = {
                    x:  x+j*2*(RADIUS1+1)+(RADIUS1+1),
                    y: y+i*2*(RADIUS1+1)+(RADIUS1+1) ,
                    vx:0,
                    vy:0,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                ballsName.push(aBall)
            }
        }
    }
}
function update1 () {
    for(var i=0 ; i<ballsName.length ; i++){
        ballsName[i].x += ballsName[i].vx;
        ballsName[i].y += ballsName[i].vy;

        for(var j=1 ; j<ballsName.length ; j++){
            if(i==j){
            }else {
                if
                ((ballsName[i].x-ballsName[j].x)*(ballsName[i].x-ballsName[j].x)+(ballsName[i].y-ballsName[j].y)*(ballsName[i].y-ballsName[j].y)<=4*RADIUS1*RADIUS1){
                    if ((ballsName[i].vx)*(ballsName[i].vx)>(ballsName[j].vx)*(ballsName[j].vx)){
                        ballsName[j].vx = ballsName[i].vx -1;
                        ballsName[i].vx = -ballsName[i].vx ;
                    }else {
                        ballsName[i].vx = ballsName[j].vx -1;
                        ballsName[j].vx = -ballsName[j].vx ;
                    }
                    if ((ballsName[i].vy)*(ballsName[i].vy)>(ballsName[j].vy)*(ballsName[j].vy)){
                        ballsName[j].vy = ballsName[i].vy ;
                        ballsName[i].vy = -ballsName[i].vy ;
                    }else {
                        ballsName[i].vy = ballsName[j].vy ;
                        ballsName[j].vy = -ballsName[j].vy ;
                    }
                }
            }
        }

    }

    var cnt = 0;
    for( var i = 0 ; i < ballsName.length ; i ++ ) {
        if (ballsName[i].x + RADIUS1 > 0 && ballsName[i].x - RADIUS1 < WINDOW_WIDTH)
            ballsName[cnt++] = ballsName[i]
    }
    while( ballsName.length > cnt ){
        ballsName.pop();
    }
}