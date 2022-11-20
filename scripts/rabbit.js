
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
        img.src = "./images/rabbit.jpg"
        imgCont.innerHTML = "";
        imgCont.appendChild(img);
    }

    roast() {
        console.debug(`${this.constructor.name} feed function called`);
        this.health -= 30;
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("fry");
        
        this.playSound("./audio/ouch.mp3");
    }

    boil() {
        this.health -= 30;
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("boil");
        
        this.playSound("./audio/ouch.mp3");
    }

    stew() {
        this.health -= 30;
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("stew");
        
        this.playSound("./audio/ouch.mp3");
    }
    fry() {
        this.health -= 30;
        this.hunger -= 25;
        this.thirsty -= 25;
        this.sleepiness -= 25;
        this.stamina -= 25;;
        this.happiness -= 25;
        this.displayGiF("fry");
        this.playSound("./audio/ouch.mp3");
    }

    hoverEvents() {
        super.hoverEvents();;
        let btn = document.getElementById('roast');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Reduces everything by 25% !!! Cooking your pet again :( ";
        });
        btn = document.getElementById('boil');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Reduces everything by 25% !!! Cooking your pet again :( ";
        });
        btn = document.getElementById('fry');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Reduces everything by 25% !!! Cooking your pet again :( ";
        });
        btn = document.getElementById('stew');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Reduces everything by 25% !!! Cooking your pet again :( ";
        });
    }
}
