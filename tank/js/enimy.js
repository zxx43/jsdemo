var enimys=new Array();
var enimyId=0;
var FIRE_WAIT_TIME=50;

function Enimy(type,dist,x,y) {
    var startX=x;
    var startY=y;
    this.enimy={
        id:enimyId,
        type:type,
        x:startX,
        y:startY,
        speed:SPD_TANK,
        dist:dist,
        turret:dist
    };
    if(type==TYPE_APC)
        this.enimy.speed=SPD_APC;
    this.imgX=0;
    this.imgY=0;
    this.isMove=false;
    this.px=SPX+this.enimy.x*TILE_WIDTH;
    this.py=SPY+this.enimy.y*TILE_HEIGHT;
    this.nextx=this.enimy.x;
    this.nexty=this.enimy.y;
    getIdColl(this.enimy.id,this.nextx,this.nexty);
    this.stepDis=0;
    this.reloadTime=101;
    this.reload=0;
    this.wait=0;
}

Enimy.prototype.draw=function() {
    var eni=this.enimy;
    var tx=this.px;
    var ty=this.py;
    var img=(eni.type==TYPE_TANK)?IMG_ENIMY_TANK:IMG_ENIMY_APC;
    var eid="eni_"+eni.id;
    drawClipImg(eid,ENEMY_DIV,img,this.imgX,this.imgY,tx,ty);
}

Enimy.prototype.startMove=function() {
    if(!this.checkCrash(map)) {
        this.isMove=true;
        getIdColl(this.enimy.id,this.nextx,this.nexty);
    }
}

Enimy.prototype.finishMove=function() {
    var eni=this.enimy;
    this.stepDis=0;
    eni.x=this.nextx;
    eni.y=this.nexty;
    this.resetPIX();
    this.isMove=false;
}

Enimy.prototype.resetPIX=function() {
    this.px=SPX+this.enimy.x*TILE_WIDTH;
    this.py=SPY+this.enimy.y*TILE_HEIGHT;
}

Enimy.prototype.anim=function(dist) {
    var eni=this.enimy;
    if(eni.dist!=NONE&&this.isMove)
        this.imgX=(this.imgX==0)?1:0;
    switch (eni.turret) {
        case UP:
            this.imgY=0;
            break;
        case RIGHT:
            this.imgY=1;
            break;
        case DOWN:
            this.imgY=2;
            break;
        case LEFT:
            this.imgY=3;
            break;
    }
}

Enimy.prototype.moving=function() {
    var eni=this.enimy;
    if(this.stepDis>=TILE_WIDTH) {
        this.finishMove();
    }
    if(this.isMove) {
        switch (eni.dist) {
            case UP:
                this.py-=eni.speed;
                this.stepDis+=eni.speed;
                break;
            case DOWN:
                this.py+=eni.speed;
                this.stepDis+=eni.speed;
                break;
            case LEFT:
                this.px-=eni.speed;
                this.stepDis+=eni.speed;
                break;
            case RIGHT:
                this.px+=eni.speed;
                this.stepDis+=eni.speed;
                break;
            case NONE:
                this.stepDis=TILE_WIDTH;
                break;
        }
        if(this.nextx!=eni.x||this.nexty!=eni.y) {
            if(getCollision(eni.x,eni.y)==eni.id
                &&this.stepDis>=TILE_WIDTH/10
                &&eni.dist!=NONE)
                releaseColl(eni.x,eni.y);
        }
    }
}

Enimy.prototype.move=function(dist) {
    var eni=this.enimy;
    if(dist!=eni.turret&&dist!=NONE) {
        eni.turret=dist;
    } else if(dist==eni.turret&&!this.isMove) {
        eni.dist=dist;
        switch (dist) {
            case UP:
                this.nextx=eni.x;
                this.nexty=eni.y-1;
                break;
            case DOWN:
                this.nextx=eni.x;
                this.nexty=eni.y+1;
                break;
            case LEFT:
                this.nextx=eni.x-1;
                this.nexty=eni.y;
                break;
            case RIGHT:
                this.nextx=eni.x+1;
                this.nexty=eni.y;
                break;
            case NONE:
                this.nextx=eni.x;
                this.nexty=eni.y;
                break;
        }
        this.startMove();
    }
}

Enimy.prototype.checkCollision=function() {
    if(getCollision(this.nextx,this.nexty)==this.enimy.id
        ||getCollision(this.nextx,this.nexty)==NOT_COLLISION)
        return false;
    return true;
}

Enimy.prototype.checkCrash=function(map) {
    var eni=this.enimy;
    var isCrash=false;
    if(this.nextx<0||this.nexty<0||this.nextx>map[0].length-1||this.nexty>map.length-1) {
        isCrash=true;
        this.nextx=eni.x;
        this.nexty=eni.y;
        this.resetPIX();
        return isCrash;
    }
    var nextTile=map[this.nexty][this.nextx];
    if(nextTile==0||nextTile==1||nextTile==3||nextTile==4)
        isCrash=true;
    if(this.checkCollision()) {
        isCrash=true;
        this.changeDist(true);
    }

    if(isCrash) {
        this.nextx=eni.x;
        this.nexty=eni.y;
        this.resetPIX();
    }
    return isCrash;
}

Enimy.prototype.reloading=function() {
    if(this.reload>0&&this.reload<this.reloadTime)
        this.reload+=1;
    else if(this.reload>=this.reloadTime)
        this.reload=0;
}

Enimy.prototype.fire=function() {
    if(this.reload==0) {
        var eni=this.enimy;
        var fx=this.px+TILE_WIDTH/2;
        var fy=this.py+TILE_HEIGHT/2;
        switch (eni.turret) {
            case UP:
                fy-=TILE_HEIGHT/2;
                break;
            case DOWN:
                fy+=TILE_HEIGHT/2;
                break;
            case LEFT:
                fx-=TILE_WIDTH/2;
                break;
            case RIGHT:
                fx+=TILE_WIDTH/2;
                break;
        }

        this.reload=1;
        var bullet=new Bullet(BULLET_ENIMY,eni.turret,fx,fy);
        bullets.push(bullet);
    }
}

Enimy.prototype.waitFire=function() {
    if(this.wait>=FIRE_WAIT_TIME) {
        var per=Math.random()*100;
        if(per<30) {
            this.wait=0;
            return true;
        } else {
            this.wait=0;
            return false;
        }
    }
    return false;
}

Enimy.prototype.hit=function() {
    var eni=this.enimy;
    var eid="eni_"+eni.id;
    eraseImg(eid,ENEMY_DIV);
    var bx=this.px+TILE_WIDTH/2;
    var by=this.py+TILE_HEIGHT/2;
    addBoom(bx,by);
    if(getCollision(eni.x,eni.y)==eni.id) {
        releaseColl(eni.x,eni.y);
    }
    if(getCollision(this.nextx,this.nexty)==eni.id) {
        releaseColl(this.nextx,this.nexty);
    }
}

Enimy.prototype.changeDist=function(isCollision) {
    if(map[this.enimy.y][this.enimy.x]!=4)
        this.enimy.dist=findRandDist(isCollision,this,map);
}

Enimy.prototype.eniAct=function(isFire) {
    var eni=this.enimy;
    this.reloading();
    if(isFire)
        this.fire();
    this.moving();
    if(!this.isMove)
        this.changeDist(false);
    this.move(this.enimy.dist);
}

Enimy.prototype.search=function() {
    var target=null;
    if(TANK!=null&&!TANK.isDestory())
        target=see(this,TANK,map);
    return target;
}

function createEni(type,dist,x,y) {
    var enimy=new Enimy(type,dist,x,y);
    enimys.push(enimy);
//    if(enimyId<=MAX_COUNT)
        enimyId++;
//    else if(enimyId>MAX_COUNT)
//        enimyId=0;
}

function enimysAct() {
    for(var i=0;i<enimys.length;i++) {
        var enimy=enimys[i];
        enimy.wait++;
        var isFire=false;
        if(enimy.search()!=null)
            isFire=true;
        else
            isFire=enimy.waitFire();
        enimy.eniAct(isFire);
        enimy.anim();
        enimy.draw();
    }
}

function addEnimy() {
    var per=Math.random()*100;
    var type=(Math.random()*100>30)?TYPE_TANK:TYPE_APC;
    var dist=NONE;
    var x=0;
    var y=0;
    if(enimys.length<MAX_COUNT) {
        if(per>95) {
            dist=RIGHT;
            x=0;
            y=1;
        } else if(per>90) {
            dist=LEFT;
            x=map[0].length-1;
            y=1;
        } else if(per>85) {
            dist=RIGHT;
            x=0;
            y=map.length-2;
        } else if(per>80) {
            dist=LEFT;
            x=map[0].length-1;
            y=map.length-2;
        }
        if(dist!=NONE&&getCollision(x,y)==NOT_COLLISION)
            createEni(type,dist,x,y);
    }
}