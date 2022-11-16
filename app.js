class Animal {
    constructor() {
        //general pet info
        this.petName = "No name";
        this.petClass = this.constructor.name;
        this.alive = true;

        //initial stats
        //hunger health thirtsy sleepiness
        this.maxHealth = 100;
        this.maxHunger = 100;
        this.maxThirsty = 100;
        this.maxSleepiness = 100;
        this.health = 100;
        this.hunger = 100;
        this.thirsty = 100;
        this.sleepiness = 100;
        this.stamina = 100;

        //hunger health thirtsy sleepiness
        //pet action stat boosts
        this.boostHunger = 5;
        this.boostHealth = 5;
        this.boostThirtsy = 5;
        this.boostSleepiness = 25;
        this.boostStamina = 5;

        //stat degradation
        this.decreaseHunger = 1;
        this.decreaseHealth = 1;
        this.decreaseThirtsy = 1;
        this.decreaseSleepiness = 1;
        this.decreaseStamina = 1;

        //events
        this.evtsAdded = false;
        this.petActions = ['feed', 'walk', 'drink', 'sleep']

        this.addEvents("sleep");
        this.degradeStats();
    }

    addEvents(evt) {
        if (this.evtsAdded) { return; }
        this.evtsAdded = true;

        this.petActions.forEach(action => {
            let elem = document.getElementById(action);
            elem.addEventListener('click', () => {
                this[action]();
            });
            console.log(`Added click event to element with id ${action}`, elem)

        })
        let elemFeed = document.getElementById('feed');
        let elemWalk = document.getElementById('walk');
        let elemDrink = document.getElementById('drink');
        let elemSleep = document.getElementById('sleep');
    }

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
        this.sleepiness += this.boostSleepiness
    }





    degradeStats() {
        //stats list ?? hunger health thirtsy sleepiness stamina happiness
        let id = setTimeout(() => {
            if (this.alive) {
                clearTimeout(id);
                //degrade stats
                this.hunger = Math.min(Math.max(parseInt(this.hunger -= this.decreaseHunger), 0), this.maxHunger);
                this.thirsty = Math.min(Math.max(parseInt(this.thirsty -= this.decreaseThirtsy), 0), this.maxHunger);
                this.sleepiness = Math.min(Math.max(parseInt(this.sleepiness -= this.decreaseSleepiness), 0), this.maxHunger);
                this.stamina = Math.min(Math.max(parseInt(this.stamina -= this.decreaseStamina), 0), this.maxHunger);
                
               
                this.updateHTML();
                this.degradeStats();
            }
        }, 200)
    }
    animateSpite() {

    }

    updateHTML() {
        let petStats = document.getElementsByClassName('stats')
        console.log(petStats)
        Array.from(petStats).forEach(stat => {

            stat.innerHTML = this[stat.id];
        })
    }

}

const an = new Animal();

