import {Animal} from './Animal.js';

export class Cat extends Animal{
    constructor(name = "no name"){
        super(name);
        console.debug("create cat");
        this.petActions = ['feed', 'pet', 'drink', 'sleep', 'dance', "sing", "crawl"];
    }

}
