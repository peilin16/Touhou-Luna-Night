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
        this.anims.create({
            key: 'SunnyMilkFlyRight',
            frames: [
                { key: 'SunnyMilkFlyRight1' },
                { key: 'SunnyMilkFlyRight2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('SunnyMilk_width'), data.getData('SunnyMilk_height'));
        
        this.hitPlayer = false;
        this.subType = subtype;
        this.luna;
        this.startSapphire
        this.vx = 0;
        this.vy = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(10, 2);
        this.healthly = 440;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = false;
        this.isFirst = true;
        this.score = 23
        this.previousBehavior =this.behavior;
        this.behaviors = ['speedPause19ExpandFanDouble','movingFanCircleBullet','FanType17TwirlFanDouble'];
        this.current = -1;
        this.secondState = false;
    }
    

    update(time, delta){
        
        super.update(time, delta);
        if(this.isDrop ||this.scene.isSpeech) return;

        if(this.isMoveExit){
            this.anims.play('SunnyMilkFlyRight');
            super.Level1BossMoveRight();
            return;
        }

        if(!this.firstState){
            if(this.scene.Sangetsusei.healthly <= 0)
            {
                this.dropOff();
                return
            }
            if(this.isFirst ){
                if(this.moveTo(760,-1,data.getData('emeny_speed_normal120'))){

                    this.scene.soundManager.playBGM('level2Final');
                    this.scene.Sangetsusei.isDone = false;
                    this.isDone = false;
                    this.scene.time.delayedCall(2500, () => { 
                        this.luna.isFirst = true;
                        this.startSapphire.isFirst = true;
                    }, [], this);//step2
                    this.scene.time.delayedCall(8500, () => { 
                        this.scene.Sangetsusei.isDone = true;
                        this.luna.isFirst = false;
                        this.startSapphire.isFirst = false;

                     }, [], this);//step2
                    this.isFirst = false;
                }else
                return;
            }
        }
        if( !this.firstState && !this.secondState &&this.scene.Sangetsusei.healthly < 610 ){
            this.isDone = true
            this.sprawnScore(265);
            this.isSprawnScore = false;
            this.secondState = true;
        }
        if(this.isDone || this.scene.Sangetsusei.isDone ){
            if(this.firstState){
                this.behavior = 'ShootingFanShape360_SpeedPauseSniper'
                this.isFirst = false
                this.step = 0;
            }else{
                this.scene.Sangetsusei.step = 0;
                this.scene.Sangetsusei.behavior = this.getBehavior(this.scene.Sangetsusei.previousBehavior);
                //this.scene.Sangetsusei.previousBehavior =this.scene.Sangetsusei.behavior;
                this.luna.step = 0;
                this.luna.behavior =  this.scene.Sangetsusei.behavior;
                this.startSapphire.step = 0;
                this.startSapphire.behavior =  this.scene.Sangetsusei.behavior;
            }
            
        }
        
        this.scene.Sangetsusei.isDone = false
        this.isDone = false;
        
        if(this.firstState){
            switch(this.behavior){
                case 'ShootingFanShape360_SpeedPauseSniper':
                    this.ShootingFanShape360_SpeedPauseSniper();
                    break;
            }
        }else{
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




                case 'b_hit_player':
                    this.b_hit_player(data.getData('emeny_speed_normal190'));
                    break;
            }

        }

    }

    dropOff(){
        this.isDrop = true;
        if(this.firstState){
            this.sprawnScore(366);
            this.exitScreen('top', 2, 1);
        }else{
            this.scene.Sangetsusei.isDrop = true;
            this.setTexture('SunnyMilkHit')
            this.sprawnScore(466);
            super.dropOff();
        }
    }

    getBehavior(previous) {
        
        if(this.scene.Sangetsusei.healthly <= 610){
            return 'b_hit_player';
        }
        
        if(this.current >= this.behaviors.length - 1)
            this.current = 0;
        else
            this.current++;
        return this.behaviors[this.current];
    }

    
    b_hit_player(speed) {
        //if (rumia) return; // ✅ Ensure the player exists
        let direction
        if(!this.hitPlayer){
            if(this.moveTo( this.scene.Sangetsusei.x,this.scene.Sangetsusei.y+40,data.getData('emeny_speed_normal120')) && this.luna.moveTo(this.scene.Sangetsusei.x+20,this.scene.Sangetsusei.y-40,data.getData('emeny_speed_normal120')) 
                && this.startSapphire.moveTo(this.scene.Sangetsusei.x-40, this.scene.Sangetsusei.y-10,data.getData('emeny_speed_normal120'))){
                this.hitPlayer= true;
                direction = new Phaser.Math.Vector2(rumia.x - this.scene.Sangetsusei.x, rumia.y - this.scene.Sangetsusei.y).normalize();
                this.vx = direction.x * speed * this.dt;
                this.vy = direction.y * speed * this.dt;
            }
        }

        if(this.hitPlayer){
            if (
                this.scene.Sangetsusei.x <= 50 || this.scene.Sangetsusei.x >= game.config.width - 50 ||
                this.scene.Sangetsusei.y <= 50 || this.scene.Sangetsusei.y >= boardheigh - 50
            ) {
                this.scene.cameras.main.shake(200, 0.02); // ✅ Screen shake effect
        
                // ✅ Calculate new direction towards player
                direction = new Phaser.Math.Vector2(rumia.x - this.scene.Sangetsusei.x, rumia.y - this.scene.Sangetsusei.y).normalize();
                this.vx = direction.x * speed * this.dt;
                this.vy = direction.y * speed * this.dt;
            }
        
            // ✅ Continue moving in the same direction
            this.scene.Sangetsusei.x += this.vx;
            this.scene.Sangetsusei.y += this.vy;
    
            this.x = this.scene.Sangetsusei.x;
            this.y = this.scene.Sangetsusei.y+40;

            this.luna.x =  this.scene.Sangetsusei.x+20;
            this.luna.y =  this.scene.Sangetsusei.y-40;

            this.startSapphire.x =  this.scene.Sangetsusei.x-40;
            this.startSapphire.y =  this.scene.Sangetsusei.y-10;

            if(this.step == 0 ){
                this.step += 1;
                let b = ['blueSmallCircleBullet', 'redSmallCircleBullet'];
                let choose;
                for (let i = 0; i <10; i++) {
                    this.scene.time.delayedCall(i * 930, () => {
                        // ✅ Get a new bullet instance
                        choose = Phaser.Math.RND.pick(b);
                        if(!this.isDrop){
                            this.scene.shootingLogic.outScreenType_ToDirection(choose, 29, 'top', 60,100,  0,990, this,data.getData('Bullet_speed_120'));//shooting 
                        }
                    });
                }
    //(bulletType, num, side, angleStart, angleEnd, rangeStart, rangeEnd, shooter, speed
                this.scene.time.delayedCall(9500, () => this.step = 0, [], this);//step2
                //this.scene.time.delayedCall(61700, () => this.isDone = true, [], this);//step2
            }





        }
        
        // ✅ If boss reaches the border, calculate a new direction based on the player's current position
        /*
        if (
            this.x <= 50 || this.x >= game.config.width - 50 ||
            this.y <= 50 || this.y >= boardheigh - 50
        ) {
            this.scene.cameras.main.shake(200, 0.02); // ✅ Screen shake effect
    
            // ✅ Calculate new direction towards player
            let direction = new Phaser.Math.Vector2(rumia.x - this.x, rumia.y - this.y).normalize();
            this.vx = direction.x * speed;
            this.vy = direction.y * speed;
        }
    
        // ✅ Continue moving in the same direction
        this.x += this.vx;
        this.y += this.vy;*/
    }
    movingFanCircleBullet(){
        if(this.scene.Sangetsusei.step == 0 && this.moveTo(760,-1,data.getData('emeny_speed_normal120'))){
            this.scene.Sangetsusei.step +=1;
            let r = ['redCapsuleBullet', 'blueCapsuleBullet'];
            let choose;
            for (let i = 0; i < 28; i++) {
                this.scene.time.delayedCall(i * 1230, () => {
                    // ✅ Get a new bullet instance
                    choose = Phaser.Math.RND.pick(r);
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop &&  this.scene.Sangetsusei.behavior == 'movingFanCircleBullet'){
                        this.scene.shootingLogic.fanShapedType_ToTarget(choose, 14,  180 , this, rumia, data.getData('Bullet_speed_130'))
                    }
                });
            }
            this.scene.time.delayedCall(37000, () => {this.scene.Sangetsusei.isDone = true
                this.luna.anims.play('Luna');
                this.startSapphire.anims.play('StarSapphire');


            }, [], this);//step2
        }
    }


    FanType17TwirlFanDouble(){
        if(this.scene.Sangetsusei.step == 0 && this.moveTo(900,-1,data.getData('emeny_speed_normal120'))){
            this.scene.Sangetsusei.step +=1;

        
            let r = ['redLargeCircleBullet', 'blueLargeCircleBullet'];
            let choose;
            for (let i = 0; i < 18; i++) {
                this.scene.time.delayedCall(i * 1230, () => {
                    // ✅ Get a new bullet instance
                    choose = Phaser.Math.RND.pick(r);
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop &&  this.scene.Sangetsusei.behavior == 'FanType17TwirlFanDouble'){
                        this.scene.shootingLogic.randomfanShapedType_toDirection(choose, 18, 0, 324, this,data.getData('Bullet_speed_120'));//shooting 
                    }
                });
            }
            this.scene.time.delayedCall(23400, () => this.scene.Sangetsusei.isDone = true, [], this);//step2

        }

    }
    speedPause19ExpandFanDouble(){
        if(this.scene.Sangetsusei.step == 0 && this.moveTo(900,-1,data.getData('emeny_speed_normal120'))){
            this.scene.Sangetsusei.step +=1;

            let b = ['blueSpeedPauseBullet', 'redSpeedPauseBullet'];
            let choose;
            for (let i = 0; i < 14; i++) {
                this.scene.time.delayedCall(i * 1100, () => {
                    if(this.isDrop ||  this.scene.Sangetsusei.behavior != 'speedPause19ExpandFanDouble')
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    choose = Phaser.Math.RND.pick(b);
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(choose, 19,  35, this, rumia, data.getData('Bullet_speed_150'))
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            this.scene.time.delayedCall(15400, () => this.scene.Sangetsusei.isDone = true, [], this);//step2
        }

    }
    collideToBullet(bullet){
        if(bullet.isReflected){
            if(this.firstState){
                this.healthly -= bullet.atk;
            }else{
                this.scene.Sangetsusei.healthly -= bullet.atk;
            }
            
        }
    } 

    //first state
    ShootingFanShape360_SpeedPauseSniper(){
        if(this.step == 0 && this.moveTo(760,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1;
            for (let i = 0; i < 50; i++) {
                this.scene.time.delayedCall(i * 1230, () => {
                    // ✅ Get a new bullet instance
                    
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    if(!this.isDrop){
                        this.scene.shootingLogic.fanShapedType_ToDirection('redLargeCircleBullet', 50, 0, 360, this,data.getData('Bullet_speed_130'));//shooting 
                    }
                });
            }
            for (let i = 0; i < 55; i++) {
                this.scene.time.delayedCall(i * 1100, () => {
                    if(this.isDrop)
                        return
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(this.getRandomColorBullet('speedPause'), 4,  10, this, rumia, data.getData('Bullet_speed_150'))
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