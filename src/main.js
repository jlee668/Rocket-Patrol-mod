/*
Jason Lee
Project Title: Ghost Hunter (Rocket Patrol mod)
Date: 4/19/21
Work time: 6 - 8 hours 
My point breakdown: 
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20), 
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60) 
Create a new scrolling tile sprite for the background (5) 
Create 4 new explosion SFX and randomize which one plays on impact (10) 
Track a high score that persists across scenes and display it in the UI (5) 

Credit for SFX sound: 
    I got one copyfree SFX background sound from youtube video. (menusound.mp3)
    URL: https://www.youtube.com/watch?v=kuOgaSHd0Fk 
    title: 15 Free SCARY Sound Effects PACK : PART 1 // Free to Download // No Copyright

    I download 1 for new explosion SFX copyfree sound from youtube video, and other three from freesound.com
    list: Scary Jumpscare sound effect, 389507__adrimb86__little-girl-ghost, 415355__owly-bee__impossible-how-could-i-ghostly, 507451__horroraudio__ghost-kid-sigh-less-verb
    URL: https://www.youtube.com/watch?v=VUgpueoMTjk

    I use this SFX sound effect for throwing kunai. (Knife Throw sound.mp3)
    URL: https://www.youtube.com/watch?v=6EEEibdsJMM
    I use this SFX sound effect for selecting level difficulty (Castle Door Sound.mp3)
    URL: https://www.youtube.com/watch?v=5yoGEpxgbWg

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