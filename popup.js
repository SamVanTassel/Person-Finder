// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });
const body = document.querySelector('body');
const button = document.querySelector('.submit');
button.addEventListener('click', async (e) => {
  const personName = document.querySelector('.nameInput').value;
  const jsonAgeData = await fetch(`https://api.agify.io/?name=${personName}`);
  const jsonGenderData = await fetch(`https://api.genderize.io/?name=${personName}`);
  const ageData = await jsonAgeData.json();
  const genderData = await jsonGenderData.json();
  
  let ageCategory;
  const age = ageData.age;
  if (age < 12) ageCategory = 'child';
  else if (age < 22) ageCategory = 'young-adult';
  else if (age < 50) ageCategory = 'adult';
  else ageCategory = 'elderly';
  const emotions = ['joy', 'neutral', 'surprise'];
  const currentEmotion = emotions[Math.floor(Math.random() * 3)];
  console.log(currentEmotion);
  const jsonPhotoData = await fetch(`https://api.generated.photos/api/v1/faces?gender=${genderData.gender}&age=${ageCategory}&api_key=2ZwVn9McButhz1Ul2_742Q`);

  const photoData = await jsonPhotoData.json();
  console.log(photoData);
  const randomPhotoIndex = Math.floor(Math.random() * 10)
  const photo = photoData.faces[randomPhotoIndex].urls[3][256];
  
  const personDescription = document.createElement('p');
  personDescription.innerHTML = `There is a ${genderData.probability * 100}% chance that ${personName} is a ${age} year old ${genderData.gender}. They almost certainly look like this:`;
  body.appendChild(personDescription);
  const personPhoto = document.createElement('img');
  personPhoto.setAttribute("src", photo);
  body.appendChild(personPhoto);
});

// infant, child, young-adult, adult, elderly


// The body of this function will be executed as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.html.style.backgroundColor = color;
//   });
// }

// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));
