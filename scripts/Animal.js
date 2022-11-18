export class Animal {
    constructor(name = "no name") {

        //general pet info
        this.petName = name;
        this.petClass = this.constructor.name;
        this.audio = new Audio();
        //these actions must be inherited methods from base class animal or be defined in an extended  class
        //html file must also have enough defined divs (for now) 1 per action in array
        this.petActions = ['feed', 'walk', 'drink', 'sleep', 'dance', "sing", "crawl"]

        //when spawned this.alive will toggle to true also
        //see killPet() to toggle false
        this.alive = true;
        //used to prevent an actions when false
        this.active = true;

        //number is milliseconds per tick for reducing the stats in this.degradeStats() below
        this.interval = 10;
        this.actionFeedback = "";
        this.hurtSound = "../audio/Hurt.mp3"
        //current stats used are 
        //health hunger thirtsy sleepiness stamina happiness


        //initial stats on spawn
        this.health = 100;
        this.hunger = 100;
        this.thirsty = 100;
        this.sleepiness = 100;
        this.stamina = 100;
        this.happiness = 100;

        //how much damage the pet takes if any stat is 0
        this.healthHit = .3;

        //the number of stats and the % they need to all be above to heal
        this.healPct = 30;
        this.healNumStats = 5;
        this.healRate = 0.4;

        //max stats
        this.maxHealth = 100;
        this.maxHunger = 100;
        this.maxThirsty = 100;
        this.maxSleepiness = 100;
        this.maxStamina = 100;
        this.maxHappiness = 100;

        //pet action/button stat boosts
        this.boostHunger = 5;
        this.boostHealth = 5;
        this.boostThirtsy = 5;
        this.boostSleepiness = 25;
        this.boostStamina = 5;
        this.boostHappiness = 100;

        //stat degradation
        this.decreaseHunger = 0.2;
        this.decreaseThirtsy = 0.2;
        this.decreaseSleepiness = .2;
        this.decreaseStamina = .1;
        this.decreaseHappiness = .25;

        //events - safeguard flag used in functions to prevent adding multiple listners
        this.evtsAdded = false;
        this.hurtSound = new Audio(this.hurtSound);
        this.deathMessage = "Your pet died!"

        //days alive stuff
        this.timeBorn = new Date();
        this.timeBorn = this.timeBorn.getTime();
        this.timeAlive = 0;
        this.dateMsg = `Age 0 Days  0 hours`
    }


    //see dog class for example
    //empty here for use akin to virtual function?
    hoverEvents() { }
    //default actions feed walk drink sleep
    //pet action methods - these methods from base or extended by class must match this.petActions list 
    feed() {
        if (!this.active) return
        console.debug(`${this.constructor.name} feed function called`);
        this.hunger += this.boostHunger;
    }
    walk() {
        if (!this.active) return
        console.debug(`${this.constructor.name} walk function called`);
        this.stamina += this.boostStamina;
    }
    drink() {
        if (!this.active) return
        console.debug(`${this.constructor.name} drink function called`);
        this.thirsty += this.boostThirtsy;
    }
    sleep() {
        if (!this.active) return
        console.debug(`${this.constructor.name} sleep function called`);
        this.sleepiness += this.boostSleepiness;
    }

    //helper function to simplify adding sound to any given pet action method
    playSound(src) {
        this.audio.currentTime = 0;
        this.audio.src = src;
        this.audio.play();
    }

    destroy() {
        this.alive = false;
        this.hurtSound.pause();
        this.audio.pause();
        console.log("destory");
    }

    age() {
        let timeAliveId = setTimeout(() => {
            clearTimeout(timeAliveId);
            if (this.alive) {
                let tn = new Date().getTime()
                const date1 = new Date(0);
                const date2 = new Date((tn - this.timeBorn) * 10000);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

                this.dateMsg = `Age: ${diffDays} days  ${date2.getHours()} hours`
                this.age();
            }
        }, 50);//end settimeout

    }
    //reduce stats every interval by stated amounts defined 
    //by base or extended class in constructor properties
    degradeStats() {
        let id = setTimeout(() => {
            clearTimeout(id);
            if (this.alive) {
                // stats degrade per interval
                this.hunger = this.hunger -= this.decreaseHunger;
                this.thirsty = this.thirsty -= this.decreaseThirtsy;
                this.sleepiness = this.sleepiness -= this.decreaseSleepiness;
                this.happiness = this.happiness -= this.decreaseHappiness;
                this.stamina = this.stamina -= this.decreaseStamina;

                //do not remove
                this.checkHealth();
                this.updateHTML();
                this.degradeStats();

            }
        }, this.interval)
    }

    //DO NOT CHANGE BELOW
    // method to call when needs to be spawned
    spawnPet() {
        this.alive = true;
        this.assignActionButtons();
        this.age();
        this.degradeStats();
    }

    //if any stats are 0 start to reduce pet health
    checkHealth() {
        if (!this.alive) return
        //if any are 0 sound hurt
        let numZeroStats = [this.hunger, this.thirsty, this.sleepiness,
        this.happiness, this.stamina].filter(x => x <= 0).length;
        if (numZeroStats > 0) {
            this.health -= this.healthHit * numZeroStats;
            if (this.hurtSound.paused)
                this.hurtSound.play();
        }
        //if we are all above 
        numZeroStats = [this.hunger, this.thirsty, this.sleepiness,
        this.happiness, this.stamina].filter(x => x > this.healPct).length;
        if (numZeroStats == this.healNumStats) {
            this.health += this.healRate;;
            this.hurtSound.pause();
        }
        if (this.health <= 0) {
            this.alive = false;
            this.active = false;
            this.hurtSound.pause();
            this.actionFeedback = this.deathMessage;
        }
    }

    //search html for all elements wiith class of petAction and rename them from list in this.petActions
    assignActionButtons() {
        if (this.evtsAdded) { return; }
        let elemBtns = document.getElementById('petActions');
        elemBtns.innerHTML = '';
        console.log(elemBtns)
        this.petActions.forEach((action, index) => {
            let btnElem;
            btnElem = document.createElement("button");
            btnElem.innerHTML = action;
            btnElem.id = action;
            elemBtns.appendChild(btnElem);
            btnElem.addEventListener('click', () => {
                try {
                    this[action]();
                } catch (err) {
                    console.error(`looks like class or base class does not have the pet's action method defined`, err)
                }
            });//end evl
        });//end of foreach
        this.hoverEvents();
    }
    displayGiF(action) {
        try {
            let imgCont = document.getElementById('petPhoto');
            let img = document.createElement('img');
            action = action.charAt(0).toUpperCase() + action.slice(1);
            let src = "../images/" + this.petClass + action + '.gif';
            img.class = "currentPic";
            imgCont.appendChild(img);
            console.log(src);
        } catch (err) {
            console.error(err);
        }

    }


    //update html - function called from this.degradeStats - its interval governs update tick/frame rate
    //finds all html element with a class="stats" and 
    //replaces each matching element's innerhtml with the class or exteneded class instances's matching stat
    updateHTML() {
        let elem = document.getElementById('petActions');
        if (!this.active || !this.alive) {
            elem.style.backgroundColor = "#ee1111";
            elem.style.color = "ee1111";
            elem.style.opacity = "0.6";
        } else {
            elem.style.backgroundColor = "#fff";
            elem.style.color = "#eb5e28";
            elem.style.opacity = "1";
        }
        this.clampStats();

        let tmsg = document.getElementById('feedBackStat');
        tmsg.innerHTML = this.dateMsg;
        try {
            let petStats = document.getElementsByClassName('stats')
            if (petStats.length == 0) {
                throw 'cant find any html elements class=stats to update stats';
            }
            Array.from(petStats).forEach(stat => {
                stat.style.width = this[stat.id] + '%';
                stat.innerHTML = (this[stat.id]).toFixed(0) + '%'
            })
        } catch (err) {
            console.error(err);
        }

        let feedback = document.getElementById('feedBackMsg');
        feedback.innerHTML = this.actionFeedback;
    }

    clampStats() {
        this.hunger = Math.min(Math.max((this.hunger), 0), this.maxHunger);
        this.thirsty = Math.min(Math.max((this.thirsty), 0), this.maxThirsty);
        this.sleepiness = Math.min(Math.max((this.sleepiness), 0), this.maxSleepiness);
        this.stamina = Math.min(Math.max((this.stamina), 0), this.maxStamina);
        this.health = Math.min(Math.max((this.health), 0), this.maxHealth);
        this.happiness = Math.min(Math.max((this.happiness), 0), this.maxHappiness);
    }

    //todo
    animateSpite() { }

}



