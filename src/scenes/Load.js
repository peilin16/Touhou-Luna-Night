class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload() {
        //rumia load
        //this.load.image('rumiaStart', './assets/character/rumia1.png');
        this.load.image('rumiafly1', './assets/character/rumia-fly1.png');
        this.load.image('rumiafly2', './assets/character/rumia-fly2.png');
        this.load.image('rumiafly3', './assets/character/rumia-fly3.png');
        //hit
        this.load.image('rumiaflyhit', './assets/character/rumia-fly-hit.png');
        this.load.image('rumiaflydown', './assets/character/rumia-fly-down.png');
        this.load.image('HitPoint', './assets/character/HitPoint.png');


        //defence
        this.load.image('rumiaDefence1', './assets/character/rumia-fly-defence1.png');
        this.load.image('rumiaDefence2', './assets/character/rumia-fly-defence2.png');
        this.load.image('rumiaDefence3', './assets/character/rumia-fly-defence3.png');
        this.load.image('rumiaDefence4', './assets/character/rumia-fly-defence4.png');
        //this.load.image('rumiaDefence5', './assets/img/rumia-defence5.png');
        // background load
        this.load.image('backgroundtop', './assets/img/background.png');
        this.load.image('backgrounddown', './assets/img/background-down.png');
        //state assets load
        this.load.image('tree1', './assets/character/tree1.png');
        this.load.image('snow1', './assets/img/snow1.png');
        this.load.image('snow2', './assets/img/snow2.png');
        this.load.image('snow3', './assets/img/snow3.png');

        //pill load
        this.load.image('Kedama', './assets/img/Pill.png');
        this.load.image('KedamaHit', './assets/img/Pill-hit.png');
        this.load.image('KedamaRed', './assets/img/PillRed.png');
        this.load.image('KedamaRedHit', './assets/img/PillRed-Hit.png');
        //DivineSpiritBlue
        this.load.image('DivineSpiritBlue1', './assets/character/DivineSpiritBlue1.png');
        this.load.image('DivineSpiritBlue2', './assets/character/DivineSpiritBlue2.png');
        this.load.image('DivineSpiritBlue3', './assets/character/DivineSpiritBlue3.png');

        //Daiyousei load
        this.load.image('DaiyouseiNothing1', './assets/character/Daiyousei-nothing1.png');
        this.load.image('DaiyouseiNothing2', './assets/character/Daiyousei-nothing2.png');
        this.load.image('DaiyouseiScore1', './assets/character/Daiyousei-score1.png');
        this.load.image('DaiyouseiScore2', './assets/character/Daiyousei-score2.png');

        
//WriggleHit

        //flower fairy load
        this.load.image('sunflowerFairy1', './assets/character/sunflowerFairy1.png');
        this.load.image('sunflowerFairy2', './assets/character/sunflowerFairy2.png');
        this.load.image('sunflowerFairy3', './assets/character/sunflowerFairy3.png');
        this.load.image('sunflowerFairyHit', './assets/character/sunflowerFairy-hit1.png');
        
        this.load.image('dandelionFairy1', './assets/character/DandelionFairy1.png');
        this.load.image('dandelionFairy2', './assets/character/DandelionFairy2.png');
        this.load.image('dandelionFairy3', './assets/character/DandelionFairy3.png');
        this.load.image('dandelionFairyHit', './assets/character/DandelionFairy-hit.png');

        this.load.image('roseFairy1', './assets/character/roseFairy1.png');
        this.load.image('roseFairy2', './assets/character/roseFairy2.png');
        this.load.image('roseFairy3', './assets/character/roseFairy3.png');
        this.load.image('roseFairyHit', './assets/character/roseFairyHit.png');
        //maid fairy load
        this.load.image('MaidFairy1_1', './assets/character/MaidFairy1.png');
        this.load.image('MaidFairy1_2', './assets/character/MaidFairy2.png');
        this.load.image('MaidFairy1_3', './assets/character/MaidFairy3.png');
        this.load.image('MaidFairy1_Hit', './assets/character/MaidFairy1Hit.png');

        this.load.image('MaidFairy2_1', './assets/character/MaidFairy2_1.png');
        this.load.image('MaidFairy2_2', './assets/character/MaidFairy2_2.png');
        this.load.image('MaidFairy2_3', './assets/character/MaidFairy2_3.png');
        this.load.image('MaidFairy2_Hit', './assets/character/MaidFairy2_Hit.png');

        this.load.image('MaidFairy3_1', './assets/character/MaidFairy3_1.png');
        this.load.image('MaidFairy3_2', './assets/character/MaidFairy3_2.png');
        this.load.image('MaidFairy3_3', './assets/character/MaidFairy3_3.png');
        this.load.image('MaidFairy3_Hit', './assets/character/MaidFairy3_Hit.png');

        //boss load
        //level 1
        this.load.image('Wriggle1', './assets/character/Wriggle1.png');
        this.load.image('Wriggle2', './assets/character/Wriggle2.png');
        this.load.image('Wriggle3', './assets/character/Wriggle3.png');
        this.load.image('WriggleHit', './assets/character/WriggleHit.png');
        this.load.image('Crino1', './assets/character/crino-fly1.png');
        this.load.image('CrinoFront', './assets/character/crino.png');
        this.load.image('CrinoHit', './assets/character/CrinoHit.png');
        //move exit


        this.load.image('WriggleFly1', './assets/character/WriggleFly1.png');
        this.load.image('WriggleFly2', './assets/character/WriggleFly2.png');
        this.load.image('WriggleFly3', './assets/character/WriggleFly3.png');

        this.load.image('crinoflyRight1', './assets/character/crino-flyRight1.png');

        this.load.image('SunnyMilkFlyRight1', './assets/character/SunnyMilkFlyRight1.png');
        this.load.image('SunnyMilkFlyRight2', './assets/character/SunnyMilkFlyRight2.png');

        this.load.image('Daiyousei-nothingRight1', './assets/character/Daiyousei-nothingRight1.png');

        this.load.image('MystiaLoreleiRight1', './assets/character/MystiaLoreleiRight1.png');

        this.load.image('LilyWhiteRight1', './assets/character/LilyWhiteRight1.png');
        this.load.image('LilyWhiteRight2', './assets/character/LilyWhiteRight2.png');

        
        //level2
        this.load.image('SunnyMilk1', './assets/character/SunnyMilk1.png');
        this.load.image('SunnyMilk2', './assets/character/SunnyMilk2.png');
        this.load.image('SunnyMilkFly1', './assets/character/SunnyMilkFly1.png');
        this.load.image('SunnyMilkFly2', './assets/character/SunnyMilkFly2.png');
        this.load.image('SunnyMilkHit', './assets/character/SunnyMilkHit.png');
        this.load.image('StarSapphire2', './assets/character/StarSapphire2.png');
        this.load.image('StarSapphire1', './assets/character/StarSapphire1.png');
        this.load.image('StarSapphireHit', './assets/character/StarSapphireHit.png');
        this.load.image('Luna1', './assets/character/Luna1.png');    
        this.load.image('Luna2', './assets/character/Luna2.png'); 
        this.load.image('LunaHit', './assets/character/LunaHit.png'); 
        this.load.image('Satellite1', './assets/character/Satellite1.png');
        this.load.image('Satellite2', './assets/character/Satellite2.png');
        this.load.image('KawashiroIdle', './assets/character/KawashiroIdle.png');        
        this.load.image('KawashiroSecondState', './assets/character/KawashiroSecondState.png');   
        this.load.image('KawashiroSecondStateHit', './assets/character/KawashiroSecondStateHit.png');   
        this.load.image('StarSapphireRight2', './assets/character/StarSapphireRight2.png');
        this.load.image('StarSapphireRight1', './assets/character/StarSapphireRight1.png');
        this.load.image('LunaRight1', './assets/character/LunaRight1.png');    
        this.load.image('LunaRight2', './assets/character/LunaRight2.png'); 

        //level3
        this.load.image('LilyWhite1', './assets/character/LilyWhite1.png');
        this.load.image('LilyWhite2', './assets/character/LilyWhite2.png');
        this.load.image('MystiaLorelei1', './assets/character/MystiaLorelei1.png');
        this.load.image('MystiaLoreleiHit', './assets/character/MystiaLoreleiHit.png');
        this.load.image('MystiaLoreleiState2', './assets/character/MystiaLoreleiState2.png');
        //level4
        
        this.load.image('LilyBlack1', './assets/character/LilyBlack1.png');
        this.load.image('LilyBlack2', './assets/character/LilyBlack2.png');
        this.load.image('reimu-idle1', './assets/character/reimu-idle1.png');
        this.load.image('reimu-idle2', './assets/character/reimu-idle2.png');
        this.load.image('reimu-fly-left1', './assets/character/reimu-fly-left1.png');
        this.load.image('reimu-fly-left2', './assets/character/reimu-fly-left2.png');


        //bullet load
        this.load.image('blueSmallCircleBullet','./assets/img/blueSmallCircleBullet.png');
        this.load.image('blueMediumCircleBullet','./assets/img/blueMediumCircleBullet.png');
        this.load.image('blueLargeCircleBullet','./assets/img/blueLargeCircleBullet.png');
        
        this.load.image('redSmallCircleBullet','./assets/img/redSmallCircleBullet.png');
        this.load.image('redMediumCircleBullet','./assets/img/redMediumCircleBullet.png');
        this.load.image('redLargeCircleBullet','./assets/img/redLargeCircleBullet.png');

        this.load.image('blueCapsuleBullet','./assets/img/blueCapsuleBullet.png');
        this.load.image('redCapsuleBullet','./assets/img/redCapsuleBullet.png');

        this.load.image('blueLongSemicircleBullet','./assets/img/blueLongSemicircleBullet.png');
        this.load.image('redLongSemicircleBullet','./assets/img/redLongSemicircleBullet.png');
        this.load.image('redExtremeLongSemicircleBullet','./assets/img/redExtremeLongSemicircleBullet.png');
        
        this.load.image('blueArrowBullet','./assets/img/blueArrowBullet.png');
        this.load.image('redArrowBullet','./assets/img/redArrowBullet.png');

        this.load.image('blueSquareSpecialBullet','./assets/img/BlueSquareSpecialBullet.png');
        this.load.image('redSquareSpecialBullet','./assets/img/RedSquareSpecialBullet.png');



        this.load.image('blueMusicSign1Bullet','./assets/img/BlueMusicSign1Bullet.png');
        this.load.image('blueMusicSign2Bullet','./assets/img/BlueMusicSign2Bullet.png');
        this.load.image('redMusicSign1Bullet','./assets/img/RedMusicSign1Bullet.png');
        this.load.image('redMusicSign2Bullet','./assets/img/RedMusicSign2Bullet.png');


        this.load.image('bug','./assets/img/bug.png');
        this.load.image('flower','./assets/img/flower.png');
        this.load.image('ice','./assets/img/ice.png');
        this.load.image('iceTop','./assets/img/iceTop.png');
        this.load.image('yinYangOrbs','./assets/img/yinYangOrbs.png');
        //element load
        this.load.image('scoreSmall','./assets/img/scoreSmall.png');
        this.load.image('scoreMedium','./assets/img/scoreMedium.png');
        this.load.image('scoreLarge','./assets/img/scoreLarge.png');
        //test load
        //this.load.image('test',  'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
//ExplosionSmall1_1
        this.load.image('ExplosionSmall1_1','./assets/img/ExplosionSmall1_1.png');
        this.load.image('ExplosionSmall1_2','./assets/img/ExplosionSmall1_2.png');
        this.load.image('ExplosionSmall1_3','./assets/img/ExplosionSmall1_3.png');
        this.load.image('ExplosionSmall1_4','./assets/img/ExplosionSmall1_4.png');
        this.load.image('ExplosionSmall1_5','./assets/img/ExplosionSmall1_5.png');
        this.load.image('ExplosionSmall1_6','./assets/img/ExplosionSmall1_6.png');
        this.load.image('ExplosionSmall1_7','./assets/img/ExplosionSmall1_7.png');

        this.load.image('ExplosionSmall2_1','./assets/img/ExplosionSmall2_1.png');
        this.load.image('ExplosionSmall2_2','./assets/img/ExplosionSmall2_2.png');
        this.load.image('ExplosionSmall2_3','./assets/img/ExplosionSmall2_3.png');
        this.load.image('ExplosionSmall2_4','./assets/img/ExplosionSmall2_4.png');
        this.load.image('ExplosionSmall2_5','./assets/img/ExplosionSmall2_5.png');
        this.load.image('ExplosionSmall2_6','./assets/img/ExplosionSmall2_6.png');
        this.load.image('ExplosionSmall2_7','./assets/img/ExplosionSmall2_7.png');

        this.load.image('ExplosionLarge1_1','./assets/img/ExplosionLarge1_1.png');
        this.load.image('ExplosionLarge1_2','./assets/img/ExplosionLarge1_2.png');
        this.load.image('ExplosionLarge1_3','./assets/img/ExplosionLarge1_3.png');
        this.load.image('ExplosionLarge1_4','./assets/img/ExplosionLarge1_4.png');
        this.load.image('ExplosionLarge1_5','./assets/img/ExplosionLarge1_5.png');
        this.load.image('ExplosionLarge1_6','./assets/img/ExplosionLarge1_6.png');
        this.load.image('ExplosionLarge1_7','./assets/img/ExplosionLarge1_7.png');
        this.load.image('ExplosionLarge1_8','./assets/img/ExplosionLarge1_8.png');
        //sound Effect
        this.load.audio('hitHurt1', './assets/audio/hitHurt1.wav');
        this.load.audio('hitHurt2', './assets/audio/hitHurt2.wav');
        this.load.audio('hitHurt3', './assets/audio/hitHurt3.wav');
        this.load.audio('pickUp1', './assets/audio/pickupCoin.wav');
        this.load.audio('bulletHit1', './assets/audio/bulletHit1.mp3');
        this.load.audio('bulletHit2', './assets/audio/bulletHit2.mp3');
        this.load.audio('bulletHit3', './assets/audio/bulletHit3.mp3');

        this.load.audio('shooting1', './assets/audio/shooting1.mp3');
        this.load.audio('shooting2', './assets/audio/shooting2.mp3');
        this.load.audio('shooting3', './assets/audio/shooting3.mp3');
        this.load.audio('speedPause1', './assets/audio/speedPause1.mp3');
        this.load.audio('dialogue1', './assets/audio/dialogue1.wav');
        
        //BGM
        this.load.audio('level1', './assets/bgm/level1.wav');
        this.load.audio('level1Final', './assets/bgm/level1Final.wav');
        this.load.audio('level2', './assets/bgm/level2.wav');
        this.load.audio('level2Mid', './assets/bgm/level2Mid.wav');
        this.load.audio('level2Final', './assets/bgm/level2Final.wav');
        this.load.audio('level3', './assets/bgm/level3.wav');
        this.load.audio('level3Final', './assets/bgm/level3Final.wav');
        this.load.audio('level4', './assets/bgm/level4.wav');
        this.load.audio('level4Final', './assets/bgm/level4Final.wav');
        
        this.load.image('explosionTexture', './assets/img/explosionTexture1.png');
        
        //JSON
        this.load.json('dialogEN', './dialogJSON/dialogEN.JSON');
        this.load.json('dialogCN', './dialogJSON/dialogCN.JSON');
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');
    }
    create() {

        //alert('aaa')
        // check for local storage browser support
        // create anims rumia fly
        //shootingLogic = new stgShootingLogic();
        
        
        
        this.scene.start('titleScene');
    }
    update(){

    }
}