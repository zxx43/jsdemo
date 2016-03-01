var resDiv=document.getElementById("res");

function loadRes() {
    var imgs=["img/bomb_01.gif",
            "img/balloon1.gif",
            "img/bricks2.gif",
            "img/dart.gif",
            "img/explosion.gif"];
    var sx=screenWidth+200;
    var width=100;
    var y=100;
    for(i=0;i<imgs.length;i++) {
        var x=sx+width*i;
        var html="<img src='"+imgs[i]+"'" +
            " style='position:absolute;left:"+x+";top:"+y+";'/>";
        resDiv.innerHTML+=html;
    }
}