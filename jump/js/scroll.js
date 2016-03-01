var SCROLL_W=96;
var SCROLL_H=16;

function Scroll(sid,plr,px,py) {
    this.x=px;
    this.y=py;
    this.lr=plr;
    this.id="scr_"+sid;
    this.img="";
    this.isStand=false;
}

Scroll.prototype.render=function(frame) {
    if(this.lr==LEFT) {
        if(frame<MAX_FRAME/2)
            this.img=IMG_SCROLL_L1;
        else if(frame<=MAX_FRAME)
            this.img=IMG_SCROLL_L2;
    } else if(this.lr==RIGHT) {
        if(frame<MAX_FRAME/2)
            this.img=IMG_SCROLL_R1;
        else if(frame<=MAX_FRAME)
            this.img=IMG_SCROLL_R2;
    }
    drawImg(this.id,OBJ_DIV,this.img,(this.x-SCROLL_W/2),(this.y-SCROLL_H/2));
};