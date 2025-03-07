//A TOOL class use to generate different shooting Type of Bullet

class stgShootingLogic{
    constructor(scene) {
        this.scene = scene; // Attach the scene
        scene.shootingLogic = this; // ✅ Allow direct access from any scene
    }
    // ✅ Attach to Phaser's scene system
    static install(scene) {
        scene.shootingLogic = new stgShootingLogic(scene);
    }




    //Basic bullet method
    
    // ✅ Shoots a bullet in a fixed direction
    NormalBullet(bulletType, angle,shooter,speed) {
            // ✅ Get a new bullet instance from `getBullet()`
        let bullet = this.getBullet(bulletType, shooter, speed);
        if (!bullet) return;

        // ✅ Convert angle (0° = left, 90° = up, 180° = right, 270° = down) to radians
        let angleRad = Phaser.Math.DegToRad(angle);

        // ✅ Calculate velocity based on the angle
        let velocityX = Math.cos(angleRad) * speed;
        let velocityY = Math.sin(angleRad) * speed;
        if(!bullet.isTwirl){
            bullet.setOrientation(velocityX,velocityY);
        }
        // ✅ Apply velocity to the bullet
        //bullet.body.setVelocity(velocityX, velocityY);
        bullet.vx = velocityX
        bullet.vy = velocityY
        // ✅ Add the bullet to the bullet group
        return bullet
    }

        sniperBullet(bulletType, shooter, target, speed, offset = 'No') {
        if (!target) return; // Ensure target exists
        let bullet = this.getBullet(bulletType, shooter, speed);
        // Calculate direction from bullet to target
        let direction = new Phaser.Math.Vector2(target.x - bullet.x, target.y - bullet.y).normalize();
    
        // ✅ Apply offset adjustments
        switch (offset) {
            case 'Top':
                direction.y -= 0.1; // Slightly move upward
                break;
            case 'Down':
                direction.y += 0.1; // Slightly move downward
                break;
        }
    
        direction.normalize(); // Re-normalize after applying offset
        bullet.vx = direction.x
        bullet.vy = direction.y
        if(!bullet.isTwirl){
            bullet.setOrientation(direction.x,direction.y);
        }
        return bullet
        // ✅ Set bullet velocity toward the target
       // bullet.body.setVelocity(direction.x * bullet.speed, direction.y * bullet.speed);
    }    
    sniperBullet(bulletType, shooter, target, speed, offset = 'No') {
        if (!target) return; // Ensure target exists
        let bullet = this.getBullet(bulletType, shooter, speed);
        // Calculate direction from bullet to target
        let direction = new Phaser.Math.Vector2(target.x - bullet.x, target.y - bullet.y).normalize();
    
        // ✅ Apply offset adjustments
        switch (offset) {
            case 'Top':
                direction.y -= 0.1; // Slightly move upward
                break;
            case 'Down':
                direction.y += 0.1; // Slightly move downward
                break;
        }
    
        direction.normalize(); // Re-normalize after applying offset
        bullet.vx = direction.x * bullet.speed
        bullet.vy = direction.y * bullet.speed
        if(!bullet.isTwirl){
            bullet.setOrientation(direction.x,direction.y);
        }
        return bullet
        // ✅ Set bullet velocity toward the target
       // bullet.body.setVelocity(direction.x * bullet.speed, direction.y * bullet.speed);
    }
    //setUp bullet
    getBullet(key, shooter, speed, isOverlap = true) {
        let bullet;
        switch (key) {
            case 'blueSmallCircleBullet':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null,speed , 'bs');
                break;
            case 'blueMediumCircleBullet':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null,speed, 'bm');
                break;
            case 'blueLargeCircleBullet':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null,speed, 'bl');
                break;
            case 'redSmallCircleBullet':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null,speed, 'rs');
                break;
            case 'redMediumCircleBullet':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null,speed, 'rm');
                break;
            case 'redLargeCircleBullet':
                bullet = new CircleBullet(this.scene, shooter.x, shooter.y, null,speed, 'rl');
                break;
            case 'blueCapsuleBullet':
                bullet = new CapsuleBullet(this.scene, shooter.x, shooter.y, null,speed, 'bc');
                break;
            case 'redCapsuleBullet':
                bullet = new CapsuleBullet(this.scene, shooter.x, shooter.y, null,speed, 'rc');
                break;
            case 'blueLongSemicircleBullet':
                bullet = new LongSemicircleBullet(this.scene, shooter.x, shooter.y, null,speed, 'bls');
                break;
            case 'redLongSemicircleBullet':
                bullet = new LongSemicircleBullet(this.scene, shooter.x, shooter.y, null, speed,'rls');
                break;
            case 'redExtremeLongSemicircleBullet':
                bullet = new LongSemicircleBullet(this.scene, shooter.x, shooter.y, null, speed,'res');
                break;
            case 'blueArrowBullet':
                bullet = new arrowBullet(this.scene, shooter.x, shooter.y, null, speed,'ba');
                break;
            case 'redArrowBullet':
                bullet = new arrowBullet(this.scene, shooter.x, shooter.y, null, speed,'ra');
                break;
            case 'blueSquareSpecialBullet':
            case 'redSquareSpecialBullet':
                bullet = new arrowBullet(this.scene, shooter.x, shooter.y, null, speed,key);
                break;
            case 'redSpeedPauseBullet':
                bullet = new speedPauseBullet(this.scene, shooter.x, shooter.y, null, speed,'rs');
                break;
            case 'blueSpeedPauseBullet':
                bullet = new speedPauseBullet(this.scene, shooter.x, shooter.y, null, speed,'bs');
                break;
                
            case 'redMusicSign1Bullet':
            case 'redMusicSign2Bullet':
            case 'blueMusicSign1Bullet':
            case 'blueMusicSign2Bullet':
                bullet = new MusicSignBullet(this.scene, shooter.x, shooter.y, null, speed, key);
                break;  
            default:
                console.warn(`Unknown bullet key: ${key}`);
                return null;
        }
        //test
        //bullet.isRed = true;

        bullet.shooter = shooter;//set shooter
        if (isOverlap) {
            
                this.scene.physics.add.overlap(rumia, bullet, (rumia, bullet) => {
                    //if (!rumia.isHit && !bullet.isReflected    ) { 
                    this.scene.bulletCollision(rumia, bullet);
                    //}
                });
            
        }
        bullet.target = rumia;
        return bullet;
    }
    speedChangeListType_ToTarget(bulletType, shooter, target, startSpeed, endSpeed, speedSpace){
        let currentSpeed = startSpeed; // ✅ Number of bullets to fire
        let bulletGroup = []
        let bullet
        if (startSpeed > endSpeed){
            while(currentSpeed > endSpeed){
                bullet =this.sniperBullet(bulletType, shooter, target, currentSpeed );
                currentSpeed -= speedSpace
                this.scene.bulletGroup.add(bullet);
                bulletGroup.push(bullet);
            }
        } 
        else {
            while(currentSpeed < endSpeed){
                bullet = this.sniperBullet(bulletType, shooter, target, currentSpeed );
                currentSpeed += speedSpace
                this.scene.bulletGroup.add(bullet);
                bulletGroup.push(bullet);
            }

        }  
        return bulletGroup;
    }
    //advanced bullet method
    listType_ToTarget(bulletType, num, sperate, shooter, target, speed, offset = 'No') { 
        let bulletGroup = []
        for (let i = 0; i < num; i++) {
            this.scene.time.delayedCall(i * sperate, () => {
                if(shooter.isDrop)
                    return;
                // ✅ Get a new bullet instance
                let bullet =this.sniperBullet(bulletType, shooter, target, speed, offset); // ✅ Shoot at target with optional offset
                this.scene.bulletGroup.add(bullet);
                bulletGroup.push(bullet);
            });
        }
        return bulletGroup;
    }
    listType_ToDirection(bulletType,num, sperateMinute, shooter ,angle,speed){
        let bulletGroup = []
        for (let i = 0; i < num; i++) {
            this.scene.time.delayedCall(i * sperateMinute, () => {
                let bullet = this.NormalBullet(bulletType, angle, shooter, speed);
                this.scene.bulletGroup.add(bullet);
                bulletGroup.push(bullet);
            });
        }
        return bulletGroup;
    }

    fanShapedType_ToDirection(bulletType, num, angleStart, angleEnd, shooter, speed) {
        // ✅ If only one bullet, place it at the center of the range
        let bulletGroup = []
        if (num === 1) {
           let bullet =  this.NormalBullet(bulletType, angleStart, shooter, speed);
            this.scene.bulletGroup.add(bullet);
            bulletGroup.push(bullet);
            return bulletGroup;
        }
        
        // ✅ Calculate the angle step to evenly distribute bullets
        let angleStep = (angleEnd - angleStart) / (num - 1);
    
        for (let i = 0; i < num; i++) {
            let angle = angleStart + i * angleStep; // ✅ Calculate each bullet's angle
            let bullet = this.NormalBullet(bulletType, angle, shooter, speed); // ✅ Shoot each bullet
            this.scene.bulletGroup.add(bullet);
            bulletGroup.push(bullet);
        }
        return bulletGroup
    }

    fanShapedType_ToTarget(bulletType, num,  offsetAngle, shooter, target, speed) {
        if (!target) return;

        // ✅ Calculate the central angle to the target
        let centerAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y));
    
        let angles = [];
        let bulletGroup = [];
        if (num === 1) {
            angles.push(centerAngle); // ✅ If only 1 bullet, shoot directly at the target
        } else {
            let step = (offsetAngle * 2) / (num - 1); // ✅ Step size for bullet spread
    
            for (let i = 0; i < num; i++) {
                let angle = centerAngle - offsetAngle + (i * step); // ✅ Distribute evenly
                angles.push(angle);
            }
        }
    
        // ✅ Fire bullets at calculated angles
        angles.forEach(angle => {
            //let bullet = this.getBullet(bulletType, shooter, speed);
            
            let bullet
            if (num === 1) {
                bullet = this.sniperBullet(bulletType, shooter, target, speed); // ✅ Single bullet directly at target
            } else {
                bullet = this.NormalBullet(bulletType, angle, shooter, speed); // ✅ Fan-shaped bullets
            }
            this.scene.bulletGroup.add(bullet);
            bulletGroup.push(bullet);
        });
        return bulletGroup
    }
    randomfanShapedType_toDirection(bulletType, num, angleStart, angleEnd, shooter, speed){
        let bulletGroup = []
        for (let i = 0; i < num; i++) {
            let randomAngle = Phaser.Math.Between(angleStart, angleEnd); // ✅ Pick a random angle
            let bullet = this.NormalBullet(bulletType, randomAngle, shooter, speed);
            this.scene.bulletGroup.add(bullet);
            bulletGroup.push(bullet);
        }
        return bulletGroup
    }


    randomFanShapedType_ToTarget(bulletType, num, offsetAngle, shooter, target, speed) {
        if (!target) return;
    
        // ✅ Calculate the central angle to the target
        let centerAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y));
        let bulletGroup = []
        let angles = [];
    
        if (num === 1) {
            angles.push(centerAngle); // ✅ If only 1 bullet, shoot directly at the target
        } else {
            let minSeparation = 3; // ✅ Minimum angle difference between bullets
            let usedAngles = new Set(); // ✅ Store angles to avoid overlap
    
            while (angles.length < num) {
                let randomOffset = Phaser.Math.Between(-offsetAngle, offsetAngle);
                let bulletAngle = centerAngle + randomOffset;
    
                // ✅ Ensure the angle is not too close to existing angles
                let isValid = true;
                usedAngles.forEach(existingAngle => {
                    if (Math.abs(existingAngle - bulletAngle) < minSeparation) {
                        isValid = false;
                    }
                });
    
                if (isValid) {
                    angles.push(bulletAngle);
                    usedAngles.add(bulletAngle);
                }
            }
        }
    
        // ✅ Fire bullets at the calculated random angles
        angles.forEach(angle => {
            let bullet = this.NormalBullet(bulletType, angle, shooter, speed);
            this.scene.bulletGroup.add(bullet);
            bulletGroup.push(bullet);
        });
        return bulletGroup;
    }

    twirlListType_ToDirection(bulletType, anglespace, angleStart, angleEnd, sprateSpace, shooter, speed, isCounterclockwise = false) {
        let currentAngle = angleStart;
        if(isCounterclockwise)
            currentAngle = angleEnd;

        let bulletGroup = []
        let fireInterval = this.scene.time.addEvent({
            delay: sprateSpace, // ✅ Delay between each shot
            callback: () => {
                if(shooter.isDrop)
                    return;
                if (currentAngle > angleEnd && !isCounterclockwise) {
                    fireInterval.remove(); // ✅ Stop firing when exceeding `angleEnd`
                    return;
                }else if(currentAngle < angleStart && isCounterclockwise){
                    return;
                }
    
                let bullet = this.NormalBullet(bulletType, currentAngle, shooter, speed); // ✅ Fire bullet
                this.scene.bulletGroup.add(bullet);
                bulletGroup.push(bullet);

                if(isCounterclockwise)
                    currentAngle -= anglespace;
                else
                    currentAngle += anglespace; // ✅ Increment angle for next shot
            },
            callbackScope: this,
            loop: true
        });

        return bulletGroup;
    }
    twirlFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false, isSniper = true){
        let currentAngle = angleStart;
        if(isCounterclockwise)
            currentAngle = angleEnd;
        let bulletGroup = []
        let behavior = shooter.behavior;
        let fireInterval = this.scene.time.addEvent({
            delay: sprateSpace, // ✅ Delay between each wave
            callback: () => {
                if(shooter.isDrop || shooter.isDone)
                    return;
                if(shooter.behavior !=behavior)return; 
                if (currentAngle > angleEnd && ! isCounterclockwise) {
                    fireInterval.remove(); // ✅ Stop firing when exceeding `angleEnd`
                    return;
                }else if(currentAngle < angleStart &&  isCounterclockwise){
                    return;
                }
                if(isCounterclockwise)
                    bulletGroup = this.fanShapedType_ToDirection(bulletType, num, fanAngleStart + currentAngle, fanAngleEnd + currentAngle, shooter, speed);
                else
                    bulletGroup = this.fanShapedType_ToDirection(bulletType, num, fanAngleStart + currentAngle, fanAngleEnd + currentAngle, shooter, speed);
                if(bulletType == 'redSpeedPauseBullet' || bulletType == 'blueSpeedPauseBullet'){
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = isSniper; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                }
                if(isCounterclockwise)
                    currentAngle -= anglespace
                else
                    currentAngle += anglespace; // ✅ Increment angle for next wave
            },
            callbackScope: this,
            loop: true
        });
        return bulletGroup;

    }


    twirlRandomFanType_ToDirection(bulletType,   anglespace, angleStart, angleEnd, sprateSpace, num, fanAngleStart, fanAngleEnd,  shooter, speed,isCounterclockwise = false){
        let currentAngle = angleStart;
        if(isCounterclockwise)
            currentAngle = angleEnd;
        let bulletGroup = []
        let behavior = shooter.behavior;
        let fireInterval = this.scene.time.addEvent({
            delay: sprateSpace, // ✅ Delay between each wave
            callback: () => {
                if(shooter.isDrop || shooter.isDone)
                    return;
                if(shooter.behavior !=behavior)return; 
                if (currentAngle > angleEnd && ! isCounterclockwise) {
                    fireInterval.remove(); // ✅ Stop firing when exceeding `angleEnd`
                    return;
                }else if(currentAngle < angleStart &&  isCounterclockwise){
                    return;
                }
                if(isCounterclockwise)
                    //randomfanShapedType_toDirection(bulletType, num, angleStart, angleEnd, shooter, speed)
                    bulletGroup = this.randomfanShapedType_toDirection(bulletType, num, fanAngleStart + currentAngle, fanAngleEnd + currentAngle, shooter, speed);
                else
                    bulletGroup = this.randomfanShapedType_toDirection(bulletType, num, fanAngleStart + currentAngle, fanAngleEnd + currentAngle, shooter, speed);
                if(bulletType == 'redSpeedPauseBullet' || bulletType == 'blueSpeedPauseBullet'){
                    for (let i = 0; i < bulletGroup.length; ++i) {
                        bulletGroup[i].pauseMin = 700; // Pause for 1.2 seconds
                        bulletGroup[i].delayPauseMin = 1000; // Pause starts after 0.8 seconds
                        bulletGroup[i].isSniper = true; // Will re-aim at target after pause
                        bulletGroup[i].accelerate = 1.5; // Increases speed by 50% after pausing
                    }
                }
                if(isCounterclockwise)
                    currentAngle -= anglespace
                else
                    currentAngle += anglespace; // ✅ Increment angle for next wave
            },
            callbackScope: this,
            loop: true
        });
        return bulletGroup;

    }

    expandFanType_ToDirection(bulletType, angleSpace, angleStart, angleEnd, sprateSpace, shooter, speed, isCounterclockwise = false) {
        let currentNum = 1; // ✅ Number of bullets to fire
        let StartAngle = angleStart
        let EndAngle = angleEnd
        if(isCounterclockwise){
            EndAngle = angleStart;
            StartAngle = angleEnd;
        }
            
        
        let currentAngleEnd = StartAngle; // ✅ Initial angle range
        
        let expandFanLoop = () => {
            if ((!isCounterclockwise && currentAngleEnd > EndAngle) || (isCounterclockwise && currentAngleEnd < EndAngle)) return; // ✅ Stop when max angle is reached
            if(shooter.isDrop || shooter.isDone)
                return;
            // ✅ Fire bullets in an expanding fan shape
            this.fanShapedType_ToDirection(bulletType, currentNum, StartAngle, currentAngleEnd, shooter, speed);
    
            // ✅ Increase bullet count for next loop
            currentNum++;
            if(!isCounterclockwise)
                currentAngleEnd = StartAngle + (currentNum - 1) * angleSpace;
            else
                currentAngleEnd = StartAngle - (currentNum - 1) * angleSpace;
            // ✅ Schedule next step in the expanding fan
            this.scene.time.delayedCall(sprateSpace, expandFanLoop);
        };
    
        expandFanLoop(); // ✅ Start expansion
    }
    expandFanType_ToTarget(bulletType, angleSpace, maxOffset, sprateSpace, shooter, target, speed ) {
        let currentNum = 1; // ✅ Number of bullets to fire
        let currentOffset = 0; // ✅ Initial angle offset (starts at 0 and expands)
        
        let expandFanLoop = () => {
            // Check if we've reached the maximum offset or if shooter is no longer active
            if(!shooter)  return;
            if (currentOffset > maxOffset) return;
            if (shooter.isDrop || shooter.isDone) return;
            if (!target || target.isDrop) return;
            
            // ✅ Calculate the central angle to the target
            let centerAngle = Phaser.Math.RadToDeg(
                Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y)
            );
            
            // ✅ Fire bullets in an expanding fan shape toward the target
            this.fanShapedType_ToTarget(bulletType, currentNum, currentOffset, shooter, target, speed);
    
            // ✅ Increase bullet count and offset for next loop
            currentNum++;
            currentOffset += angleSpace;
            
            // ✅ Schedule next step in the expanding fan
            this.scene.time.delayedCall(sprateSpace, expandFanLoop);
        };
    
        expandFanLoop(); // ✅ Start expansion
    }

    outScreenType_ToDirection(bulletType, num, side, angleStart, angleEnd, rangeStart, rangeEnd, shooter, speed) {
        let bulletGroup=[];
    
        for (let i = 0; i < num; i++) {
            let bulletX, bulletY;
            
            // ✅ Determine spawn position based on side
            if (side === 'top') {
                bulletX = Phaser.Math.Between(rangeStart, rangeEnd);
                bulletY = -30; // Off-screen above
            } else if (side === 'bottom') {
                bulletX = Phaser.Math.Between(rangeStart, rangeEnd);
                bulletY = boardheigh + 30; // Off-screen below
            } else if (side === 'right') {
                bulletX = boardwidth + 20; // Off-screen right
                bulletY = Phaser.Math.Between(rangeStart, rangeEnd);
            }else if (side === 'left') {
                bulletX = -20; // Off-screen right
                bulletY = Phaser.Math.Between(rangeStart, rangeEnd);
            } else {
                console.warn(`Invalid side: ${side}`);
                return bulletGroup;
            }
    
            // ✅ Determine firing angle
            let bulletAngle = (angleStart === angleEnd) ? angleStart : Phaser.Math.Between(angleStart, angleEnd);
            
            // ✅ Generate bullet and fire it into the screen
            let bullet = this.NormalBullet(bulletType, bulletAngle, shooter, speed);
            bullet.x = bulletX;
            bullet.y = bulletY;
            bulletGroup.push(bullet);
            this.scene.bulletGroup.add(bullet);
        }
        return bulletGroup;
    }


    rightArrowSniperType_ToTarget(bulletType, num, shooter, target, speed, Xspacing = 10, Yspacing = 10) {
        
    }
    leftArrowSniperType_ToTarget(bulletType, num, shooter, target, speed, Xspacing = 10, Yspacing = 10) {
        
    }

    //special bullet method
    
}

Phaser.Scene.prototype.shootingLogic = null;
Phaser.Scene.prototype.installShootingLogic = function () {
    stgShootingLogic.install(this);
};