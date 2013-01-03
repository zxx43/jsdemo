var grass1Map;
var grass2Map;
var grass3Map;
var grass1;
var grass2;
var grass3;

function initGrass() {
    var grass1_0=new Image();
    var grass1_1=new Image();
    var grass1_2=new Image();
    var grass1_3=new Image();
    var grass2_0=new Image();
    var grass2_1=new Image();
    var grass2_2=new Image();
    var grass2_3=new Image();
    var grass3_0=new Image();
    var grass3_1=new Image();
    var grass3_2=new Image();
    var grass3_3=new Image();
    grass1_0.src="img/grass1_0.gif";
    grass1_0.height=82;
    grass1_1.src="img/grass1_1.gif";
    grass1_2.src="img/grass1_2.gif";
    grass1_3.src="img/grass1_3.gif";
    grass2_0.src="img/grass2_0.gif";
    grass2_0.height=48;
    grass2_1.src="img/grass2_1.gif";
    grass2_2.src="img/grass2_2.gif";
    grass2_3.src="img/grass2_3.gif";
    grass3_0.src="img/grass3_0.gif";
    grass3_0.height=112;
    grass3_1.src="img/grass3_1.gif";
    grass3_2.src="img/grass3_2.gif";
    grass3_3.src="img/grass3_3.gif";
    grass1Map=new Array(grass1_0,grass1_1,grass1_2,grass1_3);
    grass2Map=new Array(grass2_0,grass2_1,grass2_2,grass2_3);
    grass3Map=new Array(grass3_0,grass3_1,grass3_2,grass3_3);
    scr.appendChild(bgmap);
    grass3=new Grass(440,screenHeight-grass3Map[0].height,grass3Map[0],3);
    scr.appendChild(sealand);
    grass1=new Grass(240,screenHeight-grass1Map[0].height,grass1Map[0],1);
    grass2=new Grass(screenWidth-140,screenHeight-grass2Map[0].height,grass2Map[0],2);
}

function Grass(x,y,img,typ) {
    this.grass={x:x,y:y,tp:typ,lr:0,time:0,picture:img};
    this.grass.picture.style.position="absolute";
    this.grass.picture.style.left=this.grass.x;
    this.grass.picture.style.top=this.grass.y;
    scr.appendChild(this.grass.picture);
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
            grass.picture=grassMap[grass.time];
        else if(grass.lr==1)
            grass.picture=grassMap[3-grass.time];
        grass.picture.style.position="absolute";
        grass.picture.style.left=grass.x;
        grass.picture.style.top=grass.y;
        scr.appendChild(grass.picture);
        grass.time++;
    }
    else if(grass.time>=4) {
        grass.lr=(grass.lr==0?1:0);
        grass.time=0;
        scr.appendChild(grass.picture);
    }
}
