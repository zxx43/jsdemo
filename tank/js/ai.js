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

function isConer(x,y,map) {
    var dists=getMapCanGo(x,y,map);
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

function getDists(coll,enimy,map) {
    var distNow=enimy.enimy.dist;
    var x=enimy.enimy.x;
    var y=enimy.enimy.y;
    var dists=new Array();
    if(coll) {
        return getMapCanGo(x,y,map);
    } else if(isConer(x,y,map)) {
        var togo=getMapCanGo(x,y,map);
        if(togo.length==1) {
            dists.push(togo[0]);
            return dists;
        }
        for(var i=0;i<togo.length;i++) {
            var distGo=togo[i];
            if(!isOppDist(distNow,distGo))
                dists.push(distGo);
        }
    } else
        return null;
    return dists;
}

function findWayRand(dists) {
    var result=NONE;
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

function findRandDist(coll,enimy,map) {
    var dists=getDists(coll,enimy,map);
    var result=NONE;
    if(dists!=null)
        result=findWayRand(dists);
    else if(dists==null)
        result=enimy.enimy.dist;
    return result;
}

function see(enimy,tank,map) {
    var eniX=enimy.enimy.x;
    var eniY=enimy.enimy.y;
    var dist=enimy.enimy.turret;
    var tankX=tank.tank.x;
    var tankY=tank.tank.y;
    if(eniX==tankX) {
        var canSee=true;
        if(eniY>tankY&&dist==UP) {
            for(var i=tankY;i<eniY;i++) {
                if(map[i][eniX]!=-1&&map[i][eniX]!=2&&map[i][eniX]!=3) {
                    canSee=false;
                }
            }
            if(canSee)
                return tank;
        } else if(eniY<tankY&&dist==DOWN) {
            for(var i=eniY;i<tankY;i++) {
                if(map[i][eniX]!=-1&&map[i][eniX]!=2&&map[i][eniX]!=3) {
                    canSee=false;
                }
            }
            if(canSee)
                return tank;
        }
    } else if(eniY==tankY) {
        var canSee=true;
        if(eniX>tankX&&dist==LEFT) {
            for(var i=tankX;i<eniX;i++) {
                if(map[eniY][i]!=-1&&map[eniY][i]!=2&&map[eniY][i]!=3) {
                    canSee=false;
                }
            }
            if(canSee)
                return tank;
        } else if(eniX<tankX&&dist==RIGHT) {
            for(var i=eniX;i<tankX;i++) {
                if(map[eniY][i]!=-1&&map[eniY][i]!=2&&map[eniY][i]!=3) {
                    canSee=false;
                }
            }
            if(canSee)
                return tank;
        }
    }
    return null;
}