class  dataRecord{

    constructor() {
        // Divine Spirit
        this.blueDivineSpirit_height = 35;
        this.blueDivineSpirit_width = 20;
        this.blueDivineSpirit_speed = -2.5;

        // Kedama
        this.kedama_height = 45;
        this.kedama_width = 45;
        this.kedama_speed = -2;
        // Fairy
        this.sunflowerFairy_height = 75;
        this.sunflowerFairy_width = 70;
        this.sunflowerFairy_speed = -2;

        this.dandelionFairy_height = 75;
        this.dandelionFairy_width = 70;
        this.dandelionFairy_speed = -2;

        this.MaidFairy1_height = 75
        this.MaidFairy1_width = 70

        //
        this.Daiyousei_width = 75
        this.Daiyousei_height = 75
        // Rumia (Player)
        this.rumia_height = 44;
        this.rumia_width = 44;
        this.rumia_circle = 4.5;
        this.rumia_speed_Normal = 195;
        this.rumia_speed_Slow = 102;
        this.rumia_defense_radius = 52;

        this.rumiaXoffset = 49
        this.rumiaYoffset = 33
        //speed
        this.emeny_speed_normal100 = 100;
        this.emeny_speed_normal110 = 110;
        this.emeny_speed_normal120 = 120;
        this.emeny_speed_normal130 = 130;
        this.emeny_speed_normal140 = 140;
        this.emeny_speed_normal150 = 150;
        this.emeny_speed_normal160 = 160;
        this.emeny_speed_normal170 = 170;
        this.emeny_speed_normal180 = 180;
        this.emeny_speed_normal190 = 190;
        this.emeny_speed_normal200 = 200;
        //boss
        this.Wriggle_height = 104
        this.Wriggle_width = 67
        this.Crino_height = 100
        this.Crino_width = 99

        this.SunnyMilk_height = 94
        this.SunnyMilk_width = 85
        this.Satellite_height = 90
        this.Satellite_width = 130
        this.StarSapphire_height = 90
        this.StarSapphire_width = 80
        this.Luna_height = 90
        this.Luna_width = 80
        this.Kawashiro_height = 100
        this.Kawashiro_width = 80

        this.Lily_height = 99
        this.Lily_width = 99
        this.MystiaLorelei_height = 109
        this.MystiaLorelei_width = 99

        this.Reimu_height = 121
        this.Reimu_width = 109


        this.musicSignBulle1High = 39
        this.musicSignBulle2High = 39
        this.musicSignBulle1Width = 35
        this.musicSignBulle2Width = 25
        //bulletSpeed
        this.Bullet_speed_80 = 8.0;
        this.Bullet_speed_100 = 10.0;
        this.Bullet_speed_110 = 11.0;
        this.Bullet_speed_120 = 12.0;
        this.Bullet_speed_130 = 13.0;
        this.Bullet_speed_140 = 14.0;
        this.Bullet_speed_150 = 15.0;
        this.Bullet_speed_155 = 15.5;
        this.Bullet_speed_160 = 16.0;
        this.Bullet_speed_170 = 17.0;
        this.Bullet_speed_180 = 18.0;
        this.Bullet_speed_190 = 19.0;
        this.Bullet_speed_200 = 20.0;
        this.Bullet_speed_230 = 23.0;
        this.ice_height = 30
        this.ice_width = 65
        this.ying_height = 55
        //character Speed
        this.speed_80 = 8.0
        this.speed_85 = 8.0
        // Default Bullet
        this.bullet_speed = 4.0;
        
    }

    // ✅ Get sprite data dynamically
    getData(type) {
        return this[type] || null; // Return value or null if not found
    }





    
}