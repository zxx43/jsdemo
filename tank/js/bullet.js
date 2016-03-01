var bullets=new Array();
var tankBullets=new Array();
var bulletId=0;

function Bullet(type,dist,x,y) {
    this.bullet={
        id:bulletId,
        x:x,
        y:y,
        type:type,
        dist:dist,
        speed:SPD_BULLET
    };
    this.width=4;
    this.height=4;
    if(bulletId<100)
        bulletId++;
    else if(bulletId>=100)
        bulletId=0;
    if(SOUND&&soundList.length==0)
        initSound(SUD_FIRE,2);
}

Bullet.prototype.draw=function() {
    var ix=this.bullet.x-this.width/2;
    var iy=this.bullet.y-this.height/2;
    var bid="bull_"+this.bullet.id;
    drawImg(bid,BULLET_DIV,IMG_BULLET,ix,iy);
}

Bullet.prototype.move=function() {
    var bullet=this.bullet;
    switch (bullet.dist) {
        case UP:
            bullet.y-=bullet.speed;
            break;
        case DOWN:
            bullet.y+=bullet.speed;
            break;
        case RIGHT:
            bullet.x+=bullet.speed;
            break;
        case LEFT:
            bullet.x-=bullet.speed;
            break;
    }
}

Bullet.prototype.checkCrash=function(tiles,bricks) {
    for(var i=0;i<tiles.length;i++) {
        var tile=tiles[i].tile;
        var type=tile.type;
        var tx=tile.x;
        var ty=tile.y;
        var tl=tx-TILE_WIDTH/2;
        var tr=tx+TILE_WIDTH/2;
        var tu=ty-TILE_HEIGHT/2;
        var td=ty+TILE_HEIGHT/2;
        var bx=this.bullet.x;
        var by=this.bullet.y;
        if(type==1||type==4) {
            if(collision(bx,by,tl,tr,tu,td))
                return true;
        }
    }

    for(var i=0;i<bricks.length;i++) {
        var brick=bricks[i].brick;
        var bid="br_"+brick.id;
        var bx=brick.x;
        var by=brick.y;
        var bl=bx-TILE_WIDTH/2;
        var br=bx+TILE_WIDTH/2;
        var bu=by-TILE_HEIGHT/2;
        var bd=by+TILE_HEIGHT/2;
        var bux=this.bullet.x;
        var buy=this.bullet.y;
        if(collision(bux,buy,bl,br,bu,bd)) {
            var btd=document.getElementById(bid);
            BRICK_DIV.removeChild(btd);
            var bi=(bx-SCX)/TILE_WIDTH;
            var bj=(by-SCY)/TILE_HEIGHT;
            map[bj][bi]=-1;
            bricks.splice(i,1);
            return true;
        }
    }
    return false;
}

Bullet.prototype.checkHit=function(type,tank,enimys) {
    if(type==BULLET_ENIMY&&!tank.isDestory()) {
        var px=tank.px;
        var py=tank.py;
        var tl=px;
        var tr=px+TILE_WIDTH;
        var tu=py;
        var td=py+TILE_HEIGHT;
        var bx=this.bullet.x;
        var by=this.bullet.y;
        if(collision(bx,by,tl,tr,tu,td)) {
            TANK.hit();
            return true;
        }
    } else if(type==BULLET_PLAYER) {
        for(var i=0;i<enimys.length;i++) {
            var enimy=enimys[i];
            var eni=enimy.enimy;
            var bx=this.bullet.x;
            var by=this.bullet.y;
            var ex=enimy.px;
            var ey=enimy.py;
            var el=ex;
            var er=ex+TILE_WIDTH;
            var eu=ey;
            var ed=ey+TILE_HEIGHT;
            if(collision(bx,by,el,er,eu,ed)) {
                enimy.hit();
                enimys.splice(i,1);
                return true;
            }
        }
    }

    return false;
}

function bulletAct(tiles,bricks) {
    for(var i=0;i<bullets.length;i++) {
        var bullet=bullets[i];
        bullet.move();
        bullet.draw();
        var type=bullet.bullet.type;
        var isHit=bullet.checkHit(type,TANK,enimys);
        var isCrash=false;
        if(!isHit)
            isCrash=bullet.checkCrash(tiles,bricks);
        if(isHit||isCrash) {
            var buid="bull_"+bullet.bullet.id;
            eraseImg(buid,BULLET_DIV);
            bullets.splice(i,1);
        }
    }

    for(var i=0;i<tankBullets.length;i++) {
        var bullet=tankBullets[i];
        bullet.move();
        bullet.draw();
        var type=bullet.bullet.type;
        var isHit=bullet.checkHit(type,TANK,enimys);
        var isCrash=false;
        if(!isHit)
            isCrash=bullet.checkCrash(tiles,bricks);
        if(isHit||isCrash) {
            var buid="bull_"+bullet.bullet.id;
            eraseImg(buid,BULLET_DIV);
            tankBullets.splice(i,1);
        }
    }
}
