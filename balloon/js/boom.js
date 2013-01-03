var boomList=new Array();

function Boom(x,y) {
    var img="img/explosion.png";
    var width=75;
    var height=75;
    var r=36;
    this.boom={x:x,y:y,w:width,h:height,r:r,img:img,time:0};
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
    var html="<img src="+boom.img+" style='position:absolute;left:"+box+";top:"+boy+";" +
        "width:"+boom.w+";height:"+boom.h+";'/>"
    scr.innerHTML+=html;
    boom.time++;
}

function boomAct() {
    var fulltime=35;
    for(var i=0;i<boomList.length;i++) {
        var boom=boomList[i];
        boom.act();
        checkBombBalloon(boom);
        if(boom.boom.time>=fulltime)
            boomList.splice(i,1);
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
            balloonList.splice(j,1);
//                initSound("sound/pop.wav",2);
            score++;
        }
    }
}