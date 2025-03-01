class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,target,type= 'blueSmallCircleBullet') {
        super(scene, x, y, texture);

        
        // Bullet properties
        this.type =type
        this.speed = 10; // Default speed
        this.isRed = false; // If the bullet has been deflected
        this.target = target; // Target for homing bullets
        this.ableToReflect = true;
        this.shooter = null; // Who shoot this bullet
        this.atk = 7;
        // Add to scene and enable physics
        this.vx = 0;
        this.vy = 0;
        //if rotate
        this.isTwirl = false;
        //toward
        //this.orientationX = 0;
        this.hitboxes = []

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isReflected = false
        //this.body.setSize(10, 10);
    }
    moving() {
       
    }
        // Bullet movement logic
    // Behavior when bullet interacts with an object
    /*behavior(obj) {
        if (obj.isdefence) {
            this.isAfterDefence = true;
            this.body.setVelocityY(-this.speed * 0.8);
            this.setTint(0x00ff00); // Change color to indicate deflection
        }
    }*/
    /*
    setOrientation( oX, oY){
        this.rotation = Phaser.Math.Angle.Between(0, 0, oX, oY);
    }
    */
    setOrientation(oX, oY) {
        let angle = Phaser.Math.Angle.Between(0, 0, oX, oY);
        
        this.rotation = angle; // ✅ Rotate the sprite
    
        // ✅ Adjust physics body shape (if long bullet)
        //this.body.setSize(this.width, this.height * 0.3); // Adjust hitbox size
        //this.body.setOffset(this.width / 2, this.height / 2); // Center hitbox
    
        // ✅ Rotate the physics body
        this.body.angle = Phaser.Math.RadToDeg(angle);
    }



    dropOff(isExplosion = true) {

        if(isExplosion)
            new Explosion(this.scene, this.x, this.y, 'small');
        if (this.collider) {
            this.collider.destroy(); // ✅ Remove collider from physics world
            this.collider = null;    // ✅ Avoid referencing it again
        }
        if (this.scene && this.scene.bulletGroup) {
            this.scene.bulletGroup.remove(this, true, true); // ✅ Remove from bullet group
        }
        this.setActive(false);  // ✅ Remove from update loop
        this.setVisible(false); // ✅ Hide the bullet
        //this.body.enable = false; // ✅ Disable physics body
        if (this.hitboxes) {
            this.hitboxes.forEach(hitbox => hitbox.destroy());
        }

        // ✅ Create explosion when the bullet hits something
        


        this.destroy();



    }

    
    // Update function to remove bullets when they go off-screen
    update(time, delta) {
        





        let dt = delta / 1000; // ✅ Convert `delta` from milliseconds to seconds
        this.x += this.vx * this.speed * dt; // ✅ Scale movement by `dt`
        this.y += this.vy * this.speed * dt; // ✅ Scale movement by `dt`
        this.checkDestory();
    }
    checkDestory(){
        if (this.y < -150) {
            this.dropOff();
        }
        else if (this.y > boardheigh + 100) {
            this.dropOff();
        }
        else if (this.x < -150) {
            this.dropOff();
        }
        else if (this.x > boardwidth + 100) {
            this.dropOff();
        }
    }
}