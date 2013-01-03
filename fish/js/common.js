var bgs=document.getElementById("bgs");
var scr=document.getElementById("screen");


function clearWindow(){
    scr.innerHTML="";
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
