class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,type, frame) {
        super(scene, x, y, texture, frame);

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.score = 35;
        // Default properties for all characters
        this.healthly = 3; 
        this.dt = 0;
        
        this.isEmeny = false; 
        this.isDrop = false; 
        this.type = type; 
        this.ableToDefence = false; 
        this.behavior = '';
        this.subType = '';
        this.step = 0; // Prevents double shooting
        this.heigh = 0;
        this.width = 0;
        this.body.setImmovable(true); // ✅ Prevents movement from collisions
        this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place
        this.isSprawnScore = false;
        // Adjust hitbox
        this.isDone = false;
        this.lastFrameTime = performance.now();
        this.body.setSize(50, 50);
        this.body.setCollideWorldBounds(true);

    }
    update(time, delta){
        this.dt = delta / 1000; // Update time delta
        if(this.healthly <= 0){
            this.dropOff();
        }
        //this.sprawnScore();
    }
    // Method to drop when hit
    dropOff(duration = 700, yspeed = 160 , xspeed = 0) {
        this.isDrop = true;
        
        this.y +=yspeed * this.dt;
        this.x +=xspeed * this.dt;
        this.scene.tweens.add({
            targets: this,
            angle: -360, 
            duration: duration, 
            ease: 'Linear',
            repeat: -1, 
            
        });
        
        this.checkDestroy('bottom');
    }
    getRandomColorBullet(key) {
        let bulletGroup;
        switch(key) {
            case 'smallCircle':
                bulletGroup = ['blueSmallCircleBullet', 'redSmallCircleBullet'];
                break;
            case 'mediumCircle':
                bulletGroup = ['blueMediumCircleBullet', 'redMediumCircleBullet'];
                break;
            case 'largeCircle':
                bulletGroup = ['blueLargeCircleBullet', 'redLargeCircleBullet'];
                break;
            case 'capsule':
                bulletGroup = ['blueCapsuleBullet', 'redCapsuleBullet'];
                break;
            case 'longSemicircle':
                bulletGroup = ['blueLongSemicircleBullet', 'redLongSemicircleBullet', 'redExtremeLongSemicircleBullet'];
                break;
            case 'arrow':
                bulletGroup = ['blueArrowBullet', 'redArrowBullet'];
                break;
            case 'squareSpecial':
                bulletGroup = ['blueSquareSpecialBullet', 'redSquareSpecialBullet'];
                break;
            case 'speedPause':
                bulletGroup = ['blueSpeedPauseBullet', 'redSpeedPauseBullet'];
                break;
            case 'musicSign':
                bulletGroup = ['redMusicSign1Bullet', 'redMusicSign2Bullet', 'blueMusicSign1Bullet', 'blueMusicSign2Bullet'];
                break;
            default:
                bulletGroup = ['blueMediumCircleBullet', 'redMediumCircleBullet'];
        }
        let choose = Phaser.Math.RND.pick(bulletGroup);
        return choose;
    }


    // ✅ Check if the character should be destroyed when off-screen
    checkDestroy(board) {
        let screenWidth = game.config.width;
        let screenHeight = game.config.height;

        switch (board) {
            case 'top':
                if (this.y < -150) {
                    this.destoryCharacter();
                }
                break;
            case 'bottom':
                if (this.y > screenHeight + 150) {
                    this.destoryCharacter();
                }
                break;
            case 'left':
                if (this.x < -150) {
                    this.destoryCharacter();
                }
                break;
            case 'right':
                if (this.x > screenWidth + 150) {
                    this.destoryCharacter();
                }
                break;
        }
    }    
    destoryCharacter(){
        if (this.collider) {
            this.collider.destroy(); // ✅ Remove collider from physics world
            this.collider = null;    // ✅ Avoid referencing it again
        }
        if (this.scene && this.scene.EmenyGroup) {
            this.scene.EmenyGroup.remove(this, true, true); // ✅ Remove from bullet group
        }
        this.setActive(false);  // ✅ Remove from update loop
        this.setVisible(false); // ✅ Hide the bullet
        //this.body.enable = false; // ✅ Disable physics body
        this.destroy();
    }
    exitScreen(key, speed = 130,sec_speed = 0) { 
        switch (key) {
            case 'top':
                this.y -= speed * this.dt; // Move upwards
                this.x += sec_speed  * this.dt;
                this.checkDestroy('top')
                break;
            case 'bottom':
                this.y += speed  * this.dt; // Move downwards
                this.x += sec_speed  * this.dt;
                this.checkDestroy('bottom')
                break;
            case 'left':
                this.x -= speed  * this.dt; // Move left
                this.y += sec_speed  * this.dt;
                this.checkDestroy('left')
                break;
            case 'right':
                this.x += speed  * this.dt; // Move right
                this.y += sec_speed  * this.dt;
                this.checkDestroy('right')
                break;
            case 'autoLR':
                if (this.x < game.config.width / 2) {
                    this.x -= speed  * this.dt; // Move left if closer to left
                    this.y += sec_speed  * this.dt;
                    this.checkDestroy('left')
                } else {
                    this.x += speed * this.dt; // Move right if closer to right
                    this.y += sec_speed * this.dt;
                    this.checkDestroy('right')
                }
                break;
            case 'autoTB':
                if (this.y < game.config.height / 2) {
                    this.y -= speed * this.dt; // Move up if closer to top
                    this.x += sec_speed * this.dt;
                    this.checkDestroy('top')
                } else {
                    this.y += speed * this.dt; // Move down if closer to bottom
                    this.x += sec_speed * this.dt;
                    this.checkDestroy('bottom')
                }
                break;
        }
    }
    
    moveToTarget(target, speed = 110, offset = 0) {
        if (!target) return true; // ✅ Return true if no target
    
        // ✅ Calculate distance to target
        let distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    
        // ✅ If within offset range, stop tracking but continue moving in the same direction
        if (distance <= offset) {
            return true;
        }
    
        // ✅ Calculate movement direction
        let direction = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize();
    
        // ✅ Move towards the target
        this.x += direction.x * speed * this.dt;
        this.y += direction.y * speed * this.dt;
    
        return false; // ✅ Return false until target is within offset range
    }
/*
    teleport(Xpos, Ypos, currentX = this.x, currentY = this.y, duration = 800, particleColor = 0x00ffff) {
        return new Promise((resolve) => {
            // Store original position if not provided
            const startX = currentX !== undefined ? currentX : this.x;
            const startY = currentY !== undefined ? currentY : this.y;
            
            // Store original alpha and scale
            const originalAlpha = this.alpha;
            const originalScaleX = this.scaleX;
            const originalScaleY = this.scaleY;
            
            // Create particle emitter for disappearing effect
            const disappearEmitter = this.scene.add.particles(startX, startY, 'particle', {
                frame: 'white', // Use a white particle texture that can be tinted
                color: [particleColor],
                colorEase: 'quad.out',
                lifespan: { min: 400, max: 600 },
                speed: { min: 50, max: 100 },
                scale: { start: 0.4, end: 0 },
                quantity: 1,
                blendMode: 'ADD',
                emitting: false
            });
            
            // Create particle emitter for reappearing effect
            const reappearEmitter = this.scene.add.particles(Xpos, Ypos, 'particle', {
                frame: 'white', // Use a white particle texture that can be tinted
                color: [particleColor],
                colorEase: 'quad.in',
                lifespan: { min: 400, max: 600 },
                speed: { min: 50, max: 100 },
                scale: { start: 0, end: 0.4 },
                quantity: 1,
                blendMode: 'ADD',
                emitting: false
            });
            
            // Disable physics during teleport to prevent collisions
            const wasPhysicsEnabled = this.body.enable;
            this.body.enable = false;
            
            // Timeline for coordinating the teleport effect
            const timeline = this.scene.tweens.createTimeline();
            
            // Phase 1: Disappear from current location
            timeline.add({
                targets: this,
                alpha: 0,
                scaleX: 0.1,
                scaleY: 0.1,
                duration: duration / 2,
                ease: 'Power2',
                onStart: () => {
                    // Emit particles at start position
                    disappearEmitter.explode(30, startX, startY);
                    
                    // Optional: Add a flash effect
                    this.scene.cameras.main.flash(100, 255, 255, 255, 0.3);
                    
                    // Optional: Add sound effect
                    if (this.scene.sound && this.scene.sound.add) {
                        const teleportSound = this.scene.sound.add('teleport_start', { volume: 0.5 });
                        teleportSound.play();
                    }
                }
            });
            
            // Phase 2: Move to new position while invisible
            timeline.add({
                targets: this,
                x: Xpos,
                y: Ypos,
                duration: 50, // Quick position change
                onComplete: () => {
                    // Emit particles at destination
                    reappearEmitter.explode(30, Xpos, Ypos);
                    
                    // Optional: Add a flash effect
                    this.scene.cameras.main.flash(100, 255, 255, 255, 0.3);
                    
                    // Optional: Add sound effect
                    if (this.scene.sound && this.scene.sound.add) {
                        const teleportSound = this.scene.sound.add('teleport_end', { volume: 0.5 });
                        teleportSound.play();
                    }
                }
            });
            
            // Phase 3: Reappear at new location
            timeline.add({
                targets: this,
                alpha: originalAlpha,
                scaleX: originalScaleX,
                scaleY: originalScaleY,
                duration: duration / 2,
                ease: 'Power2',
                onComplete: () => {
                    // Re-enable physics if it was enabled before
                    this.body.enable = wasPhysicsEnabled;
                    
                    // Clean up particle emitters
                    disappearEmitter.destroy();
                    reappearEmitter.destroy();
                    
                    // Resolve the promise
                    resolve();
                }
            });
            
            // Start the timeline
            timeline.play();
        });
    }
*/


    moveTo(Xpos = -1, Ypos = -1, speed = 100) {
        // Use a minimum delta time to prevent issues when tab is inactive or on very slow frames
        const safeDeltaTime = Math.min(this.dt, 0.1); 
        
        // Convert speed to units per second
        const frameIndependentSpeed = speed * safeDeltaTime;
        
        let reachedX = false;
        let reachedY = false;

        // ✅ Move on the X-axis if Xpos is specified
        if (Xpos !== -1) {
            let directionX = Math.sign(Xpos - this.x);
            if (Math.abs(this.x - Xpos) > frameIndependentSpeed) {
                this.x += directionX * frameIndependentSpeed;
            } else {
                this.x = Xpos;
                reachedX = true;
            }
        } else {
            reachedX = true;
        }

        // ✅ Move on the Y-axis if Ypos is specified
        if (Ypos !== -1) {
            let directionY = Math.sign(Ypos - this.y);
            if (Math.abs(this.y - Ypos) > frameIndependentSpeed) {
                this.y += directionY * frameIndependentSpeed;
            } else {
                this.y = Ypos;
                reachedY = true;
            }
        } else {
            reachedY = true;
        }

        return reachedX && reachedY;
    }

    
    // Collision handling
    collide(obj) {
        
    }

    sprawnScore(score) {
        if (!this.scene) return;
    
        let scoreValues = { small: 1, medium: 10, large: 50 };
        let scoreTypes = { large: "scoreLarge", medium: "scoreMedium", small: "scoreSmall" };
    
        let numLarge = Math.floor(score / scoreValues.large);
        score %= scoreValues.large;
    
        let numMedium = Math.floor(score / scoreValues.medium);
        score %= scoreValues.medium;
    
        let numSmall = Math.floor(score / scoreValues.small);
    
        let totalObjects = numLarge + numMedium + numSmall;
        let spreadRadius = 30; // Radius to spread out the score items
    
        let spawnScoreItem = (type, xOffset, yOffset) => {
            let scoreObj = new Score(this.scene, this.x + xOffset, this.y + yOffset, scoreTypes[type]);
            this.scene.physics.add.overlap(rumia, scoreObj, (rumia, scoreObj) => {
                if(!this || !this.scene)return;
                this.scene.handleCollision(rumia, scoreObj);
            });
            this.scene.EmenyGroup.add(scoreObj);
        };
    
        let index = 0;
        for (let i = 0; i < numLarge; i++, index++) {
            let angle = (index / totalObjects) * Math.PI * 2;
            let xOffset = Math.cos(angle) * spreadRadius;
            let yOffset = Math.sin(angle) * spreadRadius;
            spawnScoreItem("large", xOffset, yOffset);
        }
        for (let i = 0; i < numMedium; i++, index++) {
            let angle = (index / totalObjects) * Math.PI * 2;
            let xOffset = Math.cos(angle) * spreadRadius;
            let yOffset = Math.sin(angle) * spreadRadius;
            spawnScoreItem("medium", xOffset, yOffset);
        }
        for (let i = 0; i < numSmall; i++, index++) {
            let angle = (index / totalObjects) * Math.PI * 2;
            let xOffset = Math.cos(angle) * spreadRadius;
            let yOffset = Math.sin(angle) * spreadRadius;
            spawnScoreItem("small", xOffset, yOffset);
        }
    }


    collideToBullet(bullet){
        if(bullet.isReflected){
            this.healthly -= bullet.atk;
        }
    } 

    
    // Movement logic (to be overridden)
    moving() {
        console.log(`${this.type} moving`);
    }
}