class LevelTransition extends Phaser.Scene {
    constructor() {
        super('levelTransitionScene');
    }

    init(data) {
        this.level = data.level;
    }

    create() {
        // Clear the screen and set background color (optional)
        this.cameras.main.setBackgroundColor('#000'); // Black background

        // Display the transition text
        this.add.text(game.config.width / 2, game.config.height / 2, "On a peaceful night in Gensokyo, Rumia, the youkai who thrives in darkness, decides to have some fun under the moonlight. She gathers her friends for a game of hide-and-seek, but with a twist: instead of simply hiding, her friends will fight back with danmaku! Rumia must use her unique ability to reflect their bullets to them and win the game.", {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center',
            wordWrap: { width: game.config.width - 100 } // Wrap text within the screen width
        }).setOrigin(0.5);

        // Instructions to press SPACE
        this.add.text(game.config.width / 2, game.config.height - 100, "Press SPACE to Start", {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Capture SPACE key
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Check if SPACE is pressed → Start the actual level
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            switch (this.level) {
                case 1:
                    this.scene.start('level1Scene');
                    break;
                case 2:
                    this.scene.start('level2Scene');
                    break;
                case 3:
                    this.scene.start('level3Scene');
                    break;
                case 4:
                    this.scene.start('level4Scene');
                    break;
            }
        }
    }
}
