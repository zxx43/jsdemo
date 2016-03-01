function getDists(ghost,map) {
    var distNow=ghost.ghost.dist;
    var x=ghost.ghost.x;
    var y=ghost.ghost.y;
    var dists=new Array();
    if(isConer(x,y,map)) {
        var togo=getCanGo(x,y,map);
        if(togo.length==1) {
            dists.push(togo[0]);
            return dists;
        }
        for(i=0;i<togo.length;i++) {
            var distGo=togo[i];
            if(!isOppDist(distNow,distGo))
                dists.push(distGo);
        }
    } else
        return null;
    return dists;
}

function findWayRand(ghost,dists) {
    var result=NONE;
    var distNow=ghost.ghost.dist;
    var rand=parseInt(Math.random()*dists.length);
    if(dists.length==1) {
        result=dists[0];
        return result;
    }
    result=dists[rand];
    if(contain(dists,result))
        return result;
    return NONE;
}

function findRandDist(ghost,map) {
    var dists=getDists(ghost,map);
    var result=NONE;
    if(dists!=null)
        result=findWayRand(ghost,dists);
    else if(dists==null)
        result=ghost.ghost.dist;
    return result;
}

function see(ghost,pacman,map) {
    var ghoX=ghost.ghost.x;
    var ghoY=ghost.ghost.y;
    var pacX=pacman.pacman.x;
    var pacY=pacman.pacman.y;
    if(ghoX==pacX) {
        var canSee=true;
        if(ghoY>pacY) {
            for(i=pacY;i<ghoY;i++) {
                if(map[i][ghoX]==0) {
                    canSee=false;
                }
            }
            if(canSee)
                return pacman;
        } else if(ghoY<pacY) {
            for(i=ghoY;i<pacY;i++) {
                if(map[i][ghoX]==0) {
                    canSee=false;
                }
            }
            if(canSee)
                return pacman;
        }
    } else if(ghoY==pacY) {
        var canSee=true;
        if(ghoX>pacX) {
            for(i=pacX;i<ghoX;i++) {
                if(map[ghoY][i]==0) {
                    canSee=false;
                }
            }
            if(canSee)
                return pacman;
        } else if(ghoX<pacX) {
            for(i=ghoX;i<pacX;i++) {
                if(map[ghoY][i]==0) {
                    canSee=false;
                }
            }
            if(canSee)
                return pacman;
        }
    }
    return null;
}

function track(ghost,pacman,map) {
    if(pacman!=null) {
        var pacX=pacman.pacman.x;
        var pacY=pacman.pacman.y;
        var ghoX=ghost.ghost.x;
        var ghoY=ghost.ghost.y;
        var toDist=offDist(pacX,pacY,ghoX,ghoY);
        if(onExp(ghoY)&&Math.abs(ghoX-pacX)>(map[0].length/2))
            toDist=swapDist(toDist);
        if(distCanGo(ghoX,ghoY,toDist,map))
            ghost.ghost.dist=toDist;
        else
            ghost.ghost.dist=findRandDist(ghost,map);
        if(isConer(pacX,pacY,map)) {
            var point=new Point(pacX,pacY,pacman.pacman.dist);
            ghost.ghost.point=point;
        }
    }
}

function trackPoint(ghost,point,map) {
    var px=point.getX();
    var py=point.getY();
    var ghoX=ghost.ghost.x;
    var ghoY=ghost.ghost.y;
    if(point.canReach(ghost,map)!=null) {
        if(!point.is(ghoX,ghoY)) {
            var toDist=offDist(px,py,ghoX,ghoY);
            if(onExp(ghoY)&&Math.abs(ghoX-px)>(map[0].length/2))
                toDist=swapDist(toDist);
            if(distCanGo(ghoX,ghoY,toDist,map))
                ghost.ghost.dist=toDist;
            else
                ghost.ghost.dist=findRandDist(ghost,map);
        } else if(point.is(ghoX,ghoY)) {
            var toDist=point.getDist();
            if(distCanGo(ghoX,ghoY,toDist,map))
                ghost.ghost.dist=toDist;
            else
                ghost.ghost.dist=findRandDist(ghost,map);
            ghost.ghost.point=null;
        }
    } else if(point.canReach(ghost,map)==null) {
        ghost.ghost.point=null;
        ghost.ghost.dist=findRandDist(ghost,map);
    }
}

function escape(ghost,pacman,map) {
    if(ghost.ghost.point!=null)
        ghost.ghost.point=null;
    var pacX=pacman.pacman.x;
    var pacY=pacman.pacman.y;
    var ghoX=ghost.ghost.x;
    var ghoY=ghost.ghost.y;
    var toDist=offDist(ghoX,ghoY,pacX,pacY);
    if(!isConer(ghoX,ghoY,map)) {
        if(distCanGo(ghoX,ghoY,toDist,map)&&getDistance(ghost,pacman)<=DANGE_DIST)
            ghost.ghost.dist=toDist;
        else if(!distCanGo(ghoX,ghoY,toDist,map))
            ghost.ghost.dist=findRandDist(ghost,map);
    } else {
        var noDist=offDist(pacX,pacY,ghoX,ghoY);
        var togo=getDists(ghost,map);
        if(togo.length>1) {
            for(i=0;i<togo.length;i++) {
                var disto=togo[i];
                if(disto==noDist)
                    togo.splice(i,1);
            }
        }
        ghost.ghost.dist=findWayRand(ghost,togo);
    }
}