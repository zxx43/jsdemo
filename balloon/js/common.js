var screenHeight=document.body.clientHeight;
var screenWidth=document.body.clientWidth;
var scr=document.getElementById("screen");
var sco=document.getElementById("score");
var meu=document.getElementById("menu");

function drawScore() {
    var x=screenWidth/2-50;
    var y=20;
    var html="<div style='position:absolute;" +
        "left:"+x+";top:"+y+";'><h2 style='color:red;'>score:"+score+"</h2></div>"
    sco.innerHTML+=html;
}

function drawImg(id,div,img,x,y) {
    var curImg=document.getElementById(id);
    if(curImg==null) {
        div.innerHTML+=createImg(id,div,img,x,y);
    } else if(curImg!=null) {
        curImg.src=img;
        curImg.style.left=x;
        curImg.style.top=y;
    }
}

function drawSizeImg(id,div,img,x,y,w,h) {
    var curImg=document.getElementById(id);
    if(curImg==null) {
        div.innerHTML+=createSizeImg(id,div,img,x,y,w,h);
    } else if(curImg!=null) {
        curImg.src=img;
        curImg.style.left=x;
        curImg.style.top=y;
        curImg.style.width=w;
        curImg.style.height=h;
    }
}

function createSizeImg(id,div,img,x,y,w,h) {
    var html="<img id='"+id+"' src='"+img+"' " +
        "style='position: absolute;" +
        "left:"+x+" ;top:"+y+" ;" +
        "width:"+w+";height:"+h+";'/>";
    return html;
}

function createImg(id,div,img,x,y) {
    var html="<img id='"+id+"' src='"+img+"' " +
        "style='position: absolute;" +
        "left:"+x+" ;top:"+y+" ;'/>";
    return html;
}

function eraseImg(id,div) {
    var imgToErase=document.getElementById(id);
    if(imgToErase!=null)
        div.removeChild(imgToErase);
}

function clearWindow(){
    sco.innerHTML="";
    meu.innerHTML="";
}