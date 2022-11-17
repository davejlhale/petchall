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

        //how much damage the pet takes if any stat is 0
        this.healthHit=1;

        //max stats
        this.maxHealth = 200;
        this.maxHunger = 200;
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


       
        
    }
    //default actions feed walk drink sleep
    //pet action methods - these methods from base or extended by class must match this.petActions list 
    feed() {
        console.debug(`${this.constructor.name} feed function called`);
        this.hunger += this.boostHunger;
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

    destroy(){
        this.alive=false;
        console.log("destory");
    }
    //reduce stats every interval by stated amounts defined by base or extended class
    degradeStats() {
        let id = setTimeout(() => {
            clearTimeout(id);
            if (this.alive) {
                //which stats degrade per interval
                this.hunger = this.hunger -= this.decreaseHunger;
                this.thirsty = this.thirsty -= this.decreaseThirtsy;
                this.sleepiness = this.sleepiness -= this.decreaseSleepiness;
                this.happiness = this.happiness -= this.decreaseHappiness;
                this.stamina = this.stamina -= this.decreaseStamina;
               let numZeroStats =  [this.hunger,this.thirsty,this.sleepiness,
                     this.happiness,this.stamina].filter(x=>x<=0).length;
                        this.health-=this.healthHit*numZeroStats;
                     console.log(this.health,this.healthHit,numZeroStats)
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
        let elemBtns = document.getElementById('petActions');
        elemBtns.innerHTML='';
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
            });
           // this.addEvents();

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
            Array.from(petStats).forEach(stat => {
                stat.style.width = this[stat.id] + '%';
                stat.innerHTML=  this[stat.id] + '%'       
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



