import { Animal } from './Animal.js';

export class Cat extends Animal {
    constructor(name = "no name") {
        super(name);
        console.debug("create cat");
        this.petActions = [
            'milk',
            'eat',
            'hunt',
            'play',
            'purr',
            "sleep"
        ]
        this.decreaseHunger = 0.1;
        this.decreaseThirtsy = 0.1;
        this.decreaseSleepiness = .3;
        this.decreaseStamina = .1;
        this.decreaseHappiness = .1;

        let imgCont = document.getElementById('petPhoto');
        let img = document.createElement('img');
        console.log(this.imgCont)
        img.src = "../images/cat.jpg"
        imgCont.innerHTML = "";
        imgCont.appendChild(img);

    }//end constructor

    sleep() {

        if (!this.active) return
        this.audio.currentTime = 0;
        this.active = false;
        this.playSound("");
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 1000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 1500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 2000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 2500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 3000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 3500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 4000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 4500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 5000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 5500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 6000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.happiness += 2; } }, 6500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 15; this.active = true; } }, 7000, this.active);
        this.displayGiF("sleep")
    }

    hunt(){
        if (!this.active) return
        this.audio.currentTime = 0;
        this.active = false;
        this.playSound("");
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 5; } }, 500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 5; } }, 1000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 5; } }, 1500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 5; } }, 2000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 5; } }, 2500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 5; } }, 3000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness +=5; } }, 3500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.active = true; } }, 7000, this.active); 
        this.displayGiF("hunt")
    }

    milk(){
        if (!this.active) return
        this.audio.currentTime = 0;
        this.playSound("");
        this.thirsty+=30;
        this.displayGiF("milk")
    }
    eat(){
        if (!this.active) return
        this.audio.currentTime = 0;
        this.playSound("");
        this.hunger+=30;
        this.displayGiF("eat")
    }
    purr(){
        if (!this.active) return
        this.audio.currentTime = 0;
        this.playSound("");
        this.happiness+=30;
        this.stamina+=10;
        this.displayGiF("purr")
    }

    play() {
        if (!this.active) return
        this.audio.currentTime = 0;
        this.playSound("");
        this.happiness+=20;
        this.thirsty-=15;
        this.hunger-=15;
        this.displayGiF("play")
    }

}
