class DBox {
    constructor(config) {
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.font = config.font;
        this.fontSize = config.fontSize;
        this.padding = config.padding;
        this.textSpeed = config.textSpeed;
        this.onComplete = config.onComplete;

        this.text = this.scene.add.bitmapText(this.x + this.padding, this.y + this.padding, this.font, '', this.fontSize);
        this.text.setMaxWidth(this.width - this.padding * 2);

        this.background = this.scene.add.graphics();
        this.background.fillStyle(0x000000, 0.8);
        this.background.fillRect(this.x, this.y, this.width, this.height);
        this.background.setDepth(-1);
    }

    start(text) {
        this.text.setText('');
        this.currentText = text;
        this.currentIndex = 0;
        this.timer = this.scene.time.addEvent({
            delay: this.textSpeed,
            //callback: this.addCharacter,
            callbackScope: this,
            loop: true
        });
    }

    /*addCharacter() {
        if (this.currentIndex < this.currentText.length) {
            this.text.setText(this.text.text + this.currentText[this.currentIndex]);
            this.currentIndex++;
        } else {
            this.timer.remove();
            if (this.onComplete) {
                this.onComplete();
            }
        }
    }*/

    destroy() {
        this.text.destroy();
        this.background.destroy();
    }
}



class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        this.dialogData = null;
        this.currentDialogIndex = 0;
        this.dbox = null;
        this.typewriterTimer = null;
        this.currentText = "";
        this.currentCharIndex = 0;
        this.JsonFile = 'dialogEN';
    }
    setFile(key){
        
    }
    startDialogue(key) {
        this.dialogData = this.scene.cache.json.get(this.JsonFile)[key]; // Load dialogue based on key
        if (!this.dialogData) {
            console.error(`Dialogue key ${key} not found!`);
            return;
        }

        this.currentDialogIndex = 0;
        this.scene.isSpeech = true; // Pause the game

        // Create Dialogue Box
        this.dbox = new DBox({
            scene: this.scene,
            x: 50,
            y: 400,
            width: 700,
            height: 150,
            font: 'gem_font',
            fontSize: 24,
            padding: 10,
            textSpeed: 50,
            onComplete: () => {
                this.nextDialogue();
            }
        });

        this.nextDialogue(); // Start first dialogue
    }

    nextDialogue() {
        if (this.currentDialogIndex < this.dialogData.length) {
            let dialog = this.dialogData[this.currentDialogIndex];

            // Update speaker if it's a new speaker
            if (dialog.newSpeaker) {
                this.scene.speakerText.setText(dialog.speaker);
            }

            // Initialize text display
            this.scene.dialogueText.setText(""); // Clear previous text
            this.currentText = dialog.dialog; // Store full text
            this.currentCharIndex = 0; // Reset character index

            // Remove existing typewriter timer before starting a new one
            if (this.typewriterTimer) {
                this.typewriterTimer.remove();
            }

            // Typewriter effect: Display characters one by one
            this.typewriterTimer = this.scene.time.addEvent({
                delay: 50, // Speed of text appearance (adjust as needed)
                callback: () => {
                    if (this.currentCharIndex < this.currentText.length) {
                        this.scene.dialogueText.setText(
                            this.scene.dialogueText.text + this.currentText[this.currentCharIndex]
                        );
                        this.currentCharIndex++;
                    } else {
                        this.typewriterTimer.remove(); // Stop when all text is displayed
                    }
                },
                loop: true
            });

            this.currentDialogIndex++; // Move to next dialogue entry
        } else {
            this.endDialogue(); // End dialogue when finished
        }
    }

    endDialogue() {
        this.scene.isSpeech = false;

        if (this.dbox) {
            this.dbox.destroy();
        }

        // Hide dialogue elements
        this.scene.dialogueBox.setVisible(false);
        this.scene.dialogueText.setVisible(false);
        this.scene.speakerText.setVisible(false);
    }
}