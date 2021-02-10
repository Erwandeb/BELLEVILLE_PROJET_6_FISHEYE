/* ------------------------RESSOURCES JAVASCRIPT----------------------------*/



/* 1-Modales des pages photographes*/

const contactMe = document.querySelector('.contact');
const modal = document.querySelector('.fenetre-modale');
const closeBtn = document.querySelector('.closeBtn');

// Lancement de la modale
contactMe.addEventListener('click', lauchModal);

function lauchModal(){
    modal.style.display = "block";
}

//fermeture de la modale

closeBtn.addEventListener('click', closeModal);

function closeModal(){
    modal.style.display ="none";
}




