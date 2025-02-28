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
        }else{
            super(scene, x, y, 'MaidFairy1_2', frame)
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
    update() {
        super.update();
        if(this.isDrop)
            return
        switch(this.behavior){
            case 'r_sb4f_at':
                this.r_sb4f_at();
                break;
            case 'r_sr3f_at':
                this.r_sr3f_at();
                break;
            case 'r_sbf3t_srf2t':
                this.r_sbf3t_srf2t();
                break; 
            case 't_sbf2t_srl1_b':
                this.t_sbf2t_srl1_b();
                break; 
            case 'b_srf3t_t':
                this.b_srf3t_t();
                break;
            case 'b_sbf3t_t':
                this.b_sbf3t_t();
                break;    
        }
        
    }

    r_sb4f_at(){
        if(this.moveTo(700,-1,1.8) && this.step == 0){
            this.step +=1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 4, 160, 180, this, data.getData('Bullet_speed_130'));//shooting 
                });
            }
            this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }
        if(this.step == 2){
            this.exitScreen('autoTB')
        }
    }
    //fan
    r_sr3f_at(){
        if(this.moveTo(700,-1,1.8) && this.step == 0){
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
    //list
    r_r3l_at(){
        
        if(this.step == 0&& this.moveTo(850,-1,1.8)  ){
            
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('redArrowBullet', 2, 250, this, rumia, data.getData('Bullet_speed_150'));
            
        }
        if(this.step ==1 && this.moveTo(750,-1,1.8) ){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueArrowBullet', 3, 250, this, rumia, data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(300, () => this.step +=1, [], this);//step2
        }
        if(this.step == 3){
            this.exitScreen('autoTB',1,-1)
        }
    }


    r_sbf3t_srf2t(){
        
        if(this.step == 0 && this.moveTo(750,-1,1.8)){
            this.step +=1
            for (let i = 0; i < 5; i++) {
                this.scene.time.delayedCall(i * 150, () => {
                    // ✅ Get a new bullet instance
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircleBullet', 2, 17,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
                   
                });
            }
            this.scene.time.delayedCall(500, () => this.step +=1, [], this);//step2
        }
        
        if(this.step == 2 && this.moveTo(550,-1,2)){
            this.scene.shootingLogic.listType_ToTarget('redLongSemicircleBullet', 4, 300, this, rumia, data.getData('Bullet_speed_180'));
            this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircleBullet', 2, 17,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
            this.step +=1;
            this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('top',1,-1.5);
        }
    }
    t_sbf2t_srl1_b(){
        if(this.step == 0 && this.moveTo(-1,120,1)){
            this.step += 1
            for (let i = 0; i < 3; i++) {
                this.scene.time.delayedCall(i * 180, () => {
                this.scene.shootingLogic.fanShapedType_ToTarget('blueSmallCircleBullet', 3, 8,  this, rumia, data.getData('Bullet_speed_130')) ;//shooting 
                });
            }
        }
        if(this.step == 1 && this.moveTo(-1,240,1)){
            this.step += 1
            this.scene.shootingLogic.listType_ToTarget('redSmallCircleBullet', 2, 300, this, rumia, data.getData('Bullet_speed_130'));
        }
        if(this.step == 2 ){
            this.exitScreen('bottom', 1 ,0);
        }
    }
    b_srf3t_t(){
        if(this.step == 0 && this.moveTo(950,-1,3)){
            this.step += 1
            for (let i = 0; i < 2; i++) {
                this.scene.time.delayedCall(i * 180, () => {
                    let bulletGroup = this.scene.shootingLogic.fanShapedType_ToDirection('redSpeedPauseBullet', 5, 100, 150, this, data.getData('Bullet_speed_130'));//shooting 
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
        else if(this.step == 1&& this.moveTo(750,-1,3)){
            this.step += 1
            this.scene.shootingLogic.randomFanShapedType_ToTarget('blueSmallCircleBullet', 4, 55, this, rumia, data.getData('Bullet_speed_130'));
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2 
        }
        else if(this.step == 2&& this.moveTo(550,-1,3)){
            this.exitScreen('autoTB',2,-1.5);
        }
        
    }
    b_sbf3t_t(){

        if(this.step == 0 && this.moveTo(950,-1,3)){
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
        else if(this.step == 1&& this.moveTo(750,-1,3)){
            this.step += 1
            this.scene.shootingLogic.randomFanShapedType_ToTarget('redSmallCircleBullet', 4, 55, this, rumia, data.getData('Bullet_speed_130'));
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2 
        }
        else if(this.step == 2&& this.moveTo(550,-1,3)){
            this.exitScreen('autoTB',2,-1.5);
        }
    }
    dropOff(){
        this.anims.stop();

        if(!this.isDrop)
            this.setTexture('MaidFairy1_Hit');
        super.dropOff(3300,3,2);
        
    }

}