class Reimu extends Character{

    constructor(scene, x, y,subtype , frame) {
        
        super(scene, x, y, 'reimu-fly-left1','Reimu'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Reimu_width'), data.getData('Reimu_height'));
        /*this.anims.create({
            key: 'Wriggle1',
            frames: [
                { key: 'Wriggle1' },
                { key: 'Wriggle2' },
                { key: 'Wriggle3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });*/
        this.subType = subtype;
        //this.anims.play('Wriggle1');
        //super.healthly = 15;
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(15, 6);
        this.healthly = 4770;//190//
        this.isDrop = false;
        this.kind = 'f'
        this.isEmeny = true;
        this.isDone = false;
        this.isFirst = true
        this.score = 13
        this.b = ['redSquareSpecialBullet', 'blueSquareSpecialBullet'];
        this.yin3Sprawn = false;
        this.yinGroup = [];
        this.secondState = false;
        this.current = 0;
    }


    update(time, delta){
        if(this.isDelay) return;
        super.update(time, delta);
        if(this.isDrop) return
        if(this.isFirst && !this.moveTo(850,320,data.getData('emeny_speed_normal100')))return;
        if(this.isFirst){
            this.scene.soundManager.playBGM('level4Final');
            this.behavior = 'RandomTwirFan360_TwrilListBullet'
            this.isFirst = false
            this.isDelay = true;
            this.scene.time.delayedCall(3500, () => this.isDelay = false, [], this);//step2
            return;
        }
        else if(this.isDone && !this.secondState){
            this.behavior = this.getBehavior();
            this.step = 0;
            
        }
        if(!this.secondState && this.healthly <=260 ){
            this.secondState = true;
            this.scene.sprawnScore(713,this);
            this.isSprawnScore = false;
            this.behavior = this.getBehavior();
            this.step = 0;
        }
        
        this.isDone = false;
        switch(this.behavior){
            case 'RandomTwirFan360_TwrilListBullet':
                this.RandomTwirFan360_TwrilListBullet();
                break;
            case 'OutScreenShootTBLR_RandomFan':
                this.OutScreenShootTBLR_RandomFan();
                break;
            case 'ExpandFanToTargetSpeedChangelList':
                this.ExpandFanToTargetSpeedChangelList();
                break;
            case 'FansShape360_RanDomFan360_ListType':
                this.FansShape360_RanDomFan360_ListType();
                break;
            case 'OutScreenShootLRBT_RandomFan':
                this.OutScreenShootLRBT_RandomFan();
                break;
            case 'SecondState':
                this.SecondState();
                break;
        }
    }
    getBehavior() {
        if(this.healthly <= 190)
            return 'SecondState';

        let behaviors = ['RandomTwirFan360_TwrilListBullet', 'OutScreenShootTBLR_RandomFan','FansShape360_RanDomFan360_ListType','OutScreenShootLRBT_RandomFan' ,'ExpandFanToTargetSpeedChangelList'];
        
        if(this.current >= behaviors.length - 1)
            this.current = 0;
        else
            this.current++;
        return behaviors[this.current];
    }

    RandomTwirFan360_TwrilListBullet(){
        if(this.step == 0 && this.moveTo(850,320,data.getData('emeny_speed_normal100'))){
            this.step +=1
            let choose
            
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
                //blueLongSemicircleBullet
            //   twirlRandomFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)
            for (let i = 0; i < 7; i++) {
                this.scene.time.delayedCall(i * 1500, () => {
                    if(this.isDrop || this.behavior != 'RandomTwirFan360_TwrilListBullet')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(this.b );
                    this.scene.shootingLogic.fanShapedType_ToTarget(choose,22, 180,  this, rumia, data.getData('Bullet_speed_170')) ;//shooting 
                    this.scene.shootingLogic.speedChangeListType_ToTarget(choose, this, rumia, data.getData('Bullet_speed_200'), data.getData('Bullet_speed_100'), 1)
                });
            }
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('redSquareSpecialBullet', 6, 0, 360, 170, 5, 0, 180,   this, data.getData('Bullet_speed_160'));//shooting 
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('blueSquareSpecialBullet', 6, 0, 360, 170, 5, 0, 180,   this, data.getData('Bullet_speed_160'),true);//shooting 
            //this.scene.shootingLogic.twirlRandomFanType_ToDirection('blueSquareSpecialBullet', 3, 0, 360, 170, 5, 0, 180,   this, data.getData('Bullet_speed_160'),true);//shooting 
            this.scene.time.delayedCall(13500, () => this.isDone = true , [], this);//step2
        }
    }
    ExpandFanToTargetSpeedChangelList(){
        if(this.step == 0 && this.moveTo(850,320,data.getData('emeny_speed_normal140'))){
            this.step +=1
            this.ExpandFanToTargetSpeedChangelListHelp();
            this.scene.time.delayedCall(1800, () => this.step +=1 , [], this);//step2
        }else if(this.step == 2 && this.moveTo(450,220,data.getData('emeny_speed_normal140'))){
            this.step +=1
            this.ExpandFanToTargetSpeedChangelListHelp();
            this.scene.time.delayedCall(1800, () => this.step +=1 , [], this);//step2
        }else if(this.step == 4 && this.moveTo(650,420,data.getData('emeny_speed_normal140'))){
            this.step +=1
            this.ExpandFanToTargetSpeedChangelListHelp();
            this.scene.time.delayedCall(1800, () => this.step +=1 , [], this);//step2
        }
        else if(this.step == 6 && this.moveTo(710,520,data.getData('emeny_speed_normal140'))){
            this.step +=1
            this.ExpandFanToTargetSpeedChangelListHelp();
            this.scene.time.delayedCall(1800, () => this.isDone = true, [], this);//step2
        }
    }


    ExpandFanToTargetSpeedChangelListHelp(){
        
            //let choose
            
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
                //blueLongSemicircleBullet
            //   twirlRandomFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 700, () => {
                    if(this.isDrop || this.behavior != 'ExpandFanToTargetSpeedChangelList')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    //choose = Phaser.Math.RND.pick(this.b );
                    let b =this.getRandomColorBullet('squareSpecial');
                    this.scene.shootingLogic.fanShapedType_ToTarget(b,22, 180,  this, rumia, data.getData('Bullet_speed_170')) ;//shooting 
                    if(b == 'blueSquareSpecialBullet')
                        this.scene.shootingLogic.speedChangeListType_ToTarget('blueSquareSpecialBullet', this, rumia, data.getData('Bullet_speed_200'), data.getData('Bullet_speed_100'), 1)
                    else
                        this.scene.shootingLogic.speedChangeListType_ToTarget('redSquareSpecialBullet', this, rumia, data.getData('Bullet_speed_200'), data.getData('Bullet_speed_100'), 1)
                });
            }
            this.scene.shootingLogic.expandFanType_ToTarget(this.getRandomColorBullet('squareSpecial'), 3, 24, 260, this, rumia, data.getData('Bullet_speed_170') );
            
        
    }
    OutScreenShootTBLR_RandomFan(){
        if(this.step == 0 && this.moveTo(850,320,data.getData('emeny_speed_normal110'))){
            this.step +=1
            let choose;
            let XPos1 = 0;
            let Xpos2 = 1000;
            for (let i = 0; i <230; i++) {
                this.scene.time.delayedCall(i * 230, () => {
                    if(this.isDrop || this.behavior != 'OutScreenShootTBLR_RandomFan') return
                    // ✅ Get a new bullet instance
                    if(!this.isDrop){
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 3 , 'right', 180,180,  0,100, this,data.getData('Bullet_speed_130'));//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 3, 'left', 0,0,  500,600, this,data.getData('Bullet_speed_130'));//shooting 
                    }
                });
            }

            let outScreenBulletTB1 = (XPos1,Xpos2,topType,bottomType) => {
                if(this.isDrop || this.behavior != 'OutScreenShootTBLR_RandomFan') return
                
                if(XPos1 >=1000 ||Xpos2 <= 0) return;
                Xpos2-= 30
                XPos1 +=30
                
                this.scene.shootingLogic.outScreenType_ToDirection(topType, 8, 'top', 90,90, Xpos2, Xpos2 + 70, this, data.getData('Bullet_speed_155'), true);//shooting from top
                        
                this.scene.shootingLogic.outScreenType_ToDirection(bottomType, 8, 'bottom', 270,270, XPos1,XPos1 + 70, this, data.getData('Bullet_speed_155'), true);//shooting from bottom    
                this.scene.time.delayedCall(630, () => {outScreenBulletTB1(XPos1,Xpos2,topType,bottomType)});
                
            };
            for (let i = 0; i <12; i++) {
                this.scene.time.delayedCall(i * 4130, () => {
                    if(this.isDrop || this.behavior != 'OutScreenShootTBLR_RandomFan') return
                    choose = Phaser.Math.RND.pick(this.b );
                    if(choose == 'redSquareSpecialBullet')
                        outScreenBulletTB1(XPos1,Xpos2, 'redSquareSpecialBullet','blueSquareSpecialBullet'); // ✅ Start expansion
                    else
                    outScreenBulletTB1(XPos1,Xpos2, 'blueSquareSpecialBullet','redSquareSpecialBullet'); // ✅ Start expansion
                });
            }
            
            this.scene.time.delayedCall(62300, () => this.isDone =true , [], this);//step2
        }

    }

    FansShape360_RanDomFan360_ListType(){
        
        if(this.step == 0 && this.moveTo(750,120,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 2 && this.moveTo(650,120,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 4 && this.moveTo(600,320,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 6 && this.moveTo(510,320,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 8 && this.moveTo(430,320,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 10 && this.moveTo(500,420,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 12 && this.moveTo(600,420,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 14 && this.moveTo(700,370,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.FansShape360_RanDomFan360_ListTypeHelp();
            this.scene.time.delayedCall(1300, () =>  this.step +=1, [], this);//step2
        }else if(this.step == 16 && this.moveTo(800,310,data.getData('emeny_speed_normal130'))){
            this.isDone = true;
        }
    }
    FansShape360_RanDomFan360_ListTypeHelp(){
        let choose
        choose = Phaser.Math.RND.pick(this.b );
        if(choose == 'redSquareSpecialBullet'){
            this.scene.shootingLogic.fanShapedType_ToTarget(choose,42, 180,  this, rumia, data.getData('Bullet_speed_160')) ;//shooting 
            this.scene.shootingLogic.fanShapedType_ToTarget(choose,39, 180,  this, rumia, data.getData('Bullet_speed_140')) ;//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSquareSpecialBullet', 37, 0, 324, this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.listType_ToTarget('redSquareSpecialBullet', 8, 100, this, rumia, data.getData('Bullet_speed_200')) ;
        }else{
            this.scene.shootingLogic.fanShapedType_ToTarget('redSquareSpecialBullet',42, 180,  this, rumia, data.getData('Bullet_speed_160')) ;//shooting 
            this.scene.shootingLogic.fanShapedType_ToTarget('redSquareSpecialBullet',39, 180,  this, rumia, data.getData('Bullet_speed_140')) ;//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection(choose, 37, 0, 324, this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.listType_ToTarget('blueSquareSpecialBullet', 8, 100, this, rumia, data.getData('Bullet_speed_200')) ;
        }
    }

    OutScreenShootLRBT_RandomFan(){
        if(this.step == 0 && this.moveTo(850,320,data.getData('emeny_speed_normal110'))){
            this.step +=1
            let choose;
            let XPos1 = 0;
            let Xpos2 = 600;

            for (let i = 0; i <230; i++) {
                this.scene.time.delayedCall(i * 230, () => {
                    if(this.isDrop || this.behavior != 'OutScreenShootLRBT_RandomFan') return
                    // ✅ Get a new bullet instance
                    if(!this.isDrop){
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 5 , 'top', 90,90,  0,100, this,data.getData('Bullet_speed_130'));//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 5, 'bottom', 270,270,  900,1000, this,data.getData('Bullet_speed_130'),true);//shooting 
                    }
                });
            }

            let outScreenBulletLR1 = (XPos1,Xpos2,topType,bottomType) => {
                if(this.isDrop || this.behavior != 'OutScreenShootLRBT_RandomFan') return
                
                if(XPos1 >=1000 ||Xpos2 <= 0) return;
                Xpos2-= 30
                XPos1 +=30
                
                this.scene.shootingLogic.outScreenType_ToDirection(topType, 5, 'left', 0,0, Xpos2, Xpos2 + 30, this, data.getData('Bullet_speed_160'), true);//shooting from top
                        
                this.scene.shootingLogic.outScreenType_ToDirection(bottomType, 5, 'right', 180, 180, XPos1,XPos1 + 30, this, data.getData('Bullet_speed_160'), true);//shooting from bottom    
                
                this.scene.time.delayedCall(630, () => {outScreenBulletLR1(XPos1,Xpos2,topType,bottomType)});
                
            };
            for (let i = 0; i <12; i++) {
                this.scene.time.delayedCall(i * 4130, () => {
                    if(this.isDrop || this.behavior != 'OutScreenShootLRBT_RandomFan') return
                    choose = Phaser.Math.RND.pick(this.b );
                    if(choose == 'redSquareSpecialBullet')
                        outScreenBulletLR1(XPos1,Xpos2, 'redSquareSpecialBullet','blueSquareSpecialBullet'); // ✅ Start expansion
                    else
                    outScreenBulletLR1(XPos1,Xpos2, 'blueSquareSpecialBullet','redSquareSpecialBullet'); // ✅ Start expansion
                });
            }
            
            this.scene.time.delayedCall(52300, () => this.isDone =true , [], this);//step2
        }

    }

    SecondState(){
        if(this.step == 0 && this.moveTo(550,100,data.getData('emeny_speed_normal110'))){
            this.step+=1;

            let yin1 = this.scene.spawnEmeny(1, 'list', 'yinYangOrbs','yinYangOrbs','yinYangOrbsHit',100,this.x+140);
            let yin2 = this.scene.spawnEmeny(1, 'list', 'yinYangOrbs','yinYangOrbs','yinYangOrbsHit',100,this.x-80);
            //let yin3 = this.scene.spawnEmeny(1, 'list', 'yinYangOrbs','yinYangOrbs','yinYangOrbsHit',150,this.x);
            yin1.master =this;
            yin2.master = this;
           // yin3.master = this;
           this.yinGroup.push(yin1);
           this.yinGroup.push(yin2);
        }else if(this.step == 1 ){
            this.step+=1;
            for (let i = 0; i <230; i++) {
                this.scene.time.delayedCall(i * 230, () => {
                    if(this.isDrop || this.behavior != 'SecondState') return
                    // ✅ Get a new bullet instance
                    if(!this.isDrop){
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 5 , 'top', 90,90,  0,100, this,data.getData('Bullet_speed_130'));//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 5, 'bottom', 270,270,  900,1000, this,data.getData('Bullet_speed_130'),true);//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 3 , 'right', 180,180,  0,100, this,data.getData('Bullet_speed_130'));//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection('redSquareSpecialBullet', 3, 'left', 0,0,  500,600, this,data.getData('Bullet_speed_130'));//shooting 

                    }
                });
            }
            this.scene.time.delayedCall(52300, () => this.step = 1 , [], this);//step2
        }
        if(!this.yin3Sprawn && this.healthly <= 40 ){
            this.yin3Sprawn = true;
            let yin3 = this.scene.spawnEmeny(1, 'list', 'yinYangOrbs','yinYangOrbs','yinYangOrbsHit',140,this.x);
            //let yin3 = this.scene.spawnEmeny(1, 'list', 'yinYangOrbs','yinYangOrbs','yinYangOrbsHit',150,this.x);
            yin3.master =this;
            this.yinGroup.push(yin3);
        }
    }
    dropOff(){
        this.isDrop = true;
        //this.sprawnScore(821);
        for (let i = 0; i < this.yinGroup.length; ++i) {
            this.yinGroup[i].dropOff();
        }
        
    }

}
