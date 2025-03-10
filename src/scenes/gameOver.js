class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    init(data) {
        this.score = data.score; // Retrieve the score parameter
    }

    create() {
        // Background color (optional)
        this.cameras.main.setBackgroundColor('#000'); // Black background

        // Game Over text
        this.add.text(game.config.width / 2, 200, "Game Over", {
            fontSize: '64px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FF0000', // Red color
            align: 'center'
        }).setOrigin(0.5);

        // Display current score
        this.add.text(game.config.width / 2, 300, `Score: ${playerScore}`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFFFF', // White color
            align: 'center'
        }).setOrigin(0.5);

        // Instructions to return to title
        this.add.text(game.config.width / 2, 400, "Press SPACE to Return to Title", {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Capture SPACE key
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Check if SPACE is pressed → Return to title scene
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.scene.start('titleScene'); // Start the Title scene
        }
    }
}
