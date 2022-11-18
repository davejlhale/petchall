import {Animal} from './Animal.js';

 export  class Mouse extends Animal{
    constructor(name = "no name"){
        super(name);
        console.debug("create mouse");
        this.petActions = ['Squeak','feed', 'pet', 'drink', 'sleep', 'dance', "sing", "crawl"];
    }

    Squeak(){
        this.thirsty-=10;
        this.stamina-=5;
        this.happiness+=5;
        let a= new Audio("../audio/squeak.mp3")
        a.play();
    }

}
