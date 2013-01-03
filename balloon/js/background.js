var bg=document.getElementById("bgdiv");
var bgtexture;
var bgw;
var bgh;

function initBg() {
    bgtexture=new Image();
    bgtexture.src="img/bricks2.gif";
    bgw=72;
    bgh=bgw;
    drawBg();
}

function drawBg() {
    for(var i=0;i<screenWidth/bgw+1;i++) {
        for(var j=0;j<screenHeight/bgh+1;j++) {
            var bgx=i*bgw;
            var bgy=j*bgh;
            bg.innerHTML+=
                "<img src='"+bgtexture.src+"' style='position:absolute;left:"+bgx+";" +
                    "top:"+bgy+";' />";
        }
    }
}