import {Animal} from './Animal.js';

 export  class Mouse extends Animal{
    constructor(name = "no name"){
        super(name);
        console.debug("create mouse");
        this.petActions = ['Squeak','feed', 'wheel', 'drink', 'sleep'];


        let imgCont = document.getElementById('petPhoto');
        let img = document.createElement('img');
        console.log(this.imgCont)
        img.src = "../images/mouse.bmp"
        imgCont.innerHTML = "";
        imgCont.appendChild(img);
    }

    Squeak(){
        this.thirsty-=10;
        this.stamina-=5;
        this.happiness+=5;
        let a= new Audio("../audio/squeak.mp3")
        a.play();
    }

}
