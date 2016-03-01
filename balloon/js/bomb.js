var bombList=new Array();
var boid=0;

function Bomb(x,y) {
    var img="img/bomb_01.gif";
    var width=52;
    var height=52
    this.bomb={
        id:boid,
        x:x,
        y:y,
        bfx:x,
        bfy:y,
        w:width,
        h:height,
        r:26,
        img:img
    };
    boid++;
}

Bomb.prototype.draw=function() {
    var img=this.bomb.img;
    var x=this.bomb.x;
    var y=this.bomb.y;
    var bid="bob_"+this.bomb.id;
    drawImg(bid,scr,img,x,y);
}

function checkBoom() {
    for(var i=0;i<balloonList.length;i++) {
        var balo=balloonList[i];
        var bx=balo.ballon.x+20;
        var by=balo.ballon.y+20;
        var bobx=bombMove.bomb.x+bombMove.bomb.r;
        var boby=bombMove.bomb.y+bombMove.bomb.r;
        var dis=(bx-bobx)*(bx-bobx)+(by-boby)*(by-boby);
        if(dis<(balo.ballon.r+bombMove.bomb.r)*(balo.ballon.r+bombMove.bomb.r)) {
            addBoom(bobx,boby);
            return true;
        }
    }
    return false;
}

function resetBomb() {
    bombMove.bomb.x=bombMove.bomb.bfx;
    bombMove.bomb.y=bombMove.bomb.bfy;
}

function initBomb() {
    var x=50;
    var y=screenHeight-100;
    var dis=60;
    var count=10;
    for(var i=0;i<count;i++) {
        var bomb=new Bomb(x,y-dis*i);
        bombList.push(bomb);
    }
}

function drawBomb() {
    for(var i=0;i<bombList.length;i++) {
        var bomb=bombList[i];
        bomb.draw();
    }
}

function clickBomb() {
    if(bombMove==null) {
        for(var i=0;i<bombList.length;i++) {
            var bomb=bombList[i];
            var bx=bomb.bomb.x+bomb.bomb.w/2;
            var by=bomb.bomb.y+bomb.bomb.h/2;
            var dis=(cx-bx)*(cx-bx)+(cy-by)*(cy-by);
            if(dis<bomb.bomb.r*bomb.bomb.r)
                bombMove=bomb;
        }
    }
}

function releaseBomb() {
    if(bombMove!=null) {
        if(checkBoom()) {
            for(var i=0;i<bombList.length;i++) {
                var bomb=bombList[i];
                if(bomb==bombMove) {
                    var bid="bob_"+bomb.bomb.id;
                    eraseImg(bid,scr);
                    bombList.splice(i,1);
                    bombMove=null;
                }
            }
        } else {
            resetBomb();
        }
        bombMove=null;
    }
}