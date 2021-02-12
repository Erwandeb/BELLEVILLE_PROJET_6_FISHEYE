/*----------------Incrémentation des boutons like sur les photos----------------------*/ 

// Variables
const like1 = document.querySelector('.like1');
const like2 = document.querySelector('.like2');
const like3 = document.querySelector('.like3');
const like4 = document.querySelector('.like4');
const like5 = document.querySelector('.like5');
const like6 = document.querySelector('.like6');
const likegeneral = document.querySelector('.like');


const heart1 = document.querySelector('.heart1');
const heart2 = document.querySelector('.heart2');
const heart3 = document.querySelector('.heart3');
const heart4 = document.querySelector('.heart4');
const heart5 = document.querySelector('.heart5');
const heart6 = document.querySelector('.heart6');

let compteur1 = 12;
let compteur2 = 12;
let compteur3 = 12;
let compteur4 = 12;
let compteur5 = 12;
let compteur6 = 12;
let compteurgeneral = 297081;

// Evenement lors du clique sur un symbole "coeur"

    heart1.addEventListener('click', ()=>{
        compteur1++;
        compteurgeneral++
        like1.innerHTML=compteur1;
        likegeneral.innerHTML =compteurgeneral;
    });

    heart2.addEventListener('click', ()=>{
        compteur2++;
        compteurgeneral++
        like2.innerHTML=compteur2;
        likegeneral.innerHTML =compteurgeneral;
    });

    heart3.addEventListener('click', ()=>{
        compteur3++;
        compteurgeneral++
        like3.innerHTML=compteur3;
        likegeneral.innerHTML =compteurgeneral;
    });

    heart4.addEventListener('click', ()=>{
        compteur4++;
        compteurgeneral++
        like4.innerHTML=compteur4;
        likegeneral.innerHTML =compteurgeneral;
    });

    heart5.addEventListener('click', ()=>{
        compteur5++;
        compteurgeneral++
        like5.innerHTML=compteur5;
        likegeneral.innerHTML =compteurgeneral;
    });

    heart6.addEventListener('click', ()=>{
        compteur6++;
        compteurgeneral++
        like6.innerHTML=compteur6;
        likegeneral.innerHTML =compteurgeneral;
    });


