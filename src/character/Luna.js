class Luna extends Character{
    constructor(scene, x, y,subtype , frame) {
        super(scene, x, y, 'Luna1','Luna'); // Start with the first texture
        //this.Xspeed = data.getData('blueDivineSpirit_speed'); // Move speed
        this.body.setSize(data.getData('SunnyMilk_width'), data.getData('SunnyMilk_height'));
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
        
        if(this.isDone){
            if(this.isFirst ){
                this.behavior = 'b_sbf3t_t'
                this.isFirst = false
                
            }else{
                this.behavior = this.getBehavior(this.previousBehavior);
                
            }
            this.previousBehavior =this.behavior;
            this.step = 0;
            
        }
        
        this.isDone = false;
        switch(this.behavior){
            case 'b_sbf3t_t':
                this.b_sbf3t_t();
                break;
            
        }
        

    }
    b_sbf3t_t(){
        if(this.step == 0 && this.moveTo(900)){
            this.step += 1
            for (let i = 0; i < 26; i++) {
                this.scene.time.delayedCall(i * 180, () => {
                    this.scene.shootingLogic.fanShapedType_ToTarget('blueMediumCircleBullet', 5, 90,  this, rumia, data.getData('Bullet_speed_150')) ;//shooting 
                });
            }
            //this.scene.time.delayedCall(1000, () => this.step +=1, [], this);//step2
        }
    }
    dropOff(){
        
    }
}