/*
Jason Lee
Project Title: Ghost Hunter (Rocket Patrol mod)
Date: 4/19/21
Work time: 6 - 8 hours 
My point breakdown: 
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20), x
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60) x
Create a new scrolling tile sprite for the background (5) x
Create 4 new explosion SFX and randomize which one plays on impact (10) 
Display the time remaining (in seconds) on the screen (10)

Credit for SFX sound: I got one copyfree SFX background sound from youtube video.
URL: https://www.youtube.com/watch?v=kuOgaSHd0Fk 
title: 15 Free SCARY Sound Effects PACK : PART 1 // Free to Download // No Copyright
I download 4 for new explosion SFX copyfree sound from youtube video.
URL: https://www.youtube.com/watch?v=REUbOSx9Kg0, https://www.youtube.com/watch?v=C5OfchX1e2g,
 https://www.youtube.com/watch?v=C5OfchX1e2g, https://www.youtube.com/watch?v=VUgpueoMTjk
I use this SFX sound effect for throwing kunai. 
 URL: https://www.youtube.com/watch?v=6EEEibdsJMM
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