class StarSapphire extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'StarSapphire1','StarSapphire'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('StarSapphire_width'), data.getData('StarSapphire_height'));
        this.anims.create({
            key: 'StarSapphire',
            frames: [
                { key: 'StarSapphire1' },
                { key: 'StarSapphire2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        
        this.anims.create({
            key: 'StarSapphireRight',
            frames: [
                { key: 'StarSapphireRight1' },
                { key: 'StarSapphireRight2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        this.subType = subtype;
        this.anims.play('StarSapphire');
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly = 99999;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = false
        this.score = 23
        this.previousBehavior =this.behavior;
        this.movingFanCircleBullet_b = 'redMediumCircleBullet';
    }
    


    update(time, delta){
        
        super.update(time, delta);
        if(this.isMoveExit){
            this.anims.play('StarSapphireRight');
            super.Level1BossMoveRight();
            return;
        }
        if(this.scene.Sangetsusei.healthly <= 0)
        {
            this.dropOff();
            return
        }   
        
        if(this.isFirst){
            this.moveTo(900,-1,data.getData('emeny_speed_normal120'));
            return;
        }
        
        this.isDone = false;
        switch(this.scene.Sangetsusei.behavior){
            case 'FanType17TwirlFanDouble':
                this.FanType17TwirlFanDouble();
                break;
            case 'movingFanCircleBullet':
                this.movingFanCircleBullet();
                break;
            case 'speedPause19ExpandFanDouble':
                this.speedPause19ExpandFanDouble();
                break;
        }
    }
    speedPause19ExpandFanDouble(){
        if(this.step == 0 && this.moveTo(900,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1

            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 8, 80, 180, 200, this, data.getData('Bullet_speed_150'),true);//shooting

            this.scene.time.delayedCall(5500, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.step +=1
            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 8, 80, 180, 200, this, data.getData('Bullet_speed_150'),true);//shooting
            this.scene.time.delayedCall(5500, () => this.step =0, [], this);//step2
        }
    }





    movingFanCircleBullet(){
        
        if (this.step === 0) {
            if (this.moveTo(-70, 70,data.getData('emeny_speed_normal110'))) { // Move to the left side (100px from the left)
                this.movingFanCircleBullet_b ='blueMediumCircleBullet' 
                this.anims.stop();
                this.anims.play('StarSapphireRight');
                this.step = 1;
            }
        } else if (this.step === 1) {
            if (this.moveTo(boardwidth + 70,70, data.getData('emeny_speed_normal110'))) { // Move back to the right side
                this.step = 0; // Reset to repeat the pattern
                this.movingFanCircleBullet_b = 'redMediumCircleBullet'
                this.anims.stop();
                this.anims.play('StarSapphire');

            }
        }
    
        // ✅ Shoot a bullet whenever X position is divisible by 50
        let roundedX = Math.round(this.x / 100) * 100; // Round to nearest 100
        if (roundedX % 100 === 0 && roundedX !== this.lastShotX) {
            this.scene.shootingLogic.randomfanShapedType_toDirection(
                this.movingFanCircleBullet_b, 8, 0, 180, this, data.getData('Bullet_speed_120')
            );
            this.lastShotX = roundedX; // ✅ Update last fired position
        }
    }
    collideToBullet(bullet){
        if(bullet.isReflected){
            this.scene.Sangetsusei.healthly -= bullet.atk;
        }
    } 
    FanType17TwirlFanDouble(){
        if(this.step == 0 && this.moveTo(900,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.scene.shootingLogic.twirlFanType_ToDirection('redMediumCircleBullet', 9, 0, 360, 140, 4,10, 50,   this, data.getData('Bullet_speed_140'),true);//shooting
            this.scene.time.delayedCall(5600, () => this.step = 0, [], this);//step2
        }
    }

    dropOff(){
        this.isDrop = true;
        this.setTexture('StarSapphireHit')
        super.dropOff();
    }
}