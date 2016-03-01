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
        curImg.src=img;
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