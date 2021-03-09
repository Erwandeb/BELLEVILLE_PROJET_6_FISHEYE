
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


/*
if(photographer.tags === filtreActif){
                    photographerMatchList.push(photographer);
                    console.log("la liste des photographe correspondant aux filtre actif :", photographerMatchList);
*/

/*
        for(let i=0; i<photographerTag.length;i++){
            let photographerTagData = photographerTag[i].dataset.tag;
            console.log("la boucle :", photographerTagData);
        */
/*
CODE ASYNC
const get = function(url){
    return new Promise (function(resolve,reject){
        let xhr = new window.XMLHttpRequest()

        xhr.onreadystatechange = function(){
            if( xhr === 4){
                if (xhr === 200){
                    resolve(xhr.responseText)
                } else {
                    reject(xhr)
                }
            }
        }
        xhr.open('get', url, true);
        xhr.send();
    })
}
const getPosts = function(){
    return get('javascript/data.json').then(function(response){
        let users = JSON.parse(reponse);
        return get ('javascript/data.json'+ photographer.id);
    }).then(function(response){
        let post = JSON.parse(response);
        return posts;
    })
}

getPosts().then(function(posts){
    console.log(posts[0]);
}).catch(function(error){
    console.log(error);
}).then(function(){
    console.log("fin de  requete");
});
*/


/*
function showResultat(){
   let tagSpecialiste = document.querySelectorAll('.tagsSpecialist');
    for (let i=0; i < tagSpecialiste.length; i++){
       photographerTag = tagSpecialiste[i]
       console.log(photographerTag);
        comparaison();
    }
        function comparaison(){
         
            console.log("hello" + matchingTag);
        }
}
*/ 

/*
function showResultat(){

    console.log(this);

    let expertiseTag = document.querySelectorAll('.expertiseTag');

    for(let i=0; i <expertiseTag.length; i++){
        let expertisetagBoucle = expertiseTag[i];
        //console.log(expertisetagBoucle)
       
        let arrayListeExpertise = new Array ();
        arrayListeExpertise.push(expertisetagBoucle);
        
        console.log(arrayListeExpertise);
    }

  

}

function showResultat(){

    console.log(this);

    let expertiseTag = document.querySelectorAll('.expertiseTag[data-]');
       

    let arrayListeExpertise = new Array ();
    arrayListeExpertise.push(expertiseTag);
    console.log(arrayListeExpertise); 

    const resultat = arrayListeExpertise.filter(function (element){
        if( element === this);
    });

    console.log(resultat);

}

function filtrerPhotographe(){

    mainDiv.style.display="none";

    let filtreActif = this.dataset.filter;
    console.log("le filtre choisi est : "+filtreActif);


    let expertiseTag = Array.from(document.querySelectorAll(".expertiseTag"));
    console.log(expertiseTag);


    let fonctionComparaison = expertiseTag.filter(function comp(){
        if (filtreActif == tag) 
          return true}
        )
        return console.log( fonctionComparaison)

};


function filtrerPhotographe(){

    mainDiv.style.display="none";

    let filtreActif = this.dataset.filter;
    console.log("le filtre choisi est : "+filtreActif);


    let expertiseTag = document.querySelectorAll(".expertiseTag");
    for(let i=0; i<expertiseTag.length;i++){
      let expertiseTagData = expertiseTag[i].dataset.tag;
      console.log("la boucle :"+ expertiseTagData)




    comparaison();

        function comparaison(){
            if(expertiseTagData === filtreActif){
                console.log("match");
            }
        }

      
    }


};
*/