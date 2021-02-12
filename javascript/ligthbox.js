
/*--------------------------------------------OUVERTURE  DE LA LIGHTBOX-------------------------------------------*/

// Ouverture de la lightbox 
const lightBox = document.querySelector('.lightbox');
const carrousselImage = document.querySelectorAll('.carroussel-img');

for(let i=0 ; i<carrousselImage.length; i++){
    carrousselImage[i].addEventListener('click', openBox);
}

function openBox(){
    lightBox.style.opacity ="1";
    lightBox.style.zIndex="10";
};


// Fermeture de la lightBox 
const closeLightBox = document.querySelector('.closeLightbox');

closeLightBox.addEventListener('click', closebox)
function closebox(){
    lightBox.style.opacity ="0";
    lightBox.style.zIndex="-10";
};

/*--------------------------------------FONCTIONNELENT DE LA LIGHTBOX-------------------------------------------*/

// Variables et constantes
const suivantLightBox = document.querySelector('.suivantLightBox');
const precedentLightBox = document.querySelector('.precedentLightBox');
const lightBoxImage = document.querySelectorAll('.lightBox-img');
const lastClone = document.getElementById ('lastClone');
const firstClone = document.getElementById ('firstClone');
const slider = document.querySelector('.slider')

// Compteur
let counter = 1;
const size = lightBoxImage[0].clientWidth;

slider.style.transform = 'translateX(' + (-size*counter) +'px)';


// Bouton SUIVANT
suivantLightBox.addEventListener('click', moveRight);
function moveRight(){
    if(counter >= lightBoxImage.length - 1) return ;
    counter ++;
    slider.style.transition = ' transform 0.250s ease-in-out';
    slider.style.transform = 'translateX(' + (-size*counter) +'px)';
};

// Bouton PRECEDENT
 precedentLightBox.addEventListener('click', moveLeft);
 function moveLeft(){
     if(counter<=0) return;
    counter --;
    slider.style.transition = ' transform 0.250s ease-in-out';
    slider.style.transform = 'translateX(' + (-size*counter) +'px)';
};


// Défilement des photos
slider.addEventListener('transitionend', loop);
function loop(){
    if (lightBoxImage[counter].id === 'lastClone'){
        slider.style.transition = "none";
        counter = lightBoxImage.length - 2;
        slider.style.transform = 'translateX(' + (-size*counter) +'px)';
    }
    if(lightBoxImage[counter].id === 'firstClone'){
        slider.style.transition = "none";
        counter = lightBoxImage.length - counter;
        slider.style.transform = 'translateX(' + (-size*counter) +'px)';
    }
}
