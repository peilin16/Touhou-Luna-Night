class GameEnd extends Mainlevel {
    constructor() {
        super('gameEndScene');
    }



    create() {
        super.create();
        this.isSpeech = true;
        // Start the dialogue
        this.startDialogue(17);
    }
    update(){
        if(!this.isSpeech)
        {
            this.scene.start('titleScene');
        }
    }
    
}
