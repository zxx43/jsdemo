var SPINE_W=97;
var SPINE_H=33;
var SPINE_HU=18;

function Spine(sid,px,py) {
    this.x=px;
    this.y=py;
    this.img=IMG_SPINE;
    this.id="sp_"+sid;
    this.isStand=false;
}

Spine.prototype.render=function() {
    drawImg(this.id,OBJ_DIV,this.img,(this.x-SPINE_W/2),(this.y-SPINE_H/2));
};