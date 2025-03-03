


class Level3 extends Mainlevel {
    constructor() {
        super('level3Scene'); // Scene Key
    }
    create() {
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);
        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        super.create(); // Call MainLevel create method
        
        
        
        
        this.current = 10;
        this.emenySpawn = [
            //this.emenySpawn5.bind(this),  
            
            this.emenySpawn1.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.emenySpawn6.bind(this),
            this.midBossSpawn.bind(this),
            this.emenySpawn8.bind(this),
            this.emenySpawn9.bind(this),
            this.emenySpawn10.bind(this),
            this.emenySpawn11.bind(this),
            this.finalBossSpawn.bind(this),            

        ]


        this.rumiaSpeechWithLilyWhite = ['aaa','test','test1'];
        this.rumiaSpeechWithKawashiroAfter = ['aaa','test','test1'];
        this.LilyWhiteSpeech = ['www','aa','test']
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
            this.time.delayedCall(1000, () =>{super.spawnEmeny(2,'list','SunFlowerFairy','SunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB',200)} , [], this);//step2
            this.time.delayedCall(2600, () =>{super.spawnEmeny(6,'arrow','Kedama','','l2',120)} , [], this);//step2
            this.time.delayedCall(7600, () =>{super.spawnEmeny(6,'arrow','Kedama','','l2',120)} , [], this);//step2
            this.time.delayedCall(15600, () =>{super.spawnEmeny(6,'arrow','Kedama','','l2',120)} , [], this);//step2
            this.time.delayedCall(27000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn2(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(200, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.time.delayedCall(4000, () =>{super.DelayXspawnEmeny(13,2300, 1,'list','MaidFairy','MaidFairy1','fromRight_shootExpandFanRedBlue_autoTB',180)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.DelayXspawnEmeny(13,2300, 1,'list','MaidFairy','MaidFairy2','fromRight_shootExpandFanRedBlue_autoTB',480)} , [], this);//step2


            this.time.delayedCall(35000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn3(){
        if(!this.isSprawn){
            this.isSprawn = true;

            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','DandelionFairy','DandelionFairy','fromTobBottom_shootRedFanTarge_shootBlueRandomFanTarget_autoTB',220)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','SunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB',500)} , [], this);//step2
            this.time.delayedCall(27000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            //this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 350)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 550)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 750)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 950)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(7 ,1200,1,'list','MaidFairy','MaidFairy3','fromRight_shootFanRedBlue_autoTB',270)} , [], this);//step2
            //this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 350)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 550)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 750)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 950)} , [], this);//step2
            this.time.delayedCall(8000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
            this.time.delayedCall(10000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn5(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','SunFlowerFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',300)} , [], this);//step2
            this.time.delayedCall(29000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn6(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1100, () =>{super.spawnEmeny(8,'list','Kedama','','hp_3o6',80)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,1200,1,'list','MaidFairy','MaidFairy3','fromRight_shoot3List_autoTB',100)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,1200,1,'list','MaidFairy','MaidFairy2','fromRight_shootBlue4Fan_autoTB',300)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,1200,1,'list','MaidFairy','MaidFairy3','fromRight_shoot3List_autoTB',500)} , [], this);//step2
            this.time.delayedCall(3500, () =>{super.spawnEmeny(8,'list','Kedama','','hp_3o6',80)} , [], this);//step2
            this.time.delayedCall(11000, () =>{super.spawnEmeny(8,'list','Kedama','','hp_3o6',80)} , [], this);//step2
            this.time.delayedCall(13000, () =>{super.spawnEmeny(8,'list','Kedama','','hp_3o6',80)} , [], this);//step2
            this.time.delayedCall(19000, () =>{super.spawnEmeny(8,'list','Kedama','','hp_3o6',80)} , [], this);//step2
            this.time.delayedCall(23000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    midBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Lily','white','TwirlFan360_SpeedPauseBulletBlack',320);
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            
            this.time.delayedCall(2400, () => {
                this.startDialogue('Rumia', this.rumiaSpeechWithLilyWhite, 'LilyWhite', this.LilyWhiteSpeech);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
        }
    
    }

    emenySpawn8(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,2000,4,'list','DivineSpirit','blue','r_sbl1_srl1_srl1_tb',200)} , [], this);//step2
            //this.spawnEmeny(4, 'list', 'DivineSpirit','blue','r_shooting2_l',200); // ✅ Spawns one DivineSpirit
            this.time.delayedCall(32000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }

    emenySpawn9(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunflowerFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',200)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunflowerFairy','fromRight_shootRedFanBlueFan_autoTB',400)} , [], this);//step2

            this.time.delayedCall(27000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn10(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,1200,1,'list','MaidFairy','MaidFairy3','fromBottom_shootRedFan3ToTarget_toTop',180)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(12,1700,1,'list','MaidFairy','MaidFairy1','fromBottom_shootRedFan3ToTarget_toTop',430)} , [], this);//step2
            this.time.delayedCall(22000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2

            this.time.delayedCall(27000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn11(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{ super.spawnEmeny(12,'list','Kedama','','hp_3o6',100,1200);} , [], this);//step2
            this.time.delayedCall(2000, () =>{ super.spawnEmeny(12,'list','Kedama','','hp_3o6',100,1200);} , [], this);//step2
            this.time.delayedCall(3000, () =>{ super.spawnEmeny(12,'list','Kedama','','hp_3o6',100,1200);} , [], this);//step2
            this.time.delayedCall(4000, () =>{ super.spawnEmeny(12,'list','Kedama','','hp_3o6',100,1200);} , [], this);//step2
            this.time.delayedCall(5000, () =>{ super.spawnEmeny(12,'list','Kedama','','hp_3o6',100,1200);} , [], this);//step2
            this.time.delayedCall(6000, () =>{ super.spawnEmeny(12,'list','Kedama','','hp_3o6',100,1200);} , [], this);//step2
            this.time.delayedCall(9000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    finalBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','MystiaLorelei','MystiaLorelei','MusicSignFanShape',320);
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

