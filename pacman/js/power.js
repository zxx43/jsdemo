var POWER_IMG="img/power.gif";
var powers=new Array();

function Power(id,x,y) {
    this.power={
        id:id,
        x:x,
        y:y
    };
    this.time=PWD_TIME;
}

Power.prototype.draw=function(div,img) {
    var id=this.power.id;
    var x=this.power.x-TILE_WIDTH/2;
    var y=this.power.y-TILE_HEIGHT/2;
    var html="<img id='power_"+id+"' " +
        "src='"+img+"' style='position: absolute;" +
        "left:"+x+";" +
        "top:"+y+";' />"
    div.innerHTML+=html;
}

Power.prototype.powerAte=function(div) {
    var id=this.power.id;
    var powerEl=document.getElementById("power_"+id);
    div.removeChild(powerEl);
    for(i=0;i<powers.length;i++) {
        var power=powers[i];
        var idc=power.power.id;
        if(idc==id)
            powers.splice(i,1);
    }
}

function initPowers(screenWidth,screenHeight,map) {
    for(i=0;i<map[0].length;i++) {
        for(j=0;j<map.length;j++) {
            if(map[j][i]==3) {
                var power=new Power(powers.length,SCX+i*TILE_WIDTH,SCY+j*TILE_HEIGHT);
                powers.push(power);
            }
        }
    }
}

var powerState=0;
var powerNow=0;
function drawPowers(div,img) {
    if(powerNow<powers.length) {
        var power=powers[powerNow];
        power.draw(div,img);
        powerNow++;
    } else if(powerNow>=powers.length) {
        powerState=1;
    }
    if(powerState==0) {
        setTimeout("drawPowers(actDiv,POWER_IMG)",1);
    }
}

function reInitPower() {
    powers=new Array();
    powerNow=0;
    powerState=0;
}