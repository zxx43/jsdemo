var BRICK_W=96;
var BRICK_H=15;
var BRICK_MOV_TIME=20;

function Brick(bid,lr,px,py) {
    this.x=px;
    this.y=py;
    this.img=IMG_BRICK;
    this.id="bri_"+bid;
    this.isStand=false;
    this.lr=lr;
    this.movTime=0;
}

Brick.prototype.render=function() {
    drawImg(this.id,OBJ_DIV,this.img,(this.x-BRICK_W/2),(this.y-BRICK_H/2));
};

Brick.prototype.act=function() {
    if(this.lr!=NONE) {
        if(this.movTime<BRICK_MOV_TIME)
            this.movTime++;
        else if(this.movTime>=BRICK_MOV_TIME) {
            this.movTime=0;
            this.lr=(this.lr==LEFT?RIGHT:LEFT);
        }
        if(this.lr==LEFT)
            this.x-=BRICK_SPD;
        else if(this.lr==RIGHT)
            this.x+=BRICK_SPD;
    }
};