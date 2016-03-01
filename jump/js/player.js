var sud=document.getElementById("sound");
var sid;
var soundList=new Array();

function Sound(src,time) {
    var played=0;
    this.sound={id:sid,src:src,pt:played,time:time};
}

function initSound(src,time) {
    var html="<div id=sud"+sid+"></div>";
    sud.innerHTML+=html;
    initSud(src,time);
    sid++;
    if(sid>100)
	sid=0;
}

function initSud(src,time) {
    var div=document.getElementById("sud"+sid);
    var html="";
    if(window.ActiveXObject)
        html="<embed src='"+src+"'"+
            " hidden='true' type='audio/mpeg'"+
            " loop=0></embed> ";
    else
        html="<audio autoplay='autoplay'>"
            +"<source src='"+src+"' type='audio/mpeg'/>"
            +"</audio>";
    div.innerHTML=html;
    var sund=new Sound(src,time);
    soundList.push(sund);
}

function playSound() {
    for(var i=0;i<soundList.length;i++) {
        var sund=soundList[i];
        sund.sound.pt++;
        if(sund.sound.pt>sund.sound.time) {
            if(document.getElementById("sud"+sund.sound.id)!=null)
                sud.removeChild(document.getElementById("sud"+sund.sound.id));
            soundList.splice(i,1);
        }
    }
}