const mainDiv = document.getElementById('main');

fetch('javascript/data.json')
  .then((response) => response.json())
  .then(function (data) {
    for (photographer of data.photographers) {
      mainDiv.innerHTML += `
        <article>
                <a href="mimiKeel.html"><img src="photos/Photographers-ID-Photos/${photographer.portrait}"
                        alt=" un potrait de Nora avec des lunettes" /></a>
                <div class="description-article">
                    <h2>${photographer.name}</h2>
                    <h3>London, UK</h3>
                    <blockquote lang="en-GB">Voir le beau dans le quotidien</blockquote>
                    <p>400€/jour</p>
                </div>
                <div class="filtres-articles">
                    <button type="button">#Portrait</button>
                    <button type="button">#Events</button>
                    <button type="button">#Travel</button>
                    <button type="button">#Animals</button>
                </div>
            </article>
      `;
    }
  });


