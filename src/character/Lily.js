class Lily extends Character{
    constructor(scene, x, y,subtype , frame) {
        if(subtype == 'white'){
            super(scene, x, y, 'LilyWhite1','LilyWhite'); // Start with the first texture
            //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
            this.anims.create({
                key: 'LilyWhite',
                frames: [
                    { key: 'LilyWhite1' },
                    { key: 'LilyWhite2' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });

            this.anims.create({
                key: 'LilyWhiteRight',
                frames: [
                    { key: 'LilyWhiteRight1' },
                    { key: 'LilyWhiteRight2' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });


            this.anims.play('LilyWhite');
            this.healthly = 840;
        }else{
            super(scene, x, y, 'LilyBlack1','LilyBlack'); // Start with the first texture
            this.anims.create({
                key: 'LilyBlack',
                frames: [
                    { key: 'LilyBlack1' },
                    { key: 'LilyBlack2' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.anims.play('LilyBlack');
            this.healthly =750;
        }

        this.body.setSize(data.getData('Lily_width'), data.getData('Lily_height'));
        
        this.subType = subtype;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = true
        this.score = 23
        this.current = 0;
        this.TwirlFanCount = 6;
        this.previousBehavior =this.behavior;
        this.secondState = false;
    }
    update(time, delta){
        
        super.update(time, delta);
        if(this.isDelay) return;
        if(this.isDrop ||this.scene.isSpeech) return;

        if(this.isMoveExit){
            this.anims.play('LilyWhiteRight');
            super.Level1BossMoveRight();
            return;
        }


        if(this.healthly < 130 && !this.secondState ){
            this.isDone = true;
            this.secondState = true;
            this.sprawnScore(314);
            this.isSprawnScore = false;

        }
        if(this.isDone ){
            if(this.isFirst){
                if(this.subType == 'white')
                    this.behavior = 'TwirlFan360_SpeedPauseBullet'
                else
                    this.behavior = 'RandomFan360_TwirlFanBullet'
                this.isFirst = false
                
            }else{
                this.behavior = this.getBehavior(this.previousBehavior);
                
            }
            this.TwirlFanCount = 6;
            this.previousBehavior =this.behavior;
            this.step = 0;
            
        }
        
        this.isDone = false;
        switch(this.behavior){
            //white
            case 'TwirlFan360_SpeedPauseBullet':

                if(this.step == 2 &&  this.TwirlFanCount != 0){
                    this.step = 0
                    this.TwirlFanCount -= 1
                } 
                if(this.TwirlFanCount == 0){
                    this.isDelay = true;
                    this.scene.time.delayedCall(3080, () => {this.isDelay = false} , [], this);//step2
                    this.isDone= true;
                }else{
                    this.TwirlFan360_SpeedPauseBullet();
                }
                break;
            case 'DoubleTwirlFan180_SpeedPauseBullet':

                if(this.step == 2 &&  this.TwirlFanCount != 0){
                    this.step = 0
                    this.TwirlFanCount -= 1
                } 
                if(this.TwirlFanCount == 0){
                    this.isDone= true;
                    this.isDelay = true;
                    this.scene.time.delayedCall(3080, () => {this.isDelay = false} , [], this);//step2
                }else{
                    this.DoubleTwirlFan180_SpeedPauseBullet();
                }
            case 'ExpandFanToTarget_BlueRedBullet':
                this.ExpandFanToTarget_BlueRedBullet();
                break;
            case 'TwirlFan360_SpeedPauseBulletEnhance':
                if(this.step == 2 &&  this.TwirlFanCount != 0){
                    this.step = 0
                    this.TwirlFanCount -= 1
                } 
                if(this.TwirlFanCount == 0){
                    this.isDone= true;
                }else{
                    this.TwirlFan360_SpeedPauseBulletEnhance();
                }
                break;
            //black
            case 'TwirlFan360_SpeedPauseBulletBlack':
                if(this.step == 2 &&  this.TwirlFanCount != 0){
                    this.step = 0
                    this.TwirlFanCount -= 1
                } 
                if(this.TwirlFanCount == 0){
                    
                    this.isDone= true;
                }else{
                    this.TwirlFan360_SpeedPauseBullet();
                }
                break;
            case 'RandomFan360_TwirlFanBullet':
                if(this.step == 2 &&  this.TwirlFanCount != 0){
                    this.step = 0
                    this.TwirlFanCount -= 1
                } 
                if(this.TwirlFanCount == 0){
                    this.isDone= true;
                }else{
                    this.RandomFan360_TwirlFanBullet();
                }
                break;
            case 'RandomFan360_TwirlFanBulletEnhance':
                if(this.step == 2 &&  this.TwirlFanCount != 0){
                    this.step = 0
                    this.TwirlFanCount -= 1
                } 
                if(this.TwirlFanCount == 0){
                    this.isDone= true;
                }else{
                    this.RandomFan360_TwirlFanBulletEnhance();
                }
                break;   
        }
    }
    dropOff(){
        if(this.subType == 'white'){
            this.anims.stop();
            //this.setTexture('');
            this.sprawnScore(614);
        }else{
            this.sprawnScore(714);
        }
        super.dropOff();
    }

    getBehavior(previous) {
        let behaviors = ['TwirlFan360_SpeedPauseBullet','ExpandFanToTarget_BlueRedBullet' , 'DoubleTwirlFan180_SpeedPauseBullet'];
        if(this.subType == 'white'){
            if(this.healthly <= 130)
                return 'TwirlFan360_SpeedPauseBulletEnhance';
        }else{
            if(this.healthly <= 130)
                return 'RandomFan360_TwirlFanBulletEnhance'
            behaviors = ['TwirlFan360_SpeedPauseBulletBlack', 'RandomFan360_TwirlFanBullet','ExpandFanToTarget_BlueRedBullet' ];
        }
        
        
        if(this.current >= behaviors.length - 1)
            this.current = 0;
        else
            this.current++;
        return behaviors[this.current];
    }
    
    TwirlFan360_SpeedPauseBullet(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){

            this.scene.shootingLogic.twirlFanType_ToDirection('redLongSemicircleBullet', 15, 0, 360, 170, 12, 0, 360,   this, data.getData('Bullet_speed_140'));//shooting 
            this.scene.shootingLogic.twirlFanType_ToDirection('blueLongSemicircleBullet', 15, 0, 360, 170, 12, 0, 360,   this, data.getData('Bullet_speed_140'),true);//shooting 
            this.scene.time.delayedCall(4080, () => this.step +=1 , [], this);//step2
        }
    }

    DoubleTwirlFan180_SpeedPauseBullet(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal100'))){
            this.step +=1

            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
            for (let i = 0; i < 4; i++) {
                this.scene.time.delayedCall(i * 950, () => {
                    if(this.isDrop || this.behavior != 'DoubleTwirlFan180_SpeedPauseBullet')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting

                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(this.getRandomColorBullet('speedPause'), 5,  10, this, rumia, data.getData('Bullet_speed_130'))
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = false; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            this.scene.shootingLogic.twirlFanType_ToDirection('redLongSemicircleBullet', 15, 0, 360, 170, 5, 0, 90,   this, data.getData('Bullet_speed_140'));//shooting 
            this.scene.shootingLogic.twirlFanType_ToDirection('blueLongSemicircleBullet', 15, 0, 360, 170, 5, 0, 90,   this, data.getData('Bullet_speed_140'),true);//shooting 
            this.scene.time.delayedCall(4080, () => this.step +=1 , [], this);//step2
        }
    }

    ExpandFanToTarget_BlueRedBullet(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.ExpandFanToTarget_BlueRedBulletHelp('blueLongSemicircleBullet')
        }else if(this.step == 2 ){
            this.step +=1
            this.ExpandFanToTarget_BlueRedBulletHelp('redLongSemicircleBullet')
        }else if(this.step == 4 ){
            this.step +=1
            this.ExpandFanToTarget_BlueRedBulletHelp('blueLongSemicircleBullet')
        }else if(this.step == 6 ){
            this.step +=1
            this.ExpandFanToTarget_BlueRedBulletHelp('redLongSemicircleBullet')
        }else if(this.step == 8 ){
            this.isDone = true;
        }

    }
    ExpandFanToTarget_BlueRedBulletHelp(type){
        this.scene.shootingLogic.expandFanType_ToTarget(type, 3, 24, 230, this, rumia,  data.getData('Bullet_speed_180') )
        this.scene.time.delayedCall(2000, () => this.step +=1 , [], this);//step2
    }

    TwirlFan360_SpeedPauseBulletEnhance(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){

            this.scene.shootingLogic.twirlFanType_ToDirection('redLongSemicircleBullet', 16, 0, 360, 210, 11, 0, 360,   this, data.getData('Bullet_speed_150'),true);//shooting 
            this.scene.shootingLogic.twirlFanType_ToDirection('blueLongSemicircleBullet', 16, 0, 360, 210, 11, 0, 360,   this, data.getData('Bullet_speed_150'));//shooting 
            this.scene.time.delayedCall(4080, () => this.step +=1 , [], this);//step2
        }
    }

    TwirlFan360_SpeedPauseBulletBlack(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
                blueLongSemicircleBullet
            this.scene.shootingLogic.twirlFanType_ToDirection('blueLongSemicircleBullet', 10, 0, 360, 170, 12, 0, 360,   this, data.getData('Bullet_speed_150'));//shooting 
            this.scene.shootingLogic.twirlFanType_ToDirection('redLongSemicircleBullet', 10, 0, 360, 170, 12, 0, 360,   this, data.getData('Bullet_speed_150'),true);//shooting 
            this.scene.time.delayedCall(4080, () => this.step +=1 , [], this);//step2
        }
    }
    RandomFan360_TwirlFanBullet(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
                //blueLongSemicircleBullet
            //   twirlRandomFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)

            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 1500, () => {
                    if(this.isDrop || this.behavior != 'RandomFan360_TwirlFanBullet')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting

                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(this.getRandomColorBullet('speedPause'), 10,  20, this, rumia, data.getData('Bullet_speed_170'))
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 800; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('redLongSemicircleBullet', 5, 0, 360, 170, 5, 0, 90,   this, data.getData('Bullet_speed_160'));//shooting 
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('blueLongSemicircleBullet', 5, 0, 360, 170, 5, 0, 90,   this, data.getData('Bullet_speed_160'),true);//shooting 
            this.scene.time.delayedCall(4080, () => this.step +=1 , [], this);//step2
        }
    }
    RandomFan360_TwirlFanBulletEnhance(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
                //blueLongSemicircleBullet
            //   twirlRandomFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)
            
            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 1500, () => {
                    if(this.isDrop || this.behavior != 'RandomFan360_TwirlFanBullet')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting

                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(this.getRandomColorBullet('speedPause'), 10,  20, this, rumia, data.getData('Bullet_speed_170'))
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 800; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('redLongSemicircleBullet', 5, 0, 360, 170, 5, 0, 90,   this, data.getData('Bullet_speed_160'));//shooting 
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('blueLongSemicircleBullet', 5, 0, 360, 170, 5, 0, 90,   this, data.getData('Bullet_speed_160'),true);//shooting 
            this.scene.time.delayedCall(4080, () => this.step +=1 , [], this);//step2
        }
    }
}