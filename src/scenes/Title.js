class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#000'); // Black background

        // ✅ Language Storage (Default: English)
        this.language = 'EN'; // Default language
        this.translations = {
            EN: {
                title: "Touhou: Lunar Night Chronicles",
                storyMode: "Story Mode",
                levelSelection: "Level Selection",
                design: "Design",
                project: "Peilin Huang Final Project",
                langSwitch: "Language: Chinese (Press L)"
            },
            CN: {
                title: "东方: 月夜纪事",
                storyMode: "故事模式",
                levelSelection: "关卡选择",
                design: "游戏设计",
                project: "Peilin Huang",
                langSwitch: "语言: English (按 L 切换)"
            }
        };

        // ✅ Title Text
        this.titleText = this.add.text(game.config.width / 2, 150, this.translations[this.language].title, {
            fontSize: '48px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // ✅ Display Score
        this.scoreText = this.add.text(game.config.width / 2, 250, `Score: ${playerScore}`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFF00', // Yellow
            align: 'center'
        }).setOrigin(0.5);

        // ✅ Menu Options
        this.options = [
            this.add.text(game.config.width / 2, 350, this.translations[this.language].storyMode, { fontSize: '28px', fontFamily: 'Arial', color: '#FFFFFF', align: 'center' }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 400, this.translations[this.language].levelSelection, { fontSize: '28px', fontFamily: 'Arial', color: '#FFFFFF', align: 'center' }).setOrigin(0.5),
            this.add.text(game.config.width / 2, 450, this.translations[this.language].design, { fontSize: '28px', fontFamily: 'Arial', color: '#FFFFFF', align: 'center' }).setOrigin(0.5)
        ];

        this.selectedOptionIndex = 0;
        this.updateOptionColors();

        // ✅ Language Switch Button
        this.languageText = this.add.text(game.config.width / 2, 520, this.translations[this.language].langSwitch, {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // ✅ Project Credit
        this.projectText = this.add.text(game.config.width / 2, 550, this.translations[this.language].project, {
            fontSize: '18px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // ✅ Keyboard Controls
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L); // Language Switch

        // ✅ Capture Input
        this.input.keyboard.on('keydown-L', () =>{
            this.toggleLanguage();
            if( this.language === 'EN')
                DialogFile = 'dialogEN'
            else if(this.language === 'CN')
                DialogFile = 'dialogCN'
        });
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
                    this.scene.start('difficultySelectionScene', { level: 1 });
                    break;
                case 1:
                    this.scene.start('levelChooseScene');
                    break;
                case 2:
                    this.scene.start('designScene');
                    break;
            }
        }
    }

    updateOptionColors() {
        for (let i = 0; i < this.options.length; i++) {
            this.options[i].setColor(i === this.selectedOptionIndex ? '#FFFF00' : '#FFFFFF');
        }
    }

    // ✅ Toggle Language
    toggleLanguage() {
        this.language = this.language === 'EN' ? 'CN' : 'EN';

        // ✅ Update Text
        this.titleText.setText(this.translations[this.language].title);
        this.options[0].setText(this.translations[this.language].storyMode);
        this.options[1].setText(this.translations[this.language].levelSelection);
        this.options[2].setText(this.translations[this.language].design);
        this.projectText.setText(this.translations[this.language].project);
        this.languageText.setText(this.translations[this.language].langSwitch);
    }
}
