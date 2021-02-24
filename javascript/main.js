
// Creation d'une variable pour insérer les blocs HTML
const mainDiv = document.getElementById('main');

// Récupération des données JSON
fetch('javascript/data.json')
  .then((response) => response.json())
  .then(function (data) {
   
// Boucle qui parcours le fichier photographe dans le JSON
    for (photographer of data.photographers) {
      
// Création d'un bloc par photographe
        mainDiv.innerHTML += `
        <article>
                <a href="mimiKeel.html"><img src="photos/Photographers-ID-Photos/${photographer.portrait}"
                        alt="${photographer.description}"/></a>
                <div class="description-article">
                    <h2>${photographer.name}</h2>
                    <h3>${photographer.city}, ${photographer.country}</h3>
                    <blockquote>${photographer.tagline}</blockquote>
                    <p>${photographer.price}€/jour</p>
                </div>
            </article>
            <div class="filtres-articles">
                    <button type="button">#${photographer.tags[i]}</button>
            </div>
     `;
   
    }
  });


