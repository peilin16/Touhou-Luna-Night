


class Level4 extends Mainlevel {
    constructor() {
        super('level4Scene'); // Scene Key
    }
    create() {
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);
        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        super.create(); // Call MainLevel create method
        
        
        
        
        this.current = 4;
        this.emenySpawn = [
            //this.finalBossSpawn.bind(this),            
            
            
            this.emenySpawn1.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.midBossSpawn.bind(this),
            this.emenySpawn7.bind(this),
            this.emenySpawn8.bind(this),
            this.emenySpawn9.bind(this),
            this.emenySpawn10.bind(this),
            this.finalBossSpawn.bind(this),   



        ]

        this.rumiaSpeechWithReimu = ['aaa','test','test1'];
        this.rumiaSpeechWithReimuAfter = ['aaa','test','test1'];
        this.ReimuSpeech = ['www','aa','test']
        this.KawashiroSpeechAfter = ['www','aa','test']
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
    emenySpawn1(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(200, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',200)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',350)} , [], this);//step2

            this.time.delayedCall(36000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        
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
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(13,1700,1,'list','MaidFairy','MaidFairy1','b_srf3t_t',130)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.DelayXspawnEmeny(9,1700,1,'list','MaidFairy','MaidFairy1','fromRight_shootFanRedBlue_autoTB',430)} , [], this);//step2
            this.time.delayedCall(23000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn3(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 550)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 750)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 950)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(13 ,1200,1,'list','MaidFairy','MaidFairy3','fromRight_shootFanRedBlue_autoTB',270)} , [], this);//step2
            //this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 350)} , [], this);//step2
            this.time.delayedCall(5000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 550)} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 750)} , [], this);//step2
            this.time.delayedCall(7000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 950)} , [], this);//step2
   

            this.time.delayedCall(16000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunflowerFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',200)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 550)} , [], this);//step2
            this.time.delayedCall(3000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 750)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 950)} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 550)} , [], this);//step2
            this.time.delayedCall(700, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 750)} , [], this);//step2
            this.time.delayedCall(8000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 950)} , [], this);//step2
            this.time.delayedCall(12000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 550)} , [], this);//step2
            this.time.delayedCall(13000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 750)} , [], this);//step2
            this.time.delayedCall(14000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 950)} , [], this);//step2

            this.time.delayedCall(16000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 550)} , [], this);//step2
            this.time.delayedCall(1800, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 750)} , [], this);//step2
            this.time.delayedCall(20000, () =>{super.spawnEmeny(1,'list','Flower','flower','flowerHit',-70, 950)} , [], this);//step2
            this.time.delayedCall(25000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn5(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(12 ,2000,2,'list','DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunflowerFairy','fromRight_shootRedFanBlueFan_autoTB',400)} , [], this);//step2
            this.time.delayedCall(25000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
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
        
            this.time.delayedCall(25000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn9(){
        if(!this.isSprawn){
        
            this.time.delayedCall(25000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn10(){
        if(!this.isSprawn){
        
        
        }
    }
    finalBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Reimu','Reimu','TwirlFan360_SpeedPauseBullet',320);
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
}