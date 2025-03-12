class Score extends Character {
    constructor(scene, x, y,subtype) {
        super(scene, x, y, subtype , subtype); // Using 'bug' as the texture (your score image)

        this.ableToDefence = false; 
        this.type =subtype;
        this.isEmeny = false;
        this.isDrop = false;
        this.value = 1;
        this.healthly = 5;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        if(subtype == 'scoreSmall'){
            this.value = 1;
            this.body.setOffset(-10, 10);  
            this.body.setSize(15, 15, true); // Adjust hitbox size
        }else if(subtype == 'scoreMedium'){
            this.value = 10;
            this.body.setOffset(-15, 20);  
            this.body.setSize(25, 25, true); // Adjust hitbox size
        }else if(subtype == 'scoreLarge'){
            this.value = 50;
            this.body.setOffset(-20, 20);  
            this.body.setSize(35, 35, true); // Adjust hitbox size
        } 
        this.body.setOffset(3, 0);
        this.body.setImmovable(true);
    }

    update(time, delta) {
        super.update(time, delta);
        if(this.isDrop) return;
        this.exitScreen('left',data.getData('emeny_speed_normal100'));
    }
    collide(player){
        //this.isDrop = true;
        this.healthly = 0;
        player.Playerscore += this.value;
    }
    dropOff(){
        this.destoryCharacter();
    }
    onPlayerCollide() {
        this.scene.Playerscore += 5; // Increase player score
        this.destroyScore();
    }

    
}