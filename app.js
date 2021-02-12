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
    mood: "Happy",
    affection: 10
  }
  let existingKitten = kittens.find(kitten => kitten.name == form.name.value)
  if (!existingKitten) {
    kittens.push(kitten)
  }
  saveKittens()
  loadKittens()
  drawKittens()
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
    let id = kitten.id
    console.log(id)
    template += `
    <div class="card bg-dark m-2">
      <img src="https://robohash.org/${kitten.name}?set=set4" height="150px" class="m-1" alt="Moody Kittens"></img>
      <span>
        <p class="text-light">Name: ${kitten.name}</p>
      </span>
      <span>
        <p class="text-light">Mood: ${kitten.mood}</p>
      </span>
      <span>
        <p class="text-light">Affection: ${kitten.affection}</p>
      </span>
      <span>
        <p class="text-light"> Id: ${kitten.id}</p>
      </span>
      <span class="d-flex space-between">
        <button onclick="pet(${kitten.id})" class="btn-cancel btn-small">Pet</button>
        <button class="btn-small">CatNip</button>
      </span>
    </div>
  `
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
  console.log("Petting the kitten")
  console.log(id)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens").classList.remove("hidden");
  if (kittens) {
    loadKittens()
    drawKittens()
  }
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
