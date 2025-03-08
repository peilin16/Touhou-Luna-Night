class MusicSignBullet extends Bullet {
    constructor(scene, x, y, target , speed = 2, subtype = 'redMusicSign1Bullet') {
        let texture = subtype;
        
        super(scene, x, y, texture, target,subtype);
        this.target = target;
        
        
        this.speed = speed;

        // Store the original texture/color
        this.originalTexture = texture;
        
        // Set isRed flag based on initial texture
        this.isRed = texture.startsWith('red');

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true); // ✅ Prevents movement from collisions
        this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place
        // Determine the alternate color texture
        this.alternateTexture = this.getAlternateTexture(texture);

        if (texture.includes('MusicSign1')) {
            
            
            this.body.setSize(data.getData('musicSignBulle1Width')+5, data.getData('musicSignBulle1High'));
            //this.body.setSize(35, 39);
        } 
        else if (texture.includes('MusicSign2')) {
            
            this.body.setSize(data.getData('musicSignBulle2Width'), data.getData('musicSignBulle2High'));
            
            //this.body.setOffset(offsetX, offsetY);
        }
        this.body.setOffset(0, 0); // Ensure no offset issues
        // Set up the color change timer
        this.colorChangeTimer = scene.time.delayedCall(1200, this.attemptColorChange, [], this);
        
        // Flag to track if color has already changed or been checked
        this.colorChangeAttempted = false;
        
        this.mustChange = false;

        // Reflection flag
        this.isReflect = false;
    }
    
    getAlternateTexture(currentTexture) {
        // Map of textures to their alternate versions
        const textureMap = {
            'blueMusicSign1Bullet': 'redMusicSign1Bullet',
            'redMusicSign1Bullet': 'blueMusicSign1Bullet',
            'blueMusicSign2Bullet': 'redMusicSign2Bullet',
            'redMusicSign2Bullet': 'blueMusicSign2Bullet'
        };
        
        return textureMap[currentTexture] || currentTexture;
    }
    
    attemptColorChange() {
        // Only attempt color change if:
        // 1. Bullet is still active
        // 2. Color change hasn't been attempted yet
        // 3. Bullet hasn't been reflected
        if (!this.active || this.colorChangeAttempted || this.isReflect) return;
        
        // Mark that we've attempted the color change
        this.colorChangeAttempted = true;
        
        // 50% chance to change color
        if (Phaser.Math.Between(0, 1) === 1 || this.mustChange) {
            // Change texture
            this.setTexture(this.alternateTexture);
            
            // Update isRed flag
            this.isRed = !this.isRed;
            
            // Optional: Add a visual effect for the color change
            this.scene.tweens.add({
                targets: this,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
                repeat: 1
            });
        }
    }
    
    // Method to handle bullet reflection
    reflect() {
        super.reflect(); // Call parent reflect method if it exists
        
        // Mark as reflected
        this.isReflect = true;
        
        // If we haven't attempted color change yet, cancel the timer
        if (!this.colorChangeAttempted && this.colorChangeTimer) {
            this.colorChangeTimer.remove();
            this.colorChangeTimer = null;
        }
    }
    
    // Override the reset method to reset all state
    reset(x, y, texture) {
        super.reset(x, y, texture || this.originalTexture);
        
        // Reset state
        this.originalTexture = texture || this.originalTexture;
        this.isRed = this.originalTexture.startsWith('red');
        this.alternateTexture = this.getAlternateTexture(this.originalTexture);
        this.colorChangeAttempted = false;
        this.isReflect = false;
        
        // Set up a new color change timer
        if (this.colorChangeTimer) this.colorChangeTimer.remove();
        this.colorChangeTimer = this.scene.time.delayedCall(1200, this.attemptColorChange, [], this);
    }
    
    // Override the update method if needed
    update(time, delta)  {
        super.update(time, delta);
        
        // Add any additional update logic specific to MusicSignBullet
    }
    
    // Override the destroy method to clean up the timer
    destroy(fromScene) {
        if (this.colorChangeTimer) {
            this.colorChangeTimer.remove();
            this.colorChangeTimer = null;
        }
        super.destroy(fromScene);
    }
}
