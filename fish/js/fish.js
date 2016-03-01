var fishMaps;
var fishList=new Array();

function initFish() {
    var fishl1Map="img/fish_l1.gif";
    var fishl2Map="img/fish_l2.gif";
    var fishr1Map="img/fish_r1.gif";
    var fishr2Map="img/fish_r2.gif";
    fishMaps=new Array(fishl1Map,fishl2Map,fishr1Map,fishr2Map);
    var fish=new Fish(screenWidth/2,screenHeight/2,fishMaps[0]);
    fishList.push(fish);
}

function fishAct() {
    for(var i in fishList) {
        var fish=fishList[i];
        fish.fishAct();
    }
}

function fishMove(code) {
    for(i in  fishList) {
        var fish=fishList[i];
        if(code==38||code==87)
            fish.fish.y-=fish.fish.udSpeed;
        if(code==40||code==83)
            fish.fish.y+=fish.fish.udSpeed;
        if(code==39||code==68) {
            if(fish.fish.lr==0)
                fish.fish.lr=1;
            fish.fish.x+=fish.fish.lrSpeed;
        }
        if(code==37||code==65) {
            if(fish.fish.lr==1)
                fish.fish.lr=0;
            fish.fish.x-=fish.fish.lrSpeed;
        }
    }
}

function Fish(x,y,img) {
    this.fish={
        id:1,
        x:x,
        y:y,
        lr:0,
        level:1,
        lrSpeed:12,
        udSpeed:6,
        picture:img,
        width:0,
        height:0
    };
    this.checkLevel;
    var iw=this.fish.width+6;
    var ih=this.fish.height+4;
    var ix=x-iw/2;
    var iy=y-ih/2;
    return this;
}
Fish.prototype.fishAct=function() {
    var fish=this.fish;
    this.checkOut();
    if(fish.lr==0)
        fish.picture=(frame==0?fishMaps[0]:fishMaps[1]);
    else if(fish.lr==1)
        fish.picture=(frame==0?fishMaps[2]:fishMaps[3]);
    this.checkLevelUp();
    this.checkLevel();
    var iw=fish.width+6;
    var ih=fish.height+4;
    var ix=fish.x-iw/2;
    var iy=fish.y-ih/2;
    this.drawFish(ix,iy,iw,ih);
}
Fish.prototype.checkOut=function() {
    var fish=this.fish;
    if(fish.x>screenWidth)
        fish.x=screenWidth;
    if(fish.x<0)
        fish.x=0;
    if(fish.y>screenHeight)
        fish.y=screenHeight;
    if(fish.y<0)
        fish.y=0;
}
Fish.prototype.drawFish=function(ix,iy,iw,ih) {
    var fish=this.fish;
    var fid="fish_"+fish.id;
    drawSizeImg(fid,scr,fish.picture,ix,iy,iw,ih);
}
Fish.prototype.checkLevelUp=function() {
    var fish=this.fish;
    if(score<5)
        fish.level=1;
    else if(score<15)
        fish.level=2;
    else if(score<30)
        fish.level=3;
    else if(score<50)
        fish.level=4;
    else if(score<100)
        fish.level=5;
    else if(score<200)
        fish.level=7;
    else if(score>=200)
        fish.level=8;
}
Fish.prototype.eat=function() {
    var fish=this.fish;
    var id="fish_"+fish.id;
    var width=fish.width+18;
    var height=fish.height+10;
    var ix=fish.x-width/2;
    var iy=fish.y-height/2;
    drawSizeImg(id,scr,fish.picture,ix,iy,width,height);
}
Fish.prototype.checkLevel=function() {
    var fish=this.fish;
    if(fish.level==1) {
        fish.width=37;
        fish.height=14;
    } else if(fish.level==2) {
        fish.width=46;
        fish.height=17;
    } else if(fish.level==3) {
        fish.width=60;
        fish.height=20;
    } else if(fish.level==4) {
        fish.width=70;
        fish.height=25;
    } else if(fish.level==5) {
        fish.width=81;
        fish.height=31;
    } else if(fish.level==6) {
        fish.width=93;
        fish.height=35;
    } else if(fish.level==7) {
        fish.width=102;
        fish.height=38;
    } else if(fish.level==8) {
        fish.width=116;
        fish.height=42;
    }
}
