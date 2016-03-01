var bg=document.getElementById("bgdiv");
var bgtexture;
var bgw;
var bgh;

function initBg() {
    bgtexture=new Image();
    bgtexture.src="img/bricks2.gif";
    bgw=72;
    bgh=bgw;

    setTimeout("drawBg()",10);
}

var state=0;
var tileI=0;
var tileJ=0;
function drawBg() {
    if(tileI<screenWidth/bgw+1) {
        if(tileJ<screenHeight/bgh+1) {
            var bgx=tileI*bgw;
            var bgy=tileJ*bgh;
            bg.innerHTML+=
                "<img src='"+bgtexture.src+"' style='position:absolute;left:"+bgx+";" +
                    "top:"+bgy+";' />";
            tileJ++;
        } else if(tileJ>=screenHeight/bgh+1) {
            tileJ=0;
            tileI++;
        }
    }
    if(tileI>=screenWidth/bgw+1)
        state=1;
    if(state==0)
        setTimeout("drawBg()",10);
}