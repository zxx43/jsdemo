function clearWindow() {
    textDiv.innerHTML="";
}

function eraseImg(id,div) {
    var imgToErase=document.getElementById(id);
    if(imgToErase!=null)
        div.removeChild(imgToErase);
}

function drawImg(id,div,img,x,y) {
    var curImg=document.getElementById(id);
    if(curImg==null) {
        div.innerHTML+=createImg(id,div,img,x,y);
    } else if(curImg!=null) {
        curImg.src=img;
        curImg.style.left=x;
        curImg.style.top=y;
    }
}

function createImg(id,div,img,x,y) {
    var html="<img id='"+id+"' src='"+img+"' " +
        "style='position: absolute;" +
        "left:"+x+" ;top:"+y+" ;'/>";
    return html;
}

function contain(list,is) {
    for(i=0;i<list.length;i++) {
        if(list[i]==is)
            return true;
    }
    return false;
}

function getCanGo(x,y,map) {
    var dists=new Array();
    if(map[y-1][x]!=0)
        dists.push(UP);
    if(map[y][x-1]!=0)
        dists.push(LEFT);
    if(map[y][x+1]!=0)
        dists.push(RIGHT);
    if(map[y+1][x]!=0)
        dists.push(DOWN);
    return dists;
}

function isConer(x,y,map) {
    var dists=getCanGo(x,y,map);
    if(dists.length==0)
        return false;
    else if(dists.length==1)
        return true;
    else if(dists.length>2)
        return true;
    else if(dists.length==2) {
        if(dists[0]==UP||dists[0]==DOWN) {
            if(dists[1]==UP||dists[1]==DOWN)
                return false;
        } else if(dists[0]==LEFT||dists[0]==RIGHT) {
            if(dists[1]==LEFT||dists[1]==RIGHT)
                return false;
        }
        return true;
    }
    return false;
}

function isOppDist(dist1,dist2) {
    if(dist1==RIGHT) {
        if(dist2==LEFT) {
            return true;
        }
    } else if(dist1==LEFT) {
        if(dist2==RIGHT) {
            return true;
        }
    } else if(dist1==UP) {
        if(dist2==DOWN) {
            return true;
        }
    } else if(dist1==DOWN) {
        if(dist2==UP) {
            return true;
        }
    }
    return false;
}

function distCanGo(x,y,dist,map) {
    if(dist==UP) {
        if(map[y-1][x]!=0)
            return true;
    } else if(dist==DOWN) {
        if(map[y+1][x]!=0)
            return true;
    } else if(dist==LEFT) {
        if(map[y][x-1]!=0)
            return true;
    } else if(dist==RIGHT) {
        if(map[y][x+1]!=0)
            return true;
    }
    return false;
}

function offDist(x1,y1,x2,y2) {
    if(x1==x2) {
        if(y1<y2)
            return UP;
        else if(y1>y2)
            return DOWN;
    }
    if(y1==y2) {
        if(x1>x2)
            return RIGHT;
        else if(x1<x2)
            return LEFT;
    }
    return NONE;
}

function swapDist(dist) {
    if(dist==UP)
        return DOWN;
    else if(dist==DOWN)
        return UP;
    else if(dist==LEFT)
        return RIGHT;
    else if(dist==RIGHT)
        return LEFT;
    else
        return dist;
}

function checkEatAct(ghost,pacman) {
    var gho=ghost.ghost;
    var pac=pacman.pacman;
    var ghoX=ghost.getPx();
    var ghoY=ghost.getPy();
    var pacX=pacman.getPx();
    var pacY=pacman.getPy();
    if((pacX-ghoX)*(pacX-ghoX)+(pacY-ghoY)*(pacY-ghoY)<(TILE_WIDTH*2/3)*(TILE_WIDTH*2/3)) {
        if(pacman.powered)
            ghost.ghoAte();
        else if(!pacman.powered)
            pacman.pacAte();
    }
}

function getDistance(ghost,pacman) {
    var gho=ghost.ghost;
    var pac=pacman.pacman;
    var ghoX=ghost.getX();
    var ghoY=ghost.getY();
    var pacX=pacman.getX();
    var pacY=pacman.getY();
    if(ghoX==pacX)
        return Math.abs(ghoY-pacY);
    if(ghoY==pacY)
        return Math.abs(ghoX-pacX);
}

function isExp(x,y) {
    if((x==explx||x==exprx)&&y==expy)
        return true;
    return false;
}

function onExp(y) {
    if(y==expy)
        return true;
    return false;
}

function Point(x,y,dist) {
    this.point={
        x:x,
        y:y,
        dist:dist
    };
}
Point.prototype.getX=function() {
    return this.point.x;
}
Point.prototype.getY=function() {
    return this.point.y;
}
Point.prototype.getDist=function() {
    return this.point.dist;
}
Point.prototype.is=function(x,y) {
    if(this.getX()==x&&this.getY()==y)
        return true;
    return false;
}
Point.prototype.canReach=function(ghost,map) {
    var ghoX=ghost.ghost.x;
    var ghoY=ghost.ghost.y;
    var px=this.getX();
    var py=this.getY();
    if(ghoX!=px&&ghoY!=py) {
        return null;
    } else if(ghoX==px||ghoY==py) {
        var toDist=ghost.ghost.dist;
        if(!distCanGo(ghoX,ghoY,toDist,map))
            return null;
        else
            return this;
    }
    return null;
}