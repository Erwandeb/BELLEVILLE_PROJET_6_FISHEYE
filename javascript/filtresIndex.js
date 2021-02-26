/* */


/**
 * Fonctionnement du tri :
 * 
 * 1 - L'utilisateur clique sur un bouton filtrant
 * 2 - Quand le bouton est cliqué, il lance la fonction  showResultat.
 * 3 - La fonction commence par une boucle qui va parcourir tous les tags des photographe
 * 4 - Chaque resultat égal à la valeur du filtre est rangé dans un nouvel Array
 * 5 - On affiche le nouvel Array à l'écran
 * 
 */

const portraitFiltre = document.getElementById('filtre-portrait');
const artFiltre = document.getElementById('filtre-art');
const fashionFiltre = document.getElementById('filtre-fashion');
const architectureFiltre = document.getElementById('filtre-architecture');
const travelFiltre = document.getElementById('filtre-travel');
const sportFiltre = document.getElementById('filtre-sport');
const animalsFiltre = document.getElementById('filtre-animals');
const eventsFiltre = document.getElementById('filtre-events');

let tagSpecialiste = document.querySelectorAll('.tagsSpecialist');
for ( let i=0; tagSpecialiste.length;i++){
    tagSpecialiste[i].showResultat()
}

console.log(tagSpecialiste);

const arrayFiltre = [portraitFiltre , artFiltre , fashionFiltre , architectureFiltre , travelFiltre, sportFiltre , animalsFiltre , eventsFiltre];

arrayFiltre.forEach(filtres => addEventListener( "click", showResultat));

function showResultat(){
   
        console.log('hello')
    }
   
