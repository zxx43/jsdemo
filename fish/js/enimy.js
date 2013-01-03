var enimy1Maps;
var enimy2Maps;
var enimy3Maps;
var enimyList=new Array();

function initEnimy() {
    var enimy11lMap=new Image();
    var enimy12lMap=new Image();
    var enimy11rMap=new Image();
    var enimy12rMap=new Image();
    var enimy21lMap=new Image();
    var enimy22lMap=new Image();
    var enimy21rMap=new Image();
    var enimy22rMap=new Image();
    var enimy31lMap=new Image();
    var enimy32lMap=new Image();
    var enimy31rMap=new Image();
    var enimy32rMap=new Image();
    var enimy41lMap=new Image();
    var enimy42lMap=new Image();
    var enimy41rMap=new Image();
    var enimy42rMap=new Image();
    enimy11lMap.src="img/enim1_l1.gif";
    enimy12lMap.src="img/enim1_l2.gif";
    enimy11rMap.src="img/enim1_r1.gif";
    enimy12rMap.src="img/enim1_r2.gif";
    enimy21lMap.src="img/enim2_l1.gif";
    enimy22lMap.src="img/enim2_l2.gif";
    enimy21rMap.src="img/enim2_r1.gif";
    enimy22rMap.src="img/enim2_r2.gif";
    enimy31lMap.src="img/enim3_l1.gif";
    enimy32lMap.src="img/enim3_l2.gif";
    enimy31rMap.src="img/enim3_r1.gif";
    enimy32rMap.src="img/enim3_r2.gif";
    enimy41lMap.src="img/fish_l1.gif";
    enimy42lMap.src="img/fish_l2.gif";
    enimy41rMap.src="img/fish_r1.gif";
    enimy42rMap.src="img/fish_r2.gif";
    enimy1Maps=new Array(enimy11lMap,enimy12lMap,enimy11rMap,enimy12rMap);
    enimy2Maps=new Array(enimy21lMap,enimy22lMap,enimy21rMap,enimy22rMap);
    enimy3Maps=new Array(enimy31lMap,enimy32lMap,enimy31rMap,enimy32rMap);
    enimy4Maps=new Array(enimy41lMap,enimy42lMap,enimy41rMap,enimy42rMap);
}

function Enimy(x,y,lr,type,lv) {
    var pic=document.createElement("img");
    this.enimy={x:x,y:y,lr:lr,level:lv,type:type,lrSpeed:8,udSpeed:4,picture:pic,width:0,height:0};
    this.enimyMaps=new Array();
    this.checkImage;
    this.checkLevel;
    this.enimy.picture.style.position="absolute";
    this.enimy.picture.style.width=this.enimy.width+6;
    this.enimy.picture.style.height=this.enimy.height+4;
    this.enimy.picture.style.left=x-parseInt(this.enimy.picture.style.width)/2;
    this.enimy.picture.style.top=y-parseInt(this.enimy.picture.style.height)/2;
//        scr.appendChild(this.enimy.picture);
    return this;
}
Enimy.prototype.act=function() {
    var enimy=this.enimy;
    this.checkImage();
    this.checkLevel();
    enimy.picture.style.position="absolute";
    enimy.picture.style.width=enimy.width+6;
    enimy.picture.style.height=enimy.height+4;
    enimy.picture.style.left=enimy.x-parseInt(enimy.picture.style.width)/2;
    enimy.picture.style.top=enimy.y-parseInt(enimy.picture.style.height)/2;
    this.drawEnimy();
}
Enimy.prototype.drawEnimy=function() {
    var enimy=this.enimy;
    var src=enimy.picture.src;
    var pos=enimy.picture.style.position;
    var width=enimy.picture.style.width;
    var height=enimy.picture.style.height
    var left=enimy.picture.style.left;
    var top=enimy.picture.style.top;
    var html="<img src='"+src+"' style='position: "+pos+";width: "+width+";height: "+height+";left: "+left+";top: "+top+"'>";
    scr.innerHTML+=html;
}
Enimy.prototype.move=function() {
    var enimy=this.enimy;
    enimy.x=(enimy.lr==0?enimy.x-enimy.lrSpeed:enimy.x+enimy.lrSpeed);
}
Enimy.prototype.moveAi=function(f) {
    var enimy=this.enimy;
    var fish= f.fish;
    var height=screenHeight;
    this.move();
    var scape=250;
    var scapeX=500;
    if(enimy.level>fish.level) {
        if(Math.abs(enimy.y-fish.y)<scape&&Math.abs(enimy.x-fish.x)<scapeX) {
            if(enimy.lr==0&&enimy.x-enimy.width/2>fish.x) {
                if(enimy.y>fish.y) {
                    if(Math.abs(enimy.y-fish.y)>=enimy.udSpeed)
                        enimy.y-=enimy.udSpeed;
                } else if(enimy.y<fish.y) {
                    if(Math.abs(enimy.y-fish.y)>=enimy.udSpeed)
                        enimy.y+=enimy.udSpeed;
                }
            } else if(enimy.lr==1&&enimy.x+enimy.width/2<fish.x) {
                if(enimy.y>fish.y) {
                    if(Math.abs(enimy.y-fish.y)>=enimy.udSpeed)
                        enimy.y-=enimy.udSpeed;
                } else if(enimy.y<fish.y) {
                    if(Math.abs(enimy.y-fish.y)>=enimy.udSpeed)
                        enimy.y+=enimy.udSpeed;
                }
            }
        }
    } else if(enimy.level<=fish.level) {
        if(Math.abs(enimy.x-fish.x)<scapeX) {
            var fTopY=fish.y+fish.height/2;
            var fButtonY=fish.y-fish.height/2;
            var eTopY=enimy.y+enimy.height/2;
            var eButtonY=enimy.y-enimy.height/2;
            if(enimy.lr==0&&enimy.x-enimy.width/2>fish.x+fish.width/2) {
                if((eTopY>fButtonY&&eTopY<fTopY)||(eButtonY>fButtonY&&eButtonY<fTopY)) {
                    if(enimy.y>=fish.y) {
                        if(eTopY<height-enimy.udSpeed*4)
                            enimy.y+=enimy.udSpeed*3;
                        else if(eButtonY>enimy.udSpeed*4)
                            enimy.y-=enimy.udSpeed*3;
                    } else if(enimy.y<fish.y) {
                        if(eButtonY>enimy.udSpeed*4)
                            enimy.y-=enimy.udSpeed*3;
                        else if(eTopY<height-enimy.udSpeed*4)
                            enimy.y+=enimy.udSpeed*3;
                    }
                }
            } else if(enimy.lr==1&&enimy.x+enimy.width/2<fish.x-fish.width/2) {
                if((eTopY>fButtonY&&eTopY<fTopY)||(eButtonY>fButtonY&&eButtonY<fTopY)) {
                    if(enimy.y>=fish.y) {
                        if(eTopY<height-enimy.udSpeed*4)
                            enimy.y+=enimy.udSpeed*3;
                        else if(eButtonY>enimy.udSpeed*4)
                            enimy.y-=enimy.udSpeed*3;
                    } else if(enimy.y<fish.y) {
                        if(eButtonY>enimy.udSpeed*4)
                            enimy.y-=enimy.udSpeed*3;
                        else if(eTopY<height-enimy.udSpeed*4)
                            enimy.y+=enimy.udSpeed*3;
                    }
                }
            }
        }
    }
}
Enimy.prototype.eat=function() {
    var enimy=this.enimy;
    var width=enimy.picture.style.width;
    var height=enimy.picture.style.height;
    enimy.picture.style.width=parseInt(width)+12;
    enimy.picture.style.height=parseInt(height)+6;
    enimy.picture.style.left=enimy.x-parseInt(enimy.picture.style.width)/2;
    enimy.picture.style.top=enimy.y-parseInt(enimy.picture.style.height)/2;
}
Enimy.prototype.checkLevel=function() {
    if(this.enimy.level==1) {
        this.enimy.width=32;
        this.enimy.height=11;
    } else if(this.enimy.level==2) {
        this.enimy.width=40;
        this.enimy.height=14;
    } else if(this.enimy.level==3) {
        this.enimy.width=50;
        this.enimy.height=18;
    } else if(this.enimy.level==4) {
        this.enimy.width=60;
        this.enimy.height=22;
    } else if(this.enimy.level==5) {
        this.enimy.width=71;
        this.enimy.height=27;
    } else if(this.enimy.level==6) {
        this.enimy.width=83;
        this.enimy.height=32;
    } else if(this.enimy.level==7) {
        this.enimy.width=92;
        this.enimy.height=36;
    } else if(this.enimy.level==8) {
        this.enimy.width=106;
        this.enimy.height=40;
    } else if(this.enimy.level==9) {
        this.enimy.width=136;
        this.enimy.height=55;
    }
}
Enimy.prototype.checkImage=function() {
    if(this.enimy.type==1) {
        this.enimyMaps=enimy1Maps;
    } else if(this.enimy.type==2) {
        this.enimyMaps=enimy2Maps;
    } else if(this.enimy.type==3) {
        this.enimyMaps=enimy3Maps;
    } else if(this.enimy.type==4) {
        this.enimyMaps=enimy4Maps;
    }
    if(this.enimy.lr==0)
        this.enimy.picture=(frame==0?this.enimyMaps[0]:this.enimyMaps[1]);
    else if(this.enimy.lr==1)
        this.enimy.picture=(frame==0?this.enimyMaps[2]:this.enimyMaps[3]);
}

function enimyAct() {
    for(var i=0;i<enimyList.length;i++) {
        var enim=enimyList[i];
        if(fishList.length<=0)
            enim.move();
        else if(fishList.length>0) {
            var fish=fishList[0];
            enim.moveAi(fish);
        }
        enim.act();
    }
}

function addEnimy() {
    var lr=0;
    var x=screenWidth+20;
    var y=Math.random()*screenHeight;
    var type=parseInt(Math.random()*4)+1;
    var lv=parseInt(Math.random()*9)+1;
    if(Math.random()*100<50)
        lr=1;
    if(lr==1)
        x=-20;
    if(enimyList.length<10&&Math.random()*100<15) {
        var enimy=new Enimy(x,y,lr,type,lv);
        enimyList.push(enimy);
    }
}
