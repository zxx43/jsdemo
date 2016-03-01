var FALLEN_W=96;
var FALLEN_H=16;

var START_FALL_TIME=4;
var END_FALL_TIME=8;

function Fallen(fid,px,py) {
    this.x=px;
    this.y=py;
    this.fallTime=0;
    this.isStand=false;
    this.isFallen=false;
    this.img=IMG_FALL1;
    this.id="fallen_"+fid;
}

Fallen.prototype.render=function() {
    drawImg(this.id,OBJ_DIV,this.img,(this.x-FALLEN_W/2),(this.y-FALLEN_H/2));
};

Fallen.prototype.fallenAct=function() {
    if(this.isStand) {
        this.fallTime++;
        if(this.fallTime>START_FALL_TIME&&this.fallTime<END_FALL_TIME) {
            this.isFallen=true;
            this.img=IMG_FALL2;
        } else if(this.fallTime>=END_FALL_TIME) {
            this.isFallen=false;
            this.isStand=false;
            this.fallTime=0;
            this.img=IMG_FALL1;
        }
    }
};