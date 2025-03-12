class Daiyousei extends Character{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'DaiyouseiScore1', frame)
        this.anims.create({
            key: 'DaiyouseiNothing',
            frames: [
                { key: 'DaiyouseiNothing1' },
                { key: 'DaiyouseiNothing2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });

        this.anims.create({
            key: 'DaiyouseiScore',
            frames: [
                { key: 'DaiyouseiScore1' },
                { key: 'DaiyouseiScore2' },
            ],
            frameRate: 10, // 10 frames per second
            repeat: -1 // Loop infinitely
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.play('DaiyouseiScore'); // Play the 'rumiaFly' animation
        this.healthly = 999999
        this.behavior = 'healthly'
        this.isEmeny = false;
        this.isDrop = false;
        this.ableToDefence = false; 
        this.body.setSize(75, 75, true); // Adjust hitbox size
        this.body.setOffset(0, 5);  
    }
    update(time, delta) {
        super.update(time, delta);
        if(this.isMoveExit){
            this.setTexture('Daiyousei-nothingRight1')
            super.Level1BossMoveRight();
            return;
        }



        if(!this.isDrop)
            this.exitScreen('left',data.getData('emeny_speed_normal100'))
        else
            this.exitScreen('top',data.getData('emeny_speed_normal100'),-data.getData('emeny_speed_normal100'));
    }
    collide(player){
        
        if(this.behavior == 'healthly' && !this.isDrop ){
            this.setTexture('DaiyouseiNothing1')
            player.healthly += 1;
        }
        this.isDrop = true;
    }
    dropOff(){
        if(!this.isDrop)
        
        this.isDrop = true;
        
    }



}