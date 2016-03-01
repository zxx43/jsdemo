var SPRING_W=96;
var SPRING_H=16;
var SPRING_DDH=4;
var SPRING_DUH=8;

var SD_TIME=3;

function Spring(sid,px,py) {
    this.x=px;
    this.y=py;
    this.img=IMG_SPRING1;
    this.id="spr_"+sid;
    this.isStand=false;
    this.standTime=0;
}

Spring.prototype.render=function() {
    var height=SPRING_H/2;
    if(this.isStand&&this.standTime<SD_TIME) {
        height=SPRING_H/2-SPRING_DDH/2;
        this.img=IMG_SPRING0;
    } else if(this.isStand&&this.standTime<SD_TIME*2) {
        height=SPRING_H/2;
        this.img=IMG_SPRING1;
    } else if(this.isStand&&this.standTime<SD_TIME*3) {
        height=SPRING_H/2+SPRING_DUH/2;
        this.img=IMG_SPRING2
    } else if(this.isStand&&this.standTime<SD_TIME*4) {
        height=SPRING_H/2;
        this.img=IMG_SPRING1;
    }
    drawImg(this.id,OBJ_DIV,this.img,(this.x-SPRING_W/2),(this.y-height));
};

Spring.prototype.act=function() {
    if(this.isStand)
        this.standTime++;
    if(this.standTime>=SD_TIME*4) {
        this.standTime=0;
        this.img=IMG_SPRING1;
        this.isStand=false;
    }
};