var grass1Map;
var grass2Map;
var grass3Map;
var grass1;
var grass2;
var grass3;

function initGrass() {
    var grass1_0="img/grass1_0.gif";
    var grass1_h=82;
    var grass1_1="img/grass1_1.gif";
    var grass1_2="img/grass1_2.gif";
    var grass1_3="img/grass1_3.gif";
    var grass2_0="img/grass2_0.gif";
    var grass2_h=48;
    var grass2_1="img/grass2_1.gif";
    var grass2_2="img/grass2_2.gif";
    var grass2_3="img/grass2_3.gif";
    var grass3_0="img/grass3_0.gif";
    var grass3_h=112;
    var grass3_1="img/grass3_1.gif";
    var grass3_2="img/grass3_2.gif";
    var grass3_3="img/grass3_3.gif";
    grass1Map=new Array(grass1_0,grass1_1,grass1_2,grass1_3);
    grass2Map=new Array(grass2_0,grass2_1,grass2_2,grass2_3);
    grass3Map=new Array(grass3_0,grass3_1,grass3_2,grass3_3);
    grass3=new Grass(1,440,screenHeight-grass3_h,grass3Map[0],3);
    grass1=new Grass(2,240,screenHeight-grass1_h,grass1Map[0],1);
    grass2=new Grass(3,screenWidth-140,screenHeight-grass2_h,grass2Map[0],2);
}

function Grass(id,x,y,img,type) {
    this.grass={
        id:id,
        x:x,
        y:y,
        img:img,
        tp:type,
        time:0
    }
    return this;
}
Grass.prototype.grassAct=function() {
    var grass=this.grass;
    var grassMap;
    if(grass.tp==1)
        grassMap=grass1Map;
    else if(grass.tp==2)
        grassMap=grass2Map;
    else if(grass.tp==3)
        grassMap=grass3Map;

    if(grass.time<4) {
        if(grass.lr==0)
            grass.img=grassMap[grass.time];
        else if(grass.lr==1)
            grass.img=grassMap[3-grass.time];
       this.draw();
        grass.time++;
    } else if(grass.time>=4) {
        grass.lr=(grass.lr==0?1:0);
        grass.time=0;
        this.draw();
    }
}
Grass.prototype.draw=function() {
    var grass=this.grass;
    var gid="grs_"+grass.id;
    var div=g_front;
    if(grass.tp==3)
        div=g_back;
    drawImg(gid,div,grass.img,grass.x,grass.y);
}
