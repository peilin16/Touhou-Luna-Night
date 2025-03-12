class Design extends Phaser.Scene {
    constructor() {
        super({ key: 'designScene' });
    }

    create() {
        // ✅ Background
        this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000);

        // ✅ Page Content Storage
        this.pages = [
            {
                title: "Introduction",
                text: "Touhou: Lunar Night Chronicles is a danmaku game featuring characters from Gensokyo.\n\n" +
                      "Rumia and her friends play a nighttime game using bullet patterns instead of hide-and-seek.\n\n" +
                      "Explore various locations in Gensokyo while overcoming unique challenges and bosses.",
                image: null // No image for this page
            },
            {
                title: "Gameplay",
                text: "The game is a horizontal bullet-hell shooter.\n\n" +
                      "Rumia cannot shoot bullets directly but reflects enemy bullets using her shield.\n\n" +
                      "There are two states:\n" +
                      "- Normal: Move freely.\n" +
                      "- Defensive: Deploy shield, reflect bullets, but cannot move.\n\n" +
                      "Master bullet reflection strategies to defeat enemies and bosses.",
                image: null // No image for this page
            }
        ];

        // ✅ Character Introductions (Adding to pages)
        this.characters = [
            { name: "Rumia", image: "rumiafly1", description: "A Youkai who prefers the dark. She plays danmaku games at night." },
            { name: "Wriggle Nightbug", image: "Wriggle1", description: "A firefly Youkai who leads a swarm of insects." },

            { name: "Crino", image: "Crino1", description: "A self-proclaimed strongest ice fairy, always confident but often fails due to carelessness." },
            { name: "Daiyousei", image: "DaiyouseiNothing1", description: "A kind and gentle fairy who often takes care of Cirno, her close friend and companion." },

            { name: "Nitori Kawashiro", image: "KawashiroIdle", description: "A kappa skilled in mechanical engineering, always carrying a backpack full of tools and loves inventing strange devices." },

            { name: "Sunny Milk", image: "SunnyMilk1", description: "One of the mischievous fairies of light. Loves to play pranks." },
            { name: "Star Sapphire", image: "StarSapphire1", description: "A fairy who can sense movement. Observes before acting." },
            { name: "Luna Child", image: "Luna1", description: "A fairy who can mute sound. Prefers quiet places." },

            { name: "Lily White", image: "LilyWhite1", description: "A symbol of spring, innocent and cheerful, always bringing warmth wherever she appears in Gensokyo." },
            { name: "Lily Black", image: "LilyBlack1", description: "Lily White, who plays the yama, is called Lily Black when she cosplays Yama." },
            { name: "Mystia Lorelei", image: "MystiaLorelei1", description: "A night sparrow Youkai who sings songs to confuse travelers." },
            { name: "Reimu Hakurei", image: "reimu-idle1", description: "The shrine maiden of Hakurei Shrine, responsible for maintaining Gensokyo's balance, easygoing but serious about her duties." },

            
            { name: "MaidFairy", image: "MaidFairy1_1", description: "A clumsy but hardworking fairy maid who always has energy and enthusiasm when participating in events." },
            { name: "MaidFairy", image: "MaidFairy2_1", description: "A clumsy but hardworking fairy maid who always has energy and enthusiasm when participating in events." },
            { name: "MaidFairy", image: "MaidFairy3_1", description: "A clumsy but hardworking fairy maid who always has energy and enthusiasm when participating in events." },

            { name: "SunflowerFairy", image: "sunflowerFairy1", description: "The cheerful and lively fairy holding a sunflower likes to dance in the sun and always has a bright smile on her face." },
            { name: "DandelionFairy", image: "dandelionFairy1", description: "The cheerful and lively fairy holding a dandelion likes to dance in the sun and always has a bright smile on her face." },
            { name: "RoseFairy", image: "roseFairy1", description: "The cheerful and lively fairy holding a rose likes to dance in the sun and always has a bright smile on her face." },
            
        ];

        // ✅ Append Character Pages
        for (let char of this.characters) {
            this.pages.push({
                title: char.name,
                text: char.description,
                image: char.image
            });
        }

        // ✅ Page Index
        this.currentPage = 0;

        // ✅ Page Title
        this.pageTitle = this.add.text(this.scale.width / 2, 50, "", {
            fontSize: '40px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // ✅ Page Text
        this.pageText = this.add.text(this.scale.width / 2, 150, "", {
            fontSize: '20px',
            color: '#ffffff',
            wordWrap: { width: this.scale.width - 100, align: "center" }
        }).setOrigin(0.5, 0);

        // ✅ Page Image (Initially Hidden)
        this.pageImage = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, "").setScale(2);
        this.pageImage.setVisible(false);

        // ✅ Page-Turning Instructions
        this.add.text(this.scale.width / 2, this.scale.height - 50, 'Press A (←) or D (→) to turn pages', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // ✅ Page Navigation Keys
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.input.keyboard.on('keydown-A', () => this.changePage(-1));
        this.input.keyboard.on('keydown-D', () => this.changePage(1));
        this.input.keyboard.on('keydown-SPACE', () => this.returnToTitle());
        // ✅ Display the First Page
        this.updatePage();
    }
    returnToTitle() {
        // ✅ Transition back to title scene
        this.scene.start('titleScene');
    }
    changePage(direction) {
        // ✅ Prevent invalid page numbers
        let newPage = this.currentPage + direction;
        if (newPage < 0 || newPage >= this.pages.length) return;

        // ✅ Fade Out
        this.tweens.add({
            targets: [this.pageTitle, this.pageText, this.pageImage],
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.currentPage = newPage;
                this.updatePage();

                // ✅ Fade In New Content
                this.tweens.add({
                    targets: [this.pageTitle, this.pageText, this.pageImage],
                    alpha: 1,
                    duration: 300
                });
            }
        });
    }

    updatePage() {
        let page = this.pages[this.currentPage];

        // ✅ Update Text
        this.pageTitle.setText(page.title);
        this.pageText.setText(page.text);

        // ✅ Update Image (if present)
        if (page.image) {
            this.pageImage.setTexture(page.image);
            this.pageImage.setVisible(true);
        } else {
            this.pageImage.setVisible(false);
        }
    }
}