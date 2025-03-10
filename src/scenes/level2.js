


class Level2 extends Mainlevel {
    constructor() {
        super('level2Scene'); // Scene Key
    }

    create() {
        // Create the animation for Rumia=
       
        this.startfield = this.add.tileSprite(0, 0, boardwidth, boardheigh, 'backgroundtop').setOrigin(0, 0);
        this.backgroundforest = this.add.tileSprite(0, 420, boardwidth, boardheigh, 'backgrounddown').setOrigin(0, 0);
        //rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        //rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        rumia = new Rumia(this, 150, 100, ).setOrigin(0.5, 0);
        rumia.Playerscore = playerScore;
        rumia.healthly = playerHealthly;

        super.create(); // Call MainLevel create method
        
        /*this.time.addEvent({
            delay: 2000, // Fire every 2 seconds
            callback: () => {
                if (rumia) {
                    let bullet = new BlueCircleBullet(this, 200, 400, rumia,'s');
                    this.bulletGroup.add(bullet);
                    bullet.moving(); // Start moving towards Rumia
                }
            },
            callbackScope: this,
            loop: true
        });*/
        
        
        this.current = 14;
        this.emenySpawn = [
            /*this.emenySpawn13.bind(this),
            this.finalBossSpawn.bind(this),*/
            //this.emenySpawn11.bind(this),

            
            this.emenySpawn1.bind(this),
            this.emenySpawn2.bind(this),
            this.emenySpawn3.bind(this),
            this.emenySpawn4.bind(this),
            this.emenySpawn5.bind(this),
            this.emenySpawn6.bind(this),
            this.midBossSpawn.bind(this),
            this.midBossSpawn2.bind(this),
            this.spawnSpace.bind(this),
            this.emenySpawn9.bind(this),
            this.emenySpawn10.bind(this),
            this.emenySpawn11.bind(this),
            this.emenySpawn12.bind(this),
            this.emenySpawn13.bind(this),

            
            this.finalBossSpawn.bind(this),
            this.nextlevel.bind(this),
        ];

        
        this.isSpeech = false;

        this.Sangetsusei = new Character(this,760,310,'');//super(scene, x, y, 'Kedama','Kedama', frame)
        this.Sangetsusei.healthly = 1791;
        this.Sangetsusei.setVisible(false); // Hide the sprite
        this.Sangetsusei.setSize(130,130); // Hide the sprite
        this.Sangetsusei.isEmeny = false;
        this.Sangetsusei.isDone = true;
        this.soundManager.playBGM('level2');
        // ✅ Start the first wave
        this.nextWave();

        //music
        /*
        this.bgMusic = this.sound.add('background', { 
            loop: true, // Loop the music infinitely
            volume: 0.5 // Adjust volume (0.0 to 1.0)
            });
    
        this.bgMusic.play();*/
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
            this.time.delayedCall(4500, () =>{super.DelayXspawnEmeny(14,2800,1,'list','MaidFairy','MaidFairy1','shoot_fanShapeTypeSniperBulletToTarget_AutoTB',130)} , [], this);//step2
            this.time.delayedCall(4500, () =>{super.DelayXspawnEmeny(14,2800,1,'list','MaidFairy','MaidFairy3','shoot_fanShapeTypeSniperBulletToTarget_AutoTB',430)} , [], this);//step2
            this.time.delayedCall(45700, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        } 
    }
    emenySpawn2(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(2000, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            //this.time.delayedCall(4600, () =>{super.DelayXspawnEmeny(7,2200,5,'list','Kedama','','l2',80)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.DelayXspawnEmeny(13,1700,1,'list','MaidFairy','MaidFairy2','fromTop_shootBlueFan2ToTarget_shootRedList1_toTarget',130)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',520)} , [], this);//step2
            this.time.delayedCall(32500, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn3(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','SunnyMilk','SunnyMilkFly','ShootingFanShape360_SpeedPauseSniper',320)
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
    emenySpawn4(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(4000, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.time.delayedCall(6000, () =>{super.DelayXspawnEmeny(13,2300,1,'list','MaidFairy','MaidFairy2','b_srf3t_t',130)} , [], this);//step2
            this.time.delayedCall(6000, () =>{super.DelayXspawnEmeny(13,2300, 1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',480)} , [], this);//step2
            
            this.time.delayedCall(35000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn5(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','SunFlowerFairy','SunFlowerFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_autoTB',220)} , [], this);//step2
            this.time.delayedCall(4000, () =>{super.DelayXspawnEmeny(11,2300, 1,'list','MaidFairy','MaidFairy1','fromRight_shoot3List_autoTB',480)} , [], this);//step2
            this.time.delayedCall(28500, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn6(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(13,1200, 5,'list','Kedama','Kedama','l2',100)} , [], this);//step2
            this.time.delayedCall(19000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    midBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Kawashiro','Kawashiro','r_sbo_sro',320)
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            
            this.time.delayedCall(2800, () => {
                this.startDialogue(0);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;


            this.time.delayedCall(100, () => {
                this.startDialogue(0);
            });
        }
    }
    midBossSpawn2(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.boss = super.spawnEmeny(1,'list','Satellite','Satellite','r_sbo_sro',320,730)
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
        
            this.time.delayedCall(2800, () => {
                this.startDialogue(0);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
        }
    }
    spawnSpace(){
        if(!this.isSprawn){
            this.time.delayedCall(200, () => {this.spawnEmeny(1, 'list', 'Daiyousei','','healthly',200);});
            this.isSprawn = true;
            this.time.delayedCall(4200, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn9(){
        if(!this.isSprawn){
            this.soundManager.playBGM('level2');
            this.isSprawn = true;
            this.time.delayedCall(1400, () =>{super.DelayXspawnEmeny(6,3000, 1,'list','MaidFairy','MaidFairy1','r_sbf3t_srf2t',300)} , [], this);//step2
            this.time.delayedCall(3500, () =>{super.spawnEmeny(5,'list','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(4400, () =>{super.DelayXspawnEmeny(4,3000, 1,'list','MaidFairy','MaidFairy2','r_sb4f_at',120)} , [], this);//step2
            this.time.delayedCall(4400, () =>{super.DelayXspawnEmeny(4,3000, 1,'list','MaidFairy','MaidFairy2','r_sb4f_at',420)} , [], this);//step2
            //super.spawnEmeny(5,'list','Kedama','','l2');
            this.time.delayedCall(7500, () =>{super.spawnEmeny(5,'list','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(24300, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn10(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','RoseFairy','roseFairy','fromRight_ShootRandomTwirFan360_TwrilListBullet_autoTB',330)} , [], this);//step2
            this.time.delayedCall(5500, () =>{super.spawnEmeny(5,'diagonal','Kedama','','l2',160)} , [], this);//step2

            this.time.delayedCall(8500, () =>{super.spawnEmeny(5,'arrow','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(25500, () =>{super.spawnEmeny(5,'list','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(32500, () =>{super.spawnEmeny(5,'arrow','Kedama','','l2',160)} , [], this);//step2
            this.time.delayedCall(38500, () =>{super.spawnEmeny(5,'arrow','Kedama','','l2',160)} , [], this);//step2

            
            this.time.delayedCall(42000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn11(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.sprawnDestruction(10,'flower');
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,1200,1,'list','MaidFairy','MaidFairy3','fromBottom_shootRedFan3ToTarget_toTop',180)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(12,1700,1,'list','MaidFairy','MaidFairy1','fromBottom_shootRedFan3ToTarget_toTop',430)} , [], this);//step2
            this.time.delayedCall(22000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    emenySpawn12(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.spawnEmeny(1,'list','DandelionFairy','dandelionFairy','fromRight_shootRedTwrilFan_shootBlueTwirlFan_UNSniper_autoTB',180)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(15,1700,1,'list','MaidFairy','MaidFairy1','b_sbf3t_t',430)} , [], this);//step2
            this.time.delayedCall(33000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
        
    }
    emenySpawn13(){
        if(!this.isSprawn){
            this.isSprawn = true;
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,2000,1,'list','MaidFairy','MaidFairy3','fromRight_shootBlue4Fan_autoTB',100)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,2000,1,'list','MaidFairy','MaidFairy3','fromRight_shootFanRedBlue_autoTB',270)} , [], this);//step2
            this.time.delayedCall(1000, () =>{super.DelayXspawnEmeny(10 ,2000,1,'list','MaidFairy','MaidFairy3','fromRight_shootBlue4Fan_autoTB',440)} , [], this);//step2
            this.time.delayedCall(24000, () =>{this.isSprawn = false; this.current +=1} , [], this);//step2
        }
    }
    finalBossSpawn(){
        if(!this.isSprawn){
            this.isSprawn = true;
            let m =super.spawnEmeny(1,'list','SunnyMilk','SunnyMilk','speedPause19ExpandFanDouble',320);
            m.firstState = false;
            
            m.startSapphire = super.spawnEmeny(1,'list','StarSapphire','StarSapphire','r_sbrF',120);
            m.luna = super.spawnEmeny(1,'list','Luna','Luna','r_sbrF',520);
            m.healthly = 999999;
            this.boss = this.Sangetsusei; 
            this.bossHealthTotal = this.boss.healthly;
            this.bossHealthBar.setVisible(true);
            
            this.time.delayedCall(4000, () => {
                this.startDialogue(0);
            });
        }else if(this.boss.isDrop){
            this.current += 1;
            this.isSprawn = false;
            this.boss = null;
            this.time.delayedCall(100, () => {
                this.startDialogue(0);
            });
        }
    }
    nextlevel(){
        if(!this.isSpeech){
            playerScore = rumia.Playerscore;
            playerHealthly = rumia.healthly;
            this.time.delayedCall(8500, () =>{this.scene.start('level3Scene'); } , [], this);//step2
        }
    }
}
