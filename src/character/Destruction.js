class Destruction extends Character {
    constructor(scene, x, y,subtype , frame) {
        if(subtype == 'ice'){
            super(scene, x, y, 'ice', frame)
            
            this.healthly = 60;
            this.body.setSize(data.getData('ice_width') , data.getData('ice_height'), true); // Adjust hitbox size
            this.body.setOffset(0, 2); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else if(subtype == 'iceTop'){
            super(scene, x, y, 'iceTop', frame)
            
            this.healthly = 60;
            this.body.setSize(data.getData('ice_height') , data.getData('ice_width'), true); // Adjust hitbox size
            this.body.setOffset(0, 2); 
            //this.speed = data.getData('sunflowerFairy_speed') 
        }else if(subtype == 'yinYangOrbs'){
            super(scene, x, y, 'yinYangOrbs', frame)
            
            this.healthly = 999999999;
            this.body.setCircle(data.getData('ying_height')/2); // Adjust hitbox size
            this.body.setOffset(0, 2); 

        }else if(subtype == 'flower'){
            super(scene, x, y, 'flower', frame)
            
            this.healthly = 10;
            this.body.setCircle(20); // Adjust hitbox size
            this.body.setOffset(0, 2); 

        }
        this.subtype = subtype
        this.type = 'distruction'
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.healthly = 55;
        this.isDrop = false;
        this.kind = 'f'
        //this.speed = emenySpeed; 
        this.master;
        this.ableToDefence = false; 
        this.isEmeny = true;
        this.vx=0;
        this.vy = 0;
        this.Ypos = 300
    }
    update(time, delta) {
        super.update(time, delta);
        if(this.isDrop)
            return
        let posX
        let posY
        switch(this.behavior){
            case 'iceSelfDestructX1':
                posX= [950,900,800,750,600]
                this.iceSelfDestructBulletX(posX);
                break;
            case 'iceSelfDestructX2':
                posX= [980,890,800,780,690]
                this.iceSelfDestructBulletX(posX);
                break;
            case 'iceSelfDestructX3':
                posX= [750,690,600,570,500]
                this.iceSelfDestructBulletX(posX);
                break;    
            case 'iceSelfDestructY1':
                posX= [90,190,280,400,500]
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY2':
                posX= [160,290,300,440,590]
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY3':
                posX = [140,300,390,440,510]
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY4':
                posX = [500, 400, 280, 190, 90];
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY5':
                posX = [590, 440, 300, 290, 160];
                this.iceSelfDestructBulletY(posX);
                break;
            case 'iceSelfDestructY6':
                posX = [520, 450, 400, 300, 140];
                this.iceSelfDestructBulletY(posX);
                break;   
            case 'flowerHit':
                this.flowerHit();
                break;
            case 'yinYangOrbsHit':
                this.yinYangOrbsHit();
                break
        }
        
    }
    iceSelfDestructBulletX(posX){
        if( this.step == 0 &&this.moveTo(posX[0], -1, data.getData('emeny_speed_normal110')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_130'));//shooting 
        }else if( this.step == 1 &&this.moveTo(posX[1], -1,  data.getData('emeny_speed_normal110')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 2 &&this.moveTo(posX[2], -1,  data.getData('emeny_speed_normal110')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 15, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 3 &&this.moveTo(posX[3], -1,  data.getData('emeny_speed_normal110')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 12, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 4 &&this.moveTo(posX[4], -1,  data.getData('emeny_speed_normal110')) ){
            this.step +=1;
            this.healthly = 0;
        }
    }
    iceSelfDestructBulletY(posY){
        if( this.step == 0 &&this.moveTo(-1, posY[0], data.getData('emeny_speed_normal100')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_130'));//shooting 
        }else if( this.step == 1 &&this.moveTo(-1, posY[1], data.getData('emeny_speed_normal100')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 2 &&this.moveTo(-1, posY[2], data.getData('emeny_speed_normal100')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 15, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 3 &&this.moveTo(-1, posY[3], data.getData('emeny_speed_normal100')) ){
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 12, 0, 324,  this,data.getData('Bullet_speed_120'));//shooting 
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_150'));//shooting 
        }else if( this.step == 4 &&this.moveTo(-1, posY[4], data.getData('emeny_speed_normal100')) ){
            this.step +=1;
            this.healthly = 0;
        }
    }
    dropOff(){
        switch(this.behavior){
            case 'iceSelfDestructX1':
            case 'iceSelfDestructX2':
            case 'iceSelfDestructX3':
            case 'iceSelfDestructY1':
            case 'iceSelfDestructY2':
            case 'iceSelfDestructY3':
            case 'iceSelfDestructY4':
            case 'iceSelfDestructY5':
            case 'iceSelfDestructY6':            
                this.iceSelfDestruct();
                break;
            case 'flowerHit':
                this.flowerDestruct();
                break;
        }
        if(this.subtype == 'yinYangOrbs' && !this.isDrop){
            new Explosion(this.scene, this.x, this.y, 'Large');
            this.isDrop = true;
            //this.scene.time.delayedCall(500, () => {super.destoryCharacter();});
        }else{
            super.destoryCharacter();
        }
        
        
        
    }
    flowerHit(){
        
        if (!this.hasOwnProperty('rotationSpeed')) {
            this.rotationSpeed = 0.03; // Adjust for faster/slower rotation
            this.rotationDirection = Phaser.Math.RND.pick([-1, 1]); // Random direction
        }
        if( this.step == 0 &&this.moveTo(-1, 100,  data.getData('emeny_speed_normal100')) ){
            this.Ypos = Phaser.Math.RND.pick([200,300,400,500])
            this.step +=1;
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
        }else if(this.step == 1 &&  this.moveTo(-1, this.Ypos, data.getData('emeny_speed_normal100'))){
            this.healthly = 0;
        }
    }

    flowerDestruct(){
        new Explosion(this.scene, this.x, this.y, 'Large');
        this.scene.shootingLogic.fanShapedType_ToDirection('blueMediumCircleBullet', 12, 0, 360, this, data.getData('Bullet_speed_130'));
        this.scene.shootingLogic.randomfanShapedType_toDirection('redLongSemicircleBullet', 5, 0, 364, this ,data.getData('Bullet_speed_200'));//shootin
    }

    iceSelfDestruct(){
        new Explosion(this.scene, this.x, this.y, 'Large');
        this.scene.shootingLogic.randomfanShapedType_toDirection('blueSmallCircleBullet', 17, 0, 324, this ,data.getData('Bullet_speed_120'));//shooting 
        this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 17, 0, 324,  this,data.getData('Bullet_speed_130'));//shooting 
        this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 9, 0, 324, this ,data.getData('Bullet_speed_150'));//shooting 
        this.scene.shootingLogic.randomfanShapedType_toDirection('redLongSemicircleBullet', 5, 0, 324, this ,data.getData('Bullet_speed_180'));//shooting 
    }


    yinYangOrbsHit() {
        // Initialize velocity if not set
        if (this.step === 0) {
            this.step = 1;
            // Set initial velocity in a random direction
            const angle = Phaser.Math.Between(0, 360) * (Math.PI / 180);
            const speed =340 * this.dt; // data.getData('emeny_speed_normal200')
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            
            // Initialize rotation properties
            this.rotationSpeed = 0.05; // Adjust for faster/slower rotation
            this.rotationDirection = Phaser.Math.RND.pick([-1, 1]); // Random direction
        }
        
        // Update position based on velocity
        this.x += this.vx;
        this.y += this.vy;
        
        // Apply twirling/rotation effect
        this.angle += this.rotationSpeed * this.rotationDirection * 360/Math.PI;
        
        // Get screen bounds
        const screenWidth = this.scene.game.config.width;
        const screenHeight = this.scene.game.config.height;
        
        // Check for collision with screen edges
        let bounced = false;
        
        // Left and right edges
        if (this.x <= 0 || this.x >= screenWidth) {
            this.vx *= -1; // Reverse horizontal velocity
            bounced = true;
            // Keep within bounds
            this.x = Math.max(0, Math.min(this.x, screenWidth));
            
            // Change rotation direction on bounce for more dynamic effect
            this.rotationDirection *= -1;
            // Increase rotation speed slightly on bounce
            this.rotationSpeed = Math.min(this.rotationSpeed * 1.1, 0.15);
        }
        
        // Top and bottom edges
        if (this.y <= 0 || this.y >= screenHeight) {
            this.vy *= -1; // Reverse vertical velocity
            bounced = true;
            // Keep within bounds
            this.y = Math.max(0, Math.min(this.y, screenHeight));
            
            // Change rotation direction on bounce
            this.rotationDirection *= -1;
            // Increase rotation speed slightly on bounce
            this.rotationSpeed = Math.min(this.rotationSpeed * 1.1, 0.15);
        }
        
        // Screen shake effect when bouncing
        if (bounced) {
            // Create screen shake effect
            this.scene.cameras.main.shake(200, 0.01);
            // Shoot bullets in different patterns when bouncing
            this.scene.shootingLogic.randomfanShapedType_toDirection('blueCapsuleBullet', 14, 0, 324, this, data.getData('Bullet_speed_130'));
            this.scene.shootingLogic.randomfanShapedType_toDirection('redCapsuleBullet', 12, 0, 324, this, data.getData('Bullet_speed_150'));
            this.scene.shootingLogic.fanShapedType_ToTarget(this.getRandomColorBullet('largeCircle'), 23, 180, this, rumia, data.getData('Bullet_speed_170'));
        }
        
        // Check for collision with player
        const player = this.scene.player;
        if (player && !player.isInvincible && Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), player.getBounds())) {
            player.hit(1); // Player takes damage
            
            // Optional: Add special effects for player hit
            if (this.scene.specialEffects) {
                this.scene.specialEffects.createExplosion(player.x, player.y);
            }
        }
        
        // Visual effect: pulsate size slightly based on rotation
        const pulseFactor = 1 + Math.sin(this.angle * Math.PI/180) * 0.05;
        this.setScale(pulseFactor);
    }



    moving() {
        if (this.target) {
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
    }
}