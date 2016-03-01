var enimy1Maps;
var enimy2Maps;
var enimy3Maps;
var enimyList=new Array();
var enimyId=0;

function initEnimy() {
    var enimy11lMap="img/enim1_l1.gif";
    var enimy12lMap="img/enim1_l2.gif";
    var enimy11rMap="img/enim1_r1.gif";
    var enimy12rMap="img/enim1_r2.gif";
    var enimy21lMap="img/enim2_l1.gif";
    var enimy22lMap="img/enim2_l2.gif";
    var enimy21rMap="img/enim2_r1.gif";
    var enimy22rMap="img/enim2_r2.gif";
    var enimy31lMap="img/enim3_l1.gif";
    var enimy32lMap="img/enim3_l2.gif";
    var enimy31rMap="img/enim3_r1.gif";
    var enimy32rMap="img/enim3_r2.gif";
    var enimy41lMap="img/fish_l1.gif";
    var enimy42lMap="img/fish_l2.gif";
    var enimy41rMap="img/fish_r1.gif";
    var enimy42rMap="img/fish_r2.gif";
    enimy1Maps=new Array(enimy11lMap,enimy12lMap,enimy11rMap,enimy12rMap);
    enimy2Maps=new Array(enimy21lMap,enimy22lMap,enimy21rMap,enimy22rMap);
    enimy3Maps=new Array(enimy31lMap,enimy32lMap,enimy31rMap,enimy32rMap);
    enimy4Maps=new Array(enimy41lMap,enimy42lMap,enimy41rMap,enimy42rMap);
}

function Enimy(x,y,lr,type,lv) {
    this.enimy={
        id:enimyId,
        x:x,
        y:y,
        lr:lr,
        level:lv,
        type:type,
        lrSpeed:8,
        udSpeed:4,
        picture:"",
        width:0,
        height:0
    };
    this.enimyMaps=new Array();
    this.checkImage();
    this.checkLevel();
    if(enimyId<100)
        enimyId++;
    if(enimyId>=100)
        enimyId=0;
    return this;
}
Enimy.prototype.act=function() {
    var enimy=this.enimy;
    this.checkImage();
    this.checkLevel();
    var iw=enimy.width+6;
    var ih=enimy.height+4;
    var ix=enimy.x-iw/2;
    var iy=enimy.y-ih/2;
    this.drawEnimy(ix,iy,iw,ih);
}
Enimy.prototype.drawEnimy=function(ix,iy,iw,ih) {
    var enimy=this.enimy;
    var id="eni_"+enimy.id;
    var img=enimy.picture;
    drawSizeImg(id,scr,img,ix,iy,iw,ih);
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
    var eid="eni_"+enimy.id;
    var width=enimy.width+18;
    var height=enimy.height+10;
    var ix=enimy.x-width/2;
    var iy=enimy.y-height/2;
    drawSizeImg(eid,scr,enimy.picture,ix,iy,width,height);
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
    var y=parseInt(Math.random()*screenHeight);
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
