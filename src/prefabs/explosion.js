class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, explosionType = 'small') {
        let explosionKey
        if(explosionType == 'small')
        {
            let explosionType = Phaser.Math.Between(1, 2); // ✅ Randomly select explosion 1 or 2
            explosionKey = explosionType === 1 ? 'ExplosionSmall1_' : 'ExplosionSmall2_';
        }else{
            explosionKey = 'ExplosionLarge1_'
        }
        
        super(scene, x, y, explosionKey + '1');
        scene.add.existing(this);
        this.setDepth(20); // ✅ Ensure explosion is above other objects
        
        // ✅ Generate animation frames
        let explosionFrames = [];
        for (let i = 1; i <= 7; i++) {
            explosionFrames.push({ key: explosionKey + i });
        }

        // ✅ Create explosion animation (if not already created)
        if (!scene.anims.exists(explosionKey + 'anim')) {
            scene.anims.create({
                key: explosionKey + 'anim',
                frames: explosionFrames,
                frameRate: 10, // ✅ Adjust animation speed
                repeat: 0
            });
        }

        this.play(explosionKey + 'anim');

        // ✅ Destroy explosion after animation plays
        scene.time.delayedCall(500, () => {
            this.destroy();
        });
    }
}