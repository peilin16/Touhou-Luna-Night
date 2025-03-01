
// this.body.setSize(30,17)
class LongSemicircleBullet extends Bullet {
    constructor(scene, x, y, target, speed = 2, subtype = 'bls') {
        let texture = subtype === 'bls' ? 'blueLongSemicircleBullet' :
                      subtype === 'rls' ? 'redLongSemicircleBullet' :
                      'redExtremeLongSemicircleBullet';
        
        super(scene, x, y, texture, target, texture);

        this.speed = speed;
        this.isRed = (subtype === 'rls' || subtype === 'res');
        this.subtype = subtype;
        
        if(subtype === 'bls' || subtype === 'rls' ){
            this.body.setSize(30,17)
            this.body.setOffset(0, 0); // Ensure no offset issues
            this.body.setCollideWorldBounds(true);
            this.body.setImmovable(true); // ✅ Prevents movement from collisions
            this.body.setVelocity(0, 0);  // ✅ Ensures Rumia stays in place
            this.setDepth(10); // Ensure bullets are on top
            return;
        }
        // ✅ Remove default square hitbox
        this.body.setSize(1, 1); // Set to minimal size (not used)
        this.body.setOffset(0, 0); // Ensure no offset issues
        
        // ✅ Define circular hitbox properties
        this.hitboxCount = (subtype === 'res') ? 5 : 3; // More hitboxes for larger bullets
        this.hitboxRadius = this.height / 2; // ✅ Set radius based on bullet height
        this.spacing = this.width / this.hitboxCount; // ✅ Distribute hitboxes along bullet length

        // ✅ Create circular hitboxes along the bullet
        for (let i = 0; i < this.hitboxCount; i++) {
            let offsetX = -((this.hitboxCount - 1) * this.spacing) / 2 + i * this.spacing;
            let hitbox = this.scene.add.circle(this.x + offsetX, this.y, this.hitboxRadius);
            this.scene.physics.add.existing(hitbox);
            hitbox.body.setCircle(this.hitboxRadius);
            hitbox.body.setImmovable(true);
            this.hitboxes.push(hitbox);
        }

        this.setDepth(10);
    }

    update(time, delta) {
        super.update(time, delta);
        if(this.hitboxes){
            let dt = delta / 1000; // ✅ Convert `delta` from milliseconds to seconds

            // ✅ Move and rotate hitboxes with the bullet
            this.hitboxes.forEach((hitbox, index) => {
                let angleRad = this.rotation; // ✅ Get bullet rotation in radians
                let offsetX = Math.cos(angleRad) * (index * this.spacing - this.width / 2);
                let offsetY = Math.sin(angleRad) * (index * this.spacing - this.width / 2);
    
                hitbox.x = this.x + offsetX;
                hitbox.y = this.y + offsetY;
            });
        }


    }
}