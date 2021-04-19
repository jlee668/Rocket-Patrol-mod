class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_kunai', './assets/Knife Throw Sound Effect.mp3');
        this.load.image('menubackground','./assets/menuback.png');
        this.load.image('backtile','./assets/backtile.png');
        this.load.audio('menuBackSound','./assets/menusound.mp3'); 
    }

    create() {
        this.sound.play('menuBackSound');
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'backtile').setOrigin(0, 0);
        this.background01 = this.add.tileSprite(borderUISize-borderPadding *3, borderUISize-borderPadding *5.5
            , game.config.width, game.config.height, 'menubackground').setOrigin(0, 0);
       // menu text 
       let menuConfig = {
        fontFamily: 'Aharoni',
        fontSize: '28px',
        color: '#000000',
        align: 'right', 
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
       }

       this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'Ghost Hunter', menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2, 'Use <-> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
       menuConfig.color = '#000';
       this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
       borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5); 
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        this.background.tilePositionX -= starSpeed;

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.setting = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.setting = {
                spaceshipSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}