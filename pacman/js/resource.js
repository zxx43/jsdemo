function loadRes() {
    var imgs=[TILE_IMG,BALL_IMG,POWER_IMG,
        GHOST_ATE_IMG,GHOST_G_IMG,GHOST_P_IMG,GHOST_R_IMG,GHOST_W_IMG,GHOST_Y_IMG,
        PAC_IMG,PAC_DOWN,PAC_LEFT,PAC_RIGHT,PAC_UP];
    var dis=2;
    var sx=screenWidth/2-(TILE_WIDTH+dis)*imgs.length/2;
    var y=30;

    for(i=0;i<imgs.length;i++) {
        var x=sx+(TILE_WIDTH+dis)*i;
        var html="<img src='"+imgs[i]+"' " +
            "style='position:absolute;left="+x+";top="+y+";' />";
        resDiv.innerHTML+=html;
    }
}