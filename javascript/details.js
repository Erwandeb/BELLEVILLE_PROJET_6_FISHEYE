// Récupération de l'URL
const url = new URL(window.location);
const id = url.searchParams.get('id');
let totalLike = 0;

// Déclaration des classes
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

// Récupération des données
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

    // Affichage du début de la page
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

    const filtresArticles = document.getElementById('filtres-articles-' + photographer.id);
    for (tag of photographer.tags) {
      filtresArticles.innerHTML += `<span class="photographerTag" data-tag="${tag}">#${tag}</span>`;
    }

    //Affichage des médias
    const mediaData = data.media.filter((media) => media.photographerId === parseInt(id));
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

    // Affichage de chaque photos ou videos du photographe
    const carroussel = document.getElementById('carroussel');
    const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}' tabindex="${media.photographerId}"/>`;
    const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}' tabindex="${media.photographerId}"></video>`;

    carroussel.innerHTML += `
        <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
            ${media.video == undefined ? imageTag : videoTag} 
            <div class="description-image">
            <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
            <div class="prix-like">
               <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€">${media.price} €</p>
               <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
            </div>
            </div>
        </article>`;

/*--------------------------- Incrémentation des likes ------------------------------------------ ------------------------------*/
      carroussel.addEventListener('click', incrementationLike);
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

    function showNewTotalLikes() {
        totalLike++;
        const nbrTotalLikes = document.getElementById('nbrTotalLikes');
        nbrTotalLikes.innerText = totalLike;
    }

/*--------------------------- Fonction de tri dans la liste déroulante ------------------------------*/
    const selectElement = document.querySelector('select');
    selectElement.addEventListener('change', triDetails);

    function triDetails() {
      const carroussel = document.getElementById('carroussel');
      carroussel.innerHTML = '';

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

          const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
          const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;
      
          carroussel.innerHTML += `
                <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
                    ${media.video == undefined ? imageTag : videoTag} 
                    <div class="description-image">
                    <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
                    <div class="prix-like">
                    <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€"  >${media.price} €</p>
                    <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
                    </div>
                    </div>
                </article>`;

        /*------------------------------------- Gestion de la LightBox -------------------------------------------*/           
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

        // Bouton suivant
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


        // Bouton précédent
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

          const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
          const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;
      
        carroussel.innerHTML += `
                <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
                    ${media.video == undefined ? imageTag : videoTag} 
                    <div class="description-image">
                        <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
                        <div class="prix-like">
                        <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€">${media.price} €</p>
                        <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div> 
                    </div>
                    </div>
                </article>`;
    /*------------------------------------- Gestion de la LightBox -------------------------------------------*/           
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

        // Bouton suivant
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


        // Bouton précédent
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

          const imageTag = `<img class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.image}' alt='${media.description}'/>`;
          const videoTag = `<video controls class='carroussel-img' id="carroussel-img-${media.id}" src='photos/${media.photographerId}/${media.video}' alt='${media.description}'></video>`;
      
          carroussel.innerHTML += `
                <article class="carroussel-card" tabindex="${media.photographerId}" aria-label ="${media.description}">
                    ${media.video == undefined ? imageTag : videoTag} 
                    <div class="description-image">
                    <p tabindex="${media.photographerId}" aria-label=" le titre de l'oeuvre est ${media.titre}">${media.titre}</p>
                    <div class="prix-like">
                    <p tabindex="${media.photographerId}" aria-label=" le prix de cette photo est ${media.price}€">${media.price} €</p>
                    <div class="like-compteur" tabindex="${media.photographerId}"> <span class="likeCounter" id="like-counter-${media.id}" aria-label="il à été aimé ${media.likes} fois ">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
                    </div>
                    </div>
                </article>`;
            
    /*------------------------------------- Gestion de la LightBox -------------------------------------------*/           
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

    // Bouton suivant
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


    // Bouton précédent
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

/*------------------------------------- Gestion de la LightBox ------------------------------------------------------------------*/
    // TO DO A copier dans la section TRI !

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

    // Bouton suivant
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


    // Bouton précédent
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


/*---------------------------------------------- Affichage du Footer -------------------------------------------------------------*/
    const footer = document.querySelector('footer');
    footer.innerHTML += `
        <div class="compte-like">
            <span class="like" id="nbrTotalLikes" tabindex="${photographer.id} aria-label="Ce photographe a été aimé ${photographer.price} fois">${totalLike}</span> <i class="fas fa-heart"></i>
        </div>
        <p tabindex="${photographer.id}" aria-label="Le prix de ce photographe est ${photographer.price}€">${photographer.price} €/jour</p>`;


/*------------------------ Gestion du formulaire de contact ----------------------------------------------------------------------------*/

    const contactMe = document.querySelector('.contact');
    const modal = document.querySelector('.fenetre-modale');
    const closeBtn = document.getElementById('closeBtn');
    const formIntroduction = document.getElementById('formIntroduction');

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

    function removeData() {
      firstName.value = '';
      lastName.value = '';
      eMail.value = '';
      messageTexte.value = '';
    }

    function openFenetreConfirmation() {
      fenetreConfirmation.style.display = 'block';
    }

});
