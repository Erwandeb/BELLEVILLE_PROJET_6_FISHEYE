
/**
 * Fonctionnement du tri :
 * 
 * 1 - L'utilisateur clique sur un bouton filtrant
 * 2 - Quand le bouton est cliqué, il lance la fonction showResultat.
 * 3 - La fonction commence par une boucle qui va parcourir tous les tags des photographe
 * 4 - Chaque resultat égal à la valeur du filtre est rangé dans un nouvel Array
 * 5 - On utilise une méthode map() pour créer un nouvel Array 
 * 6 - On affiche le nouvel array à l'écran
 * 
 */


const nosPhotographes = document.getElementById('nosPhotographes');
const portraitFiltre = document.getElementById('filtre-portrait');
const artFiltre = document.getElementById('filtre-art');
const fashionFiltre = document.getElementById('filtre-fashion');
const architectureFiltre = document.getElementById('filtre-architecture');
const travelFiltre = document.getElementById('filtre-travel');
const sportFiltre = document.getElementById('filtre-sport');
const animalsFiltre = document.getElementById('filtre-animals');
const eventsFiltre = document.getElementById('filtre-events');

nosPhotographes.addEventListener('click', showAllPhotographer)
portraitFiltre.addEventListener('click', filtrerPhotographe);
artFiltre.addEventListener('click', filtrerPhotographe);
fashionFiltre.addEventListener('click', filtrerPhotographe);
architectureFiltre.addEventListener('click', filtrerPhotographe);
travelFiltre.addEventListener('click', filtrerPhotographe);
sportFiltre.addEventListener('click', filtrerPhotographe);
animalsFiltre.addEventListener('click', filtrerPhotographe);
eventsFiltre.addEventListener('click', filtrerPhotographe);
 

function filtrerPhotographe() {

    mainDiv.innerHTML = '';

    let filtreActif = this.dataset.filter;
    console.log("le filtre choisi est : " , filtreActif);
    let photographerMatchList = [];
    
    fetch('javascript/data.json')
    .then((response) => response.json())
    .then(function (data){

        for(item of data.photographers) {
            const photographer = new Photographer(item.id, item.name, item.description, item.city, item.country, item.tags, item.tagline, item.price, item.portrait)
            //console.log("testpageindex" , photographer);
            
            comparaison();
                function comparaison(){
                    photographer.tags.forEach(element => {
                        if(element === filtreActif){
                            photographerMatchList.push(photographer)
                            //console.log("bonjour" , element)
                            console.log("liste des photographes correspondant au filtre actif :", photographerMatchList);
                        }

                    });
                }
        }
        for(photographer of photographerMatchList){
            mainDiv.innerHTML += `
            <article>
                    <a href="mimiKeel.html"><img src="photos/Photographers-ID-Photos/${photographer.portrait}"
                            alt="${photographer.description}"/></a>
                    <div class="description-article">
                        <h2>${photographer.name}</h2>
                        <h3>${photographer.city}, ${photographer.country}</h3>
                        <blockquote>${photographer.tagline}</blockquote>
                        <p>${photographer.price}€ /jour</p>
                    </div>
                    <div id="filtres-articles-${photographer.id}"></div>
            </article>  
            `;
             // récupération des tags
             const filtresArticles = document.getElementById("filtres-articles-"+photographer.id);
             for(tag of photographer.tags){
                 filtresArticles.innerHTML+= `<span class="photographerTag" data-tag="${tag}">#${tag}</span>`;
                 // console.log(tag)
             }
        }
        
    });

};

function showAllPhotographer() {

    mainDiv.innerHTML = '';

fetch('javascript/data.json')
  .then((response) => response.json())
  .then(function (data){

    for(item of data.photographers) {
        const photographer = new Photographer(item.id, item.name, item.description, item.city, item.country, item.tags, item.tagline, item.price, item.portrait)

        mainDiv.innerHTML += `
        <article>
                <a href="mimiKeel.html"><img src="photos/Photographers-ID-Photos/${photographer.portrait}"
                        alt="${photographer.description}"/></a>
                <div class="description-article">
                    <h2>${photographer.name}</h2>
                    <h3>${photographer.city}, ${photographer.country}</h3>
                    <blockquote>${photographer.tagline}</blockquote>
                    <p>${photographer.price}€ /jour</p>
                </div>
                <div id="filtres-articles-${photographer.id}"></div>
        </article>  
        `;
            // récupération des tags
            const filtresArticles = document.getElementById("filtres-articles-"+photographer.id);
            for(tag of photographer.tags){
                filtresArticles.innerHTML+= `<span class="photographerTag" data-tag="${tag}">#${tag}</span>`;
                // console.log(tag)
            }
    }
});

}

