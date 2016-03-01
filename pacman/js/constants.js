var screenWidth=document.body.clientWidth;
var screenHeight=document.body.clientHeight;

var backDiv=document.getElementById("back");
var actDiv=document.getElementById("act");
var charaDiv=document.getElementById("chara");
var ghostDiv=document.getElementById("ghost");
var resDiv=document.getElementById("res");
var textDiv=document.getElementById("text");

var loadText="<h1 style='color: pink;'>Loading...</h1>";
var startText="<h1 style='color:red;'>Press Enter</h1>";

var NONE=0;
var UP=1;
var DOWN=2;
var LEFT=3;
var RIGHT=4;

var TILE_WIDTH=16;
var TILE_HEIGHT=16;

var SPX=screenWidth/2-(map[0].length/2)*TILE_WIDTH;
var SPY=screenHeight/2-(map.length/2)*TILE_HEIGHT;
var SCX=screenWidth/2-(map[0].length/2)*TILE_WIDTH+TILE_WIDTH/2;
var SCY=screenHeight/2-(map.length/2)*TILE_HEIGHT+TILE_HEIGHT/2;

var PAC_IMG="img/pacman_2.gif";
var PAC_UP="img/pacman_u.gif";
var PAC_DOWN="img/pacman_d.gif";
var PAC_LEFT="img/pacman_l.gif";
var PAC_RIGHT="img/pacman_r.gif";

var GHOST_R_IMG="img/ghost_r.gif";
var GHOST_Y_IMG="img/ghost_y.gif";
var GHOST_G_IMG="img/ghost_g.gif";
var GHOST_P_IMG="img/ghost_p.gif";
var GHOST_W_IMG="img/ghost_w.gif";
var GHOST_ATE_IMG="img/ghost_e.gif";

var SPD_GHO=1;
var SPD_PAC=1;
if(window.ActiveXObject) {
    SPD_GHO=2;
    SPD_PAC=2;
}

var DANGE_DIST=5;
var PWD_TIME=500;
if(window.ActiveXObject) {
    PWD_TIME=300;
}

var explx=1;
var exprx=27;
var expy=12;
