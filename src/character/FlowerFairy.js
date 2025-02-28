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

    update() {
        super.update();
        if(this.isDrop)
            return
        switch(this.behavior){
            case 'r_sbTF_srTF':
                this.r_sbTF_srTF();
                break;
            case 'r5_s5Fs6L_tL':
                this.r5_s5Fs6L_tL();
                break;
        }
                
        
    }
    
    

    r5_s5Fs6L_tL() {
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
                        this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324, this,data.getData('Bullet_speed_130'));//shooting 
                    }
                });
            }
            this.scene.time.delayedCall(24000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }
    }
    r_sbTF_srTF(){
        if(this.step == 0 && this.moveTo(850,-1,3)){
            this.step += 1
            this.scene.shootingLogic.twirlFanType_ToDirection('redSpeedPauseBullet',   4, 0, 180, 800, 3, 0, 360,  this,data.getData('Bullet_speed_130'))
           
            this.scene.shootingLogic.twirlFanType_ToDirection('blueSpeedPauseBullet',   4, 90, 270, 800, 4, 0, 360,  this,data.getData('Bullet_speed_130'))
            this.scene.time.delayedCall(38000, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.exitScreen('autoTB');
        }

    }
    dropOff(){
        this.anims.stop();
        if(this.type == 'sunflowerFairyHit')
            this.setTexture('sunflowerFairyHit');
        else
            this.setTexture('dandelionFairyHit');
        super.dropOff();
        
    }
}