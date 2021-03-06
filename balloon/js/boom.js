var boomList=new Array();
var booId=0;

function Boom(x,y) {
    var img="img/explosion.gif";
    var width=75;
    var height=75;
    var r=36;
    this.boom={
        id:booId,
        x:x,
        y:y,
        w:width,
        h:height,
        r:r,
        img:img,
        time:0
    };
    if(booId<100)
        booId++;
    else if(booId>=100)
        booId=0;
}

Boom.prototype.act=function() {
    var fulltime=30;
    var ex=10;
    var boom=this.boom;
    if(boom.time<=fulltime/2) {
        boom.r+=ex;
        boom.w+=ex*2;
        boom.h+=ex*2;
    } else if(boom.time>fulltime/2) {
        if(boom.w-ex*2>0&&boom.h-ex*2>0)
            boom.r-=ex;
        if(boom.w-ex*2>0)
            boom.w-=ex*2;
        if(boom.h-ex*2>0)
            boom.h-=ex*2;
    }
    var box=boom.x-boom.w/2;
    var boy=boom.y-boom.h/2;
    var boid="bom_"+boom.id;
    drawSizeImg(boid,scr,boom.img,box,boy,boom.w,boom.h);
    boom.time++;
}

function boomAct() {
    var fulltime=35;
    for(var i=0;i<boomList.length;i++) {
        var boom=boomList[i];
        boom.act();
        checkBombBalloon(boom);
        if(boom.boom.time>=fulltime) {
            var boid="bom_"+boom.boom.id;
            eraseImg(boid,scr);
            boomList.splice(i,1);
        }
    }
}

function addBoom(x,y) {
    var boom=new Boom(x,y);
    boomList.push(boom);
    initSound("sound/explosion.wav",10);
}

function checkBombBalloon(boom) {
    var box=boom.boom.x;
    var boy=boom.boom.y;
    var bor=boom.boom.r;
    for(var j=0;j<balloonList.length;j++) {
        var balo=balloonList[j];
        var bx=balo.ballon.x+18;
        var by=balo.ballon.y+18;
        var br=balo.ballon.r;
        var dis=(box-bx)*(box-bx)+(boy-by)*(boy-by);
        if(dis<(bor+br)*(bor+br)) {
            var bid="balo_"+balo.ballon.id;
            eraseImg(bid,scr);
            balloonList.splice(j,1);
//                initSound("sound/pop.wav",2);
            score++;
        }
    }
}