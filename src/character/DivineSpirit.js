class DivineSpirit extends Character {
    constructor(scene, x, y,subType = 'blue') {
        if(subType == 'blue'){
            super(scene, x, y, 'DivineSpiritBlue1','DivineSpirit'); // Start with the first texture
            this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
            this.body.setSize(data.getData('blueDivineSpirit_width'), data.getData('blueDivineSpirit_height'));
            this.anims.create({
                key: 'BlueDivineSpirit',
                frames: [
                    { key: 'DivineSpiritBlue1' },
                    { key: 'DivineSpiritBlue2' },
                    { key: 'DivineSpiritBlue3' },
                ],
                frameRate: 10, // 10 frames per second
                repeat: -1 // Loop infinitely
            });
            this.subType = subType;
            this.anims.play('BlueDivineSpirit');
            super.healthly = 15;
        }else if(type == 'red'){

        }
        
        
        
        
        this.scene = scene;
        this.setOrigin(0.5);
        
        // Enemy Properties
        this.isEmeny = true;
        
        //this.type = 'DivineSpirit'
        
        this.hasExited = false; // Ensures it exits properly
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setOffset(3, 4);
        //this.body.setVelocityX(-this.speed); // Move towards the right quarter of the screen
        
        
    }

    update(time, delta) {
        super.update(time, delta);
        if(this.isDrop){
            return
        }
        switch(this.behavior){
            case 'r_shooting2_l':
                this.r_shooting2_l();
                break;
            case 'r_sbl1_srl1_srl1_tb':
            case 'right_shootingBlueList_ShootingRedList_autoTB':
                this.right_shootingBlueList_ShootingRedList_autoTB();
                break;
            case 'right_shootingFan2BlueBullet_AutoTopDown':
            case 'r_sr4_tb':
                this.right_shootingFan2BlueBullet_AutoTopDown();
                break; 

            case 'right_shootingFan2RedBullet_AutoTopDown':
                this.right_shootingFan2RedBullet_AutoTopDown();
                break; 

        }

    }


    r_shooting2_l() {
        if (this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal130'))){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueMediumCircleBullet', 5, 200, this, rumia,data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(3400, () => this.step +=1, [], this);//step2
        } 
        if(this.step == 2){
            this.step +=1;
            this.scene.shootingLogic.listType_ToTarget('redMediumCircleBullet', 2, 300, this, rumia,rumia,data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(3400, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('autoTB', data.getData('emeny_speed_normal130'), -data.getData('emeny_speed_normal100'))
        }
    }
    right_shootingBlueList_ShootingRedList_autoTB(){
        if(this.step == 0 && this.moveTo(900,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //listType_ToTarget(bulletType, num, sperate, shooter, target, speed, offset = 'No')
            this.scene.shootingLogic.listType_ToTarget('blueMediumCircleBullet', 3, 100, this, rumia,data.getData('Bullet_speed_150'));
        }else if(this.step == 1 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueMediumCircleBullet', 3, 100, this, rumia,data.getData('Bullet_speed_150'));
        }else if(this.step == 2 && this.moveTo(700,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('blueMediumCircleBullet', 3, 100, this, rumia,data.getData('Bullet_speed_150'));
        }else if(this.step == 3 && this.moveTo(630,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('redMediumCircleBullet', 3, 100, this, rumia,data.getData('Bullet_speed_150'));
        }else if(this.step == 4 && this.moveTo(540,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            this.scene.shootingLogic.listType_ToTarget('redMediumCircleBullet', 3, 100, this, rumia,data.getData('Bullet_speed_150'));
        }else if(this.step == 5){
            this.exitScreen('autoTB',data.getData('emeny_speed_normal100'), -1);
        }
    }
    //fanType 360
    right_shootingFan2BlueBullet_AutoTopDown(){
        if (this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal120'))){
            this.step +=1
            //fanShapedType_ToTarget(bulletType, num,  offsetAngle, shooter, target, speed) 
            this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 2,5, this, rumia,data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(4400, () => this.step +=1, [], this);//step2
        } 
        if(this.step == 2){
            this.step +=1;
            this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 2,5, this, rumia,data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(3400, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('autoTB', data.getData('emeny_speed_normal120'), -data.getData('emeny_speed_normal130'))
        }
    }
    right_shootingFan2RedBullet_AutoTopDown(){
        if (this.step == 0 && this.moveTo(850,-1,data.getData('emeny_speed_normal130'))){
            this.step +=1
            //fanShapedType_ToTarget(bulletType, num,  offsetAngle, shooter, target, speed) 
            this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircleBullet', 2,5, this, rumia,data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(4400, () => this.step +=1, [], this);//step2
        } 
        if(this.step == 2){
            this.step +=1;
            this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircleBullet', 2,5, this, rumia,data.getData('Bullet_speed_150'));
            this.scene.time.delayedCall(4400, () => this.step +=1, [], this);//step2
        }
        if(this.step == 4){
            this.exitScreen('autoTB', data.getData('emeny_speed_normal130'), -data.getData('emeny_speed_normal100'))
        }
    }
    collide(){
        this.healthly -=5
    }
    dropOff(){
        this.sprawnScore(26);
        super.dropOff();
    }
    
}