var balloonList=new Array();
var maxTime=500;
var baloId=0;

function Balloon(x,y,speed) {
    var imgBallon=new Image();
    imgBallon.src="img/balloon1.gif";
    this.ballon={
        id:baloId,
        x:x,
        y:y,
        r:18,
        spd:speed,
        img:imgBallon
    };
    if(baloId<100)
        baloId++;
    else if(baloId>=100)
        baloId=0;
}

Balloon.prototype.act=function() {
    var img=this.ballon.img.src;
    var x=this.ballon.x;
    this.ballon.y-=this.ballon.spd;
    var y=this.ballon.y;
    var bid="balo_"+this.ballon.id;
    drawImg(bid,scr,img,x,y);
}

function balloonAct() {
    for(var i=0;i<balloonList.length;i++) {
        var balo=balloonList[i];
        balo.act();
    }
}

function addBalo(countMax,per) {
    if(Math.random()*100<per&&balloonList.length<countMax) {
        var per=Math.random()*100;
        var x=Math.random()*(screenWidth-40);
        var y=screenHeight;
        var fast=20;
        var mid=15;
        var slow=10;
        var spd=slow;
        if(per<33)
            spd=fast;
        else if(per<66)
            spd=mid;
        else
            spd=slow;
        var balo=new Balloon(x,y,spd);
        balloonList.push(balo);
    }
}

function flush() {
    for(i in  balloonList) {
        var balo=balloonList[i];
        if(balo.ballon.y<-30) {
            var bid="balo_"+balo.ballon.id;
            eraseImg(bid,scr);
            balloonList.splice(i,1);
            return true;
        }
    }
    return false;
}

function checkGameOver(mode,time) {
    if(mode==1&&time>=maxTime) {
        initSound("sound/buzz.wav",10);
        return true;
    } else if(mode==2) {
        if(flush()) {
            initSound("sound/buzz.wav",10);
            return true;
        }
    }
    return false;
}

function checkCrash() {
    for(var i=0;i<balloonList.length;i++) {
        var balo=balloonList[i];
        var bx=balo.ballon.x+20;
        var by=balo.ballon.y+20;
        var r=balo.ballon.r;
        var dis=(bx-cx)*(bx-cx)+(by-cy)*(by-cy);
        if(dis<r*r) {
            var bid="balo_"+balo.ballon.id;
            eraseImg(bid,scr);
            balloonList.splice(i,1);
            initSound("sound/pop.wav",2);
            return true;
        }
    }
    return false;
}