class MaidFairy extends Character{
    constructor(scene, x, y, type, frame) {
        if(type == 'MaidFairy1'){
            super(scene, x, y, 'MaidFairy1_1', frame)
            this.anims.create({
                key: 'MaidFairy1',
                frames: [
                    { key: 'MaidFairy1_1' },
                    { key: 'MaidFairy1_2' },
                    { key: 'MaidFairy1_3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('MaidFairy1'); // Play the 'rumiaFly' animation
            //this.healthly = 17;
            this.body.setSize(data.getData('MaidFairy1_width') , data.getData('MaidFairy1_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else if(type == 'MaidFairy3'){
            super(scene, x, y, 'MaidFairy3_1', frame)
            this.anims.create({
                key: 'MaidFairy3',
                frames: [
                    { key: 'MaidFairy3_1' },
                    { key: 'MaidFairy3_2' },
                    { key: 'MaidFairy3_3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('MaidFairy3'); // Play the 'rumiaFly' animation
            this.healthly = 17;
            this.body.setSize(data.getData('MaidFairy1_width') , data.getData('MaidFairy1_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
        }else{
            super(scene, x, y, 'MaidFairy2_1', frame)
            this.anims.create({
                key: 'MaidFairy2',
                frames: [
                    { key: 'MaidFairy2_1' },
                    { key: 'MaidFairy2_2' },
                    { key: 'MaidFairy2_3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.play('MaidFairy2'); // Play the 'rumiaFly' animation
            this.healthly = 17;
            this.body.setSize(data.getData('MaidFairy1_width') , data.getData('MaidFairy1_height'), true); // Adjust hitbox size
            this.body.setOffset(5, 5); 
        }
        this.subtype = type
        this.healthly = 17;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.healthly = 25;
        this.isDrop = false;
        this.kind = 'f'
        //this.speed = emenySpeed; 
        this.ableToDefence = false; 
        this.isEmeny = true;


    }
    
    update(time, delta) {
        super.update(time, delta);
        if(this.isDrop)
            return
        switch(this.behavior){
            case 'r_sb4f_at':
            case 'fromRight_shootBlue4Fan_autoTB':
                this.fromRight_shootBlue4Fan_autoTB();
                break;
            case 'r_sr3f_at':
            case 'fromRight_shootRed3Fan_autoTB':
                this.fromRight_shootRed3Fan_autoTB();
                break;
            case 'r_sbf3t_srf2t':
            case 'fromRight_shoot3List_autoTB':
                this.fromRight_shoot3List_autoTB();
                break; 
            case 't_sbf2t_srl1_b':
            case 'fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop':
                this.fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop();
                break; 
            case 'fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom':
                this.fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom();
                break;
            case 'b_srf3t_t':
            case 'fromTop_shootBlueFan2ToTarget_shootRedList1_toTarget':
                this.fromTop_shootBlueFan2ToTarget_shootRedList1_toTarget();
                break;
            case 'b_sbf3t_t':
            case 'fromBottom_shootRedFan3ToTarget_toTop':
                this.fromBottom_shootRedFan3ToTarget_toTop();
                break;
            case 'fromRight_shootExpandFanRedBlue_autoTB':
                this.fromRight_shootExpandFanRedBlue_autoTB();
                break;    
            case 'shoot_fanShapeTypeSniperBulletToTarget_AutoTB':
                this.shoot_fanShapeTypeSniperBulletToTarget_AutoTB();
                break;
            case 'fromRight_shootFanRedBlue_autoTB':
                this.fromRight_shootFanRedBlue_autoTB();
                break;
        }
        
    }
    //fromRight_shootBlue4Fan_autoTBr_sb4f_at
    fromRight_shootBlue4Fan_autoTB(){
        if(this.step == 0 && this.moveTo(900,-1 , data.getData('emeny_speed_normal120'))){
            this.step +=1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 250, () => {
                    // ✅ Get a new bullet instance
                    //fanShapedType_ToTarget(bulletType, num,  offsetAngle, shooter, target, speed)
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 3, 20, this,rumia, data.getData('Bullet_speed_140'));//shooting 
                });
            }
           // this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }else if(this.step == 1 && this.moveTo(700,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 250, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 3, 20, this,rumia, data.getData('Bullet_speed_140'));//shooting 
                    //this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 4, 160, 180, this, data.getData('Bullet_speed_130'));//shooting 
                });
            }
           // this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }else if(this.step == 2 && this.moveTo(500,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircleBullet', 3, 20, this,rumia, data.getData('Bullet_speed_140'));//shooting 
        }else if(this.step == 3){
            this.exitScreen('autoTB')
        }
    }
    //fanr_sr3f_at
    fromRight_shootRed3Fan_autoTB(){
        if(this.moveTo(700,-1,data.getData('emeny_speed_normal130')) && this.step == 0){
            this.step +=1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 2, 150, 210, this, data.getData('Bullet_speed_130'));//shooting 
                });
            }
            this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }
        if(this.step == 2){
            this.exitScreen('autoTB')
        }
    }
    //list r_r3l_at
    fromRight_shoot3List_autoTB(){
        
        if(this.step == 0&& this.moveTo(850,-1,data.getData('emeny_speed_normal120'))  ){
            
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('redArrowBullet', 2, 250, this, rumia, data.getData('Bullet_speed_160'));
        }
        else if(this.step ==1 && this.moveTo(750,-1,data.getData('emeny_speed_normal120')) ){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueArrowBullet', 6, 250, this, rumia, data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 3 && this.moveTo(500,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueArrowBullet', 2, 250, this, rumia, data.getData('Bullet_speed_150'));
        }else if(this.step == 4 ){
            this.exitScreen('autoTB',data.getData('emeny_speed_normal120'),-1)
        }
    }

    //r_sbf3t_srf2t
    fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop(){
        
        if(this.step == 0 && this.moveTo(-1,750,data.getData('emeny_speed_normal100'))){
            this.step +=1
            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    if(this.isDrop) return
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircleBullet', 3, 8,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
                   
                });
            }
            this.scene.time.delayedCall(500, () => this.step +=1, [], this);//step2
        }
        
        if(this.step == 2 && this.moveTo(-1,550,data.getData('emeny_speed_normal100'))){
            this.step +=1;
            this.scene.shootingLogic.listType_ToTarget('redLongSemicircleBullet', 4, 300, this, rumia, data.getData('Bullet_speed_180'));
            this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircleBullet', 2, 17,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
            
            this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('top',data.getData('emeny_speed_normal100'),0);
        }
    }
    //t_sbf2t_srl1_b
    fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom(){
        if(this.step == 0 && this.moveTo(-1,120,data.getData('emeny_speed_normal100'))){
            this.step += 1
            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    if(this.isDrop)
                        return;
                this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircleBullet', 3, 8,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
                });
            }
            this.scene.time.delayedCall(500, () => this.step +=1, [], this);//step2
        }
        if(this.step == 2 && this.moveTo(-1,240,data.getData('emeny_speed_normal100'))){
            this.step += 1
            this.scene.shootingLogic.listType_ToTarget('blueLongSemicircleBullet', 4, 300, this, rumia, data.getData('Bullet_speed_180'));
            this.scene.shootingLogic.listType_ToTarget('redSmallCircleBullet', 2, 300, this, rumia, data.getData('Bullet_speed_130'));
            this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4 ){
            this.exitScreen('bottom', data.getData('emeny_speed_normal100') ,0);
        }
    }
    //b_srf3t_t
    fromTop_shootBlueFan2ToTarget_shootRedList1_toTarget(){
        if(this.step == 0 && this.moveTo(950,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            let b = this.getRandomColorBullet('speedPause')
            for (let i = 0; i < 2; i++) {
                this.scene.time.delayedCall(i * 180, () => {
                    if(this.isDrop) return;
                    let bulletGroup =this.scene.shootingLogic.fanShapedType_ToTarget(b, 5, 25,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting
                    //let bulletGroup = this.scene.shootingLogic.fanShapedType_ToDirection('redSpeedPauseBullet', 5, 100, 150, this, data.getData('Bullet_speed_130'));//shooting 
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 1&& this.moveTo(750,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.scene.shootingLogic.randomFanShapedType_ToTarget('blueSmallCircleBullet', 4, 55, this, rumia, data.getData('Bullet_speed_130'));
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2 
        }
        else if(this.step == 2&& this.moveTo(550,-1,data.getData('emeny_speed_normal120'))){
            this.exitScreen('autoTB',data.getData('emeny_speed_normal120'),-data.getData('emeny_speed_normal100'));
        }
        
    }

    shoot_fanShapeTypeSniperBulletToTarget_AutoTB(){
        if(this.step == 0 && this.moveTo(950,-1,data.getData('emeny_speed_normal100'))){
            this.step += 1
            let b = this.getRandomColorBullet('speedPause');
            for (let i = 0; i < 2; i++) {
                this.scene.time.delayedCall(i * 380, () => {
                    if(this.isDrop) return;
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToTarget(b, 5, 12,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
                    //let bulletGroup = this.scene.shootingLogic.fanShapedType_ToDirection('blueSpeedPauseBullet', 5, 100, 150, this, data.getData('Bullet_speed_130'));//shooting 
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 1&& this.moveTo(750,-1,data.getData('emeny_speed_normal100'))){
            this.step += 1
            this.scene.shootingLogic.randomFanShapedType_ToTarget(this.getRandomColorBullet('smallCircle'), 4, 55, this, rumia, data.getData('Bullet_speed_130'));
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2 
        }
        else if(this.step == 2&& this.moveTo(550,-1,data.getData('emeny_speed_normal100'))){
            this.exitScreen('autoTB',data.getData('emeny_speed_normal120'),-data.getData('emeny_speed_normal100'));
        }
    }

    //b_sbf3t_t
    fromBottom_shootRedFan3ToTarget_toTop(){

        if(this.step == 0 && this.moveTo(950,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            for (let i = 0; i < 2; i++) {
                this.scene.time.delayedCall(i * 180, () => {
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToDirection('blueSpeedPauseBullet', 5, 100, 150, this, data.getData('Bullet_speed_130'));//shooting 
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                });
            }
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 1&& this.moveTo(750,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.scene.shootingLogic.randomFanShapedType_ToTarget('redSmallCircleBullet', 4, 55, this, rumia, data.getData('Bullet_speed_130'));
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2 
        }
        else if(this.step == 2&& this.moveTo(550,-1,data.getData('emeny_speed_normal120'))){
            this.exitScreen('autoTB',data.getData('emeny_speed_normal120'),-data.getData('emeny_speed_normal100'));
        }
    }

    fromRight_shootExpandFanRedBlue_autoTB(){
        if(this.step == 0 && this.moveTo(600,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            let choose = this.getRandomColorBullet('longSemicircle')
            
            this.scene.shootingLogic.expandFanType_ToTarget(choose, 15, 70, 200, this, rumia,  data.getData('Bullet_speed_150') );//shooting

            this.scene.time.delayedCall(1700, () =>  this.step += 1, [], this);//step2
        }else if(this.step == 2 ){
            this.exitScreen('autoTB', data.getData('emeny_speed_normal100') , data.getData('emeny_speed_normal120'));
        }
    }

    fromRight_shootFanRedBlue_autoTB(){
        if(this.step == 0 && this.moveTo(900,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.fromRight_shootFanRedBlue_autoTBHelp();
           // this.scene.time.delayedCall(5000, () => this.isDone = true, this.step += 1, [], this);//step2
        }else if(this.step == 1 && this.moveTo(750,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.fromRight_shootFanRedBlue_autoTBHelp();
           // this.scene.time.delayedCall(5000, () => this.isDone = true, this.step += 1, [], this);//step2
        }else if(this.step == 2 && this.moveTo(550,-1,data.getData('emeny_speed_normal120'))){
            this.step += 1
            this.fromRight_shootFanRedBlue_autoTBHelp();
           // this.scene.time.delayedCall(5000, () => this.isDone = true, this.step += 1, [], this);//step2
        }else if(this.step == 3 ){
            this.exitScreen('autoTB',data.getData('emeny_speed_normal100') , data.getData('emeny_speed_normal120'));
        }
    }
    fromRight_shootFanRedBlue_autoTBHelp(){
        let b = ['blueLongSemicircleBullet', 'redLongSemicircleBullet'];
        let choose;
        choose = Phaser.Math.RND.pick(b);
        this.scene.shootingLogic.randomFanShapedType_ToTarget(choose, 4, 55, this, rumia, data.getData('Bullet_speed_150'));
    }

    dropOff(){
        this.anims.stop();
        
        if(!this.isDrop){
            this.sprawnScore(47);
            switch(this.subtype){
                case 'MaidFairy1':
                    this.setTexture('MaidFairy1_Hit');
                    break;
                case 'MaidFairy2':
                    this.setTexture('MaidFairy2_Hit');
                    break;
                case 'MaidFairy3':
                    this.setTexture('MaidFairy3_Hit');
                    break;
            }
            
        }
            
        super.dropOff(3300,data.getData('emeny_speed_normal160'),-data.getData('emeny_speed_normal100'));
        
    }

}