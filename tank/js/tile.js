var tiles=new Array();

function Tile(type,x,y) {
    this.tile={
        type:type,
        x:x,
        y:y
    };
}

Tile.prototype.draw=function() {
    var tile=this.tile;
    var tx=tile.x-TILE_WIDTH/2;
    var ty=tile.y-TILE_HEIGHT/2;
    if(tile.type==2)
        drawClip(GRASS_DIV,IMG_TILES,tile.type,0,tx,ty);
    else
        drawClip(BACK_DIV,IMG_TILES,tile.type,0,tx,ty);
}

function initTiles(screenWidth,screenHeight,map) {
    for(i=0;i<map[0].length;i++) {
        for(j=0;j<map.length;j++) {
            var type=map[j][i];
            if(type!=-1&&type!=0) {
                var tile=new Tile(type,SCX+i*TILE_WIDTH,SCY+j*TILE_HEIGHT);
                tiles.push(tile);
            }
        }
    }
}

var tileState=0;
var tileNow=0;
function drawTiles() {
    if(tileNow<tiles.length) {
        var tile=tiles[tileNow];
        tile.draw();
        tileNow++;
    } else if(tileNow>=tiles.length) {
        tileState=1;
    }
    if(tileState==0)
        setTimeout("drawTiles()",1);
}