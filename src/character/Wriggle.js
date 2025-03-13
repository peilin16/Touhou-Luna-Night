class Wriggle extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'WriggleFly1','Wriggle'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('Wriggle_width'), data.getData('Wriggle_height'));
        this.anims.create({
            key: 'Wriggle',
            frames: [
                { key: 'Wriggle1' },
                { key: 'Wriggle2' },
                { key: 'Wriggle3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        this.anims.create({
            key: 'WriggleFly',
            frames: [
                { key: 'WriggleFly1' },
                { key: 'WriggleFly2' },
                { key: 'WriggleFly3' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        this.subType = subtype;
        this.anims.play('WriggleFly');
        
        
        this.behaviors = [ 'shootBlueRedRandomFanShapedType_toDirection','shootingBlueFan_shootingRedFan', 'shootFanShape_Moving3Time'];
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setOffset(5, 6);
        this.healthly = 1050;
        this.isDrop = false;
        this.kind = 'f'
        this.isEmeny = true;
        this.isDone = false;
        this.isFirst = true
        this.secondState = false
        this.score = 13
        this.current = 0;
    }
    

    update(time, delta){
        super.update(time, delta);
        if(this.isDrop)
            return
        if(this.isMoveExit){
            super.Level1BossMoveRight();
            return;
        }

        if(this.isFirst){
            if(!this.first_move())
                return;
            this.anims.play('Wriggle');
            this.previousBehavior =this.behavior;
            this.scene.time.delayedCall(1300, () => this.behavior = 'shootBlueRedRandomFanShapedType_toDirection', [], this);//step2
            this.isFirst = false
        }else if(this.healthly <= 180 && !this.secondState){
            this.secondState = true
            this.isDone = true;
            this.scene.sprawnScore(222,this);
        }
        
        if(this.isDone){
            this.behavior = this.getBehavior();
            this.step = 0;
        }
        this.isDone = false;
        switch(this.behavior){
            case 'r_sbf4_srf1':
            case 'shootingBlueFan_shootingRedFan':
                this.shootingBlueFan_shootingRedFan();
                break;
            case 'shootBlueRedRandomFanShapedType_toDirection':
                this.shootBlueRedRandomFanShapedType_toDirection();
                break;
            case 'shootFanShape_Moving3Time':
                this.shootFanShape_Moving3Time();
                break;
            case 'shootBlueRedRandomFanShapedType_toDirectionEnhance':
                this.shootBlueRedRandomFanShapedType_toDirectionEnhance();
                break;
        }
        

    }

    getBehavior() {
        if(this.healthly <= 180)
            return 'shootBlueRedRandomFanShapedType_toDirectionEnhance';
        if(this.current >= this.behaviors.length - 1)
            this.current = 0;
        else
            this.current++;
        return this.behaviors[this.current];
    }
    
    dropOff(){
        if(!this.isSprawnScore){
            this.isSprawnScore = true;
            this.setTexture('WriggleHit');
            this.scene.sprawnScore(307,this);
        }
        
        super.dropOff();
    }
    first_move(){
        if(this.moveTo(800,270,data.getData('emeny_speed_normal120')))
            return true
        return false;
    }
    shootingBlueFan_shootingRedFan(){
        if( this.step == 0 &&this.moveTo(800,270,data.getData('emeny_speed_normal170')) ){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        if(this.isDrop || this.behavior != 'shootingBlueFan_shootingRedFan') return
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 4,  10, this, rumia, data.getData('Bullet_speed_180'))
                    });
                }

            }, [], this);//step2
            
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 2 &&this.moveTo(700,140,data.getData('emeny_speed_normal170'))){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        if(this.isDrop || this.behavior != 'shootingBlueFan_shootingRedFan') return
                        this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircleBullet', 4,  10, this, rumia, data.getData('Bullet_speed_180'))
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 4 &&this.moveTo(600,170,data.getData('emeny_speed_normal170')) ){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        if(this.isDrop || this.behavior != 'shootingBlueFan_shootingRedFan') return
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircleBullet', 4,  15, this, rumia, data.getData('Bullet_speed_180'))
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }
        else if(this.step == 6&&this.moveTo(700,520,data.getData('emeny_speed_normal170'))){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        if(this.isDrop || this.behavior != 'shootingBlueFan_shootingRedFan') return
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 4,  15, this, rumia, data.getData('Bullet_speed_180'))
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }else if(this.step == 8&&this.moveTo(650,320,data.getData('emeny_speed_normal170'))){
            this.step +=1
            this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
            this.scene.time.delayedCall(300, () => {
                for (let i = 0; i < 6; i++) {
                    this.scene.time.delayedCall(i * 150, () => {
                        // ✅ Get a new bullet instance
                        if(this.isDrop || this.behavior != 'shootingBlueFan_shootingRedFan') return
                        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 10, 0, 324, this, data.getData('Bullet_speed_180'));//shooting 
                        this.scene.shootingLogic.fanShapedType_ToTarget('redMediumCircleBullet', 4,  15, this, rumia, data.getData('Bullet_speed_180'))
                    });
                }

            }, [], this);//step2
            this.scene.time.delayedCall(1300, () => this.step +=1, [], this);//step2
        }else if(this.step == 10){
            this.step +=1
            this.scene.time.delayedCall(1300, () => this.isDone = true, [], this);//step2
        }

    }
    shootBlueRedRandomFanShapedType_toDirection(){
        if( this.step == 0 &&this.moveTo(800,270,data.getData('emeny_speed_normal180')) ){
            this.step +=1
            for (let i = 0; i < 66; i++) {
                this.scene.time.delayedCall(i * 320, () => {
                    // ✅ Get a new bullet instance
                    if(this.isDrop || this.behavior != 'shootBlueRedRandomFanShapedType_toDirection') return
                    this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 19, 0, 360, this,data.getData('Bullet_speed_130'));//shooting 
                    this.scene.shootingLogic.randomfanShapedType_toDirection('redMediumCircleBullet',9, 0, 360, this, data.getData('Bullet_speed_150'));//shooting 
                });
            }
            this.scene.time.delayedCall(23100, () => this.isDone = true, [], this);//step2
        }
        
    }
    shootFanShape_Moving3Time(){
        if( this.step == 0 &&this.moveTo(800,100,data.getData('emeny_speed_normal180')) ){
            this.step +=1
            let rl = ['redLongSemicircleBullet','blueLongSemicircleBullet']
            for (let i = 0; i < 76; i++) {
                this.scene.time.delayedCall(i * 450, () => {
                    // ✅ Get a new bullet instance
                    if(this.isDrop || this.behavior != 'shootFanShape_Moving3Time') return
                    this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 13, 0, 324, this, data.getData('Bullet_speed_130'));//shooting 
                });
            }
            for (let i = 0; i < 52; i++) {
                this.scene.time.delayedCall(i * 650, () => {
                    // ✅ Get a new bullet instance
                    if(this.isDrop|| this.behavior != 'shootFanShape_Moving3Time') return
                    let t = Phaser.Math.RND.pick(rl);
                    this.scene.shootingLogic.fanShapedType_ToTarget(t, 3,  2, this, rumia, data.getData('Bullet_speed_130'))
                });
            }
            for (let i = 0; i < 36; i++) {
                this.scene.time.delayedCall(i * 950, () => {
                    if(this.isDrop || this.behavior != 'shootFanShape_Moving3Time') return
                    this.scene.shootingLogic.fanShapedType_ToDirection('redMediumCircleBullet', 13, 0, 324, this, data.getData('Bullet_speed_150'))
                });
            }
            this.scene.time.delayedCall(38000, () => this.isDone = true, [], this);
        }

    }
    shootBlueRedRandomFanShapedType_toDirectionEnhance(){
        if( this.step == 0 &&this.moveTo(800,270,data.getData('emeny_speed_normal170')) ){
            this.step +=1
            for (let i = 0; i < 67; i++) {
                this.scene.time.delayedCall(i * 320, () => {
                    if(this.isDrop|| this.behavior != 'shootBlueRedRandomFanShapedType_toDirectionEnhance') return
                    this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 22, 0, 360, this,data.getData('Bullet_speed_130'));//shooting 
                    this.scene.shootingLogic.randomfanShapedType_toDirection('redMediumCircleBullet',10, 0, 360, this, data.getData('Bullet_speed_150'));//shooting 
                });
            }
            this.scene.time.delayedCall(22100, () => this.isDone = true, [], this);//step2
        }
        
    }

}