// Récupération de l'URL
const url = new URL(window.location);
const id = url.searchParams.get('id');
let totalLike = 0;

// Déclaration de la classe photographer
class Photographer {
  constructor(id, name, description, city, country, tags, tagline, price, portrait) {
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

// Déclaration de la classe Media
class Media {
  constructor(id, photographerId, image, video, titre, tags, likes, date, price, description) {
    this.id = id;
    this.photographerId = photographerId;
    this.image = image;
    this.video = video;
    this.titre = titre;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.description = description;
  }
}

let photographers;

// Récupération des données photographes dans le JSON 
fetch('javascript/data.json')
  .then((response) => response.json())
  .then(function (data) {
    photographers = data;
    const photographerData = data.photographers.filter((photographer) => photographer.id === parseInt(id));
    const photographer = new Photographer(
      photographerData[0].id,
      photographerData[0].name,
      photographerData[0].description,
      photographerData[0].city,
      photographerData[0].country,
      photographerData[0].tags,
      photographerData[0].tagline,
      photographerData[0].price,
      photographerData[0].portrait
    );

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------- Affichage profil photographe Dynamique--------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

    // Affichage du HTML dans la balise "main" de la page
    const mainDivDetail = document.getElementById('mainDivDetail');
    mainDivDetail.innerHTML += `
        <main id="mainDivDetail">
            <div class="presentation">
                <h1 tabindex="3" title="ceci est la page de ${photographer.name}">${photographer.name}</h1>
                <h3 tabindex="4">${photographer.city}, ${photographer.country}</h3>
                <blockquote tabindex="5">${photographer.tagline}</blockquote>
      
                <div id="filtres-articles-${photographer.id}" tabindex="6"></div>
            </div>

        <img src="photos/Photographers-ID-Photos/${photographer.portrait}" alt="${photographer.description}" tabindex="7"/>
        </main>`;

    // Affichages des filtres 
    const filtresArticles = document.getElementById('filtres-articles-' + photographer.id);
    for (tag of photographer.tags) {
      filtresArticles.innerHTML += `<span class="photographerTag" data-tag="${tag}">#${tag}</span>`;
    }

    // Déclaration des variables dans le carroussel
    const carroussel = document.getElementById('carroussel');
    const mediaData = data.media.filter((media) => media.photographerId === parseInt(id));
    
    // Constructeur de l'objet Media
    for (data of mediaData){
    const media = new Media(
        data.id,
        data.photographerId,
        data.image,
        data.video,
        data.titre,
        data.tags,
        data.likes,
        data.date,
        data.price,
        data.description
    );

    totalLike += media.likes;
    
    // Pattern Factory pour créer des vidéos ou photos selon la nature du média
    function generateMediaTag(){
        if(media.video == undefined){
            return `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
        }
        return `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>` ;
    }

    // Création dynamique (from JSON) d'un article pour chaque médias du photographe
    carroussel.innerHTML += `
        <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
            ${generateMediaTag()} 
            <div class="description-image">
            <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
            <div class="prix-like">
               <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€">${media.price} €</p>
               <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
            </div>
            </div>
        </article>`;

/*---------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- Incrémentation des likes-----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------*/
      
    carroussel.addEventListener('click', incrementationLike);
    
    // Affichage du nombre de like avec incrémentation à chaque clic
    function incrementationLike(e) {
        if (e.target && e.target.id == `like-media-${media.id}`){
          const likeCounter = document.getElementById(`like-counter-${media.id}`);
          const likeValue = parseInt(likeCounter.innerHTML);
          let nbrLikes = likeValue + 1;
          likeCounter.innerText = nbrLikes;
          showNewTotalLikes();
        }
      }
    }

    // Affichage du nombre cumulé de like 
    function showNewTotalLikes() {
        totalLike++;
        const nbrTotalLikes = document.getElementById('nbrTotalLikes');
        nbrTotalLikes.innerText = totalLike;
    }

    
/*----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------ Fonction de tri dans la liste déroulante ----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------*/
    const selectElement = document.querySelector('select');
    selectElement.addEventListener('change', triDetails);

    function triDetails(){
      const carroussel = document.getElementById('carroussel');
      carroussel.innerHTML = '';

        // fonction de tri par popularité
        if (this.selectedIndex === 0) {
            const mediaListTri = mediaData.sort((a, b) => (a.likes < b.likes ? 1 : -1));
            for (data of mediaListTri) {
            const media = new Media(
                data.id,
                data.photographerId,
                data.image,
                data.video,
                data.titre,
                data.tags,
                data.likes,
                data.date,
                data.price,
                data.description
            );

            // Pattern Factory pour créer des vidéos ou photos selon la nature du média
            function generateMediaTag(){
                if(media.video == undefined){
                    return `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
                }
                return `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>` ;
            }

            // Création dynamique (from JSON) d'un article pour chaque médias du photographe
            carroussel.innerHTML += `
                <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
                    ${generateMediaTag()} 
                    <div class="description-image">
                    <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
                    <div class="prix-like">
                    <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€"  >${media.price} €</p>
                    <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
                    </div>
                    </div>
                </article>`;


            // LightBox (tri popularité)       
            const lightBox = document.getElementById('lightBox');
            const suivantLightBox = document.getElementById('suivantLightBox');
            const precedentLightBox = document.getElementById('precedentLightBox');
            const closeBtnLightBox = document.getElementById('closeBtnLightBox');
            let currentViewedMedia;

            carroussel.addEventListener('click', throwLightBox);
            
            // Fonction d'affichage de la lightBox
            function throwLightBox(e) {
            if(e.target.id.startsWith('carroussel-img-')){
                let id = e.target.id.split('-').pop();
                let media = mediaData.find((element) => element.id == id);
                currentViewedMedia = media;

                const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
                const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;

                mainDivDetail.style.visibility = 'hidden';
                carroussel.style.visibility = 'hidden';
                footer.style.visibility = 'hidden';
                lightBox.style.display = 'block';
                photoSlider.innerHTML += `
                        <div id="photo-Slider-${media.id}">
                            ${media.video == undefined ? imageTag : videoTag} 
                            <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p><div>
                        `;
                }
            }

            // Bouton suivant
            suivantLightBox.addEventListener('click', showNextPhoto);
            window.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight'){
                    showNextPhoto();
                }
            });

            // Fonction affichage de la photo suivante
            function showNextPhoto(){
                const incrementationIndex = 1;
                let index = mediaData.indexOf(currentViewedMedia); 
                let nextMedia = mediaData[index + incrementationIndex]; 
                currentViewedMedia = nextMedia;
            
                const imageTag = `<img class="carroussel-img" id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.image}" alt="${nextMedia.description}">`;
                const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.video}" alt="${nextMedia.description}"></video>`;

                if(currentViewedMedia != undefined){
                    photoSlider.innerHTML = `
                        ${nextMedia.video == undefined ? imageTag : videoTag} 
                        <p tabindex="${nextMedia.photographerId}" aria-label="${nextMedia.description}">${nextMedia.titre}</p>
                        <div>
                        </div>
                    `;
                }

                if(currentViewedMedia == undefined){    
                    let currentViewedMedia = nextMedia;
                    let index = mediaData.indexOf(currentViewedMedia);
                    let nextMedia = mediaData[index + incrementationIndex];            
                }
            }

            // Bouton précédent
            precedentLightBox.addEventListener('click', showPreviewPhoto);
            window.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft'){
                    showPreviewPhoto();
                }
            });

            // Fonction affichage de la photo Précédente
            function showPreviewPhoto(){
                const decrementationIndex = 1;
                let index = mediaData.indexOf(currentViewedMedia); 
                let prevMedia = mediaData[index - decrementationIndex]; 
                currentViewedMedia = prevMedia;
            
                if(currentViewedMedia != undefined){
                const imageTag = `<img class="carroussel-img" id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.image}" alt="${prevMedia.description}">`;
                const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.video}" alt="${prevMedia.description}"></video>`;
                    photoSlider.innerHTML = `
                        ${prevMedia.video == undefined ? imageTag : videoTag} 
                        <p tabindex="${prevMedia.photographerId}" aria-label="${prevMedia.description}">${prevMedia.titre}</p>
                        <div>
                        </div>
                    `; 
                }
            
                if(currentViewedMedia == undefined){  
                    currentViewedMedia = mediaData[mediaData.length - 1];
                    let index = mediaData.indexOf(currentViewedMedia);
                    let prevMedia = mediaData[index];                 
                }
        }


        // Fermeture de la lightBox
        closeBtnLightBox.addEventListener('click', closeBox);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape'){
                closeBox();
            }
        });

        function closeBox() {
        lightBox.style.display = 'none';
        carroussel.style.visibility = 'visible';
        footer.style.visibility = 'visible';
        mainDivDetail.style.visibility = 'visible';
        removeDataDiaporama();
        }

        function removeDataDiaporama() {
        photoSlider.innerHTML = '';
        }
    }


    // fonction de tri par Date
      } else if (this.selectedIndex === 1) {
        const mediaListTri = mediaData.sort((a, b) => (a.date > b.date ? 1 : -1));
        for (data of mediaListTri) {
          const media = new Media(
            data.id,
            data.photographerId,
            data.image,
            data.video,
            data.titre,
            data.tags,
            data.likes,
            data.date,
            data.price,
            data.description
          );

        // Pattern Factory pour créer des vidéos ou photos selon la nature du média
        function generateMediaTag(){
            if(media.video == undefined){
                return `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
            }
            return `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>` ;
        }

        // Création dynamique (from JSON) d'un article pour chaque médias du photographe
        carroussel.innerHTML += `
                <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
                    ${generateMediaTag()} 
                    <div class="description-image">
                        <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
                        <div class="prix-like">
                        <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€">${media.price} €</p>
                        <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div> 
                    </div>
                    </div>
                </article>`;

    // LightBox tri par Date     
        const lightBox = document.getElementById('lightBox');
        const suivantLightBox = document.getElementById('suivantLightBox');
        const precedentLightBox = document.getElementById('precedentLightBox');
        const closeBtnLightBox = document.getElementById('closeBtnLightBox');
        let currentViewedMedia;

        carroussel.addEventListener('click', throwLightBox);
        function throwLightBox(e) {
        if(e.target.id.startsWith('carroussel-img-')){
            let id = e.target.id.split('-').pop();
            let media = mediaData.find((element) => element.id == id);
            currentViewedMedia = media;

            const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
            const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;

            mainDivDetail.style.visibility = 'hidden';
            carroussel.style.visibility = 'hidden';
            footer.style.visibility = 'hidden';
            lightBox.style.display = 'block';
            photoSlider.innerHTML += `
                    <div id="photo-Slider-${media.id}">
                        ${media.video == undefined ? imageTag : videoTag} 
                        <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p><div>
                    `;
            }
        }

        // Affichage de la photo suivante
        suivantLightBox.addEventListener('click', showNextPhoto);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight'){
                showNextPhoto();
            }
        });

        function showNextPhoto(){
            const incrementationIndex = 1;
            let index = mediaData.indexOf(currentViewedMedia); 
            let nextMedia = mediaData[index + incrementationIndex]; 
            currentViewedMedia = nextMedia;
        
            const imageTag = `<img class="carroussel-img" id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.image}" alt="${nextMedia.description}">`;
            const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.video}" alt="${nextMedia.description}"></video>`;

            if(currentViewedMedia != undefined){
                photoSlider.innerHTML = `
                    ${nextMedia.video == undefined ? imageTag : videoTag} 
                    <p tabindex="${nextMedia.photographerId}" aria-label="${nextMedia.description}">${nextMedia.titre}</p>
                    <div>
                    </div>
                `;
            }

            if(currentViewedMedia == undefined){    
                let currentViewedMedia = nextMedia;
                let index = mediaData.indexOf(currentViewedMedia);
                let nextMedia = mediaData[index + incrementationIndex];            
            }
        }

        // Affichage de la photo précédente
        precedentLightBox.addEventListener('click', showPreviewPhoto);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft'){
                showPreviewPhoto();
            }
        });

        function showPreviewPhoto(){
            const decrementationIndex = 1;
            let index = mediaData.indexOf(currentViewedMedia); 
            let prevMedia = mediaData[index - decrementationIndex]; 
            currentViewedMedia = prevMedia;
        
            if(currentViewedMedia != undefined){
            const imageTag = `<img class="carroussel-img" id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.image}" alt="${prevMedia.description}">`;
            const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.video}" alt="${prevMedia.description}"></video>`;
                photoSlider.innerHTML = `
                    ${prevMedia.video == undefined ? imageTag : videoTag} 
                    <p tabindex="${prevMedia.photographerId}" aria-label="${prevMedia.description}">${prevMedia.titre}</p>
                    <div>
                    </div>
                `; 
            }
        
            if(currentViewedMedia == undefined){  
                currentViewedMedia = mediaData[mediaData.length - 1];
                let index = mediaData.indexOf(currentViewedMedia);
                let prevMedia = mediaData[index];                 
            }
        }


        // Fermeture de la lightBox
        closeBtnLightBox.addEventListener('click', closeBox);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape'){
                closeBox();
            }
        });
        function closeBox() {
            lightBox.style.display = 'none';
            carroussel.style.visibility = 'visible';
            footer.style.visibility = 'visible';
            mainDivDetail.style.visibility = 'visible';
            removeDataDiaporama();
        }
        function removeDataDiaporama() {
            photoSlider.innerHTML = '';
        }
    }

    // fonction de tri par Date
      } else if (this.selectedIndex === 2) {
        const mediaListTri = mediaData.sort((a, b) => (a.titre > b.titre ? 1 : -1));
        for (data of mediaListTri) {
          const media = new Media(
            data.id,
            data.photographerId,
            data.image,
            data.video,
            data.titre,
            data.tags,
            data.likes,
            data.date,
            data.price,
            data.description
          );

        // Pattern Factory pour créer des vidéos ou photos selon la nature du média
        function generateMediaTag(){
            if(media.video == undefined){
                return `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
            }
            return `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>` ;
        }

        // Création dynamique (from JSON) d'un article pour chaque médias du photographe
          carroussel.innerHTML += `
                <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
                    ${generateMediaTag()} 
                    <div class="description-image">
                    <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
                    <div class="prix-like">
                    <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€">${media.price} €</p>
                    <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
                    </div>
                    </div>
                </article>`;
            
    // Gestion de la LightBox (tri par titre)       
    const lightBox = document.getElementById('lightBox');
    const suivantLightBox = document.getElementById('suivantLightBox');
    const precedentLightBox = document.getElementById('precedentLightBox');
    const closeBtnLightBox = document.getElementById('closeBtnLightBox');
    const section = document.querySelector('section');
    let currentViewedMedia;

    // Affichage dynamique de la lightbox
    carroussel.addEventListener('click', throwLightBox);
    function throwLightBox(e){
      if(e.target.id.startsWith('carroussel-img-')){
        let id = e.target.id.split('-').pop();
        let media = mediaData.find((element) => element.id == id);
        currentViewedMedia = media;

        const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
        const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;

        mainDivDetail.style.visibility = 'hidden';
        carroussel.style.visibility = 'hidden';
        footer.style.visibility = 'hidden';
        lightBox.style.display = 'block';

        photoSlider.innerHTML += `
                <div id="photo-Slider-${media.id}">
                    ${media.video == undefined ? imageTag : videoTag} 
                    <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p><div>
                `;
        }
        console.log("ceci est ", imageTag)
    }

    // Afficher la photo précédente
    suivantLightBox.addEventListener('click', showNextPhoto);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight'){
            showNextPhoto();
        }
    });
    function showNextPhoto(){
        const incrementationIndex = 1;
        let index = mediaData.indexOf(currentViewedMedia); 
        let nextMedia = mediaData[index + incrementationIndex]; 
        currentViewedMedia = nextMedia;
    
        const imageTag = `<img class="carroussel-img" id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.image}" alt="${nextMedia.description}">`;
        const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.video}" alt="${nextMedia.description}"></video>`;

        if(currentViewedMedia != undefined){
            photoSlider.innerHTML = `
                ${nextMedia.video == undefined ? imageTag : videoTag} 
                <p tabindex="${nextMedia.photographerId}" aria-label="${nextMedia.description}">${nextMedia.titre}</p>
                <div>
                </div>
            `;
        }
        if(currentViewedMedia == undefined){    
            let currentViewedMedia = nextMedia;
            let index = mediaData.indexOf(currentViewedMedia);
            let nextMedia = mediaData[index + incrementationIndex];            
        }
    }


    // Afficher la photo précédente
    precedentLightBox.addEventListener('click', showPreviewPhoto);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft'){
            showPreviewPhoto();
        }
    });
    function showPreviewPhoto(){
        const decrementationIndex = 1;
        let index = mediaData.indexOf(currentViewedMedia); 
        let prevMedia = mediaData[index - decrementationIndex]; 
        currentViewedMedia = prevMedia;
       
        if(currentViewedMedia != undefined){
        const imageTag = `<img class="carroussel-img" id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.image}" alt="${prevMedia.description}">`;
        const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.video}" alt="${prevMedia.description}"></video>`;
            photoSlider.innerHTML = `
                ${prevMedia.video == undefined ? imageTag : videoTag} 
                <p tabindex="${prevMedia.photographerId}" aria-label="${prevMedia.description}">${prevMedia.titre}</p>
                <div>
                </div>
            `; 
        }
        if(currentViewedMedia == undefined){  
            currentViewedMedia = mediaData[mediaData.length - 1];
            let index = mediaData.indexOf(currentViewedMedia);
            let prevMedia = mediaData[index];                 
        }
    }


    // Fermeture de la lightBox
    closeBtnLightBox.addEventListener('click', closeBox);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape'){
            closeBox();
        }
    });

    function closeBox() {
        lightBox.style.display = 'none';
        carroussel.style.visibility = 'visible';
        footer.style.visibility = 'visible';
        mainDivDetail.style.visibility = 'visible';
        removeDataDiaporama();
    }

    function removeDataDiaporama() {
        photoSlider.innerHTML = '';
    }

        }
      }
    }

/*----------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- GESTION LIGHTBOX --------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------*/

    // Déclaration des variables 
    const lightBox = document.getElementById('lightBox');
    const suivantLightBox = document.getElementById('suivantLightBox');
    const precedentLightBox = document.getElementById('precedentLightBox');
    const closeBtnLightBox = document.getElementById('closeBtnLightBox');

    let currentViewedMedia;

    // Ecouteur evenement 
    carroussel.addEventListener('click', throwLightBox);

    // Fonction affichage lightBox
    function throwLightBox(e) {
      if(e.target.id.startsWith('carroussel-img-')){
        let id = e.target.id.split('-').pop();
        let media = mediaData.find((element) => element.id == id);
        currentViewedMedia = media;

        const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
        const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;

        mainDivDetail.style.visibility = 'hidden';
        carroussel.style.visibility = 'hidden';
        footer.style.visibility = 'hidden';
        lightBox.style.display = 'block';
        
        photoSlider.innerHTML += `
                <div id="photo-Slider-${media.id}">
                    ${media.video == undefined ? imageTag : videoTag} 
                    <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p><div>
                `;
        }
    }

    // Clique Bouton suivant
    suivantLightBox.addEventListener('click', showNextPhoto);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight'){
            showNextPhoto();
        }
    });

    // Fonction affichage des photos suivantes 
    function showNextPhoto(){
        const incrementationIndex = 1;
        let index = mediaData.indexOf(currentViewedMedia); 
        let nextMedia = mediaData[index + incrementationIndex]; 
        currentViewedMedia = nextMedia;
    
        const imageTag = `<img class="carroussel-img" id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.image}" alt="${nextMedia.description}">`;
        const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${nextMedia.id}" src="photos/${nextMedia.photographerId}/${nextMedia.video}" alt="${nextMedia.description}"></video>`;

        if(currentViewedMedia != undefined){
            photoSlider.innerHTML = `
                ${nextMedia.video == undefined ? imageTag : videoTag} 
                <p tabindex="${nextMedia.photographerId}" aria-label="${nextMedia.description}">${nextMedia.titre}</p>
                <div>
                </div>
            `;
        }

        if(currentViewedMedia == undefined){    
            let currentViewedMedia = nextMedia;
            let index = mediaData.indexOf(currentViewedMedia);
            let nextMedia = mediaData[index + incrementationIndex];            
        }
    }


    //  Clique Bouton précédent
    precedentLightBox.addEventListener('click', showPreviewPhoto);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft'){
            showPreviewPhoto();
        }
    });

    // Fonction affichage des photos précédentes
    function showPreviewPhoto(){
        const decrementationIndex = 1;
        let index = mediaData.indexOf(currentViewedMedia); 
        let prevMedia = mediaData[index - decrementationIndex]; 
        currentViewedMedia = prevMedia;
       
        if(currentViewedMedia != undefined){
        const imageTag = `<img class="carroussel-img" id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.image}" alt="${prevMedia.description}">`;
        const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${prevMedia.id}" src="photos/${prevMedia.photographerId}/${prevMedia.video}" alt="${prevMedia.description}"></video>`;
            photoSlider.innerHTML = `
                ${prevMedia.video == undefined ? imageTag : videoTag} 
                <p tabindex="${prevMedia.photographerId}" aria-label="${prevMedia.description}">${prevMedia.titre}</p>
                <div>
                </div>
            `; 
        }
    
        if(currentViewedMedia == undefined){  
            currentViewedMedia = mediaData[mediaData.length - 1];
            let index = mediaData.indexOf(currentViewedMedia);
            let prevMedia = mediaData[index];                 
        }
    }


    // Fermeture de la LightBox 
    closeBtnLightBox.addEventListener('click', closeBox);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape'){
            closeBox();
        }
    });

    function closeBox() {
      lightBox.style.display = 'none';
      carroussel.style.visibility = 'visible';
      footer.style.visibility = 'visible';
      mainDivDetail.style.visibility = 'visible';
      removeDataDiaporama();
    }

    function removeDataDiaporama() {
      photoSlider.innerHTML = '';
    }


/*----------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- AFFICHAGE DYNAMIQUE DU FOOTER------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------*/
    const footer = document.querySelector('footer');
    footer.innerHTML += `
        <div class="compte-like">
            <span class="like" id="nbrTotalLikes" tabindex="${photographer.id} aria-label="Ce photographe a été aimé ${photographer.price} fois">${totalLike}</span> <i class="fas fa-heart"></i>
        </div>
        <p tabindex="${photographer.id}" aria-label="Le prix de ce photographe est ${photographer.price}€">${photographer.price} €/jour</p>`;


/*----------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ GESTION DU FORMULAIRE DE CONTACT ------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------*/

    // Déclaration des variables 
    const contactMe = document.querySelector('.contact');
    const modal = document.querySelector('.fenetre-modale');
    const closeBtn = document.getElementById('closeBtn');
    const formIntroduction = document.getElementById('formIntroduction');

    // Bouton contact dynamique
    formIntroduction.innerHTML += `
        <div>
            <h1>Contactez-moi</h1>
            <h2>${photographer.name}</h2>
        </div>
    `;

    // Lancement de la modale
    contactMe.addEventListener('click', lauchModal);
    function lauchModal() {
      modal.style.display = 'block';
    }

    //fermeture de la modale
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
    });
    function closeModal() {
      modal.style.display = 'none';
    }

    // Variables du formulaire
    const firstName = document.getElementById('firstname');
    const lastName = document.getElementById('lastname');
    const eMail = document.getElementById('email');
    const messageTexte = document.getElementById('message');
    const form = document.getElementById('form');
    let firstnameRegExp = new RegExp('[0-9]');
    let lastnameRegExp = new RegExp('[0-9]');
    const fenetreConfirmation = document.querySelector('.fenetre-validation-formulaire');

    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isEmailValid = false;
    let isMessageTextValid = false;

    const errorFirstName = document.querySelector('.errorFirstName');
    const errorLastName = document.querySelector('.errorlastName');
    const erroreMail = document.querySelector('.erroreMail');
    const erroreMessageText = document.querySelector('.erroreMessageText');

    form.addEventListener('submit', validate);

    function validate(e) {
      e.preventDefault();

      // Vérification du champ PRENOM
      if (firstName.value.trim() == '') {
        firstName.style.border = '2px solid #901C1C';
        errorFirstName.innerHTML = 'Vous devez écrire votre prénom.';
        isFirstNameValid = false;
      } else if (firstnameRegExp.test(firstName.value)) {
        errorFirstName.innerHTML = 'Le champ prénom ne doit pas comporter de chiffres.';
        firstName.style.border = '2px solid #901C1C';
        isFirstNameValid = false;
      } else {
        isFirstNameValid = true;
        firstName.style.border = '';
        errorFirstName.innerHTML = '';
      }

      // Vérification du champ NOM
      if (lastName.value.trim() === '') {
        lastName.style.border = '2px solid #901C1C';
        errorLastName.innerHTML = 'Vous devez écrire votre nom.';
        isLastNameValid = false;
      } else if (lastnameRegExp.test(lastName.value)) {
        errorLastName.innerHTML = 'Le champ nom ne doit pas comporter de chiffres.';
        lastName.style.border = '2px solid #901C1C';
        isLastNameValid = false;
      } else {
        isLastNameValid = true;
        lastName.style.border = '';
        errorLastName.innerHTML = '';
      }

      // Vérification du champ EMAIL
      if (eMail.value.trim() === '') {
        eMail.style.border = '2px solid #901C1C';
        erroreMail.innerHTML = 'Vous devez renseigner votre e-mail.';
        isEmailValid = false;
      } else {
        isEmailValid = true;
        eMail.style.border = '';
        erroreMail.innerHTML = '';
      }

      // Vérification du champ MESSAGE TEXTE
      if (messageTexte.value.trim() === '') {
        messageTexte.style.border = '2px solid #901C1C';
        erroreMessageText.innerHTML = 'Vous devez écrire votre message.';
        isMessageTextValid = false;
      } else {
        isMessageTextValid = true;
        messageTexte.style.border = '';
        erroreMessageText.innerHTML = '';
      }

      // Envoie des données dans la console navigateur
      if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageTextValid) {
        console.log('le prénom est ', firstName.value);
        console.log('le nom est ', lastName.value);
        console.log('le email est ', eMail.value);
        console.log('le texte saisi est ', messageTexte.value);
        closeModal();
        removeData();
        openFenetreConfirmation();
      }
    }

    // Suppression des données saisies pour une nouvelle requête
    function removeData() {
      firstName.value = '';
      lastName.value = '';
      eMail.value = '';
      messageTexte.value = '';
    }

    // Ouverture du message de validation confirmation (apres envoie formulaire)
    function openFenetreConfirmation() {
      fenetreConfirmation.style.display = 'block';
    }

});
