var objCount;
var maxCount=10;
var frame=0;
var person;
var lastY;
var brickList;
var brickId;
var fallenList;
var fallenId;
var scrollList;
var scrollId;
var springList;
var springId;
var spineList;
var spineId;
var canPlay;
var showed;

function init() {
    objCount=0;
    lastY=SCR_HEIGHT/2+PER_HEIGHT/2;
    person=new Person(SCR_WIDTH/2,SCR_HEIGHT/2);
    brickList=new Array();
    brickId=0;
    addBrick(NONE,SCR_WIDTH/2,(SCR_HEIGHT/2+PER_HEIGHT/2+BRICK_H/2));
    objCount=1;
    lastY+=100;
    fallenList=new Array();
    fallenId=0;
    scrollList=new Array();
    scrollId=0;
    springList=new Array();
    springId=0;
    spineList=new Array();
    spineId=0;
    canPlay=true;
    showed=false;
}

function act() {
    person.control(dist);
    frame++;
    if(frame>=MAX_FRAME)
        frame=0;
    takeAct();
    render();
    insertObj();
    playSound();
//    if(!window.ActiveXObject) {
        if(soundList.length>=1)
            canPlay=false;
        else
            canPlay=true;
//    } else
//        canPlay=false;
}

function render() {
    if(!person.die)
        person.render(frame);
    for(var i=0;i<brickList.length;i++) {
        var brick=brickList[i];
        brick.render();
    }
    for(var i=0;i<fallenList.length;i++) {
        var fallen=fallenList[i];
        fallen.render();
    }
    for(var i=0;i<scrollList.length;i++) {
        var scroll=scrollList[i];
        scroll.render(frame);
    }
    for(var i=0;i<springList.length;i++) {
        var spring=springList[i];
        spring.render();
    }
    for(var i=0;i<spineList.length;i++) {
        var spine=spineList[i];
        spine.render();
    }
}

function takeAct() {
    personAct();
    brickAct();
    fallenAct();
    scrollAct();
    springAct();
    spineAct();
}

function brickAct() {
    for(var i=0;i<brickList.length;i++) {
        var brick=brickList[i];
        if(brick.y<=TOP)
            deleteBrick(i);
        else {
            brick.act();
            brick.y-=CAM_SPD;
        }
    }
}

function fallenAct() {
    for(var i=0;i<fallenList.length;i++) {
        var fallen=fallenList[i];
        if(fallen.y<=TOP)
            deleteFallen(i);
        else {
            fallen.fallenAct();
            fallen.y-=CAM_SPD;
        }
    }
}

function scrollAct() {
    for(var i=0;i<scrollList.length;i++) {
        var scroll=scrollList[i];
        if(scroll.y<=TOP)
            deleteScroll(i);
        else
            scroll.y-=CAM_SPD;
    }
}

function springAct() {
    for(var i=0;i<springList.length;i++) {
        var spring=springList[i];
        if(spring.y<=TOP)
            deleteSpring(i);
        else {
            spring.act();
            spring.y-=CAM_SPD;
        }
    }
}

function spineAct() {
    for(var i=0;i<spineList.length;i++) {
        var spine=spineList[i];
        if(spine.y<=TOP)
            deleteSpine(i);
        else
            spine.y-=CAM_SPD;
    }
}

function personAct() {
    person.checkKill();
    if(!person.die) {
        checkPersonState();
        person.moveAct();
        person.downAct();
        person.toY();
    } else if(person.die) {
        if(!showed) {
            alert("GAME OVER!");
            showed=true;
        }
        window.location.reload();
    }
}

function insertObj() {
    var perBrick=50;
    var perFallen=perBrick+10;
    var perScroll=perFallen+20;
    var perSpring=perScroll+10;
    var perSpine=perSpring+10;
    var maxY=0;

    for(var i=0;i<5;i++) {
        if(objCount<maxCount) {
            lastY+=100;
            var per=Math.random()*100;
            var perX=Math.random();
            var perS=Math.random();
            var bx=perX*(SCR_WIDTH/3-BRICK_W)+SCR_WIDTH/3;
            if(per<perBrick) {
                if(perS*100<50)
                    addBrick(false,bx,lastY);
                else {
                    if(per<perBrick/2)
                        addBrick(LEFT,bx,lastY);
                    else
                        addBrick(RIGHT,bx,lastY);
                }
            } else if(per<perFallen)
                addFallen(bx,lastY);
            else if(per<perScroll) {
                if(perS*100<=50)
                    addScroll(LEFT,bx,lastY);
                else
                    addScroll(RIGHT,bx,lastY);
            } else if(per<perSpring)
                addSpring(bx,lastY);
            else if(per<=perSpine)
                addSpine(bx,lastY);
            objCount++;
        } else if(objCount>=maxCount)
            break;
    }
    if(objCount>=maxCount) {
        if(brickList.length>0) {
            lastY=brickList[brickList.length-1].y;
        }
        if(fallenList.length>0) {
            maxY=fallenList[fallenList.length-1].y;
            if(maxY>lastY)
                lastY=maxY;
        }
        if(scrollList.length>0) {
            maxY=scrollList[scrollList.length-1].y;
            if(maxY>lastY)
                lastY=maxY;
        }
        if(springList.length>0) {
            maxY=springList[springList.length-1].y;
            if(maxY>lastY)
                lastY=maxY;
        }
        if(spineList.length>0) {
            maxY=spineList[spineList.length-1].y;
            if(maxY>lastY)
                lastY=maxY;
        }
    }
}

function addBrick(lr,x,y) {
    var brick=new Brick(brickId,lr,x,y);
    if(brickId<100)
        brickId++;
    else if(brickId>=100)
        brickId=0;
    brickList.push(brick);
}

function addFallen(x,y) {
    var fallen=new Fallen(fallenId,x,y);
    if(fallenId<100)
        fallenId++;
    else if(fallenId>=100)
        fallenId=0;
    fallenList.push(fallen);
}

function addScroll(lr,x,y) {
    var scroll=new Scroll(scrollId,lr,x,y);
    if(scrollId<100)
        scrollId++;
    else if(scrollId>=100)
        scrollId=0;
    scrollList.push(scroll);
}

function addSpring(x,y) {
    var spring=new Spring(springId,x,y);
    if(springId<100)
        springId++;
    else if(springId>=100)
        springId=0;
    springList.push(spring);
}

function addSpine(x,y) {
    var spine=new Spine(spineId,x,y);
    if(spineId<100)
        spineId++;
    else if(spineId>=100)
        spineId=0;
    spineList.push(spine);
}

function deleteBrick(i) {
    var bid=brickList[i].id;
    eraseImg(bid,OBJ_DIV);
    brickList.splice(i,1);
    objCount--;
}

function deleteFallen(i) {
    var fid=fallenList[i].id;
    eraseImg(fid,OBJ_DIV);
    fallenList.splice(i,1);
    objCount--;
}

function deleteScroll(i) {
    var sid=scrollList[i].id;
    eraseImg(sid,OBJ_DIV);
    scrollList.splice(i,1);
    objCount--;
}

function deleteSpring(i) {
    var sid=springList[i].id;
    eraseImg(sid,OBJ_DIV);
    springList.splice(i,1);
    objCount--;
}

function deleteSpine(i) {
    var sid=spineList[i].id;
    eraseImg(sid,OBJ_DIV);
    spineList.splice(i,1);
    objCount--;
}

function checkPersonState() {
    var crashed=false;
    for(var i=0;i<brickList.length;i++) {
        var brick=brickList[i];
        if(person.y==(brick.y-BRICK_H/2-PER_HEIGHT/2)) {
            if(person.x>=(brick.x-BRICK_W/2)&&person.x<=(brick.x+BRICK_W/2)) {
                if(brick.lr==NONE)
                    person.item=TYPE_BRICK;
                else if(brick.lr==LEFT)
                    person.item=TYPE_BRICK_LEFT;
                else if(brick.lr==RIGHT)
                    person.item=TYPE_BRICK_RIGHT;
                if(!brick.isStand&&canPlay)
                    initSound(SUD_NORM,3);
                brick.isStand=true;
                crashed=true;
                break;
            } else
                person.setItem(TYPE_NONE);
        } else if((person.y+PER_HEIGHT/2)<=(brick.y-BRICK_H/2)&&
            (person.y+PER_HEIGHT/2)>=(brick.y-BRICK_H/2-GRAVITY-person.udSpd-CAM_SPD)) {
            if(person.x>=(brick.x-BRICK_W/2)&&person.x<=(brick.x+BRICK_W/2)) {
                person.item=TYPE_BRICK;
                person.nextY=brick.y-BRICK_H/2-PER_HEIGHT/2;
                person.recover();
                crashed=true;
                break;
            }
        }
    }

    if(!crashed) {
        for(var i=0;i<fallenList.length;i++) {
            var fallen=fallenList[i];
            if(person.y==(fallen.y-FALLEN_H/2-PER_HEIGHT/2)) {
                if(person.x>=(fallen.x-FALLEN_W/2)&&person.x<=(fallen.x+FALLEN_W/2)) {
                    if(!fallen.isFallen) {
                        person.item=TYPE_FALLEN;
                        if(!fallen.isStand&&canPlay)
                            initSound(SUD_UNST,3);
                        fallen.isStand=true;
                        crashed=true;
                        break;
                    } else if(fallen.isFallen)
                        person.setItem(TYPE_NONE);
                } else
                    person.setItem(TYPE_NONE);
            } else if((person.y+PER_HEIGHT/2)<=(fallen.y-FALLEN_H/2)&&
                (person.y+PER_HEIGHT/2)>=(fallen.y-FALLEN_H/2-GRAVITY-person.udSpd-CAM_SPD)) {
                if(person.x>=(fallen.x-FALLEN_W/2)&&person.x<=(fallen.x+FALLEN_W/2)) {
                    person.item=TYPE_FALLEN;
                    person.nextY=fallen.y-FALLEN_H/2-PER_HEIGHT/2;
                    person.recover();
                    crashed=true;
                    break;
                }
            }
        }
    }

    if(!crashed) {
        for(var i=0;i<scrollList.length;i++) {
            var scroll=scrollList[i];
            if(person.y==(scroll.y-SCROLL_H/2-PER_HEIGHT/2)) {
                if(person.x>=(scroll.x-SCROLL_W/2)&&person.x<=(scroll.x+SCROLL_W/2)) {
                    person.item=(scroll.lr==LEFT?TYPE_SCROLL_L:TYPE_SCROLL_R);
                    if(!scroll.isStand&&canPlay)
                        initSound(SUD_NORM,3);
                    scroll.isStand=true;
                    crashed=true;
                    break;
                } else
                    person.setItem(TYPE_NONE);
            } else if((person.y+PER_HEIGHT/2)<=(scroll.y-SCROLL_H/2)&&
                (person.y+PER_HEIGHT/2)>=(scroll.y-SCROLL_H/2-GRAVITY-person.udSpd-CAM_SPD)) {
                if(person.x>=(scroll.x-SCROLL_W/2)&&person.x<=(scroll.x+SCROLL_W/2)) {
                    person.item=(scroll.lr==LEFT?TYPE_SCROLL_L:TYPE_SCROLL_R);
                    person.nextY=scroll.y-SCROLL_H/2-PER_HEIGHT/2;
                    person.recover();
                    crashed=true;
                    break;
                }
            }
        }
    }

    if(!crashed) {
        for(var i=0;i<springList.length;i++) {
            var spring=springList[i];
            if(person.y==(spring.y-SPRING_H/2+SPRING_DDH/2-PER_HEIGHT/2)) {
                if(person.x>=(spring.x-SPRING_W/2)&&person.x<=(spring.x+SPRING_W/2)) {
                    person.item=TYPE_SPRING_UP;
                    if(!spring.isStand&&canPlay)
                        initSound(SUD_SPRI,6);
                    spring.isStand=true;
                    crashed=true;
                    break;
                } else
                    person.setItem(TYPE_NONE);
            } else if((person.y+PER_HEIGHT/2)<=(spring.y-SPRING_H/2)&&
                (person.y+PER_HEIGHT/2)>=(spring.y-SPRING_H/2-GRAVITY-person.udSpd-CAM_SPD)) {
                if(person.x>=(spring.x-SPRING_W/2)&&person.x<=(spring.x+SPRING_W/2)) {
                    person.item=TYPE_SPRING
                    person.nextY=spring.y-SPRING_H/2+SPRING_DDH/2-PER_HEIGHT/2;
                    person.recover();
                    crashed=true;
                    break;
                }
            }
        }
    }

    if(!crashed) {
        for(var i=0;i<spineList.length;i++) {
            var spine=spineList[i];
            if(person.y==(spine.y-SPINE_H/2+SPINE_HU-PER_HEIGHT/2)) {
                if(person.x>=(spine.x-SPINE_W/2)&&person.x<=(spine.x+SPINE_W/2)) {
                    person.item=TYPE_SPINE;
                    if(!spine.isStand) {
                        person.hp-=person.maxHP/2;
                        if(canPlay)
                            initSound(SUD_SPIK,2);
                        spine.isStand=true;
                    }
                    crashed=true;
                    break;
                } else
                    person.setItem(TYPE_NONE);
            } else if((person.y+PER_HEIGHT/2)<=(spine.y-SPINE_H/2+SPINE_HU)&&
                (person.y+PER_HEIGHT/2)>=(spine.y-SPINE_H/2+SPINE_HU-GRAVITY-person.udSpd-CAM_SPD)) {
                if(person.x>=(spine.x-SPINE_W/2)&&person.x<=(spine.x+SPINE_W/2)) {
                    person.item=TYPE_SPINE;
                    person.nextY=spine.y-SPINE_H/2+SPINE_HU-PER_HEIGHT/2;
                    crashed=true;
                    break;
                }
            }
        }
    }

    if(!crashed)
        person.setItem(TYPE_NONE);
}