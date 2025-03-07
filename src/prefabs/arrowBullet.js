class arrowBullet extends Bullet {
    constructor(scene, x, y, target, speed = 2, subtype = 'ba') {
        let texture = '';
        let bulletType = '';

        if (subtype === 'ba') {
            texture = 'blueArrowBullet';
            bulletType = 'blueLongSemicircleBullet';
        } else if (subtype === 'ra') {
            texture = 'redArrowBullet';
            bulletType = 'redArrowBullet';
        }

        if (subtype === 'blueSquareSpecialBullet') {
            texture = 'blueSquareSpecialBullet';
            bulletType = 'blueSquareSpecialBullet';
        } else if (subtype === 'redSquareSpecialBullet') {
            texture = 'redSquareSpecialBullet';
            bulletType = 'redSquareSpecialBullet';
            
        }


        super(scene, x, y, texture, target, bulletType);

        // ✅ Set properties
        this.subtype = subtype;
        this.speed = speed;
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.body.setVelocity(0, 0);
        //this.body.setSize(23,14)
        this.setDepth(10);
        if (subtype === 'blueSquareSpecialBullet' || subtype === 'redSquareSpecialBullet') {
            this.body.setSize(20,20);
            if (subtype === 'redSquareSpecialBullet'){
                this.isRed = true;
                this.ableToReflect = false;
            }
            
            return;
        }






        this.body.setCircle(12)
        // ✅ If red, mark as non-reflectable
        if (subtype === 'ra') {
            this.isRed = true;
            this.ableToReflect = false;
        }
    }
    
    moving() {
        if (this.target) {
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
    }
}