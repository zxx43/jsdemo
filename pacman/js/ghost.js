var ghosts=new Array();
var ghoId=0;

function Ghost(x,y,img) {
    this.startX=x;
    this.startY=y;
    this.ghost={
        id:ghoId,
        x:this.startX,
        y:this.startY,
        speed:SPD_GHO,
        dist:NONE,
        point:null,
        img:img
    };
    this.isMove=false;
    this.px=SPX+this.ghost.x*TILE_WIDTH;
    this.py=SPY+this.ghost.y*TILE_HEIGHT;
    this.nextx=this.ghost.x;
    this.nexty=this.ghost.y;
    this.stepDis=0;
    this.ate=false;
    this.deadtime=0;
    ghoId++;
}

Ghost.prototype.resetPIX=function() {
    this.px=SPX+this.ghost.x*TILE_WIDTH;
    this.py=SPY+this.ghost.y*TILE_HEIGHT;
}

Ghost.prototype.drawGho=function() {
    var gho=this.ghost;
    var gid="gho_"+gho.id;
    drawImg(gid,ghostDiv,gho.img,this.px,this.py);
}

Ghost.prototype.drawEscape=function(img) {
    var gho=this.ghost;
    var gid="gho_"+gho.id;
    drawImg(gid,ghostDiv,img,this.px,this.py);
}

Ghost.prototype.startMove=function() {
    this.isMove=true;
}

Ghost.prototype.finishMove=function() {
    var gho=this.ghost;
    this.stepDis=0;
    gho.x=this.nextx;
    gho.y=this.nexty;
    this.resetPIX();
    this.isMove=false;
}

Ghost.prototype.moving=function() {
    var gho=this.ghost;
    if(this.stepDis>=TILE_WIDTH) {
        this.finishMove();
    }
    if(this.isMove) {
        switch (gho.dist) {
            case UP:
                this.py-=gho.speed;
                this.stepDis+=gho.speed;
                break;
            case DOWN:
                this.py+=gho.speed;
                this.stepDis+=gho.speed;
                break;
            case LEFT:
                this.px-=gho.speed;
                this.stepDis+=gho.speed;
                break;
            case RIGHT:
                this.px+=gho.speed;
                this.stepDis+=gho.speed;
                break;
        }
    }
}

Ghost.prototype.move=function(dist) {
    var gho=this.ghost;
    if(!this.isMove) {
        gho.dist=dist;
        switch (dist) {
            case UP:
                this.nextx=gho.x;
                this.nexty=gho.y-1;
                break;
            case DOWN:
                this.nextx=gho.x;
                this.nexty=gho.y+1;
                break;
            case LEFT:
                if(!isExp(gho.x,gho.y)||gho.x!=explx) {
                    this.nextx=gho.x-1;
                    this.nexty=gho.y;
                } else if(isExp(gho.x,gho.y)&&gho.x==explx) {
                    this.nextx=exprx;
                    this.nexty=gho.y;
                }
                break;
            case RIGHT:
                if(!isExp(gho.x,gho.y)||gho.x!=exprx) {
                    this.nextx=gho.x+1;
                    this.nexty=gho.y;
                } else if(isExp(gho.x,gho.y)&&gho.x==exprx) {
                    this.nextx=explx;
                    this.nexty=gho.y;
                }
                break;
            case NONE:
                this.nextx=gho.x;
                this.nexty=gho.y;
                break;
        }
        this.startMove();
    }
}

Ghost.prototype.ghoAte=function() {
    if(!this.ate) {
        var gho=this.ghost;
        gho.x=this.startX;
        gho.y=this.startY;
        this.resetPIX();
        this.isMove=false;
        this.stepDis=0;
        gho.dist=NONE;
        gho.point=null;
        this.ate=true;
        this.deadtime=500;
        var gid="gho_"+gho.id;
        eraseImg(gid,ghostDiv);
    }
}

Ghost.prototype.deadAct=function() {
    if(this.deadtime<=0) {
        this.deadtime==0;
        this.ate=false;
    } else if(this.deadtime>0) {
        this.deadtime--;
    }
}

Ghost.prototype.ghoAct=function(pacman) {
    var gho=this.ghost;
    if(!this.ate) {
        if(gho.dist!=NONE)
            this.moving();
        if(!this.isMove) {
            var pacSee=see(this,pacman,map);
            if(!pacman.powered&&!pacman.ate) {
                if(pacSee!=null)
                    track(this,pacSee,map);
                else if(pacSee==null&&this.ghost.point!=null)
                    trackPoint(this,this.ghost.point,map);
                else if(pacSee==null&&this.ghost.point==null)
                    gho.dist=findRandDist(this,map);
            } else if(pacman.powered&&!pacman.ate) {
                if(pacSee!=null)
                    escape(this,pacSee,map);
                else if(pacSee==null)
                    gho.dist=findRandDist(this,map);
            } else if(pacman.ate) {
                gho.dist=findRandDist(this,map);
            }
        }
        if(gho.dist!=NONE) {
            this.move(gho.dist);
        }
    } else if(this.ate) {
        this.deadAct();
    }
}

Ghost.prototype.drawGhoImg=function() {
    this.drawGho();
}

function addGhost(x,y,img) {
    var ghost=new Ghost(x,y,img);
    ghosts.push(ghost);
}

Ghost.prototype.getPx=function() {
    return this.px;
}
Ghost.prototype.getPy=function() {
    return this.py;
}
Ghost.prototype.getX=function() {
    return this.ghost.x;
}
Ghost.prototype.getY=function() {
    return this.ghost.y;
}
Ghost.prototype.isAte=function() {
    return this.ate;
}

function reInitGhost() {
    ghoId=0;
    ghostDiv.innerHTML="";
    ghosts=new Array();
}