class SunnyMilk extends Character{
    constructor(scene, x, y,subtype , frame) {
        if(subtype == 'SunnyMilkFly'){
            super(scene, x, y, 'SunnyMilkFly1','SunnyMilk'); // Start with the first texture
            this.anims.create({
                key: 'SunnyMilkFly',
                frames: [
                    { key: 'SunnyMilkFly1' },
                    { key: 'SunnyMilkFly2' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.anims.play('SunnyMilkFly');
        }else{
            super(scene, x, y, 'SunnyMilk','SunnyMilk'); // Start with the first texture
            this.anims.create({
                key: 'SunnyMilk',
                frames: [
                    { key: 'SunnyMilk1' },
                    { key: 'SunnyMilk2' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.anims.play('SunnyMilk');
        }
        
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('SunnyMilk_width'), data.getData('SunnyMilk_height'));
        

        this.subType = subtype;
        
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly = 4 //440;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = true
        this.score = 23
        this.previousBehavior =this.behavior;
    }
    

    update(){
        if(this.firstState){
            if(this.healthly <= 0)
            {
                this.dropOff();
                return
            }   
        }else{

        }
        
        //super.update();
        
        if(this.isDone){
            if(this.firstState){
                this.behavior = 'r_sbrF'
                this.isFirst = false
                
            }else if(this.isFirst){
                this.behavior = 'r_sbRF8_srRF8'
                this.isFirst = false 
            }else{
                this.behavior = this.getBehavior(this.previousBehavior);
                
            }
            this.previousBehavior =this.behavior;
            this.step = 0;
            
        }
        
        this.isDone = false;
        switch(this.behavior){
            case 'r_sbrF':
                this.r_sbrF();
                break;
            case 'r_sbRF8_srRF8':
                this.r_sbRF8_srRF8();
                break;
        }
        

    }
    dropOff(){
        
        if(this.firstState){
            this.isDrop = true;
            this.exitScreen('top', 2, 1)
        }else{
            
        }
    }
    getBehavior(previous) {
        if(this.healthly <= 180)
            return 'r_sbrF';

        let behaviors = ['r_sbrF', 'r_sbRF8_srRF8', 'r_bFr12_rA12'];
        
        if (behaviors.length <= 1) return behaviors[0]; // ✅ Avoid infinite loops if only one element
    
        let newBehavior;
        
        do {
            newBehavior = Phaser.Math.RND.pick(behaviors); // ✅ Randomly select from the list
        } while (newBehavior === previous); // ✅ Ensure it's not the same as before

        return newBehavior;
    }
    r_sbRF8_srRF8(){
        if(this.step == 0 && this.moveTo(900)){
            this.step +=1;

            let b = ['blueSpeedPauseBullet', 'redSpeedPauseBullet'];
            let choose;
            for (let i = 0; i < 25; i++) {
                this.scene.time.delayedCall(i * 1100, () => {
                    if(this.isDrop)
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(b);
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(choose, 4,  10, this, rumia, data.getData('Bullet_speed_150'))
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
        }

    }
    r_sbrF(){
        if(this.step == 0 && this.moveTo(760)){
            this.step += 1;
            let b = ['blueSpeedPauseBullet', 'redSpeedPauseBullet'];
            let r = ['redLargeCircleBullet', 'blueLargeCircleBullet'];
            let choose;
            for (let i = 0; i < 50; i++) {
                this.scene.time.delayedCall(i * 1230, () => {
                    // ✅ Get a new bullet instance
                    choose = Phaser.Math.RND.pick(r);
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop){
                        this.scene.shootingLogic.randomfanShapedType_toDirection('redLargeCircleBullet', 30, 0, 324, this,data.getData('Bullet_speed_100'));//shooting 
                    }
                });
            }
            for (let i = 0; i < 55; i++) {
                this.scene.time.delayedCall(i * 1100, () => {
                    if(this.isDrop)
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(b);
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(choose, 4,  10, this, rumia, data.getData('Bullet_speed_150'))
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            this.scene.time.delayedCall(61700, () => this.isDone = true, [], this);//step2
        }
    }
}