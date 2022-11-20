import {Animal} from './Animal.js';

 export  class Mouse extends Animal{
    constructor(name = "no name"){
        super(name);
        console.debug("create mouse");
        this.petActions.push(['Squeak']);


        let imgCont = document.getElementById('petPhoto');
        let img = document.createElement('img');
        console.log(this.imgCont)
        img.src = "./images/mouse.jpg"
        imgCont.innerHTML = "";
        imgCont.appendChild(img);
    }

    Squeak(){
        this.thirsty-=10;
        this.stamina-=10;
        this.happiness+=25;
        this.playSound("./audio/squeak.mp3")
        a.play();
    }

    hoverEvents() {
        super.hoverEvents();;
        let btn = document.getElementById('Squeak');
        btn.addEventListener('mouseover', () => {
            this.actionFeedback = "Improves happiness by 25% but reduces thirst and stamina by 10%";
        });
    }

}
