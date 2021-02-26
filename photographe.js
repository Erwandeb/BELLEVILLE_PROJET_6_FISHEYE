// Partie MAIN 
`<main>
<div class="presentation">
    <h2>${photographer.name}</h2>
    <h3>${photographer.city}, ${photographer.country}</h3>
    <blockquote>${photographer.tagline}</blockquote>

    <div class="filtres-articles">
        <button class = "filterDiv ${photographer.tags[0]}" type="button">#${photographer.tags[0]}</button>
        <button class = "filterDiv ${photographer.tags[1]}" type="button">#${photographer.tags[1]}</button>
        <button class = "filterDiv ${photographer.tags[2]}" type="button">#${photographer.tags[2]}</button>
        <button class = "filterDiv ${photographer.tags[3]}" type="button">#${photographer.tags[3]}</button>
    </div>
</div>

<a href="mimiKeel.html"><img src="photos/Photographers-ID-Photos/${photographer.portrait}"   alt="${photographer.description}"/>/></a>
</main>
`
     
// Partie Carroussel
`
<div class="carroussel">

            <div class="carroussel-card">
                <img class="carroussel-img" src="photos/Mimi/Animals_Rainbow.jpg" alt=" Un martin pecheur sur une branche"/>
                <div class="description-image">
                    <p>Arc-en-ciel</p>
                    <div class="prix-like">
                        <p>70 €</p>
                       <div class="like-compteur"> <span class="like1">12</span><span class="heart1"><i class="fas fa-heart"></i></span></div>
                    </div>
                </div>
            </div>

            <div class="carroussel-card">
                <img  class="carroussel-img" src="photos/Mimi/Travel_Lonesome.jpg" alt=" Un humain au sommet d'une montagne"/>
                <div class="description-image">
                    <p>Solitude</p>
                    <div class="prix-like">
                        <p>70 €</p>
                        <div class="like-compteur"> <span class="like2">12</span><span class="heart2"><i class="fas fa-heart"></i></span></div>
                    </div>
                </div>
            </div>

            <div class="carroussel-card">
                <img class="carroussel-img" src="photos/Mimi/Event_SeasideWedding.jpg" alt=" Une grande table avec le couvert dressé pour un mariage"/>
                <div class="description-image">
                    <p>Mariage à la mer</p>
                    <div class="prix-like">
                        <p>70 €</p>
                        <div class="like-compteur"> <span class="like3">12</span><span class="heart3"><i class="fas fa-heart"></i></span></div>
                    </div>
                </div>
            </div>

            <div class="carroussel-card">
                <img class="carroussel-img" src="photos/Mimi/Portrait_Background.jpg" alt=" Une jeune fille en noir et blanc"/>
                <div class="description-image">
                    <p>Arc-en-ciel</p>
                    <div class="prix-like">
                        <p>70 €</p>
                        <div class="like-compteur"> <span class="like4">12</span><span class="heart4"><i class="fas fa-heart"></i></span></div>
                    </div>
                </div>
            </div>

            <div class="carroussel-card">
                <img  class="carroussel-img" src="photos/Mimi/Event_PintoWedding.jpg" alt=" Une photo de mariage en plein été"/>
                <div class="description-image">
                    <p>Arc-en-ciel</p>
                    <div class="prix-like">
                        <p>70 €</p>
                        <div class="like-compteur"> <span class="like5">12</span><span class="heart5"><i class="fas fa-heart"></i></span></div>
                    </div>
                </div>
            </div>

            <div class="carroussel-card">
                <img class="carroussel-img" src="photos/Mimi/Portrait_Wednesday.jpg" alt=" Une enfant qui se tient accroupie pour reflechir"/>
                <div class="description-image">
                    <p>Arc-en-ciel</p>
                    <div class="prix-like">
                        <p>70 €</p>
                        <div class="like-compteur"> <span class="like6">12</span><span class="heart6"><i class="fas fa-heart"></i></span></div>
                    </div>
                </div>
            </div>

        </div>`
        
        
 // LightBox 

  `
  div class="window-slider">
            <div class="slider">
                
                <figure class="lightBox-img" id = "lastClone">
                    <img  src="photos/Mimi/Portrait_Wednesday.jpg" alt=" Une enfant qui se tient accroupie pour reflechir"/>
                    <div class="description-image">
                        <figcaption>Arc-en-ciel</figcaption>
                    </div>
                </figure> 

                <figure class="lightBox-img">
                    <img  src="photos/Mimi/Animals_Rainbow.jpg" alt=" Un martin pecheur sur une branche"/>
                    <div class="description-image">
                        <figcaption>Arc-en-ciel</figcaption>
                    </div>
                </figure>
    
                <figure class="lightBox-img">
                    <img  src="photos/Mimi/Travel_Lonesome.jpg" alt=" Un martin pecheur sur une branche"/>
                    <div class="description-image">
                        <figcaption>Solitude</figcaption>
                    </div>
                </figure>
    
                <figure class="lightBox-img">
                    <img src="photos/Mimi/Event_SeasideWedding.jpg" alt=" Un martin pecheur sur une branche"/>
                    <div class="description-image">
                        <figcaption>Mariage à la mer</figcaption>
                    </div>
                </figure>
    
                <figure class="lightBox-img">
                    <img  src="photos/Mimi/Portrait_Background.jpg" alt=" Une jeune fille en noir et blanc"/>
                    <div class="description-image">
                        <figcaption>Arc-en-ciel</figcaption>
                    </div>
                </figure>
    
                <figure class="lightBox-img">
                    <img  src="photos/Mimi/Event_PintoWedding.jpg" alt=" Une photo de mariage en plein été"/>
                    <div class="description-image">
                        <figcaption>Arc-en-ciel</figcaption>
                    </div>
                </figure>
    
                <figure class="lightBox-img">
                    <img  src="photos/Mimi/Portrait_Wednesday.jpg" alt=" Une enfant qui se tient accroupie pour reflechir"/>
                    <div class="description-image">
                        <figcaption>Arc-en-ciel</figcaption>
                    </div>
                </figure> 

                <figure class="lightBox-img"  id ="firstClone" >
                    <img  src="photos/Mimi/Animals_Rainbow.jpg" alt=" Un martin pecheur sur une branche"/>
                    <div class="description-image">
                        <figcaption>Arc-en-ciel</figcaption>
                    </div>
                </figure>
            </div>
        </div>
  `


  // Fenetre modale 

  `
  <div class="fenetre-modale">
  <div class="formulaire">
      <div class="titre-nom">
          <h1>Contactez-moi</h1>
          <h2>Mimi Keel</h2>
          <div class="closeBtn"><img  src="photos/svg/cross white.svg" alt=" Croix pour fermer la modale"/></div>
      </div>

      <form id ="form" action="#">

          <label for="firstname">Prénom </label><div class="errorFirstName"></div>
          <input type="text" id="firstname" name="firstname">
          
          <label for="lastname">Nom  </label><div class="errorlastName"></div>
          <input type="text" id="lastname" name="lastname">
          
          <label for="email">Email  </label><div class="erroreMail"></div>
          <input type="email" id="email" name="email">

          <label for="message">Message  </label><div class="erroreMessageText"></div>
          <textarea name="message" id="message"></textarea>

          <button class="soumission" type ="submit">Envoyer</button>

      </form>
</div>
</div>
  `

    
   // Footer 
   `
   <footer>
   <div class="compte-like">
       <span class="like">297 081 </span><i class="fas fa-heart"></i>
   </div>
   <p>300€/jour</p>
</footer>
   `
    
   