// Récupération de l'URL
const url = new URL(window.location);
const id = url.searchParams.get("id");


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
    constructor(id, photographerId, image, video, titre, tags, likes, date, price ){
        this.id = id;
        this.photographerId = photographerId;
        this.image = image;
        this.video = video;
        this.titre = titre;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
}

// Récupération des données 
  fetch('javascript/data.json')
    .then((response) => response.json())
    .then(function (data) {
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
      mainDivDetail.innerHTML +=`
        <main id="mainDivDetail">
            <div class="presentation">
                <h2 tabindex="3">${photographer.name}</h2>
                <h3 tabindex="4">${photographer.city}, ${photographer.country}</h3>
                <blockquote tabindex="5">${photographer.tagline}</blockquote>
      
                <div id="filtres-articles-${photographer.id}" tabindex="5"></div>
            </div>

        <img src="photos/Photographers-ID-Photos/${photographer.portrait}" alt="${photographer.description}" tabindex="6"/>
        </main>`;

        const filtresArticles = document.getElementById("filtres-articles-"+photographer.id);
        for(tag of photographer.tags){
        filtresArticles.innerHTML+= `<span class="photographerTag" data-tag="${tag}">#${tag}</span>`;
        };
    

    

        //Affichage des médias
      const mediaData = data.media.filter((media) => media.photographerId === parseInt(id));
      for (data of mediaData) {
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
        )

        // Affichage de chaque photos ou videos du photographe
       const carroussel = document.getElementById('carroussel');
       carroussel.innerHTML += `
        <article class="carroussel-card" tabindex="${media.photographerId}">
            <img class='carroussel-img' src='photos/${media.photographerId}/${media.image}' alt=''/>  
            <div class="description-image">
            <p>${media.titre}</p>
            <div class="prix-like">
               <p>${media.price} €</p>
               <div class="like-compteur"> <span class="likeCounter" id="like-counter-${media.id}">${media.likes}</span><span><i class="fas fa-heart" id="like-media-${media.id}"></i></span></div>
            </div>
            </div>
        </article>`;


        // Fonction total like
        // il faut afficher l'Array avant d'utiliser la fonction
    
     

     
       //console.log("le resultat est " , sum);
     


    
        // Tri par liste déroulante 
        const selectElement = document.querySelector('select');
        selectElement.addEventListener('change', triDetails)
        let mediaList = [];

        function triDetails() {
            mediaList.push(media);
            console.log(mediaList);

            if(this.selectedIndex === 0 ){
                mediaList.push(media.likes);
                mediaList.sort() 
            }

            else if(this.selectedIndex === 1 ){
                mediaList.push(media.date);
                mediaList.sort() 
            
            }

            else if(this.selectedIndex === 2 ){
                mediaList.push(media.titre);
                mediaList.sort() 
            
            };
        }
    

    
    // Incrémentation des likes par images
    carroussel.addEventListener('click', incrementationLike); 
    carroussel.addEventListener('keypress',incrementationLike )
    function incrementationLike(e) {
        if (e.target && e.target.id == `like-media-${media.id}`){
          const likeCounter = document.getElementById(`like-counter-${media.id}`);
          const likeValue = parseInt(likeCounter.innerHTML);
          let nbrLikes = likeValue + 1;
          likeCounter.innerText = nbrLikes;
        }

      };

    };
    
  




    // Affichage du Footer
    const footer = document.querySelector("footer");
    footer.innerHTML +=`
        <div class="compte-like">
            <span class="like">1</span><i class="fas fa-heart"></i>
        </div>
        <p>${photographer.price} €/jour</p>`
      

    /*------------------------ Gestion du formulaire de contact ----------------------------*/

    const contactMe = document.querySelector('.contact');
    const modal = document.querySelector('.fenetre-modale');
    const closeBtn = document.getElementById('closeBtn');
    const formIntroduction = document.getElementById('formIntroduction');
    
    console.log(contactMe);
    formIntroduction.innerHTML +=`
        <div>
            <h1>Contactez-moi</h1>
            <h2>${photographer.name}</h2>
        </div>
    `;

    // Lancement de la modale
    contactMe.addEventListener('click', lauchModal);
    function lauchModal(){
        modal.style.display = "block";
    }

    //fermeture de la modale
    closeBtn.addEventListener('click', closeModal);
    /*
    window.addEventListener("keydown", echapIsPressed);

    function echapIsPressed(key) {
        if(key.keycode =="27"){
            closeModal;
        }
    }
    */
    function closeModal(){
        modal.style.display ="none";
    }

    // Variables du formulaire
    const firstName = document.getElementById('firstname');
    const lastName = document.getElementById('lastname');
    const eMail = document.getElementById('email');
    const messageTexte = document.getElementById('message');
    const form = document.getElementById('form');
    let firstnameRegExp = new RegExp ('[0-9]');
    let lastnameRegExp = new RegExp ('[0-9]');
    const fenetreConfirmation = document.querySelector('.fenetre-validation-formulaire');

    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isEmailValid = false;
    let isMessageTextValid = false

    const errorFirstName = document.querySelector('.errorFirstName');
    const errorLastName =document.querySelector('.errorlastName');
    const erroreMail = document.querySelector('.erroreMail');
    const erroreMessageText = document.querySelector('.erroreMessageText');

    form.addEventListener('submit', validate)

    function validate(e){
    e.preventDefault();

    // Vérification du champ PRENOM
    if(firstName.value.trim() == ""){
        firstName.style.border = "2px solid #901C1C";
        errorFirstName.innerHTML = "Vous devez écrire votre prénom.";
        isFirstNameValid = false;
    } else if (firstnameRegExp.test(firstName.value)){
        errorFirstName.innerHTML = "Le champ prénom ne doit pas comporter de chiffres.";
        firstName.style.border = "2px solid #901C1C";
        isFirstNameValid = false;
    }
    else {
        isFirstNameValid = true;
        firstName.style.border = "";
        errorFirstName.innerHTML = "";
    }

    // Vérification du champ NOM
    if(lastName.value.trim() === ""){
        lastName.style.border = "2px solid #901C1C";
        errorLastName.innerHTML = "Vous devez écrire votre nom.";
        isLastNameValid = false;
    } else if (lastnameRegExp.test(lastName.value)){
        errorLastName.innerHTML = "Le champ nom ne doit pas comporter de chiffres.";
        lastName.style.border = "2px solid #901C1C";
        isLastNameValid = false;
    }
    else {
        isLastNameValid = true;
        lastName.style.border = "";
        errorLastName.innerHTML = "";
    }

    // Vérification du champ EMAIL
    if(eMail.value.trim() === ""){
        eMail.style.border = "2px solid #901C1C";
        erroreMail.innerHTML = "Vous devez renseigner votre e-mail.";
        isEmailValid = false;
    } else {
        isEmailValid = true;
        eMail.style.border = "";
        erroreMail.innerHTML = "";
    }

    // Vérification du champ MESSAGE TEXTE
    if(messageTexte.value.trim() === ""){
        messageTexte.style.border = "2px solid #901C1C";
        erroreMessageText.innerHTML = "Vous devez écrire votre message.";
        isMessageTextValid = false;
    } else {
        isMessageTextValid = true;
        messageTexte.style.border = "";
        erroreMessageText.innerHTML = "";
    }

    if(  isFirstNameValid && isLastNameValid &&  isEmailValid && isMessageTextValid){

        closeModal();
        removeData();
        openFenetreConfirmation()

    }
    };

    function removeData(){
        firstName.value ="";
        lastName.value="";
        eMail.value="";
        messageTexte.value ="";
    }

    function openFenetreConfirmation(){
        fenetreConfirmation.style.display ="block";
    }
    
    });

 