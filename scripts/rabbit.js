
import {Animal} from './Animal.js';

 export class Rabbit extends Animal{
    
    constructor(name = "no name"){
        super(name);
        console.debug("create rabbit");
        this.petActions = ['feed', 'pet', 'drink', 'sleep', 'dance', "sing", "crawl"];
    }

    pet(){
        console.debug(`${this.constructor.name} feed function called`);

    }
    

}
