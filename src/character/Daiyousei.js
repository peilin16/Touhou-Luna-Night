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

        this.behavior = 'healthly'
        this.isEmeny = false;
        this.isDrop = false;
        this.ableToDefence = false; 
        this.body.setSize(75, 75, true); // Adjust hitbox size
        this.body.setOffset(0, 5);  
    }
    update(time, delta) {
        super.update(time, delta);
        if(!this.isDrop)
            this.exitScreen('left')
        else
            this.exitScreen('top',2,-2);
    }
    
    behavior(player){
        this.isDrop = true;
        if(this.behavior == 'healthly'){
            player.healthly += 1;
        }
        
    }
    dropOff(){
        this.setTexture('DaiyouseiNothing1')
        //this.anims.stop();
        //this.play('DaiyouseiNothing'); // Play the 'rumiaFly' animation
    }



}