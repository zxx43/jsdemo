var screenHeight=document.body.clientHeight;
var screenWidth=document.body.clientWidth;
var frame=0;
var score=0;
var bgmap;
var sealand;

function drawScore() {
    var scoreBord=document.createElement("div");
    scoreBord.style.position="absolute";
    scoreBord.style.top=20;
    scoreBord.style.left=screenWidth/2-50;
    scoreBord.style.color="blue";
    scoreBord.innerHTML="\u5F97\u5206:"+score;
    scr.appendChild(scoreBord);
}

function initBack() {
    bgmap=new Image();
    bgmap.src="img/sea.gif";
    bgmap.style.position="absolute";
    bgmap.style.top=0;
    bgmap.style.left=0;
    bgmap.style.width=screenWidth;
    bgmap.style.height=screenHeight;

    sealand=new Image();
    sealand.src="img/oceanland.gif";
    sealand.style.position="absolute";
    sealand.style.left=0;
    sealand.height=51;
    sealand.style.top=screenHeight-sealand.height;
    sealand.style.width=screenWidth;
}