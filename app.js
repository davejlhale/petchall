class Animal {
    constructor(){
        //general pet info
        this.petName ="No name";
        this.petClass= this.constructor.name;
        this.alive=true;

        //initial stats
        this.maxHealth = 100;
        this.maxHunger = 100;
        this.maxThirsty = 100;
        this.maxSleepiness = 100;
        this.health = 100;
        this.hunger = 100;
        this.thirsty = 100;
        this.sleepiness = 100;

        //pet action stat boosts
        this.eatIncrease =5;
        this.walkIncrease=5;
        this.sleepIncrease=25;
        this.thirstyIncrease=5;

        //stat degradation
        this.eatDecrease =1;
        this.walkDecrease=5;
        this.sleepDecrease=25;
        this.thirstyDecrease=5;

        //events
        this.evtsAdded=false; 
        this.petActions=['feed','walk','drink','sleep']
        
        this.addEvents("sleep");
        this.degradeStats();
    }

    addEvents(evt){   
        // if (this.evtsAdded) {return;}
        // this.evtsAdded=true;

        this.petActions.forEach(action => {
           let elem = document.getElementById(action);
            elem.addEventListener('click',()=>{
            this[action]();
            });
            console.log(`Added click event to element with id ${action}`,elem)

        })
        let elemFeed = document.getElementById('feed');
        let elemWalk = document.getElementById('walk');
        let elemDrink = document.getElementById('drink');
        let elemSleep = document.getElementById('sleep');
    }
    feed(){
    console.debug(`${this.constructor.name} feed function called`);
    this.hunger+=5;
    }
    walk(){
        console.debug(`${this.constructor.name} walk function called`);
    }
    drink(){
        console.debug(`${this.constructor.name} drink function called`);
    }
    sleep(){
        console.debug(`${this.constructor.name} sleep function called`);
    }

    degradeStats(){
       let id = setTimeout( () => {
        if (this.alive){
            clearTimeout(id);
            //degrade stats

            this.updateHTML();
            this.degradeStats();
        }
       })
    }
    animateSpite(){

    }

    updateHTML(){
        console.table(this)
    }

}

const an=new Animal();

