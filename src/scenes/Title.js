class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // Background color (optional)
        this.cameras.main.setBackgroundColor('#000'); // Black background
//
        // Game title
        this.add.text(game.config.width / 2, 150, " Touhou: Lunar Night Chronicles ", {
            fontSize: '48px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        
        // Display current score (Global score variable from main.js)
        this.add.text(game.config.width / 2, 250, `Score: ${playerScore}`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFF00', // Yellow
            align: 'center'
        }).setOrigin(0.5);

        // Instructions
        this.options = [
            this.add.text(game.config.width / 2, 350, "Story Mode", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 400, "Level Selection", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 450, "Design", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5)
        ];
        this.selectedOptionIndex = 0;
        this.updateOptionColors();
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width / 2, 550, "Peilin Huang Final Project", {
            fontSize: '18px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);
        // Capture SPACE key
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Check if SPACE is pressed → Start the game
        // Navigate options
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.selectedOptionIndex = (this.selectedOptionIndex - 1 + this.options.length) % this.options.length;
            this.updateOptionColors();
        } else if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.selectedOptionIndex = (this.selectedOptionIndex + 1) % this.options.length;
            this.updateOptionColors();
        }

        // Select option
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            switch (this.selectedOptionIndex) {
                case 0:
                    // Start Story Mode
                    score = 0;
                    ScoreRate = 1;
                    this.scene.start('difficultySelectionScene', { level: 1 }); // Start the difficulty selection scene with the selected level
                    break;
                case 1:
                    // Go to Level Selection
                    this.scene.start('levelChooseScene');
                    break;
                case 2:
                    // Go to Design
                    this.scene.start('designScene');
                    break;
            }
        }
    }

    updateOptionColors() {
        for (let i = 0; i < this.options.length; i++) {
            if (i === this.selectedOptionIndex) {
                this.options[i].setColor('#FFFF00'); // Highlight color
            } else {
                this.options[i].setColor('#FFFFFF'); // Normal color
            }
        }
    }
}