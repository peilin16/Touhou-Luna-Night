class Luna extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'Luna1','Luna'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Luna_width'), data.getData('Luna_height'));
        this.anims.create({
            key: 'Luna',
            frames: [
                { key: 'Luna1' },
                { key: 'Luna2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        this.subType = subtype;
        this.anims.play('Luna');
        
        
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly = 99999;
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
        if(this.scene.Sangetsusei.healthly <= 0)
        {
            this.dropOff();
            return
        }     
        //super.update();
        
        if(this.scene.Sangetsusei.isDone){
            if(this.isFirst ){
                this.behavior = 'b_sbf3t_t'
                this.isFirst = false
                this.step = 0;
            }
            
            
        }
        
        this.isDone = false;
        switch(this.scene.Sangetsusei.behavior){
            case 'b_sbf3t_t':
                this.b_sbf3t_t();
                break;
            case 'b_srf4t_t':
                this.b_srf4t_t();
                break;
            case 'b_srfts':
                this.b_srfts();
                break;
        }
        

    }
    collideToBullet(bullet){
        if(bullet.isReflected){
            this.scene.Sangetsusei.healthly -= bullet.atk;
        }
    } 

    b_srfts(){
        if(this.step == 0 && this.moveTo(900)){
            this.step +=1
            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 8, 170, 270, 200, this, data.getData('Bullet_speed_150'));//shooting
            this.scene.time.delayedCall(5500, () => this.step +=1, [], this);//step2
        }else if(this.step == 2){
            this.step +=1
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 8, 170, 270, 200, this, data.getData('Bullet_speed_150'));//shooting
            this.scene.time.delayedCall(5500, () => this.step =0, [], this);//step2
        }


    }
   
    b_srf4t_t() {
        let b = 'blueMediumCircleBullet';
        if (this.step === 0) {
            if (this.moveTo(-70, 550,3)) { // Move to the left side (100px from the left)
                this.step = 1;
                b = 'redMediumCircleBullet';
            }
        } else if (this.step === 1) {
            if (this.moveTo(boardwidth + 70,550,3)) { // Move back to the right side
                this.step = 0; // Reset to repeat the pattern
                b = 'blueMediumCircleBullet';
            }
        }
    
        // ✅ Shoot a bullet whenever X position is divisible by 50
        if (this.x % 100 === 0) {
            this.scene.shootingLogic.randomfanShapedType_toDirection(b, 12, 180, 364, this,data.getData('Bullet_speed_120'));//shooting 
        }
    }


    b_sbf3t_t(){
        if(this.step == 0 && this.moveTo(900)){
            this.step += 1
            this.scene.shootingLogic.twirlFanType_ToDirection('blueMediumCircleBullet', 9, 70, 380, 140, 4,10, 50,   this, data.getData('Bullet_speed_140'));//shooting
            this.scene.time.delayedCall(5600, () => this.step = 0, [], this);//step2
        }
    }


    dropOff(){
        
    }
}