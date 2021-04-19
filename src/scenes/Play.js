class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    } 

    preload() {
        // load images
        this.load.image('kunai', './assets/kunai.png');
        this.load.image('target1','./assets/enemy1.png');
        this.load.image('target2','./assets/enemy2.png');
        this.load.image('target3','./assets/enemy3.png');
        this.load.image('background','./assets/playback.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/mist.png',{
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 15
        });
    }

    create() {
        // create starfield
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        
        // green UI background
        this.add.rectangle(0, 0, game.config.width, 
            borderUISize * 2, 0xA13D2D).setOrigin(0, 0); 

        // White borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket(player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding,
            'kunai').setOrigin(0.5, 0);  

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
            'target1', 0, 30).setOrigin(0, 0); 
        this.ship02 = new Enemy1(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,
            'target2', 0, 20).setOrigin(0, 0); 
        this.ship03 = new Enemy(this, game.config.width, borderUISize*6 + borderPadding*4,
            'target3', 0, 10).setOrigin(0, 0); 

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 15,
                first: 0
            }),
            frameRate: 6
        });
        
        this.p1Score = 0;
        this.currentScore;
        this.maxScore = this.currentScore;
        // display score
        let scoreConfig = {
            fontFamily: 'Broadway',
            fontSize: '28px',
            color: '#000000',
            align: 'right', 
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding/100, this.p1Score,
            scoreConfig);
        this.highScore = this.add.text(borderUISize + borderPadding + 200, borderUISize + borderPadding/100, this.maxScore,
            scoreConfig);
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.setting.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5); 
            this.gameOver = true; 
        }, null, this);
    }

    update(){
        // check key input for restart
        if(this.gameOver)
        {
            if(this.currentScore > this.maxScore){
                this.maxScore = this.p1Score; 
                this.highScore.text = this.p1Score;
            }
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart(); 
        }
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene"); 
        }

        this.background.tilePositionX -= starSpeed;

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.enemyExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.enemy01Explode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.y + rocket.height > ship.y){
                return true; 
        }
        else {
            return false; 
        }
    }

    shipExplode(ship){
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.currentScore = this.p1Score;
        this.scoreLeft.text = this.p1Score;
        this.selectSFX();
    }

    enemyExplode(ship){
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.p1Score += 50;
        this.currentScore = this.p1Score;
        this.scoreLeft.text = this.p1Score;
        this.selectSFX();
    }

    enemy01Explode(ship){
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.p1Score += 25;
        this.currentScore = this.p1Score;
        this.scoreLeft.text = this.p1Score;
        this.selectSFX();
    }
    // I use function playPop() {} on CleanPop project on nathanaltice github
    // URL: https://github.com/nathanaltice/CleanPop/blob/master/src/main.js
    selectSFX() {
        switch(Math.floor(Math.random()*3)){
            case 0:
                this.sound.play('sfx_ghost1', { volume: 0.75 });
                break;
            case 1:
                this.sound.play('sfx_ghost2', { volume: 0.75 });
                break;
            case 2: 
                this.sound.play('sfx_ghost3', { volume: 0.75 });
                break;
            case 3:
                this.sound.play('sfx_ghost4', { volume: 0.75 });
                break;
            case 4:
                console.log('Error: Invalid Sound');
        }
    }
}