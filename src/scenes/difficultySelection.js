class DifficultySelection extends Phaser.Scene {
    constructor() {
        super('difficultySelectionScene');
        
    }

    create(data) {
        // Background color (optional)
        this.cameras.main.setBackgroundColor('#000'); // Black background
        // Scene title
        this.add.text(game.config.width / 2, 150, "Select Difficulty", {
            fontSize: '48px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Options
        this.options = [
            this.add.text(game.config.width / 2, 300, "Player X 5", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 350, "Player X 30", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 400, "Player X 99999", {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5)
        ];
        this.level = data.level; 
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
                    // Start Normal Mode
                    //this.startGame('normalMode');
                    playerHealthly = 5;
                    break;
                case 1:
                    // Start Simple Mode
                    playerHealthly = 30;
                    break;
                case 2:
                    // Start Infinite Mode
                    playerHealthly = 99999;
                    break;
            }
            this.startGame();
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

    startGame(mode) {
        if(this.level == 1)
            this.scene.start('gameStartScene', { level: this.level });
        else if(this.level == 2)
            this.scene.start('level2Scene');
        else if(this.level == 3)
            this.scene.start('level3Scene');
        else if(this.level == 4)
            this.scene.start('level4Scene');
    }
}
