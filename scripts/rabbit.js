
import { Animal } from './Animal.js';

export class Rabbit extends Animal {

    constructor(name = "no name") {
        super(name);
        console.debug("create rabbit");
        this.petActions = ['stew', 'roast', 'boil', 'fry'];
        this.decreaseHunger = 0;
        this.decreaseThirtsy = 0;
        this.decreaseSleepiness = 0;
        this.decreaseStamina = 0;
        this.decreaseHappiness = 0;
        this.healPct = 1;
        let imgCont = document.getElementById('petPhoto');
        let img = document.createElement('img');
        console.log(this.imgCont)
        img.src = "./images/rabbit.jpg"
        imgCont.innerHTML = "";
        imgCont.appendChild(img);
    }

    roast() {
        console.debug(`${this.constructor.name} feed function called`);
        this.health -= 30;
        this.audio.currentTime = 0;
        this.audio.src = ("./audio/Hurt.mp3");
        this.audio.play();
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("fry")
    }

    boil() {
        this.health -= 30;
        this.audio.currentTime = 0;
        this.audio.src = ("./audio/Hurt.mp3");
        this.audio.play();
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("boil")
    }

    stew() {
        this.health -= 30;
        this.audio.currentTime = 0;
        this.audio.src = ("./audio/Hurt.mp3");
        this.audio.play();
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("stew")
    }
    fry() {
        this.health -= 30;
        this.audio.currentTime = 0;
        this.audio.src = ("./audio/Hurt.mp3");
        this.audio.play();
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("fry")
    }


}
