var mode=0;

function drawMenu() {
    var title="<h1 style='color: red;'>Balloon</h1>";
    var x=screenWidth/2-120;
    var html="<div style='position: absolute;" +
        "top: 40px;left: "+x+";'>"+title+"</div>";

    var y1=screenHeight/2-80;
    var dis=50;
    var y2=y1+dis;
    var x1=screenWidth/2-100;
    if(state!=0) {
        var mode1="<h3 style='color: blue;'>1.Time Mode</h3> ";
        var mode2="<h3 style='color: blue;'>2.Defend Mode</h3> ";
        var html1="<div style='position: absolute;" +
            "top: "+y1+";left: "+x1+";'>"+mode1+"</div>";
        var html2="<div style='position: absolute;" +
            "top: "+y2+";left: "+x1+";'>"+mode2+"</div>";
        meu.innerHTML+=html+html1+html2;
    } else if(state==0) {
        var load="<h2 style='color: blue;'>Loading...</h2> ";
        var htmlLoad="<div style='position: absolute;" +
            "top: "+y1+";left: "+x1+";'>"+load+"</div>";
        meu.innerHTML+=html+htmlLoad;
    }
}