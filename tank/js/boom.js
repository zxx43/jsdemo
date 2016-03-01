var booms=new Array();
var boomId=0;
var BOOM_TIME=20;

function Boom(x,y) {
    this.x=x;
    this.y=y;
    this.id=boomId;
    this.time=0;
    this.imgX=0;
    if(boomId<100) {
        boomId++;
    } else if(boomId>=100) {
        boomId=0;
    }
    if(SOUND)
        initSound(SUD_BANG,4);
}

Boom.prototype.draw=function() {
    var ix=this.x-TILE_WIDTH/2;
    var iy=this.y-TILE_HEIGHT/2;
    var bid="bo_"+this.id;
    drawClipImg(bid,BULLET_DIV,IMG_BOOM,this.imgX,0,ix,iy);
}

Boom.prototype.act=function() {
    this.time++;
    if(this.imgX!=1&&this.time>=BOOM_TIME/2)
        this.imgX=1;
}

function addBoom(x,y) {
    var boom=new Boom(x,y);
    booms.push(boom);
}

function boomAct() {
    for(var i=0;i<booms.length;i++) {
        var boom=booms[i];
        boom.draw();
        boom.act();
        if(boom.time>=BOOM_TIME) {
            var bid="bo_"+boom.id;
            eraseImg(bid,BULLET_DIV);
            booms.splice(i,1);
        }
    }
}