/* ------------------------Ouverture du formulaire ----------------------------*/

const contactMe = document.querySelector('.contact');
const modal = document.querySelector('.fenetre-modale');
const closeBtn = document.querySelector('.closeBtn');


// Lancement de la modale
contactMe.addEventListener('click', lauchModal);

function lauchModal(){
    modal.style.display = "block";
}

//fermeture de la modale

closeBtn.addEventListener('click', closeModal);

function closeModal(){
    modal.style.display ="none";
}


/* ------------------------Traitement du formulaire ----------------------------*/

// Variables
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