

const lightBox = document.querySelector('.lightbox');
const slider = document.querySelector('.slider')

/*
// Ouverture de la lightbox 
const figure = document.getElementsByTagName(".carroussel img");

figure.addEventListener('click', openLightBox);
function openLightBox(){
    lightBox.style.display ="block";
};

// Fermeture de la lightBox 
const closeLightBox = document.querySelector('.closeLightbox');

closeLightBox.addEventListener('click', closebox)
function closebox(){
    lightBox.style.display ="none";
};
*/

// Défilement de la lightbox 
const suivantLightBox = document.querySelector('.suivantLightBox');
const precedentLightBox = document.querySelector('.precedentLightBox');
//const lightBoxImageView = docment.getElementsByClassName('lightBox-img-view');
const lightBoxImage = document.querySelectorAll('.lightBox-img');
const lastClone = document.getElementById ('lastClone');
const firstClone = document.getElementById ('firstClone');

// Counter 
let counter = 1;
const size = lightBoxImage[0].clientWidth;

slider.style.transform = 'translateX(' +(-size*counter) +'px)';



// Bouton listener 
suivantLightBox.addEventListener('click', moveRight);
function moveRight(){
    counter ++;
    slider.style.transition = ' transform 0.2s ease-in-out';
    slider.style.transform = 'translateX(' +(-size*counter) +'px)';
};


 precedentLightBox.addEventListener('click', moveLeft);
 function moveLeft(){
    counter --;
    slider.style.transition = ' transform 0.2s ease-in-out';
    slider.style.transform = 'translateX(' +(-size*counter) +'px)';
};

slider.addEventListener('transitionend', loopDroit);

function loopDroit(){
    if (lightBoxImage[counter].id === lastClone){
        slider.style.transition = "none";
        counter = lightBoxImage.length - 2;
        slider.style.transform = 'translateX(' +(-size*counter) +'px)';
    }
}
