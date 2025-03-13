class Crino extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'Crino1','Crino'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Crino_width'), data.getData('Crino_height'));
        
        this.subType = subtype;
        //this.anims.play('Wriggle1');
        super.healthly = 15;
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(5, 6);
        this.healthly = 1470;
        this.isDrop = false;
        this.isDestory = false;
        this.isEmeny = true;
        this.isDone = false;
        this.isFirst = true
        this.previousBehavior =this.behavior;
        this.behaviors = ['DoubleTwirlFanType', 'ShootBlueFan_ShootRedFanType', 'iceGenerate1'];
        this.current = 0;
        this.isSecondState = false;
        this.isSecondSprawn = false
    }

    update(time, delta){
        super.update(time, delta);
        if(this.isDrop)
            return
        if(this.isMoveExit){
            this.setTexture('crinoflyRight1')
            super.Level1BossMoveRight();
            return;
        }
        if(this.isFirst){
            this.behavior = 'iceGenerate1'
            this.previousBehavior =this.behavior;
            if(!this.moveTo(800,270,data.getData('emeny_speed_normal120')))
                return;
            this.isFirst = false
            if(!this.isSecondSprawn)
                this.scene.soundManager.playBGM('level1Final');
        }else if(!this.isSecondState && this.healthly < 320){
            this.isDone = true;
            this.isSecondState = true;
            if(!this.isSecondSprawn)
            {
                this.scene.sprawnScore(316,this);
                this.isSprawnScore = false;
            }
        }
        if(this.isDone){
            this.behavior = this.getBehavior(this.previousBehavior);
            this.previousBehavior =this.behavior;
            this.step = 0;
        }
       
            
        



        this.isDone = false;

        switch(this.behavior){
            case 'DoubleTwirlFanType':
                this.DoubleTwirlFanType();
                break;
            case 'iceGenerate1':
                this.iceGenerate1();
                break;
            case 'ShootBlueFan_ShootRedFanType':
                this.ShootBlueFan_ShootRedFanType();
                break;
            case 'iceGenerate2':
                this.iceGenerate2();
                break;
        }
        

    }
    dropOff(){
        if(!this.isDrop){
            this.setTexture('CrinoHit');
            this.scene.sprawnScore(416,this);
            new Explosion(this.scene, this.x, this.y, 'Large');
            new Explosion(this.scene, this.x +20, this.y+20, 'Large');
            this.isDrop = true;
            this.scene.time.delayedCall(1000, () => {
                this.isDestory = true;
            }, [], this);//step2
        }
        if(this.isDestory){
            super.dropOff(1600,data.getData('emeny_speed_normal150'), data.getData('emeny_speed_normal110'));
        }
    }
    getBehavior() {
        if(this.healthly <= 320)
            return 'iceGenerate2';
        if(this.current >= this.behaviors.length - 1)
            this.current = 0;
        else
            this.current++;
        return this.behaviors[this.current];
    }
    DoubleTwirlFanType(){
        if( this.step == 0 &&this.moveTo(800,270, data.getData('emeny_speed_normal120')) ){
            this.step +=1
            //(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter,speed)
            this.scene.shootingLogic.twirlFanType_ToDirection('blueMediumCircleBullet', 9, 0, 2060, 140, 4,10, 50,   this, data.getData('Bullet_speed_130'));//shooting 
            this.scene.time.delayedCall(1500, () => {
                if(this.isDrop || this.behavior != 'DoubleTwirlFanType')
                    return;
                this.scene.shootingLogic.twirlFanType_ToDirection('redMediumCircleBullet', 9, 0, 2060, 140, 4,10, 50,   this, data.getData('Bullet_speed_130'));//shooting 
            }, [], this);//step2
            this.scene.time.delayedCall(30800, () => this.isDone = true, [], this);//step2
        }
    }
    ShootBlueFan_ShootRedFanType(){
        if( this.step == 0 &&this.moveTo(800,270,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp1()
        }else if( this.step == 2 &&this.moveTo(700,130,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp1()
        }else if( this.step == 4 &&this.moveTo(700,530,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp2()
        }else if( this.step == 6 &&this.moveTo(500,530,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp1()
        }else if( this.step == 8 &&this.moveTo(640,430,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp2()
        }else if( this.step == 10 &&this.moveTo(440,230,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp1()
        }else if( this.step == 12 &&this.moveTo(600,330,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp2()
        }else if( this.step == 14 &&this.moveTo(800,330,data.getData('emeny_speed_normal140')) ){
            this.ShootBlueFan_ShootRedFanTypeHelp1()
            this.scene.time.delayedCall(3000, () => this.isDone = true, [], this);//step2
        }

        
    }
    iceGenerate1(){
        if( this.step == 0 &&this.moveTo(800,270,data.getData('emeny_speed_normal120')) ){
            this.setTexture('CrinoFront')
            // create a ice object
            this.step +=1
            let destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX1',440);
            destructionIce.master =this;
            //destructionIce.behavior = 'iceSelfDestruct1';
            this.scene.time.delayedCall(2400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',170);
                destructionIce.master =this;
            }, [], this);//step2
            
            this.scene.time.delayedCall(5400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 620);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(8400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 820);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(11400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 920);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(14000, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX2',500);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(16000, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX1',300);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(18400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY3',-60, 580);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(20400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 900);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(23400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',300);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(26400, () => {
                if(this.isDrop || this.behavior != 'iceGenerate1')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 720);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(30800, () =>{if(!this || this.isDrop) return;
                 this.setTexture('Crino1'); this.isDone = true}, [], this);//step2
        }
        

    }
    iceGenerate2(){
        if( this.step == 0 &&this.moveTo(690,270,data.getData('emeny_speed_normal120')) ){
            this.setTexture('CrinoFront')
            // create a ice object
            this.step +=1
            let destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY4',660, 900);
            destructionIce.master =this;
            //destructionIce.behavior = 'iceSelfDestruct1';
            this.scene.time.delayedCall(2000, () => {
                if(!this || this.isDrop || this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',170);
                destructionIce.master =this;
            }, [], this);//step2
            
            this.scene.time.delayedCall(4800, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 620);
                destructionIce.master =this;
            }, [], this);//step2

            this.scene.time.delayedCall(7800, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY2',-60, 520);
                destructionIce.master =this;
            }, [], this);//step2
            
            this.scene.time.delayedCall(9800, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY6',660, 920);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(13600, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY5',660, 720);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(16800, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX2',420);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(19800, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX3',120);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(22000, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','ice','iceSelfDestructX1',220);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(24000, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY1',-60, 620);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(27000, () => {
                if(!this ||this.isDrop|| this.behavior != 'iceGenerate2')
                    return;
                destructionIce = this.scene.spawnEmeny(1, 'list', 'DestructionIce','iceTop','iceSelfDestructY5',660, 820);
                destructionIce.master =this;
            }, [], this);//step2
            this.scene.time.delayedCall(30800, () =>{
                if(!this || this.isDrop) return;
                 this.setTexture('Crino1'); this.isDone = true}, [], this);//step2
        }
    }
    ShootBlueFan_ShootRedFanTypeHelp1(){
        this.step +=1
        //(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter,speed)
        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_100'));//shooting 
        this.scene.time.delayedCall(300, () => {

            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 90, () => {
                    if(this.isDrop || this.behavior != 'ShootBlueFan_ShootRedFanType')
                        return;
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('redLongSemicircleBullet', 3,  10, this, rumia, data.getData('Bullet_speed_180'))
                });
            }

        }, [], this);//step2
        this.scene.time.delayedCall(1000, () => {
            if(this.isDrop || this.behavior != 'ShootBlueFan_ShootRedFanType')
                return;
            this.scene.shootingLogic.fanShapedType_ToDirection('blueSmallCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_130'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1400, () => {
            if(this.isDrop || this.behavior != 'ShootBlueFan_ShootRedFanType')
                return;
            this.scene.shootingLogic.fanShapedType_ToDirection('redSmallCircleBullet', 16, 0, 324, this, data.getData('Bullet_speed_150'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1600, () => this.step +=1, [], this);//step2
    }
    ShootBlueFan_ShootRedFanTypeHelp2(){
        this.step +=1
        //(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter,speed)
        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_100'));//shooting 
        this.scene.time.delayedCall(300, () => {

            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 90, () => {
                    // ✅ Get a new bullet instance
                    if(this.isDrop || this.behavior != 'ShootBlueFan_ShootRedFanType')
                        return;
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueLongSemicircleBullet', 3,  10, this, rumia, data.getData('Bullet_speed_180'))
                });
            }

        }, [], this);//step2
        this.scene.time.delayedCall(1000, () => {
            if(this.isDrop || this.behavior != 'ShootBlueFan_ShootRedFanType')
                return;
            this.scene.shootingLogic.fanShapedType_ToDirection('blueSmallCircleBullet', 20, 0, 324, this, data.getData('Bullet_speed_130'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1400, () => {
            if(this.isDrop || this.behavior != 'ShootBlueFan_ShootRedFanType')
                return;
            this.scene.shootingLogic.fanShapedType_ToDirection('redSmallCircleBullet', 16, 0, 324, this, data.getData('Bullet_speed_150'));//shooting 
        }, [], this);//step2
        this.scene.time.delayedCall(1600, () => this.step +=1, [], this);//step2
    }
}