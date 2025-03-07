class FlowerFairy extends Character{
    constructor(scene, x, y, type, frame) {
        if(type == 'SunFlowerFairy'){
            super(scene, x, y, 'sunflowerFairy1', frame)
            this.anims.create({
                key: 'sunflowerFairy',
                frames: [
                    { key: 'sunflowerFairy1' },
                    { key: 'sunflowerFairy2' },
                    { key: 'sunflowerFairy3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('sunflowerFairy'); // Play the 'rumiaFly' animation
            this.subtype = 'sunflower'
            this.body.setSize(data.getData('sunflowerFairy_width') , data.getData('sunflowerFairy_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
            this.healthly = 145;
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else{
            super(scene, x, y, 'dandelionFairy1', frame)
            this.anims.create({
                key: 'dandelionFairy',
                frames: [
                    { key: 'dandelionFairy1' },
                    { key: 'dandelionFairy2' },
                    { key: 'dandelionFairy3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('dandelionFairy'); // Play the 'rumiaFly' animation
            this.subtype = 'dandelion'
            this.body.setSize(data.getData('dandelionFairy_width') , data.getData('dandelionFairy_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
            this.healthly = 165;
            //this.speed = data.getData('dandelionFairy_speed') 
        }
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.isDrop = false;
        this.kind = 'f'
        //this.speed = emenySpeed; 
        this.ableToDefence = false; 
        this.isEmeny = true;
        this.score = 7

    }

    update(time, delta) {
        super.update(time, delta);
        if(this.isDrop)
            return
        switch(this.behavior){
            case 'r_sbTF_srTF':
            case 'fromRight_shootRedFanBlueFan_autoTB':    
                this.fromRight_shootRedFanBlueFan_autoTB();
                break;
            case 'r5_s5Fs6L_tL':
            case 'fromRight_shootRedTwrilFan_shootBlueTwirlFan_autoTB':
                this.fromRight_shootRedTwrilFan_shootBlueTwirlFan_autoTB();
                break;

            case 'fromTobBottom_shootRedFanTarge_shootBlueRandomFanTarget_autoTB':
                this.fromTobBottom_shootRedFanTarge_shootBlueRandomFanTarget_autoTB();
                break;
            case 'fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB':
                this.fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB();
                break;
            case 'fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB':
                this.fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB();
                break;
            case 'fromRight_shootRedFanBlueFan_autoTB2':
                this.fromRight_shootRedFanBlueFan_autoTB2();
                break;
        }
                
        
    }
    
    

    fromRight_shootRedFanBlueFan_autoTB() {
        if(this.step == 0 && this.moveTo(850)){
            this.step += 1;
            for (let i = 0; i < 70; i++) {
                this.scene.time.delayedCall(i * 330, () => {
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop){
                        if(i%3 != 0 ){
                            this.scene.shootingLogic.fanShapedType_ToTarget('redLargeCircleBullet', 6, 100 , this, rumia, data.getData('Bullet_speed_150'))
                        }
                        this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet',22, 0, 324, this,data.getData('Bullet_speed_130'));//shooting 
                    }
                });
            }
            this.scene.time.delayedCall(24000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }
    }

    fromRight_shootRedFanBlueFan_autoTB2() {
        if(this.step == 0 && this.moveTo(850)){
            this.step += 1;
            for (let i = 0; i < 93; i++) {
                this.scene.time.delayedCall(i * 330, () => {
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop){
                        if(i%3 != 0 ){
                            this.scene.shootingLogic.fanShapedType_ToTarget('redLargeCircleBullet', 6, 100 , this, rumia, data.getData('Bullet_speed_150'))
                        }
                        this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324, this,data.getData('Bullet_speed_130'));//shooting 
                    }
                });
            }
            this.scene.time.delayedCall(31000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }
    }

    fromRight_shootRedTwrilFan_shootBlueTwirlFan_autoTB(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.scene.shootingLogic.twirlFanType_ToDirection('redSpeedPauseBullet',   4, 0, 180, 800, 3, 0, 360,  this,data.getData('Bullet_speed_130'))
           
            this.scene.shootingLogic.twirlFanType_ToDirection('blueSpeedPauseBullet',   4, 90, 270, 800, 4, 0, 360,  this,data.getData('Bullet_speed_130'))
            this.scene.time.delayedCall(38000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }
    }
    fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB(){
        if(this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false, isSniper = true){
   
            this.scene.shootingLogic.twirlFanType_ToDirection('redSpeedPauseBullet',   3, 0, 360, 250, 8, 0, 360,  this,data.getData('Bullet_speed_140'),true,false)
           
            this.scene.shootingLogic.twirlFanType_ToDirection('blueSpeedPauseBullet',   3, 0, 360, 250, 8, 0, 360,  this,data.getData('Bullet_speed_140'),false,false)
            this.scene.time.delayedCall(31000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }
    }

    fromTobBottom_shootRedFanTarge_shootBlueRandomFanTarget_autoTB(){
        if(this.step == 0 && this.moveTo(850,-1)){
            this.step += 1
            let b = ['blueLongSemicircleBullet', 'redLongSemicircleBullet'];
            let choose;
            
            for (let i = 0; i < 30; i++) {
                this.scene.time.delayedCall(i * 730, () => {
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop){
                        choose = Phaser.Math.RND.pick(b);
                        if(i%3 != 0 ){
                            this.scene.shootingLogic. randomFanShapedType_ToTarget(choose, 8, 25, this, rumia, data.getData('Bullet_speed_150'));
                        }
                        //this.scene.shootingLogic.twirlFanType_ToDirection('redCapsuleBullet',   10, 90, 270, 800, 4, 0, 360,  this,data.getData('Bullet_speed_180'))
                    }
                });
            }
            this.scene.time.delayedCall(24000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }

       
    }
    fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB(){
        if(this.step == 0 && this.moveTo(800,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            let choose
            let b = ['blueLongSemicircleBullet', 'redLongSemicircleBullet'];
            let r = ['redLargeCircleBullet', 'blueLargeCircleBullet'];
            //twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
                //blueLongSemicircleBullet
            //   twirlRandomFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)
            for (let i = 0; i < 9; i++) {
                this.scene.time.delayedCall(i * 2500, () => {
                    if(this.isDrop || this.behavior != 'fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(b);
                    this.scene.shootingLogic.fanShapedType_ToTarget(choose,22, 180,  this, rumia, data.getData('Bullet_speed_170')) ;//shooting 
                    choose = Phaser.Math.RND.pick(r);
                    this.scene.shootingLogic.speedChangeListType_ToTarget(choose, this, rumia, data.getData('Bullet_speed_200'), data.getData('Bullet_speed_100'), 1)
                });
            }
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('blueMediumCircleBullet', 5, 0, 360, 330, 10, 0, 360,   this, data.getData('Bullet_speed_160'));//shooting 
            this.scene.shootingLogic.twirlRandomFanType_ToDirection('redMediumCircleBullet', 5, 0, 360, 330, 10, 0, 360,   this, data.getData('Bullet_speed_150'),true);//shooting 
            //this.scene.shootingLogic.twirlRandomFanType_ToDirection('blueSquareSpecialBullet', 3, 0, 360, 170, 5, 0, 180,   this, data.getData('Bullet_speed_160'),true);//shooting 
            this.scene.time.delayedCall(24000, () => this.step +=1 , [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }
    }

    dropOff(){
        this.anims.stop();
        if(this.type == 'sunflowerFairy' || this.type == 'SunFlowerFairy')
            this.setTexture('sunflowerFairyHit');
        else
            this.setTexture('dandelionFairyHit');
        super.dropOff();
        
    }
}