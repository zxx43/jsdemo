var pacId="pac1";

function Pacman() {
    var startX=14;
    var startY=19;
    this.pacman={
        x:startX,
        y:startY,
        speed:SPD_PAC,
        dist:NONE,
        disto:NONE,
        img:PAC_LEFT
    };
    this.isMove=false;
    this.px=SPX+this.pacman.x*TILE_WIDTH;
    this.py=SPY+this.pacman.y*TILE_HEIGHT;
    this.nextx=this.pacman.x;
    this.nexty=this.pacman.y;
    this.stepDis=0;
    this.ate=false;
    this.powered=false;
    this.powertime=0;
}

Pacman.prototype.resetPIX=function() {
    this.px=SPX+this.pacman.x*TILE_WIDTH;
    this.py=SPY+this.pacman.y*TILE_HEIGHT;
}

Pacman.prototype.drawPac=function(loop) {
    var pac=this.pacman;
    if(loop<8)
        pac.img=PAC_IMG;
    else if(loop>=8) {
        switch (pac.dist) {
            case UP:
                pac.img=PAC_UP;
                break;
            case DOWN:
                pac.img=PAC_DOWN;
                break;
            case NONE:
            case LEFT:
                pac.img=PAC_LEFT;
                break;
            case RIGHT:
                pac.img=PAC_RIGHT;
                break;
        }
    }
    drawImg(pacId,charaDiv,pac.img,this.px,this.py);
}

Pacman.prototype.startMove=function() {
    if(!this.checkCrash(map))
        this.isMove=true;
}

Pacman.prototype.finishMove=function() {
    var pac=this.pacman;
    this.stepDis=0;
    pac.x=this.nextx;
    pac.y=this.nexty;
    this.resetPIX();
    this.isMove=false;
}

Pacman.prototype.moving=function() {
    var pac=this.pacman;
    if(this.stepDis>=TILE_WIDTH) {
        this.finishMove();
    }
    if(this.isMove) {
         switch (pac.dist) {
             case UP:
                 this.py-=pac.speed;
                 this.stepDis+=pac.speed;
                 break;
             case DOWN:
                 this.py+=pac.speed;
                 this.stepDis+=pac.speed;
                 break;
             case LEFT:
                 this.px-=pac.speed;
                 this.stepDis+=pac.speed;
                 break;
             case RIGHT:
                 this.px+=pac.speed;
                 this.stepDis+=pac.speed;
                 break;
             case NONE:
                 this.stepDis=TILE_WIDTH;
                 break;
         }
     }
}

Pacman.prototype.move=function(dist) {
    var pac=this.pacman;
    if(!this.isMove) {
        pac.dist=dist;
        switch (dist) {
            case UP:
                this.nextx=pac.x;
                this.nexty=pac.y-1;
                break;
            case DOWN:
                this.nextx=pac.x;
                this.nexty=pac.y+1;
                break;
            case LEFT:
                if(!isExp(pac.x,pac.y)||pac.x!=explx) {
                    this.nextx=pac.x-1;
                    this.nexty=pac.y;
                } else if(isExp(pac.x,pac.y)&&pac.x==explx) {
                    this.nextx=exprx;
                    this.nexty=pac.y;
                }
                break;
            case RIGHT:
                if(!isExp(pac.x,pac.y)||pac.x!=exprx) {
                    this.nextx=pac.x+1;
                    this.nexty=pac.y;
                } else if(isExp(pac.x,pac.y)&&pac.x==exprx) {
                    this.nextx=explx;
                    this.nexty=pac.y;
                }
                break;
            case NONE:
                this.nextx=pac.x;
                this.nexty=pac.y;
                break;
        }
        this.startMove();
    }
}

Pacman.prototype.checkCrash=function(map) {
    var pac=this.pacman;
    var isCrash=false;
    if(this.nextx<0||this.nexty<0||this.nextx>map[0].length-1||this.nexty>map.length-1) {
        isCrash=true;
        this.nextx=pac.x;
        this.nexty=pac.y;
        this.resetPIX();
        return isCrash;
    }
    var nextTile=map[this.nexty][this.nextx];
    if(nextTile==0) {
        isCrash=true;
    }
    if(isCrash) {
        this.nextx=pac.x;
        this.nexty=pac.y;
        this.resetPIX();
    }
    return isCrash;
}

Pacman.prototype.powerAct=function() {
    if(this.powertime>0) {
        this.powered=true;
        this.powertime--;
    } else if(this.powertime<=0) {
        this.powered=false;
        this.powertime=0;
    }
}

Pacman.prototype.pacAte=function() {
    this.ate=true;
    eraseImg(pacId,charaDiv);
}

Pacman.prototype.pacAct=function(loop,dist) {
    var pac=this.pacman;
    if(!this.ate) {
        this.moving();
        this.powerAct();
        this.drawPac(loop);
        if(distCanGo(this.getX(),this.getY(),dist,map)) {
            if(dist!=NONE) {
                this.pacman.disto=dist;
                this.move(dist);
            }
        } else {
            this.move(this.pacman.dist);
        }
    }
}

function checkEatBall(pacman) {
    var dis=TILE_WIDTH/2;
    var px=pacman.getPx()+TILE_WIDTH/2;
    var py=pacman.getPy()+TILE_HEIGHT/2;
    for(i=0;i<balls.length;i++) {
        var ball=balls[i];
        var bx=ball.ball.x;
        var by=ball.ball.y;
        if((px-bx)*(px-bx)+(py-by)*(py-by)<dis*dis) {
            return ball;
        }
    }
    return null;
}

function checkEatPower(pacman) {
    var dis=TILE_WIDTH/2;
    var px=pacman.getPx()+TILE_WIDTH/2;
    var py=pacman.getPy()+TILE_HEIGHT/2;
    for(i=0;i<powers.length;i++) {
        var power=powers[i];
        var pox=power.power.x;
        var poy=power.power.y;
        if((px-pox)*(px-pox)+(py-poy)*(py-poy)<dis*dis) {
            return power;
        }
    }
    return null;
}

Pacman.prototype.getPx=function() {
    return this.px;
}
Pacman.prototype.getPy=function() {
    return this.py;
}
Pacman.prototype.getX=function() {
    return this.pacman.x;
}
Pacman.prototype.getY=function() {
    return this.pacman.y;
}
Pacman.prototype.isAte=function() {
    return this.ate;
}
