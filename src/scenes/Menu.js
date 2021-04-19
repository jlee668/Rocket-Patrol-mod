class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
    }

    create() {
       // menu text 
       let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right', 
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
       }

       this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Ghost Hunter', menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2, 'Use <-> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
       menuConfig.backgroundColor = '#00FF00';
       menuConfig.color = '#000';
       this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
       borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5); 
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
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