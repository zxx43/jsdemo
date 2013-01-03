var fishMaps;
var fishList=new Array();

function initFish() {
    var fishl1Map=new Image();
    var fishl2Map=new Image();
    var fishr1Map=new Image();
    var fishr2Map=new Image();
    fishl1Map.src="img/fish_l1.gif";
    fishl2Map.src="img/fish_l2.gif";
    fishr1Map.src="img/fish_r1.gif";
    fishr2Map.src="img/fish_r2.gif";
    fishMaps=new Array(fishl1Map,fishl2Map,fishr1Map,fishr2Map);
    var fish=new Fish(screenWidth/2,screenHeight/2,fishMaps[0]);
    fishList.push(fish);
}

function fishAct() {
    for(i in fishList) {
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
    this.fish={x:x,y:y,lr:0,level:1,lrSpeed:12,udSpeed:6,picture:img,width:0,height:0};
    this.checkLevel;
    this.fish.picture.style.position="absolute";
    this.fish.picture.style.width=this.fish.width+6;
    this.fish.picture.style.height=this.fish.height+4;
    this.fish.picture.style.left=x-parseInt(this.fish.picture.style.width)/2;
    this.fish.picture.style.top=y-parseInt(this.fish.picture.style.height)/2;
    scr.appendChild(this.fish.picture);
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
    fish.picture.style.position="absolute";
    fish.picture.style.width=fish.width+6;
    fish.picture.style.height=fish.height+4;
    fish.picture.style.left=fish.x-parseInt(fish.picture.style.width)/2;
    fish.picture.style.top=fish.y-parseInt(fish.picture.style.height)/2;
    this.drawFish();
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
Fish.prototype.drawFish=function() {
    var fish=this.fish;
    var src=fish.picture.src;
    var pos=fish.picture.style.position;
    var width=fish.picture.style.width;
    var height=fish.picture.style.height
    var left=fish.picture.style.left;
    var top=fish.picture.style.top;
    var html="<img src='"+src+"' style='position: "+pos+";width: "+width+";height: "+height+";left: "+left+";top: "+top+"'>";
    scr.innerHTML+=html;
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
    var width=fish.picture.style.width;
    var height=fish.picture.style.height;
    fish.picture.style.width=parseInt(width)+12;
    fish.picture.style.height=parseInt(height)+6;
    fish.picture.style.left=fish.x-parseInt(fish.picture.style.width)/2;
    fish.picture.style.top=fish.y-parseInt(fish.picture.style.height)/2;
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
