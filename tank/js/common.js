function drawClip(div,img,cx,cy,ix,iy) {
    var top=cy*TILE_HEIGHT;
    var bottom=(cy+1)*TILE_HEIGHT;
    var left=cx*TILE_WIDTH;
    var right=(cx+1)*TILE_WIDTH;
    var imgX=ix-left;
    var imgY=iy-top;
    var html="<img src='"+img+"' " +
        "style='position: absolute;" +
        "left: "+imgX+";top:"+imgY+" ;" +
        "clip: rect("+top+","+right+","+bottom+","+left+");'/>";
    div.innerHTML+=html;
}

function createClip(id,div,img,cx,cy,ix,iy) {
    var top=cy*TILE_HEIGHT;
    var bottom=(cy+1)*TILE_HEIGHT;
    var left=cx*TILE_WIDTH;
    var right=(cx+1)*TILE_WIDTH;
    var imgX=ix-left;
    var imgY=iy-top;
    var html="<img id='"+id+"' src='"+img+"' " +
        "style='position: absolute;" +
        "left: "+imgX+";top:"+imgY+" ;" +
        "clip: rect("+top+","+right+","+bottom+","+left+");'/>";
    return html;
}

function drawClipImg(id,div,img,cx,cy,ix,iy) {
    var curImg=document.getElementById(id);
    if(curImg==null) {
        div.innerHTML+=createClip(id,div,img,cx,cy,ix,iy)
    } else if(curImg!=null) {
        var top=cy*TILE_HEIGHT;
        var bottom=(cy+1)*TILE_HEIGHT;
        var left=cx*TILE_WIDTH;
        var right=(cx+1)*TILE_WIDTH;
        var imgX=ix-left;
        var imgY=iy-top;
        curImg.style.left=imgX;
        curImg.style.top=imgY;
        curImg.style.clip="rect("+top+","+right+","+bottom+","+left+")";
    }
}

function drawIdClip(id,div,img,cx,cy,ix,iy) {
    var top=cy*TILE_HEIGHT;
    var bottom=(cy+1)*TILE_HEIGHT;
    var left=cx*TILE_WIDTH;
    var right=(cx+1)*TILE_WIDTH;
    var imgX=ix-left;
    var imgY=iy-top;
    var html="<img id='"+id+"' src='"+img+"' " +
        "style='position: absolute;" +
        "left: "+imgX+";top:"+imgY+" ;" +
        "clip: rect("+top+","+right+","+bottom+","+left+");'/>";
    div.innerHTML+=html;
}

function draw(div,img,x,y) {
    var html="<img src='"+img+"' " +
        "style='position: absolute;" +
        "left:"+x+" ;top:"+y+" ;'/>";
    div.innerHTML+=html;
}

function drawImg(id,div,img,x,y) {
    var curImg=document.getElementById(id);
    if(curImg==null) {
        div.innerHTML+=createImg(id,div,img,x,y);
    } else if(curImg!=null) {
        curImg.style.left=x;
        curImg.style.top=y;
    }
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

function clearWindow() {}

function refresh() {
    BRICK_DIV.innerHTML="";
    CHARA_DIV.innerHTML="";
    ENEMY_DIV.innerHTML="";
    BULLET_DIV.innerHTML="";
}

function drawText(state) {
    var tx=screenWidth/2-80;
    var ty=screenHeight/2-20;
    var text="";
    var color="green";
    if(state==STATE_LOAD)
        text=LOAD_TEXT;
    else if(state==STATE_START) {
        text=START_TEXT;
        color="red";
    } else if(state==STATE_OVER) {
        text=OVER_TEXT;
        color="red";
    }
    TEXT_DIV.innerHTML="<h1 style='position: absolute;" +
        "left:"+tx+";" +
        "top:"+ty+";" +
        "color: "+color+";'>"+text+"</h1>";
}

function clearText() {
    if(TEXT_DIV.innerHTML!="")
        TEXT_DIV.innerHTML="";
}

function collision(x,y,l,r,u,d) {
    if(x>l&&x<r&&y>u&&y<d)
        return true;
    return false;
}

function contain(list,is) {
    for(var i=0;i<list.length;i++) {
        if(list[i]==is)
            return true;
    }
    return false;
}