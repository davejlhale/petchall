import {Animal} from './Animal.js';
// import {Rabbit} from './rabbit.js';
// import {Cat} from './cat.js';
// import {Dog} from './dog.js';
// import {Cow} from './cow.js';

let rabbitSelect= document.getElementById('rabbit');
let catSelect= document.getElementById('cat');
let mouseSelect= document.getElementById('mouse');
let dogSelect= document.getElementById('dog');
let menu=document.getElementById('menu');
let charSelect = document.getElementById(`welcomeScreen`);
let gameScreen = document.getElementById(`gameContainer`);
gameScreen.style.display="none";
charSelect.style.display="flex";
let  myPet=null

menu.addEventListener('click',()=> {
    gameScreen.style.display="none";
    charSelect.style.display="flex";
    myPet.destroy();
    myPet=null;
})

 

const addevl = (elem) => {
    elem.addEventListener('click' ,() =>{
        gameScreen.style.display="flex";
        charSelect.style.display="none";
        myPet = new Animal();
        console.table(myPet);
    })
}


addevl(rabbitSelect);
addevl(catSelect);
addevl(mouseSelect);
addevl(dogSelect);