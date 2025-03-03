class Satellite extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'Satellite1','Satellite'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Satellite_width'), data.getData('Satellite_height'));
        this.anims.create({
            key: 'Satellite',
            frames: [
                { key: 'Satellite1' },
                { key: 'Satellite2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        
        this.subType = subtype;
        this.anims.play('Satellite');
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly = 800;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = true
        this.score = 23
        this.previousBehavior =this.behavior;
        this.r_tblr_trlrCount = 4;
    }
    

    update(){
        if(this.healthly <= 0)
        {
            this.dropOff();
            return
        }   
        //super.update();
        
        if(this.isDone){
            if(this.isFirst){
                this.behavior = 'r_tblr_trlr'
                this.isFirst = false
                
            }else{
                this.behavior = this.getBehavior(this.previousBehavior);    
            }
            this.r_tblr_trlrCount = 4;
            this.previousBehavior =this.behavior;
            this.step = 0;
            
        }
        
        this.isDone = false;
        switch(this.behavior){
            case 'r_tblr_trlr':
                if(this.step == 2 &&  this.r_tblr_trlrCount != 0){
                    this.step = 0
                    this.r_tblr_trlrCount -= 1
                } 
                if(this.r_tblr_trlrCount == 0){
                    this.isDone= true;
                }else{
                    this.r_tblr_trlr();
                }
                break;
            case 'r_sbf5_srf5':
                this.r_sbf5_srf5();
                break;
        }
        

    }
    getBehavior(previous) {
        let behaviors = ['r_tblr_trlr', 'r_sbf5_srf5' ];
        
        if (behaviors.length <= 1) return behaviors[0]; // ✅ Avoid infinite loops if only one element
    
        let newBehavior;
        
        do {
            newBehavior = Phaser.Math.RND.pick(behaviors); // ✅ Randomly select from the list
        } while (newBehavior === previous); // ✅ Ensure it's not the same as before

        return newBehavior;
    }
    dropOff(){
        this.isDrop = true;
        new Explosion(this.scene, this.x, this.y, 'Large');
        super.destoryCharacter();
    }

    r_tblr_trlr(){
        if(this.step == 0 && this.moveTo(520,50,3)){
            this.step += 1
            this.scene.shootingLogic.twirlListType_ToDirection('redArrowBullet', 5, 0, 90, 280, this, data.getData('Bullet_speed_160'));
            this.scene.shootingLogic.twirlListType_ToDirection('redArrowBullet', 5, 90, 180, 280, this, data.getData('Bullet_speed_160'),true);
            this.scene.shootingLogic.twirlListType_ToDirection('redArrowBullet', 5, 0, 90, 280, this, data.getData('Bullet_speed_160'),true);
            this.scene.shootingLogic.twirlListType_ToDirection('redArrowBullet', 5, 90, 180, 280, this, data.getData('Bullet_speed_160'));
            for (let i = 0; i < 11; i++) {

                this.scene.time.delayedCall(i * 430, () => {
                    if(this.isDrop)
                        return;
                    this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 14, 0, 180, this,data.getData('Bullet_speed_130'));//shooting 
                    
                });
            }
            this.scene.time.delayedCall(5240, () => this.step += 1, [], this);//step2
        }
    }
    r_sbf5_srf5(){
        if(this.step == 0 && this.moveTo(520,50,3)){
            this.step += 1
            let choose;
            let r = ['redLargeCircleBullet', 'blueLargeCircleBullet'];
            this.scene.time.delayedCall(1240, () => {
                if(this.isDrop)
                    return;
                for (let i = 0; i < 9; i++) {
                    this.scene.time.delayedCall(i * 630, () => {
                        if(this.isDrop)
                            return;
                        choose = Phaser.Math.RND.pick(r);
                        this.scene.shootingLogic.randomFanShapedType_ToTarget(choose, 5, 35, this, rumia, data.getData('Bullet_speed_180'));//shooting 
                        
                    });
                }


            }, [], this);//step2
            
            this.scene.time.delayedCall(5770, () => this.isDone = true, [], this);//step2
        }

    }

}