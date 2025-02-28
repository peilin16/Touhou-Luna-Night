class Kawashiro extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'KawashiroIdle','Kawashiro'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Kawashiro_width'), data.getData('Kawashiro_height'));
        
        this.subType = subtype;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly = 10;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = true
        this.score = 23
        this.r_sbTF_srTFC = 6;
        this.previousBehavior =this.behavior;
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
                this.behavior = 'r_sbTF_srTF'
                this.isFirst = false
                
            }else{
                this.behavior = this.getBehavior(this.previousBehavior);
                
            }
            this.r_sbTF_srTFC = 3;
            this.previousBehavior =this.behavior;
            this.step = 0;
            
        }
        
        this.isDone = false;
        switch(this.behavior){
            case 'r_sbo_sro':
                this.r_sbo_sro();
                break;
            case 'r_sbTF_srTF':
                if(this.step == 4 &&  this.r_sbTF_srTFC != 0){
                    this.step = 0
                    this.r_sbTF_srTFC -= 1
                } 
                if(this.r_sbTF_srTFC == 0){
                    this.isDone= true;
                }else{
                    this.r_sbTF_srTF();
                }
                
                break;
            case 'r_sbot_srot_sbob_srob_sf':
                this.r_sbot_srot_sbob_srob_sf();
        }
        

    }
    getBehavior(previous) {
        if(this.healthly <= 180)
            return 'r_sbo_sro';

        let behaviors = ['r_sbTF_srTF', 'r_sbo_sro','r_sbot_srot_sbob_srob_sf' ];
        
        if (behaviors.length <= 1) return behaviors[0]; // ✅ Avoid infinite loops if only one element
    
        let newBehavior;
        
        do {
            newBehavior = Phaser.Math.RND.pick(behaviors); // ✅ Randomly select from the list
        } while (newBehavior === previous); // ✅ Ensure it's not the same as before

        return newBehavior;
    }
    r_sbo_sro(){
        if(this.step == 0 && this.moveTo(730)){
            this.step += 1;
            let b = ['blueMediumCircleBullet', 'redMediumCircleBullet'];
            let choose;
            for (let i = 0; i <45; i++) {
                this.scene.time.delayedCall(i * 830, () => {
                    // ✅ Get a new bullet instance
                    choose = Phaser.Math.RND.pick(b);
                    if(!this.isDrop){
                        this.scene.shootingLogic.outScreenType_ToDirection(choose, 27, 'top', 60,100,  0,990, this,data.getData('Bullet_speed_120'));//shooting 
                    }
                });
            }
//(bulletType, num, side, angleStart, angleEnd, rangeStart, rangeEnd, shooter, speed
            this.scene.time.delayedCall(40350, () => this.isDone = true, [], this);//step2
            //this.scene.time.delayedCall(61700, () => this.isDone = true, [], this);//step2
        }
    }

    r_sbTF_srTF(){
        
        if(this.step == 0 && this.moveTo(730)){
            this.step +=1
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 7, 270, 360, 300, this, data.getData('Bullet_speed_150'),true);//shooting

            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 7, 187, 270, 300, this, data.getData('Bullet_speed_150'));//shooting
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 7, 90, 180 , 300, this, data.getData('Bullet_speed_150'),true);//shooting
            
            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 7, 0, 90 , 300, this, data.getData('Bullet_speed_150'));//shooting
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 1700, () => {
                    if(this.isDrop)
                        return;
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    this.scene.shootingLogic.fanShapedType_ToTarget('redLargeCircleBullet', 4,  12, this, rumia, data.getData('Bullet_speed_130'))
                    
                });
            }
            this.scene.time.delayedCall(5000, () => this.step += 1, [], this);//step2
        }else if(this.step == 2){
            this.step += 1;
            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 7, 270, 360, 300, this, data.getData('Bullet_speed_150'));//shooting
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 7, 187, 270, 300, this, data.getData('Bullet_speed_150'));//shooting
            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 7, 90, 180 , 300, this, data.getData('Bullet_speed_150'),true);//shooting
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 7, 0, 90 , 300, this, data.getData('Bullet_speed_150'),true);//shooting
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 1700, () => {
                    if(this.isDrop)
                        return;
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    this.scene.shootingLogic.fanShapedType_ToTarget('redLargeCircleBullet', 4,  12, this, rumia, data.getData('Bullet_speed_130'))
                    
                });
            }
            this.scene.time.delayedCall(5000, () => this.step += 1, [], this);//step2
        }
    }

    r_sbot_srot_sbob_srob_sf(){
        if(this.step == 0 && this.moveTo(730)){
            this.step += 1;
            let b = ['blueMediumCircleBullet', 'redMediumCircleBullet'];
            let choose;
            for (let i = 0; i <38; i++) {
                this.scene.time.delayedCall(i * 1230, () => {
                    // ✅ Get a new bullet instance
                    choose = Phaser.Math.RND.pick(b);
                    if(!this.isDrop){
                        this.scene.shootingLogic.outScreenType_ToDirection(choose, 14, 'top', 60,100,  0,1090, this,data.getData('Bullet_speed_100'));//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection(choose, 14, 'bottom', 250,330,  0,1090, this,data.getData('Bullet_speed_100'));//shooting 
                    }
                });
            }
            for (let i = 0; i < 13; i++) {
                this.scene.time.delayedCall(i * 3800, () => {
                    if(this.isDrop)
                        return;
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    this.scene.shootingLogic.fanShapedType_ToTarget('redLargeCircleBullet', 3,  15, this, rumia, data.getData('Bullet_speed_130'))
                    
                });
            }
//(bulletType, num, side, angleStart, angleEnd, rangeStart, rangeEnd, shooter, speed
            this.scene.time.delayedCall(50350, () => this.isDone = true, [], this);//step2
            //this.scene.time.delayedCall(61700, () => this.isDone = true, [], this);//step2
        }
    }

    dropOff(){
        this.isDrop = true;
        
        super.dropOff();
    }
}