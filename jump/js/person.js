function Person(px,py) {
    this.x=px;
    this.y=py;
    this.nextY=this.y;
    this.lrState=NONE;
    this.udState=NONE;
    this.item=TYPE_BRICK;
    this.maxHP=10;
    this.hp=this.maxHP;
    this.die=false;
    this.id=PID;
    this.img=IMG_PERSON;
    this.lrSpd=0;
    this.udSpd=0;
}

Person.prototype.control=function(dist) {
    this.lrState=dist;
};

Person.prototype.render=function(frame) {
    this.cartoonAct(frame);
    drawImg(this.id,PER_DIV,this.img,(this.x-PER_WIDTH/2),(this.y-PER_HEIGHT/2));
};

Person.prototype.moveAct=function() {
    if(this.lrState==LEFT)
        this.lrSpd=-PER_LR_SPD;
    else if(this.lrState==RIGHT)
        this.lrSpd=PER_LR_SPD;
    else if(this.lrState==NONE)
        this.lrSpd=0;

    if(this.item==TYPE_SCROLL_L)
        this.lrSpd-=SCROLL_SPD;
    else if(this.item==TYPE_SCROLL_R)
        this.lrSpd+=SCROLL_SPD;
    else if(this.item==TYPE_BRICK_LEFT)
        this.lrSpd-=BRICK_SPD;
    else if(this.item==TYPE_BRICK_RIGHT)
        this.lrSpd+=BRICK_SPD;

    this.x+=this.lrSpd;

    if(this.x<0)
        this.x=0;
    else if(this.x>SCR_WIDTH)
        this.x=SCR_WIDTH;
};

Person.prototype.downAct=function() {
    if(this.item==TYPE_NONE) {
        if(this.udSpd>=CAM_SPD)
            this.udState=DOWN;
        else if(this.udSpd<CAM_SPD)
            this.udState=UP;
        this.fall();
    } else if(this.item==TYPE_BRICK
        ||this.item==TYPE_BRICK_LEFT
        ||this.item==TYPE_BRICK_RIGHT) {
        this.nextY-=CAM_SPD;
        this.udSpd=-CAM_SPD;
        this.udState=NONE;
    } else if(this.item==TYPE_FALLEN) {
        this.nextY-=CAM_SPD;
        this.udSpd=-CAM_SPD;
        this.udState=NONE;
    } else if(this.item==TYPE_SCROLL_L||this.item==TYPE_SCROLL_R) {
        this.nextY-=CAM_SPD;
        this.udSpd=-CAM_SPD;
        this.udState=NONE;
    } else if(this.item==TYPE_SPRING) {
        this.nextY-=CAM_SPD;
        this.udSpd=-CAM_SPD;
        this.udState=NONE;
    } else if(this.item==TYPE_SPRING_UP) {
        this.nextY-=(CAM_SPD+SPRING_SPD);
        this.udSpd=-(CAM_SPD+SPRING_SPD);
        this.udState=UP;
    } else if(this.item==TYPE_SPINE) {
        this.nextY-=CAM_SPD;
        this.udSpd=-CAM_SPD;
        this.udState=NONE;
    }
};

Person.prototype.fall=function() {
    this.nextY+=this.udSpd;
    if(this.udSpd<MAX_D_SPD)
        this.udSpd+=GRAVITY;
};

Person.prototype.toY=function() {
    this.y=this.nextY;
};

Person.prototype.setItem=function(item) {
    this.item=item;
};

Person.prototype.recover=function() {
    if(!this.die&&this.hp<this.maxHP)
        this.hp++;
};

Person.prototype.checkKill=function() {
    if(!this.die) {
        if(this.hp<=0) {
            this.die=true;
            eraseImg(this.id,PER_DIV);
        } else if(this.y>SCR_HEIGHT+100) {
            this.die=true;
            eraseImg(this.id,PER_DIV);
        } else if(this.y<PER_HEIGHT/2) {
            this.hp-=this.maxHP/2;
            if(canPlay)
                initSound(SUD_SPIK,2);
            this.udSpd=CAM_SPD;
            this.y=PER_HEIGHT/2+CAM_SPD;
            this.udState=DOWN;
            this.item=TYPE_NONE;
        }
    }
};

Person.prototype.cartoonAct=function(frame) {
    if(this.udState==NONE) {
        if(this.lrState==NONE)
            this.img=IMG_PERSON;
        else if(this.lrState==LEFT) {
            if(frame<MAX_FRAME/4)
                this.img=IMG_PERSON_RL1;
            else if(frame<2*MAX_FRAME/4)
                this.img=IMG_PERSON_RL3;
            else if(frame<3*MAX_FRAME/4)
                this.img=IMG_PERSON_RL2;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_RL3;
        } else if(this.lrState==RIGHT) {
            if(frame<MAX_FRAME/4)
                this.img=IMG_PERSON_RR1;
            else if(frame<2*MAX_FRAME/4)
                this.img=IMG_PERSON_RR3;
            else if(frame<3*MAX_FRAME/4)
                this.img=IMG_PERSON_RR2;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_RR3;
        }
    } else if(this.udState==DOWN) {
        if(this.lrState==NONE) {
            if(frame<MAX_FRAME/2)
                this.img=IMG_PERSON_F1;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_F2;
        } else if(this.lrState==LEFT) {
            if(frame<MAX_FRAME/2)
                this.img=IMG_PERSON_FL1;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_FL2;
        } else if(this.lrState==RIGHT) {
            if(frame<MAX_FRAME/2)
                this.img=IMG_PERSON_FR1;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_FR2;
        }
    } else if(this.udState==UP) {
        if(this.lrState==NONE) {
            if(frame<MAX_FRAME/2)
                this.img=IMG_PERSON_U;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_F1;
        } else if(this.lrState==LEFT) {
            if(frame<MAX_FRAME/2)
                this.img=IMG_PERSON_UL;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_FL1;
        } else if(this.lrState==RIGHT) {
            if(frame<MAX_FRAME/2)
                this.img=IMG_PERSON_UR;
            else if(frame<MAX_FRAME)
                this.img=IMG_PERSON_FR1;
        }
    }
};