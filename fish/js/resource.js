var resDiv=document.getElementById("res");

function loadRes() {
    var imgs=new Array();
    for(i=0;i<fishMaps.length;i++) {
        var fishMap=fishMaps[i].src;
        imgs.push(fishMap);
    }
    for(i=0;i<enimy1Maps.length;i++) {
        var enimMap=enimy1Maps[i].src;
        imgs.push(enimMap);
    }
    for(i=0;i<enimy2Maps.length;i++) {
        var enimMap=enimy2Maps[i].src;
        imgs.push(enimMap);
    }
    for(i=0;i<enimy3Maps.length;i++) {
        var enimMap=enimy3Maps[i].src;
        imgs.push(enimMap);
    }
    for(i=0;i<enimy4Maps.length;i++) {
        var enimMap=enimy4Maps[i].src;
        imgs.push(enimMap);
    }
    for(i=0;i<grass1Map.length;i++) {
        var grassMap=grass1Map[i].src;
        imgs.push(grassMap);
    }
    for(i=0;i<grass2Map.length;i++) {
        var grassMap=grass2Map[i].src;
        imgs.push(grassMap);
    }
    for(i=0;i<grass3Map.length;i++) {
        var grassMap=grass3Map[i].src;
        imgs.push(grassMap);
    }

    var sx=screenWidth+400;
    var sy=0;
    var disx=180;
    var disy=120;
    var cols=4;
    for(i=0;i<cols;i++) {
        for(j=0;j<imgs.length/cols;j++) {
            var x=sx+i*disx;
            var y=sy+j*disy;
            var imgId=j*cols+i;
            var html="<img src='"+imgs[imgId]+"' " +
                "style='position:absolute;left:"+x+";top:"+y+";'/>";
            resDiv.innerHTML+=html;
        }
    }

}