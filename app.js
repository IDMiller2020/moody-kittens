/** THINGS I'D LIKE TO ADD:
 *      Lock out or hide "Add Name" until after Play Game is clicked.
 *      "Back to Intro" button.
 * 
 */


/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5
  }
  let existingKitten = kittens.find(kitten => kitten.name == form.name.value)
  if (!existingKitten) {
    kittens.push(kitten)
    saveKittens()
    loadKittens()
    drawKittens()
  } else {
      alert("You can not add another kitten with the same name as an existing kitten.")
  }
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  kittens.forEach(kitten => {
    if (kitten.affection > 0){
      template += `
      <div class="card bg-dark m-2">
        <div id="glow" class="kitten ${kitten.mood.toLowerCase()}">
          <img src="https://robohash.org/${kitten.name}?set=set4" height="150px" alt="Moody Kittens"></img>
        </div>
        <span class="d-flex">
          <p class="text-light bold">Name: &nbsp</p>
          <p class="text-light">${kitten.name}</p>
        </span>
        <span class="d-flex">
          <p class="text-light bold">Mood: &nbsp</p>
          <p class="text-light">${kitten.mood}</p>
        </span>
        <span class="d-flex">
          <p class="text-light bold">Affection: &nbsp</p>
          <p class="text-light">${kitten.affection}</p>
        </span>
        <span class="d-flex space-between">
          <button onclick="pet('${kitten.id}')" class="btn-cancel btn-small">Pet</button>
          <button onclick="catnip('${kitten.id}')" class="btn-small">CatNip</button>
        </span>
      </div>
    `
    }  else {
      template += `
      <div class="card bg-dark m-2">
        <div id="glow" class="kitten gone">
          <img src="https://robohash.org/${kitten.name}?set=set4" height="150px" alt="Moody Kittens"></img>
        </div>
        <span class="d-flex">
          <p class="kitten gone bold">Name: &nbsp</p>
          <p class="kitten gone">${kitten.name}</p>
        </span>
        <span>
          <p class="kitten gone bold">Gone, Ran Away!</p>
        </span>
      </div>
      `
    }
  })
document.getElementById("kittens").innerHTML = template
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id)
  if (kitten.affection > 0) {
    let i = Math.random()
    if (i > 0.7){
      if (kitten.affection < 10){
        kitten.affection ++
      }
    }  else {
        if (kitten.affection > 0){
          kitten.affection --
        }
    }
    setKittenMood(kitten)
    saveKittens()
    drawKittens()
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  if (kitten.affection > 0) {
    if (kitten.affection < 5) {
      kitten.mood = "Tolerant"
      kitten.affection = 5
      setKittenMood(kitten)
      saveKittens()
      drawKittens()
    }
  }
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  console.log(kitten.mood)
  console.log(kitten.affection)
  if (kitten.affection == 0) {
    console.log("Gone")
    kitten.mood = "Gone";

  }
    else if (kitten.affection <= 3) {
      console.log("Angry")
      kitten.mood = "Angry";
      
    }
    else if (kitten.affection <= 5) {
      console.log("Tolerant")
      kitten.mood = "Tolerant";
      
    }
    else {
      console.log("Happy")
      kitten.mood = "Happy";
      
    }
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens").classList.remove("hidden");
  document.getElementById("addKitten").classList.remove("hidden");
  document.getElementById("returnButton").classList.remove("hidden");
  if (kittens) {
    loadKittens()
    drawKittens()
  }
}

function backToIntro() {
  location.reload()
}

function resetKittens() {
  kittens = []
  saveKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
