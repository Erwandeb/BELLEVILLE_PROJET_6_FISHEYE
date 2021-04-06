// Variables
const mainDiv = document.getElementById('main');


// Création de la class photographer
class Photographer {
    constructor(id, name, description, city, country, tags, tagline, price, portrait ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
}

// Affichage des photographes (données JSON) au chargement de la page
fetch('javascript/data.json')
  .then((response) => response.json())
  .then(function (data){

    for(item of data.photographers) {
        const photographer = new Photographer(item.id, item.name, item.description, item.city, item.country, item.tags, item.tagline, item.price, item.portrait)

        // Affichage écran acceuil
        mainDiv.innerHTML += `
        <article>
                <a href="details.html?id=${photographer.id}" aria-label="cliquez sur la photo pour afficher le profil de ${photographer.name}"><img id="photoProfil-${photographer.id}" onclick= "console.log(this)" src="photos/Photographers-ID-Photos/${photographer.portrait}" alt="${photographer.description}"/></a>
                <div class="description-article">
                    <h2 tabindex="12" aria-label="Le nom du photographe est ${photographer.name} ">${photographer.name}</h2>
                    <h3 tabindex="13" aria-label="Le photographe viens de ${photographer.city}">${photographer.city}, ${photographer.country}</h3>
                    <blockquote tabindex="14" aria-label="La devise du photographe est :${photographer.tagline}">${photographer.tagline}</blockquote>
                    <p  tabindex="15" aria-label="Le prix de ce photographe est ${photographer.price}€ par jour">${photographer.price}€ /jour</p>
                </div>
                <div id="filtres-articles-${photographer.id}"></div>
        </article>  
        `;
        
            // récupération des tags
            const filtresArticles = document.getElementById("filtres-articles-"+photographer.id);
            for(tag of photographer.tags){
                filtresArticles.innerHTML+= `<span class="photographerTag" data-tag="${tag}" tabindex="${photographer.id}" aria-label="${photographer.name} est spécialisé dans les  ${tag}" >#${tag}</span>`;
            }            
    }
});






