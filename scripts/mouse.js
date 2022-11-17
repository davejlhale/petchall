import {Animal} from './Animal.js';

 export  class Mouse extends Animal{
    constructor(name = "no name"){
        super(name);
        console.debug("create mouse");
        this.petActions = ['feed', 'pet', 'drink', 'sleep', 'dance', "sing", "crawl"];
    }

}
