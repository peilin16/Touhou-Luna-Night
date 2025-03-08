class MystiaLorelei extends Character{

    constructor(scene, x, y,subtype , frame) {
        
        super(scene, x, y, 'MystiaLorelei1','MystiaLorelei'); // Start with the first texture
            //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
            
        

        this.body.setSize(data.getData('MystiaLorelei_width'), data.getData('MystiaLorelei_height'));
        
        
        this.musicGroup1 = ['blueMusicSign1Bullet','redMusicSign1Bullet']
        this.musicGroup2 = ['blueMusicSign2Bullet','redMusicSign2Bullet']
        this.musicGroup3 = ['blueMusicSign1Bullet','blueMusicSign2Bullet','redMusicSign1Bullet','redMusicSign2Bullet']
        this.choose;


        this.subType = subtype;
    
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly =500;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = true
        this.score = 23
        this.TwirlFanCount = 6;
        this.previousBehavior =this.behavior;
        this.secondState = false;
        this.currentMoveTo;
    }


    update(){
        super.update();
        if(this.isDrop)
            return
        if(this.isFirst){
            this.behavior = 'MusicSignFanShape'
            this.previousBehavior =this.behavior;
            this.isFirst = false
            
        }
        else if(this.isDone){
            this.behavior = this.getBehavior(this.previousBehavior);
            this.previousBehavior =this.behavior;
            this.step = 0;
            
        }else if(!this.secondState && this.healthly <150 ){
            this.secondState = true;
            this.behavior = this.getBehavior(this.previousBehavior);
            this.previousBehavior =this.behavior;
            this.step = 0;
        }
        
        this.isDone = false;
        switch(this.behavior){
            case 'MusicSignFanShape':
                this.MusicSignFanShape();
                break;
            case 'DoubleTwirlFan180_SniperBullet':
                this.DoubleTwirlFan180_SniperBullet();
                break;
            case 'OutScreenMusicSign_MoveFan360':
                this.OutScreenMusicSign_MoveFan360();
                break;
            case 'ExpandFanToTarget_BlueRedBullet':
                this.ExpandFanToTarget_BlueRedBullet();
                break;
            case 'DoubleTwirlFan180_SniperBulletEnhance':
                this.DoubleTwirlFan180_SniperBulletEnhance();
                break;
        }
        

    }
    getBehavior(previous) {
        if(this.healthly <= 150)
            return 'DoubleTwirlFan180_SniperBullet';

        let behaviors = ['MusicSignFanShape', 'DoubleTwirlFan180_SniperBullet','OutScreenMusicSign_MoveFan360','ExpandFanToTarget_BlueRedBullet' ];
        
        if (behaviors.length <= 1) return behaviors[0]; // ✅ Avoid infinite loops if only one element
    
        let newBehavior;
        
        do {
            newBehavior = Phaser.Math.RND.pick(behaviors); // ✅ Randomly select from the list
        } while (newBehavior === previous); // ✅ Ensure it's not the same as before

        return newBehavior;
    }
    
    MusicSignFanShape(){
        if(this.step == 0 && this.moveTo(850,270,2)){
            this.step+=1;
            
            for (let i = 0; i < 7; i++) {
                this.scene.time.delayedCall(i * 950, () => {
                    if(this.isDrop || this.behavior != 'MusicSignFanShape')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    this.choose = Phaser.Math.RND.pick(this.musicGroup3);
                    this.scene.shootingLogic.fanShapedType_ToTarget(this.choose,7, 15,  this, rumia, data.getData('Bullet_speed_150')) ;//shooting 

                });
            }
            this.scene.time.delayedCall(7650, () => this.isDone = true, [], this);//step2
        }
    }
    DoubleTwirlFan180_SniperBullet(){
        if(this.step == 0 && this.moveTo(890,270,2)){
            this.step +=1
            let choose
            let b = ['redLargeCircleBullet','blueLargeCircleBullet']
            this.choose = Phaser.Math.RND.pick(this.musicGroup3);
            //    twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)
            this.scene.shootingLogic.twirlFanType_ToDirection('blueMusicSign1Bullet', 10, 0, 360, 180, 5, 0, 120,   this, data.getData('Bullet_speed_150'), false);//shooting 
            this.scene.shootingLogic.twirlFanType_ToDirection('redMusicSign1Bullet', 10, 0, 360, 180, 5, 0, 120,   this, data.getData('Bullet_speed_150'),true);//shooting 
            //speedChangeListType_ToTarget(bulletType, shooter, target, startSpeed, endSpeed, speedSpace)
            
            for (let i = 0; i < 4; i++) {
                this.scene.time.delayedCall(i * 950, () => {
                    if(this.isDrop || this.behavior != 'DoubleTwirlFan180_SniperBullet')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(b);
                    this.scene.shootingLogic.speedChangeListType_ToTarget(choose, this, rumia,  data.getData('Bullet_speed_200'),  data.getData('Bullet_speed_120'), 1)

                });
            }
            this.scene.time.delayedCall(10000, () => this.isDone = true , [], this);//step2
        }
    }
    DoubleTwirlFan180_SniperBulletEnhance(){
        if(this.step == 0 && this.moveTo(890,270,2)){
            this.step +=1
            let choose
            let b = ['redLargeCircleBullet','blueLargeCircleBullet']
            this.choose = Phaser.Math.RND.pick(this.musicGroup3);
            //    twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false)
            this.scene.shootingLogic.twirlFanType_ToDirection('blueMusicSign1Bullet', 3, 0, 360, 140, 5, 0, 120,   this, data.getData('Bullet_speed_150'));//shooting 
            this.scene.shootingLogic.twirlFanType_ToDirection('redMusicSign1Bullet', 3, 0, 360, 140, 5, 0, 120,   this, data.getData('Bullet_speed_150'),true);//shooting 
            //speedChangeListType_ToTarget(bulletType, shooter, target, startSpeed, endSpeed, speedSpace)
            
            for (let i = 0; i < 14; i++) {
                this.scene.time.delayedCall(i * 450, () => {
                    if(this.isDrop || this.behavior != 'DoubleTwirlFan180_SniperBulletEnhance')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(b);
                    this.scene.shootingLogic.speedChangeListType_ToTarget(choose, this, rumia,  data.getData('Bullet_speed_200'),  data.getData('Bullet_speed_120'), 1)

                });
            }
            this.scene.time.delayedCall(9000, () => this.isDone = true , [], this);//step2
        }
    }
    OutScreenMusicSign_MoveFan360(){
        if(this.step == 0){
            this.currentMoveTo = 890;
            this.step+=1;
        }
        if(this.step < 12 && this.moveTo(this.currentMoveTo,400,2) && this.currentMoveTo > 90){
            this.currentMoveTo -= 50;
            this.OutScreenMusicSign_MoveFan360Help();
            this.step +=1
        }else if(this.step < 25 && this.step >=12 && this.moveTo(this.currentMoveTo,100,2) && this.currentMoveTo <990){
            this.currentMoveTo +=50
            this.OutScreenMusicSign_MoveFan360Help();
            this.step +=1;
        }
        if(this.step == 25){
            this.scene.time.delayedCall(2000, () => this.isDone = true , [], this);//step2
            
        }
    }
    ExpandFanToTarget_BlueRedBullet(){
        if(this.step == 0 && this.moveTo(850,270,2)){
            this.step +=1
            this.ExpandFanToTarget_BlueRedBulletHelp('blueLongSemicircleBullet')
        }else if(this.step == 2 ){
            this.step +=1
            this.ExpandFanToTarget_BlueRedBulletHelp('blueLongSemicircleBullet')
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
        //expandFanType_ToTarget(bulletType, angleSpace, maxOffset, sprateSpace, shooter, target, speed )
        this.scene.shootingLogic.expandFanType_ToTarget(type, 4, 24, 250, this, rumia,  data.getData('Bullet_speed_150') );
        
        for (let i = 0; i < 2; i++) {
            this.scene.time.delayedCall(i * 550, () => {
                if(this.isDrop || this.behavior != 'ExpandFanToTarget_BlueRedBullet')
                    return
                // ✅ Get a new bullet instance
                //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                this.choose = Phaser.Math.RND.pick(this.musicGroup3);
                this.scene.shootingLogic.speedChangeListType_ToTarget(this.choose , this, rumia,  data.getData('Bullet_speed_200'),  data.getData('Bullet_speed_120'), 1)

            });
        }

        this.scene.time.delayedCall(2000, () => this.step +=1 , [], this);//step2
    }


    OutScreenMusicSign_MoveFan360Help(){
        this.choose = Phaser.Math.RND.pick(this.musicGroup3);
        this.scene.shootingLogic.outScreenType_ToDirection(this.choose, 8, 'right', 170,190,  20,590, this,data.getData('Bullet_speed_140'));//shooting 
        //randomFanShapedType_ToTarget(bulletType, num, offsetAngle, shooter, target, speed)
        this.scene.shootingLogic.randomFanShapedType_ToTarget(this.choose,8, 180,  this, rumia, data.getData('Bullet_speed_150')) ;//shooting 
    }
}