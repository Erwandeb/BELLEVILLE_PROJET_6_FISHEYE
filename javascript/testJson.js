// Declaration variables JSON
const header = document.querySelector('header');
const requestURL ="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json"
const request = new XMLHttpRequest()

request.open('GET', requestURL);

request.responseType = "Json";
request.send();
request.onload = function(){
   const photographer = request.response;
   showPhotographer(photographer);
}



function photographer(){
    const myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['name'];
    header.appendChild(myH1);
}