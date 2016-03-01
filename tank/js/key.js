var dist=NONE;
var fireing=false;
var state=STATE_LOAD;
var restart=false;

function checkKey(code,isInit) {
    if(code!=-1&&isInit) {
        if(code==38) {
            dist=UP;
        } else if(code==40) {
            dist=DOWN;
        } else if(code==37) {
            dist=LEFT;
        } else if(code==39) {
            dist=RIGHT;
        } else if(code==32) {
            fireing=true;
        } else if(code==13) {
            if(state==STATE_START)
                state=STATE_RUN;
            else if(state==STATE_OVER)
                restart=true;
        }
    }
}

function checkRelease(code) {
    if(code!=-1) {
        if(code!=32)
            dist=NONE;
        else if(code==32) {
            fireing=false;
        }
    }
}