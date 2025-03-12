class GameStart extends Mainlevel {
    constructor() {
        super('gameStartScene');
    }

    
    create() {
        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        super.create();
        rumia.setVisible(false);
        this.isSpeech = true;
        // Start the dialogue
        this.startDialogue(18);
    }
    init(data) {
        this.level = data.level;
    }

    update(){
        if(!this.isSpeech)
        {
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
