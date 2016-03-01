var bricks=new Array();

function Brick(id,x,y) {
    this.brick={
        id:id,
        x:x,
        y:y
    };
}

Brick.prototype.draw=function(id) {
    var brick=this.brick;
    var bx=brick.x-TILE_WIDTH/2;
    var by=brick.y-TILE_HEIGHT/2;
    drawIdClip(id,BRICK_DIV,IMG_TILES,0,0,bx,by);
}

function initBrick(screenWidth,screenHeight,map) {
    var bid=0;
    for(var i=0;i<map[0].length;i++) {
        for(var j=0;j<map.length;j++) {
            var type=map[j][i];
            if(type==0) {
                var brick=new Brick(bid,SCX+i*TILE_WIDTH,SCY+j*TILE_HEIGHT);
                bricks.push(brick);
                bid++;
            }
        }
    }
}

var brickState=0;
var brickNow=0;
function drawBricks() {
    if(brickNow<bricks.length) {
        var brick=bricks[brickNow];
        var id="br_"+brick.brick.id;
        brick.draw(id);
        brickNow++;
    } else if(brickNow>=bricks.length) {
        brickState=1;
    }
    if(brickState==0)
        setTimeout("drawBricks()",1);
}