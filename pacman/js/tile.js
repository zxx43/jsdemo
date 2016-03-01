var TILE_IMG="img/brick.gif";
var tiles=new Array();

function Tile(x,y) {
    this.tile={
        x:x,
        y:y
    }
}

Tile.prototype.draw=function(div,img) {
    var x=this.tile.x-TILE_WIDTH/2;
    var y=this.tile.y-TILE_HEIGHT/2;
    var html="<img src='"+img+"' style='position: absolute;" +
        "left:"+x+";" +
        "top:"+y+";' />"
    div.innerHTML+=html;
}

function initTiles(screenWidth,screenHeight,map) {
    for(i=0;i<map[0].length;i++) {
        for(j=0;j<map.length;j++) {
            if(map[j][i]==1) {
                var tile=new Tile(SCX+i*TILE_WIDTH,SCY+j*TILE_HEIGHT);
                tiles.push(tile);
            }
        }
    }
}

var tileState=0;
var tileNow=0;
function drawTiles(div,img) {
    if(tileNow<tiles.length) {
        var tile=tiles[tileNow];
        tile.draw(div,img);
        tileNow++;
    } else if(tileNow>=tiles.length) {
        tileState=1;
    }
    if(tileState==0)
        setTimeout("drawTiles(backDiv,TILE_IMG)",1);
}