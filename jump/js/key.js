var dist=NONE;
var restart=false;

function checkKey(code,isInit) {
    if(code!=-1&&isInit) {
        if(code==37) {
            dist=LEFT;
        } else if(code==39) {
            dist=RIGHT;
        }
    }
}

function checkRelease(code) {
    if(code!=-1) {
        if(code!=32)
            dist=NONE;
    }
}