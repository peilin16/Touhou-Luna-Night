


class Level3 extends Mainlevel {
    constructor() {
        super('level3Scene'); // Scene Key
    }
    create() {
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);
        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        rumia.Playerscore = playerScore;
        rumia.healthly = playerHealthly;

        super.create(); // Call MainLevel create method
        
        
        
        
        this.current = 0//13;
        this.emenySpawn = [
            //this.emenySpawn5.bind(this),  
            
            this.emenySpawn1.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.emenySpawn6.bind(this),
            this.midBossSpawn.bind(this),
            this.spawnSpace.bind(this),
            this.emenySpawn8.bind(this),
            this.emenySpawn9.bind(this),
            this.emenySpawn10.bind(this),
            this.emenySpawn11.bind(this),
            this.emenySpawn12.bind(this),
            this.finalBossSpawn.bind(this),    //13        
            this.nextlevel.bind(this),
        ]
        super.showLevel('LEVEL 3');

        this.soundManager.playBGM('level3');
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
            this.time.delayedCall(1000, () =>{super.spawnEmeny(2,'list','SunFlowerFairy','sunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB2',220)} , [], this);//step2
            this.time.delayedCall(2600, () =>{super.DelayXspawnEmeny(6,4000, 5,'list','Kedama','','l2',110)});//step2
            this.time.delayedCall(33000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn2(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(200, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.time.delayedCall(4000, () =>{super.DelayXspawnEmeny(13,2600, 1,'list','MaidFairy','MaidFairy1','fromRight_shootExpandFanRedBlue_autoTB',180)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.DelayXspawnEmeny(13,2600, 1,'list','MaidFairy','MaidFairy2','fromRight_shootExpandFanRedBlue_autoTB',480)} , [], this);//step2


            this.time.delayedCall(40000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn3(){
        if(!this.isSprawn){
            this.isSprawn = true;

            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','RoseFairy','roseFairy','fromTobBottom_shootRedFanTarge_shootBlueRandomFanTarget_autoTB',220)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB',500)} , [], this);//step2
            this.time.delayedCall(30000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            //this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','t_sbf2t_srl1_b',-70, 350)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom',-70, 550)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom',-70, 750)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toBottom',-70, 950)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(7 ,1200,1,'list','MaidFairy','MaidFairy3','fromRight_shootFanRedBlue_autoTB',290)} , [], this);//step2
            //this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 350)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 550)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 750)} , [], this);//step2
            this.time.delayedCall(2000, () =>{super.spawnEmeny(1,'list','MaidFairy','MaidFairy1','fromRight_shootBlueFan3ToTarget_shootRedFan2ToTarget_toTop',boardheigh + 70, 950)} , [], this);//step2
            this.time.delayedCall(12000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn5(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(3000, () =>{this.sprawnDestruction(10,'flower');} , [], this);//step2
            
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','RoseFairy','roseFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',300)} , [], this);//step2
            this.time.delayedCall(33000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn6(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1100, () =>{super.spawnEmeny(8,'list','Kedama','','hp_3o6',80)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,2200,1,'list','MaidFairy','MaidFairy3','fromRight_shoot3List_autoTB',100)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,2200,1,'list','MaidFairy','MaidFairy2','fromRight_shootBlue4Fan_autoTB',300)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15 ,2200,1,'list','MaidFairy','MaidFairy3','fromRight_shoot3List_autoTB',500)} , [], this);//step2

            this.time.delayedCall(35500, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    midBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Lily','white','TwirlFan360_SpeedPauseBulletBlack',320);
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            
            this.time.delayedCall(2200, () => {
                this.startDialogue(11);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
        }
    
    }
    spawnSpace(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(4000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
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
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','RoseFairy','roseFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',200)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','sunFlowerFairy','fromRight_shootRedFanBlueFan_autoTB',400)} , [], this);//step2

            this.time.delayedCall(30000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn10(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,1200,1,'list','MaidFairy','MaidFairy3','fromBottom_shootRedFan3ToTarget_toTop',180)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(12,1700,1,'list','MaidFairy','MaidFairy1','fromBottom_shootRedFan3ToTarget_toTop',430)} , [], this);//step2
            this.time.delayedCall(22000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2

            this.time.delayedCall(28000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn11(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(13 ,1400,1,'list','MaidFairy','MaidFairy2','fromRight_shootFanRedBlue_autoTB',210)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(11 ,1500,1,'list','DivineSpirit','blue','r_sbl1_srl1_srl1_tb',400)} , [], this);//step2
            this.time.delayedCall(22000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2

        }
        
    }
    emenySpawn12(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(7 ,2000,5,'list','Kedama','','hp_3o6',100)} , [], this);//step2
            this.time.delayedCall(16000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    finalBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','MystiaLorelei','MystiaLorelei','MusicSignFanShape',320);
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            
            this.time.delayedCall(2500, () => {
                this.startDialogue(12);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
            this.startDialogue(13);
        }
        
    }
    nextlevel(){
        if(!this.isSpeech){
            playerScore = rumia.Playerscore;
            playerHealthly = rumia.healthly;
            this.time.delayedCall(8500, () =>{
                this.soundManager.stopBGM();
                this.scene.start('level4Scene'); } , [], this);//step2
        }
    }
}

