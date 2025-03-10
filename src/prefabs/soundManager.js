class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.backgroundMusic = null;

    }


    playEffectSpecify(key, playRate = -1, volume = 0.1) {
        if (!this.scene.sound) return; // Safety check

        if (playRate === -1 || Math.random() * 100 < playRate) {
            this.scene.sound.play(key, { volume: volume });
        }
    }

    playEffect(key,playRate = -1,volume = 0.1) {
        if (!this.scene.sound) return; // Safety check
        if (playRate != -1 && Math.random() * 100 > playRate) return; 
        let chooses

        switch (key) {
            case 'hitHurt':
                chooses = ['hitHurt1', 'hitHurt2', 'hitHurt3'];
                break;
            case 'pickUp':
                chooses = ['pickUp1']    
                break;
            case 'bulletHit':
                chooses = ['bulletHit1', 'bulletHit2', 'bulletHit3'];
                break;
            case 'shooting':
                chooses = ['shooting1', 'shooting2','shooting3'];
                break;
            case 'speedPause':
                chooses = ['speedPause1']
                break;
            default:
                chooses = ['hitHurt1', 'hitHurt2', 'hitHurt3'];
                break;
        }

        let randomHitSound = Phaser.Math.RND.pick(chooses);
        this.scene.sound.play(randomHitSound, { volume: volume });


    }


    playBGM(key = '',volume = 0.6) {
        if(this.backgroundMusic && key == ''){
            this.backgroundMusic.play();
            return;
        }
        else if (this.backgroundMusic) {
            this.backgroundMusic.stop();
        }
        this.backgroundMusic = this.scene.sound.add(key, { loop: true, volume: volume });
        this.backgroundMusic.play();
    }

    stopBGM() {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
            //this.backgroundMusic = null;
        }
    }
}

