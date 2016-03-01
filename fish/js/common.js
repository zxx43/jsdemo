var scr=document.getElementById("screen");
var g_back=document.getElementById("grass_back");
var g_front=document.getElementById("grass_front");
var scoreDiv=document.getElementById("score");
var seaDiv=document.getElementById("sea_img");
var landDiv=document.getElementById("land_img");

function clearWindow() {}

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

function checkCrash(obj1,obj2) {
    var o1RightX=obj1[0];
    var o1LeftX=obj1[1];
    var o1TopY=obj1[2];
    var o1ButtonY=obj1[3];
    var o2RightX=obj2[0];
    var o2LeftX=obj2[1];
    var o2TopY=obj2[2];
    var o2ButtonY=obj2[3];
    var crash=false;
    if(o1RightX>o2LeftX&&o1RightX<o2RightX&&o1ButtonY>o2TopY&&o1ButtonY<o2ButtonY)
        crash=true;
    if(o1RightX>o2LeftX&&o1RightX<o2RightX&&o1TopY>o2TopY&&o1TopY<o2ButtonY)
        crash=true;
    if(o1LeftX>o2LeftX&&o1LeftX<o2RightX&&o1ButtonY>o2TopY&&o1ButtonY<o2ButtonY)
        crash=true;
    if(o1LeftX>o2LeftX&&o1LeftX<o2RightX&&o1TopY>o2TopY&&o1TopY<o2ButtonY)
        crash=true;
    return crash;
}
