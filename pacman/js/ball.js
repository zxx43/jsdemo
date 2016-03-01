var BALL_IMG="img/ball.gif";
var balls=new Array();

function Ball(id,x,y) {
    this.ball={
        id:id,
        x:x,
        y:y
    };
}

Ball.prototype.draw=function(div,img) {
    var id=this.ball.id;
    var x=this.ball.x-TILE_WIDTH/2;
    var y=this.ball.y-TILE_HEIGHT/2;
    var html="<img id='ball_"+id+"' " +
        "src='"+img+"' style='position: absolute;" +
        "left:"+x+";" +
        "top:"+y+";' />"
    div.innerHTML+=html;
}

Ball.prototype.ballAte=function(div) {
    var id=this.ball.id;
    var ballEl=document.getElementById("ball_"+id);
    div.removeChild(ballEl);
    for(i=0;i<balls.length;i++) {
        var ball=balls[i];
        var idc=ball.ball.id;
        if(idc==id)
            balls.splice(i,1);
    }
}

function initBalls(screenWidth,screenHeight,map) {
    for(i=0;i<map[0].length;i++) {
        for(j=0;j<map.length;j++) {
            if(map[j][i]==2) {
                var ball=new Ball(balls.length,SCX+i*TILE_WIDTH,SCY+j*TILE_HEIGHT);
                balls.push(ball);
            }
        }
    }
}

var ballState=0;
var ballNow=0;
function drawBalls(div,img) {
    if(ballNow<balls.length) {
        var ball=balls[ballNow];
        ball.draw(div,img);
        ballNow++;
    } else if(ballNow>=balls.length) {
        ballState=1;
    }
    if(ballState==0) {
        setTimeout("drawBalls(actDiv,BALL_IMG)",1);
    }
}

function reInitBalls() {
    balls=new Array();
    ballNow=0;
    ballState=0;
}