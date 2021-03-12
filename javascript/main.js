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
                <a href="details.html?id=${photographer.id}"><img id="photoProfil-${photographer.id}" onclick= "console.log(this)" src="photos/Photographers-ID-Photos/${photographer.portrait}"
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
            }

        
        // Affichage profil photographe 
    

            
    }
});






