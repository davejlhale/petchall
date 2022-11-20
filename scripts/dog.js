import { Animal } from './Animal.js';

export class Dog extends Animal {
    constructor(name = "no name") {
        super(name);
        console.debug("create dog");
        this.petActions = ['bark', 'feed', 'drink', 'sleep', 'walk', 'pet'];
        this.hurtSound = "./audio/dogCrying.mp3"
        this.hurtSound = new Audio(this.hurtSound);
        this.interval = 30;

        let imgCont = document.getElementById('petPhoto');
        let img = document.createElement('img');
        console.log(this.imgCont)
        img.src = "./images/dog.jpg"
        imgCont.innerHTML = "";
        imgCont.appendChild(img);

    }
    //make all pet action methods start with
    //if (!this.active) return
    //this.audio.currentTime = 0;
    //cant enter if pet is active on another we lock
    //stop sound playing from previous actions
    bark() {
        if (!this.active) return
        this.audio.currentTime = 0;
        this.audio.src = ("./audio/bark.mp3");
        this.displayGiF("bark")
        this.audio.play();
        this.thirsty -= 15;
        this.stamina -= 15;
        this.stamina += 25;
    }
    feed() {
        if (!this.active) return
        this.audio.currentTime = 0;
        this.playSound("./audio/dogEating.mp3");
        this.displayGiF("feed")
        this.hunger += 35;
        this.thirsty -= 5;
    }
    drink() {
        if (!this.active) return
        this.audio.currentTime = 0;
        this.audio.src = "./audio/dogDrink.mp3";
        this.displayGiF("drink")
        this.audio.play();
        this.thirsty += 25;
        this.stamina -= 5;
    }
    //example of damage / improve over time
    //using ugly but working setttimers
    //
    //NOTE the 
    //this.active = false;
    //which locks other methods untill the end of this toggles the flag
    sleep(sleepCount = 5) {
        if (!this.active) return
        this.audio.currentTime = 0;
        this.active = false;
        this.playSound("./audio/dogSnoring.mp3");
        this.displayGiF("sleep")
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 1000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 1500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 2000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 2500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 3000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 3500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 4000);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.happiness += 2; } }, 4500);
        setTimeout(() => { if (this.alive) { this.sleepiness += 10; this.active = true; } }, 5000, this.active);
    }
    walk() {
        if (!this.active) return
        this.active = false;
        this.playSound("./audio/dogPanting.wav");
        this.displayGiF("walk")
        setTimeout(() => { if (this.alive) { this.sleepiness -= 3; this.stamina += 10; this.happiness += 20; } }, 500);
        setTimeout(() => { if (this.alive) { this.sleepiness -= 3; this.stamina += 10; this.happiness += 20; } }, 1000);
        setTimeout(() => { if (this.alive) { this.sleepiness -= 3; this.stamina += 10; this.happiness += 20; } }, 1500);
        setTimeout(() => { if (this.alive) { this.sleepiness -= 3; this.active = true; } }, 2000);
        this.stamina += 10;
    }
    //Action method not locked!! so can be spammed!
    pet() {
        this.displayGiF("pet");
        this.happiness += 10;
    }
    //onhover events for action buttons - 
    //this method called by base classes init sequence
    //so we can override it within each extended class to override it
    //id to search must be one from This classed constructor property array
    //eg  this.petActions = ['bark', 'feed', 'drink', 'sleep', 'walk', 'pet'];
    hoverEvents() {
        let btn = document.getElementById('bark');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Improves Stamina by 25% but reduces thirst and hunger by 15%";
        });
        btn = document.getElementById('feed');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Improves Hunger by 35% but reduces thirst by 5%";
        })
        btn = document.getElementById('drink');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Improves Thirst by 25% but reduces stamina by 5%";
        })
        btn = document.getElementById('sleep');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Improves sleep by max 100 over 5 seconds but your pets asleep!!"
        })
        btn = document.getElementById('walk');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Improves sleep by max 100 but reduces stamina by 12 over 5 seconds, your pets out excercising"
        })
        btn = document.getElementById('pet');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Your pet loves being petted ANY time! +10%"
        })
    }
}

