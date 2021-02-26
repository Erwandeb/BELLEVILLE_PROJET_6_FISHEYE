
// Variables
const mainDiv = document.getElementById('main');
const filtresArticles = document.querySelector('.filtres-articles');


// Récupération des données JSON
fetch('javascript/data.json')
  .then((response) => response.json())
  .then(function (data) {
   
// Création d'un bloc HTML par photographe
    for(photographer of data.photographers) {
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
                <div class="filtres-articles">
                    <span class= "tagsSpecialist">#${photographer.tags[0]}</span>
                    <span class= "tagsSpecialist">#${photographer.tags[1]}</span>
                    <span class= "tagsSpecialist">#${photographer.tags[2]}</span>
                    <span class= "tagsSpecialist">#${photographer.tags[3]}</span>
                </div>
        </article>  
     `;
    }
  });




