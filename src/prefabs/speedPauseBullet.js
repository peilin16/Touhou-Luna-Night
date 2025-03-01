class speedPauseBullet extends Bullet {
    constructor(scene, x, y, target, speed = 2, subtype = 'bs') {
        let texture = '';
        let bulletType = '';

        if (subtype === 'bs') {
            texture = 'blueArrowBullet';
            bulletType = 'blueSpeedPauseBullet';
        } else if (subtype === 'rs') {
            texture = 'redArrowBullet';
            bulletType = 'redSpeedPauseBullet';
        }

        super(scene, x, y, texture, target, bulletType);

        // ✅ Set properties
        this.subtype = subtype;
        this.speed = speed;
        this.periousSpeed = speed;
        this.originalSpeed = speed; // Store original speed
        this.pauseMin = 1000; // How long to pause (in ms)
        this.delayPauseMin = 50; // Initial delay before pausing (in ms)
        this.isPause = false; // Whether the bullet has paused
        this.isSniper = false; // Whether it will change direction to target after pause
        this.accelerate = 0; // If > 0, bullet will speed up after pause
        this.hasPaused = false; // Tracks if pause has already happened

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.setVelocity(0, 0);
        this.body.setSize(23, 14);
        this.setDepth(10);
        this.isSetUpDelay = false;
        // ✅ If red, mark as non-reflectable
        if (subtype === 'rs') {
            this.isRed = true;
            this.ableToReflect = false;
        }

        
    }

    update(time, delta) {
        if (!this.scene || !this.active) return; // ✅ Prevent errors if bullet is destroyed
        super.update(time, delta);
    
        if (!this.isSetUpDelay && this.delayPauseMin !== 50) {
            this.isSetUpDelay = true;
            this.scene.time.delayedCall(this.delayPauseMin, () => {
                if (!this.scene || !this.active) return; // ✅ Prevent errors if bullet is destroyed
                this.pauseBullet();
            });
        }
    
        // ✅ Resume movement after pause
        if (this.isPause && !this.hasPaused) {
            this.hasPaused = true;
            this.scene.time.delayedCall(this.pauseMin, () => {
                if (!this.scene || !this.active) return; // ✅ Prevent errors if bullet is destroyed
                this.resumeBullet();
            });
        }
    }

    pauseBullet() {
        if (this.isPause) return;
        this.isPause = true;
        this.speed = 0;
    }

    resumeBullet() {
        this.isPause = false;
        this.speed = this.periousSpeed
        if (this.isSniper && this.target) {
            // ✅ Change direction towards target after pause
            let direction = new Phaser.Math.Vector2(
                this.target.x - this.x,
                this.target.y - this.y
            ).normalize();
            if(!this.isTwirl){
                this.setOrientation(direction.x,direction.y);
            }
            this.vx = direction.x * (this.speed + this.accelerate);
            this.vy = direction.y * (this.speed + this.accelerate);
        } else {
            // ✅ Continue in current direction, possibly accelerating
            let speedMultiplier = this.accelerate > 0 ? this.accelerate : 1;
            this.vx *= speedMultiplier;
            this.vy *= speedMultiplier;
        }
    }
}