function Tank() {
    var startX=14;
    var startY=17;
    this.tank={
        x:startX,
        y:startY,
        speed:SPD_PLAYER,
        dist:NONE,
        turret:UP
    };
    this.imgX=0;
    this.imgY=0;
    this.isMove=false;
    this.px=SPX+this.tank.x*TILE_WIDTH;
    this.py=SPY+this.tank.y*TILE_HEIGHT;
    this.nextx=this.tank.x;
    this.nexty=this.tank.y;
    getColl(this.nextx,this.nexty);
    this.stepDis=0;
    this.destory=false;
    this.reloadTime=101;
    this.reload=0;
}

Tank.prototype.draw=function() {
    var tank=this.tank;
    var tx=this.px;
    var ty=this.py;
    var tid="pt1";
    if(!this.isDestory())
        drawClipImg(tid,CHARA_DIV,IMG_PLAYER,this.imgX,this.imgY,tx,ty);
}

Tank.prototype.startMove=function() {
    if(!this.checkCrash(map)) {
        this.isMove=true;
        getColl(this.nextx,this.nexty);
    }
}

Tank.prototype.finishMove=function() {
    var tank=this.tank;
    this.stepDis=0;
//    if(this.nextx!=tank.x||this.nexty!=tank.y)
//        releaseColl(tank.x,tank.y);
    tank.x=this.nextx;
    tank.y=this.nexty;
    this.resetPIX();
    this.isMove=false;
}

Tank.prototype.resetPIX=function() {
    this.px=SPX+this.tank.x*TILE_WIDTH;
    this.py=SPY+this.tank.y*TILE_HEIGHT;
}

Tank.prototype.anim=function(dist) {
    var tank=this.tank;
    if(tank.dist!=NONE&&this.isMove)
        this.imgX=(this.imgX==0)?1:0;
    switch (tank.turret) {
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

Tank.prototype.moving=function() {
    var tank=this.tank;
    if(this.stepDis>=TILE_WIDTH) {
        this.finishMove();
    }
    if(this.isMove) {
        switch (tank.dist) {
            case UP:
                this.py-=tank.speed;
                this.stepDis+=tank.speed;
                break;
            case DOWN:
                this.py+=tank.speed;
                this.stepDis+=tank.speed;
                break;
            case LEFT:
                this.px-=tank.speed;
                this.stepDis+=tank.speed;
                break;
            case RIGHT:
                this.px+=tank.speed;
                this.stepDis+=tank.speed;
                break;
            case NONE:
                this.stepDis=TILE_WIDTH;
                break;
        }
//        /*
        if(this.nextx!=tank.x||this.nexty!=tank.y) {
            if(getCollision(tank.x,tank.y)==COLLISION
                &&this.stepDis>=TILE_WIDTH/10
                &&tank.dist!=NONE)
                releaseColl(tank.x,tank.y);
        }
//        */
    }
}

Tank.prototype.move=function(dist) {
    var tank=this.tank;
    if(dist!=tank.turret&&dist!=NONE) {
        tank.turret=dist;
    } else if(dist==tank.turret&&!this.isMove) {
        tank.dist=dist;
        switch (dist) {
            case UP:
                this.nextx=tank.x;
                this.nexty=tank.y-1;
                break;
            case DOWN:
                this.nextx=tank.x;
                this.nexty=tank.y+1;
                break;
            case LEFT:
                this.nextx=tank.x-1;
                this.nexty=tank.y;
                break;
            case RIGHT:
                this.nextx=tank.x+1;
                this.nexty=tank.y;
                break;
            case NONE:
                this.nextx=tank.x;
                this.nexty=tank.y;
                break;
        }
        this.startMove();
    }
}

Tank.prototype.checkCollision=function() {
    if(getCollision(this.nextx,this.nexty)==NOT_COLLISION)
        return false;
    return true;
}

Tank.prototype.checkCrash=function(map) {
    var tank=this.tank;
    var isCrash=false;
    if(this.nextx<0||this.nexty<0||this.nextx>map[0].length-1||this.nexty>map.length-1) {
        isCrash=true;

        this.nextx=tank.x;
        this.nexty=tank.y;
        this.resetPIX();
        return isCrash;
    }
    var nextTile=map[this.nexty][this.nextx];
    if(nextTile==0||nextTile==1||nextTile==3||nextTile==4)
        isCrash=true;
    if(this.checkCollision())
        isCrash=true;

    if(isCrash) {
        this.nextx=tank.x;
        this.nexty=tank.y;
        this.resetPIX();
    }
    return isCrash;
}

Tank.prototype.isDestory=function() {
    return this.destory;
}

Tank.prototype.reloading=function() {
    if(this.reload>0&&this.reload<this.reloadTime)
        this.reload+=1;
    else if(this.reload>=this.reloadTime)
        this.reload=0;
}

Tank.prototype.fire=function() {
    var tank=this.tank;
    var fx=this.px+TILE_WIDTH/2;
    var fy=this.py+TILE_HEIGHT/2;
    switch (tank.turret) {
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
    if(this.reload==0) {
        this.reload=1;
        var bullet=new Bullet(BULLET_PLAYER,tank.turret,fx,fy);
        tankBullets.push(bullet);
    }
}

Tank.prototype.hit=function() {
    var tid="pt1";
    this.destory=true;
    eraseImg(tid,CHARA_DIV);
    var bx=this.px+TILE_WIDTH/2;
    var by=this.py+TILE_HEIGHT/2;
    addBoom(bx,by);
    if(getCollision(this.tank.x,this.tank.y)!=NOT_COLLISION) {
        releaseColl(this.tank.x,this.tank.y);
    }
    if(getCollision(this.nextx,this.nexty)!=NOT_COLLISION) {
        releaseColl(this.nextx,this.nexty);
    }
}

Tank.prototype.tankAct=function(dist,isFire) {
    var tank=this.tank;
    if(!this.destory) {
        this.reloading();
        this.moving();
        this.anim(dist);
        this.move(dist);
        if(isFire)
            this.fire();
    } else if(this.destory) {
        if(getCollision(this.tank.x,this.tank.y)==COLLISION)
            releaseColl(this.tank.x,this.tank.y);
    }
}