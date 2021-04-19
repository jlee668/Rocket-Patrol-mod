/*
Jason Lee
Project Title: Ghost Hunter (Rocket Patrol mod)
Date: 4/19/21
Work time: 6 hours 
My point breakdown: Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20), 
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config); 

//UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

//keyboard binding
let keyF, keyR, keyLEFT, keyRIGHT;