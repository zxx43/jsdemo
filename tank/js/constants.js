var screenWidth=document.body.clientWidth;
var screenHeight=document.body.clientHeight;

var TILE_WIDTH=32;
var TILE_HEIGHT=32;

var SPX=screenWidth/2-(map[0].length/2)*TILE_WIDTH;
var SPY=screenHeight/2-(map.length/2)*TILE_HEIGHT;
var SCX=screenWidth/2-(map[0].length/2)*TILE_WIDTH+TILE_WIDTH/2;
var SCY=screenHeight/2-(map.length/2)*TILE_HEIGHT+TILE_HEIGHT/2;

var NONE=0;
var LEFT=1;
var RIGHT=2;
var UP=3;
var DOWN=4;

var IMG_PLAYER="img/player_tank.gif";
var IMG_TILES="img/tiles.gif";
var IMG_BOOM="img/boom.gif";
var IMG_ENIMY_TANK="img/enimy_tank.gif";
var IMG_ENIMY_APC="img/enimy_apc.gif";
var IMG_BULLET="img/bullet.gif";
var SUD_FIRE="sound/gunfire.wav";
var SUD_BANG="sound/Bang.wav";
var SUD_OVER="sound/gameover.wav";

var BACK_DIV=document.getElementById("back");
var GRASS_DIV=document.getElementById("grass");
var BRICK_DIV=document.getElementById("brick");
var CHARA_DIV=document.getElementById("chara");
var ENEMY_DIV=document.getElementById("enemy");
var BULLET_DIV=document.getElementById("bullet");
var TEXT_DIV=document.getElementById("text");

var SPD_PLAYER=2;
var SPD_TANK=2;
var SPD_APC=4;
var SPD_BULLET=6;

var BULLET_ENIMY=0;
var BULLET_PLAYER=1;
var TYPE_TANK=0;
var TYPE_APC=1;

var MAX_COUNT=8;
if(window.ActiveXObject)
    MAX_COUNT=6;
var TANK_COUNT=10;

var TANK=null;

var LOAD_TEXT="Loading...";
var START_TEXT="Press Enter";
var OVER_TEXT="Game Over";
var STATE_LOAD=0;
var STATE_START=1;
var STATE_RUN=2;
var STATE_OVER=3;

var SOUND=true;
if(window.ActiveXObject)
    SOUND=false;