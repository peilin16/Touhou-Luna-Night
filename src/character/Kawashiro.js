class Kawashiro extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'KawashiroIdle','Kawashiro'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Kawashiro_width'), data.getData('Kawashiro_height'));
        
        this.subType = subtype;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(3, 0);
        this.healthly = 1490;
        this.isDrop = false;
        this.kind = 'f'
        this.firstState = true;
        this.isEmeny = true;
        this.isDone = true;
        this.isFirst = true
        this.score = 23
        this.secondState = false;
        this.r_sbTF_srTFC = 6;
        this.previousBehavior =this.behavior;
    }
    

    update(time, delta){
        super.update(time, delta);
        if(this.isDrop) return;
        //super.update();
        if(this.isFirst){
            this.behavior = 'r_sbo_sro'
            this.previousBehavior =this.behavior;
            if(!this.moveTo(730,-1,data.getData('emeny_speed_normal120')))
                return;
            this.isFirst = false
            this.scene.soundManager.playBGM('level2Mid');
        }

        if(!this.secondState && this.healthly <= 380){
            this.secondState= true;
            this.isDone = false;
            this.sprawnScore(266);
            this.isSprawnScore = false;
            this.behavior = ''
            this.scene.time.delayedCall(5550, () => {this.behavior = 'OutScreenTopBottom16FanShapeTypeToTarget3';this.step = 0;}, [], this);//step2
            this.step = 0;
        }
        else if(this.isDone){
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
                if(this.step == 4 &&  this.r_sbTF_srTFC != 0 &&  this.r_sbTF_srTFC != -1){
                    this.step = 0
                    this.r_sbTF_srTFC -= 1
                } 
                if(this.r_sbTF_srTFC == 0){
                    this.r_sbTF_srTFC = -1
                    this.scene.time.delayedCall(4350, () => {this.isDone = true; this.r_sbTF_srTFC = 0}, [], this);//step2
                    
                }else{
                    this.r_sbTF_srTF();
                }
                
                break;
            case 'r_sbot_srot_sbob_srob_sf':
                this.r_sbot_srot_sbob_srob_sf();
                break;
            case 'OutScreenTopBottom16FanShapeTypeToTarget3':
                this.OutScreenTopBottom16FanShapeTypeToTarget3();
                break;
        }
        

    }
    getBehavior(previous) {
        if(this.healthly <= 380)
            return 'OutScreenTopBottom16FanShapeTypeToTarget3';

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
            for (let i = 0; i <42; i++) {
                this.scene.time.delayedCall(i * 1130, () => {
                    // ✅ Get a new bullet instance
                    if(!this.isDrop && this.behavior == 'r_sbo_sro'){
                        this.scene.shootingLogic.outScreenType_ToDirection('blueMediumCircleBullet', 9, 'left', 0,0,  0,600, this,data.getData('Bullet_speed_110'));//shooting 
                        this.scene.shootingLogic.outScreenType_ToDirection('redMediumCircleBullet', 9, 'right', 180,180,  0,600, this,data.getData('Bullet_speed_110'));//shooting 

                    }
                });
            }
//(bulletType, num, side, angleStart, angleEnd, rangeStart, rangeEnd, shooter, speed
            this.scene.time.delayedCall(53350, () => this.isDone = true, [], this);//step2
            //this.scene.time.delayedCall(61700, () => this.isDone = true, [], this);//step2
        }
    }
    
    r_sbTF_srTF(){
        
        if(this.step == 0 && this.moveTo(730,-1,data.getData('emeny_speed_normal110'))){
            this.step +=1
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 7, 270, 360, 300, this, data.getData('Bullet_speed_150'),true);//shooting

            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 7, 187, 270, 300, this, data.getData('Bullet_speed_150'));//shooting
            this.scene.shootingLogic.expandFanType_ToDirection('blueLongSemicircleBullet', 7, 90, 180 , 300, this, data.getData('Bullet_speed_150'),true);//shooting
            
            this.scene.shootingLogic.expandFanType_ToDirection('redLongSemicircleBullet', 7, 0, 90 , 300, this, data.getData('Bullet_speed_150'));//shooting
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 1700, () => {
                    if(this.isDrop  || this.behavior != 'r_sbTF_srTF')
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
                    if(this.isDrop || this.behavior != 'r_sbTF_srTF')
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
                    if(this.isDrop || this.behavior != 'r_sbot_srot_sbob_srob_sf') return;
                    this.scene.shootingLogic.outScreenType_ToDirection(choose, 14, 'top', 60,100,  0,1090, this,data.getData('Bullet_speed_100'));//shooting 
                    this.scene.shootingLogic.outScreenType_ToDirection(choose, 14, 'bottom', 250,330,  0,1090, this,data.getData('Bullet_speed_100'));//shooting 
                    
                });
            }
            for (let i = 0; i < 13; i++) {
                this.scene.time.delayedCall(i * 3800, () => {
                    if(this.isDrop || this.behavior != 'r_sbot_srot_sbob_srob_sf') return;
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
    
    OutScreenTopBottom16FanShapeTypeToTarget3(){
        if(this.step == 0 && this.moveTo(730)){
            this.step += 1;
            
            let choose;
            for (let i = 0; i <38; i++) {
                this.scene.time.delayedCall(i * 1230, () => {
                    // ✅ Get a new bullet instance
                    
                    if(this.isDrop || this.behavior != 'OutScreenTopBottom16FanShapeTypeToTarget3') return;
                    choose = this.getRandomColorBullet('mediumCircle');
                    this.scene.shootingLogic.outScreenType_ToDirection(choose, 16, 'top', 60,100,  0,1090, this,data.getData('Bullet_speed_110'));//shooting 
                    this.scene.shootingLogic.outScreenType_ToDirection(choose, 16, 'bottom', 250,330,  0,1090, this,data.getData('Bullet_speed_110'));//shooting 
                    
                });
            }
            for (let i = 0; i < 13; i++) {
                this.scene.time.delayedCall(i * 3800, () => {
                    if(this.isDrop || this.behavior != 'OutScreenTopBottom16FanShapeTypeToTarget3') return;
                    let b = this.getRandomColorBullet('largeCircle');
                    // ✅ Get a new bullet instance
                    //this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 80, 260, this, data.getData('Bullet_speed_130'));//shooting
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_130'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_140'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_150'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_160'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_170'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_180'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_190'))
                    this.scene.shootingLogic.fanShapedType_ToTarget(b, 3,  5, this, rumia, data.getData('Bullet_speed_200'))
                });
            }
//(bulletType, num, side, angleStart, angleEnd, rangeStart, rangeEnd, shooter, speed
            this.scene.time.delayedCall(50350, () => this.isDone = true, [], this);//step2
            //this.scene.time.delayedCall(61700, () => this.isDone = true, [], this);//step2
        }
    }

    dropOff(){
        this.isDrop = true;
        this.sprawnScore(466);
        super.dropOff();
    }
}