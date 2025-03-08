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
        // Calculate angle between direction vector and origin
        let angle = Phaser.Math.Angle.Between(0, 0, oX, oY);
        
        // Set sprite rotation
        this.rotation = angle;
        
        // Get bullet dimensions
        const bulletWidth = this.width;
        const bulletHeight = this.height;
        
        // Store original dimensions if not already stored
        if (!this.originalWidth) this.originalWidth = bulletWidth;
        if (!this.originalHeight) this.originalHeight = bulletHeight;
        
        // Determine if this is a "long" bullet (significantly longer in one dimension)
        const isLongBullet = this.originalHeight > this.originalWidth * 1.5 || 
                             this.originalWidth > this.originalHeight * 1.5;
        
        if (isLongBullet) {
            // For long bullets, we need to adjust the hitbox based on rotation
            
            // Calculate the absolute sine and cosine of the angle
            const absCos = Math.abs(Math.cos(angle));
            const absSin = Math.abs(Math.sin(angle));
            
            // Calculate rotated dimensions
            const rotatedWidth = this.originalWidth * absCos + this.originalHeight * absSin;
            const rotatedHeight = this.originalWidth * absSin + this.originalHeight * absCos;
            
            // Set the physics body size to match the rotated dimensions
            this.body.setSize(rotatedWidth * 0.8, rotatedHeight * 0.8);
            
            // Center the hitbox
            this.body.setOffset(
                (this.originalWidth - rotatedWidth * 0.8) / 2,
                (this.originalHeight - rotatedHeight * 0.8) / 2
            );
        } else {
            // For roughly square bullets, use a circular hitbox
            const minDimension = Math.min(this.originalWidth, this.originalHeight) * 0.8;
            this.body.setCircle(minDimension / 2);
            
            // Center the circular hitbox
            this.body.setOffset(
                (this.originalWidth - minDimension) / 2,
                (this.originalHeight - minDimension) / 2
            );
        }
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