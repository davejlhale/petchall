import {Animal} from './Animal.js';

 export class Dog extends Animal{
    constructor(name = "no name"){
        super(name);
        console.debug("create dog");
        this.petActions = ['feed',  'drink', 'sleep', 'walk','dance', "sing", "crawl"];
    }

}

