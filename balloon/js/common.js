var screenHeight=document.body.clientHeight;
var screenWidth=document.body.clientWidth;
var scr=document.getElementById("screen");

function drawScore() {
    var x=screenWidth/2-50;
    var y=20;
    var html="<div style='position:absolute;" +
        "left:"+x+";top:"+y+";'><h2 style='color:red;'>score:"+score+"</h2></div>"
    scr.innerHTML+=html;
}

function clearWindow(){
    scr.innerHTML="";
}