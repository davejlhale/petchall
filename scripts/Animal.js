export class Animal {
    constructor(name = "no name") {

        //general pet info
        this.petName = name;
        this.petClass = this.constructor.name;

        //these actions must be inherited methods from base class animal or be defined in an extended  class
        //html file must also have enough defined divs (for now) 1 per action in array
        this.petActions = ['feed', 'walk', 'drink', 'sleep', 'dance', "sing", "crawl"]

        //when spawned this.alive will toggle to true also
        //see killPet() to toggle false
        this.alive = true;

        //number is milliseconds per tick for reducing the stats in this.degradeStats() below
        this.interval = 200;


        //current stats used are 
        //health hunger thirtsy sleepiness stamina happiness

        //initial stats on spawn
        this.health = 100;
        this.hunger = 100;
        this.thirsty = 100;
        this.sleepiness = 100;
        this.stamina = 100;
        this.happiness = 100;

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
        this.decreaseHunger = 1;
        this.decreaseHealth = 1;
        this.decreaseThirtsy = 1;
        this.decreaseSleepiness = 1;
        this.decreaseStamina = 1;
        this.decreaseHappiness = 1;

          //events - safeguard flag used in functions to prevent adding multiple listners
        this.evtsAdded = false;


        //spawnPet
        this.spawnPet()
    }

    //pet action methods - these methods from base or extended by class must match this.petActions list 
    feed() {
        console.debug(`${this.constructor.name} feed function called`);
        this.hunger += this.boostHunger;
        this.changeStat(this.hunger,20);
    }
    walk() {
        console.debug(`${this.constructor.name} walk function called`);
        this.stamina += this.boostStamina;
    }
    drink() {
        console.debug(`${this.constructor.name} drink function called`);
        this.thirsty += this.boostThirtsy;
    }
    sleep() {
        console.debug(`${this.constructor.name} sleep function called`);
        this.sleepiness += this.boostSleepiness;
    }

    changeStat(statToChange,amount){
        statToChange += amount; 
        console.log(statToChange)
    }
   
    //reduce stats every interval by stated amounts defined by base or extended class
    degradeStats() {
        let id = setInterval(() => {
            if (this.alive) {
                clearTimeout(id);
                //which stats degrade per interval
                this.hunger = this.hunger -= this.decreaseHunger;
                this.thirsty = this.thirsty -= this.decreaseThirtsy;
                this.sleepiness = this.sleepiness -= this.decreaseSleepiness;
                this.happiness = this.happiness -= this.decreaseHappiness;

                {
                    //do not remove
                    this.updateHTML();
                    this.reduceHealth();
                    this.degradeStats();
                }
            }
        }, this.interval)
    }

    //todo
    //if any stats are 0 start to reduce pet health
    reduceHealth() {
        //for every stats type - stats not dynamically add to a pet so set by class properties
        //currently 
        //if stat==0
        //reduce health by 1
    }

    //DO NOT CHANGE BELOW

    // method to call when needs to be spawned
    spawnPet() {
        this.alive = true;
        this.assignActionButtons();
        this.degradeStats();
    }
    killPet() {
        this.health = 0;
        this.alive = false;
    }

    //search html for all elements wiith class of petAction and rename them from list in this.petActions
    assignActionButtons() {
        if (this.evtsAdded) { return; }
        let elemBtns = document.getElementsByClassName('petAction')
        this.petActions.forEach((action, index) => {
            let elem = document.getElementById(action);
            try {
                elemBtns[index].innerHTML = action;
                elemBtns[index].id = action;
                //moved to seperate fiunction to make error tracing easier
                // elemBtns[index].addEventListener('click', () => {
                //     this[action]();
                // });
            }
            catch (err) {
                console.debug(`error making "${action}" the innerHTML of ${elem} with the id ${action}`, err);
            }
        });
        this.addEvents();
    }

    //loop through this.petActions and find the element with an id matching the array[index]'s name
    //add an eventlistner for click events and
    //calls the method dynamically - so this class or base class needs corresponding method
    addEvents(evt) {
        if (this.evtsAdded) { return; }
        this.evtsAdded = true;
        this.petActions.forEach(action => {
            try {
                let elem = document.getElementById(action);
                elem.addEventListener('click', () => {
                    try {
                        this[action]();
                    } catch (err) {
                        console.error(`looks like class or base class does not have the pet's action method defined`,err)
                    }
                });
            } catch (err) {
                if (err instanceof TypeError) {
                    console.error(`couldnt find an HTML with id of ${action}`, err)
                } else {
                    console.error(err)
                }
            }
        })
    }

    //update html - function called from this.degradeStats - its interval governs update tick/frame rate
    //finds all html element with a class="stats" and 
    //replaces each matching element's innerhtml with the class or exteneded class instances's matching stat
    updateHTML() {
        this.clampStats();
        try {
            let petStats = document.getElementsByClassName('stats')
            if (petStats.length == 0) {
                throw 'cant find any html elements class=stats to update stats';
            }
console.log("ud");
            Array.from(petStats).forEach(stat => {
                console.debug(stat)
                stat.style.width = this[stat.id]+'%';
                
            })
        } catch (err) {
            console.error(err);
        }
    }

    clampStats() {
        this.hunger = Math.min(Math.max(parseInt(this.hunger), 0), this.maxHunger);
        this.thirsty = Math.min(Math.max(parseInt(this.thirsty), 0), this.maxThirsty);
        this.sleepiness = Math.min(Math.max(parseInt(this.sleepiness), 0), this.maxSleepiness);
        this.stamina = Math.min(Math.max(parseInt(this.stamina), 0), this.maxStamina);
        this.health = Math.min(Math.max(parseInt(this.health), 0), this.maxHealth);
        this.happiness = Math.min(Math.max(parseInt(this.happiness), 0), this.maxHappiness);
    }

    //todo
    animateSpite() { }
}



