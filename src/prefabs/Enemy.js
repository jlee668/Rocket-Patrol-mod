class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store pointValue
        this.moveSpeed = game.setting.spaceshipSpeed + .5; // pixels per frame
    }

    update(){
        this.x -= this.moveSpeed;
        if(this.x < 0 - this.width) {
            this.reset();
        }
    }

    //position reset
    reset(){
        this.x = game.config.width; 
    }
}