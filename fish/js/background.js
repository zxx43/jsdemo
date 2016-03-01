var screenHeight=document.body.clientHeight;
var screenWidth=document.body.clientWidth;
var frame=0;
var score=0;

function drawScore() {
    var sy=20;
    var sx=screenWidth/2-50;
    var color="blue";
    var text="<h2 style='position: absolute;color: blue;" +
        "left:"+sx+";top:"+sy+";'>\u5F97\u5206:"+score+"</h2>";
    scoreDiv.innerHTML=text;
}

function initBack() {
    var bgHTML="<img src='img/sea.gif' style='position: absolute;top: 0;left: 0;" +
        "width:"+screenWidth+" ;height:"+screenHeight+" ;'/>";
    seaDiv.innerHTML=bgHTML;

    var lh=51;
    var ly=screenHeight-lh;
    var ldHTML="<img src='img/oceanland.gif' style='position: absolute;left: 0;" +
        "top:"+ly+";width:"+screenWidth+" ;height:"+lh+" ;'/>"
    landDiv.innerHTML=ldHTML
}