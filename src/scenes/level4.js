


class Level4 extends Mainlevel {
    constructor() {
        super('level4Scene'); // Scene Key
    }
    create() {
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);
        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        super.create(); // Call MainLevel create method
        this.soundManager.playBGM('level4');
        
        this.choose = 300
        super.showLevel('LEVEL 4');
        this.current = 0;
        this.emenySpawn = [
            //this.finalBossSpawn.bind(this),         
            this.spawnSpace.bind(this),
            this.emenySpawn1.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.midBossSpawn.bind(this),//6
            this.spawnSpace.bind(this),
            this.emenySpawn7.bind(this),
            this.emenySpawn8.bind(this),
            this.emenySpawn9.bind(this),//10
            this.spawnSpace.bind(this),
            this.emenySpawn10.bind(this),
            this.emenySpawn11.bind(this),
            this.finalBossSpawn.bind(this),   
            this.ending.bind(this),

        ]
    }
    update(){
        if(this.isSpeech)
            return;
        super.update();
        
        this.backgroundforest.tilePositionX += 2; // Adjust speed as needed
        // ✅ If no enemies are left, move to the next wave
        //
        this.nextWave();
    }
    spawnSpace(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(4000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn1(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(200, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',200)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',350)} , [], this);//step2

            this.time.delayedCall(38000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        
        }
    }
    emenySpawn2(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 550)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 750)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 950)} , [], this);//step2
            this.time.delayedCall(16000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 550)} , [], this);//step2
            this.time.delayedCall(1800, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 750)} , [], this);//step2
            this.time.delayedCall(20000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 950)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(13,1700,1,'list','MaidFairy','MaidFairy1','b_srf3t_t',230)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.DelayXspawnEmeny(9,1700,1,'list','MaidFairy','MaidFairy1','fromRight_shootFanRedBlue_autoTB',430)} , [], this);//step2
            this.time.delayedCall(23000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn3(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom',-70, 550)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom',-70, 750)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy3','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom',-70, 950)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(13 ,1200,1,'list','MaidFairy','MaidFairy3','fromRight_shootFanRedBlue_autoTB',300)} , [], this);//step2
            //this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 350)} , [], this);//step2
            this.time.delayedCall(5000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 550)} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy2','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 750)} , [], this);//step2
            this.time.delayedCall(7000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy3','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 950)} , [], this);//step2
   

            this.time.delayedCall(18000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','RoseFairy','roseFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',200)} , [], this);//step2
            this.time.delayedCall(1000, () =>{this.sprawnDestruction(14,'flower',2000)} , [], this);//step2
            this.time.delayedCall(32000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn5(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(12 ,2000,2,'list','DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB',400)} , [], this);//step2
            this.time.delayedCall(27000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    midBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Lily','black','TwirlFan360_SpeedPauseBullet',320);
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            /*
            this.time.delayedCall(2800, () => {
                this.startDialogue('Rumia', this.rumiaSpeechWithCrino, 'Crino', this.crinoSpeech);
            });*/
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
        }
    }
    emenySpawn7(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);
            this.time.delayedCall(3000, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(4500, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(6000, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(7500, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(9000, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(11500, () => {this.spawnEmeny(2, 'wideList', 'DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200);})
            this.time.delayedCall(14300, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn8(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,2200,1,'list','MaidFairy','MaidFairy3','fromRight_shootBlue4Fan_autoTB',100)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,2200,1,'list','MaidFairy','MaidFairy3','fromRight_shootFanRedBlue_autoTB',270)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,2200,1,'list','MaidFairy','MaidFairy3','fromRight_shootBlue4Fan_autoTB',440)} , [], this);//step2
            this.time.delayedCall(29000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }


    emenySpawn9(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss =super.spawnEmeny(1,'list','Crino','Crino','')//step2
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            this.boss.isSecondSprawn = true;
            this.boss.healthly = 270;

            this.time.delayedCall(2800, () => {
                this.startDialogue(14);
            });
            
        }
        else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
            
            
            
            //this.scene.start('level2');
        }
    }



    emenySpawn10(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.sprawnDestruction(30,'flower')
            
            this.time.delayedCall(30000, () => {
                this.isSprawn = false; 
                this.current += 1
            }, [], this);
        }
    }



    emenySpawn11(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',150)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','SunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB',330)} , [], this);//step2
            this.time.delayedCall(19000, () =>{super.spawnEmeny(1,'list','RoseFairy','roseFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',500)} , [], this);//step2
            this.time.delayedCall(57000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    finalBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Reimu','Reimu','TwirlFan360_SpeedPauseBullet',320);
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            
            this.time.delayedCall(2700, () => {
                this.startDialogue(15);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
            this.startDialogue(16);

        }
    }
    ending() {
        if (!this.isSprawn) {
            playerScore = rumia.Playerscore + 821;
            playerHealthly = rumia.healthly;
            this.isSprawn = true;
            // Fade the screen to black over 1 second (1000 ms)
            this.cameras.main.fadeOut(1200, 0, 0, 0);
            //this.startDialogue(17);
            // After the fade completes, start the dialogue
            this.time.delayedCall(1200, () => {
                this.soundManager.stopBGM();
                this.scene.start('gameEndScene');
                
            }, [], this);
        }
    }
}