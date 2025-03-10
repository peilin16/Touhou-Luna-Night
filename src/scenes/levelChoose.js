class LevelChoose extends Phaser.Scene {
    constructor() {
        super('levelChooseScene');
    }

    create() {
        // Background color (optional)
        this.cameras.main.setBackgroundColor('#000'); // Black background

        // Scene title
        this.add.text(game.config.width / 2, 150, "Select Level", {
            fontSize: '48px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Options
        this.options = [
            this.add.text(game.config.width / 2, 300, "Level 1", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 350, "Level 2", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 400, "Level 3", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 450, "Level 4", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5)
        ];

        // Highlight the first option
        this.selectedOptionIndex = 0;
        this.updateOptionColors();

        // Capture keys
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
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
                    // Select Level 1
                    this.selectLevel(1);
                    break;
                case 1:
                    // Select Level 2
                    this.selectLevel(2);
                    break;
                case 2:
                    // Select Level 3
                    this.selectLevel(3);
                    break;
                case 3:
                    // Select Level 4
                    this.selectLevel(4);
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

    selectLevel(level) {
        this.scene.start('difficultySelectionScene', { level: level }); // Start the difficulty selection scene with the selected level
    }
}
