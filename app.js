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
  document.getElementById("resetButton").classList.remove("hidden");
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
        <span class="d-flex justify-content-center mt-1">
          <button class="joke-button" onclick="catJoke('${kitten.id}')">Cat Joke</button>
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

function catJoke(id) {
  let kitten = findKittenById(id)
  let name = kitten.name
  let alertMessage = ""
  let like = Math.random()
  let joke = Math.round(Math.random() * 20)
  let jokeText = ""
  let x = 0.5
  console.log(joke)
  if (joke == 20) {
    jokeText = "What dog keeps the best time?\nA watch dog!\nOoops, that was a dog joke...\n\n"
    kitten.affection = 0
    alertMessage = jokeText + name + " thought that was an OFFENSIVE cat joke\nand NEVER wants to talk to you again!!!!!"
  } else if (joke == 19) {
    jokeText = "Why was the cat so agitated?\nIt was in a bad MEWD!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 18) {
    jokeText = "What do you call a cat who loves to bowl?\nAn ALLEY cat!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 17) {
    jokeText = "What do cats love to do in the morning?\nRead the MEWspaper!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 16) {
    jokeText = "How is cat food sold?\nUsually PURR the can!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 15) {
    jokeText = "Curiosity killed the cat.\nBut for a while I was a suspect!\n\n"
    kitten.affection = 0
    alertMessage = jokeText + name + " thought that was an OFFENSIVE cat joke\nand NEVER wants to talk to you again!!!!!"
  } else if (joke == 14) {
    jokeText = "What did the cat say when it was confused?\nI'm PURR-plexed!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 13) {
    jokeText = "what is a cats favorite dessert?\nChocolate MOUSE!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 12) {
    jokeText = "Where does a cat go when it loses its tail?\nTo a re-TAIL store!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 11) {
    jokeText = "What has two legs and is red all over?\nHalf a cat!\n\n"
    kitten.affection = 0
    alertMessage = jokeText + name + " thought that was an OFFENSIVE cat joke\nand NEVER wants to talk to you again!!!!!"
  } else if (joke == 10) {
    jokeText = "What do you call a cat in a station wagon?\nA car-pet!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 9) {
    jokeText = "What has four legs and flies?\nA dead cat!\n\n"
    kitten.affection = 0
    alertMessage = jokeText + name + " thought that was an OFFENSIVE cat joke\nand NEVER wants to talk to you again!!!!!"
  } else if (joke == 8) {
    jokeText = "How do cats end a fight?\nThey HISS and make up!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 7) {
    jokeText = "Why cant cats play poker in the jungle?\nToo many CHEETAHS!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 6) {
    jokeText = "What is a cats favorite movie?\nThe Sound of MEWsic!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  }else if (joke == 5) {
    jokeText = "Headline: Dead Cat Discovered on Mars?\nLooks like Curiosity killed the cat!\n\n"
    jokeText = "The only good cat is a dead cat!\n\n"
    kitten.affection = 0
    alertMessage = jokeText + name + " thought that was an OFFENSIVE cat joke\nand NEVER wants to talk to you again!!!!!"
  } else if (joke == 4) {
    jokeText = "What is a cats favorite magazine?\nGood MOUSEkeeping!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 3) {
    jokeText = "Why did the cat wear a fancy dress?\nShe was FELINE fine!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 2) {
    jokeText = "What is a cats favorite color?\nPURR-ple!!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 1) {
    jokeText = "Why was the cat afraid of the tree?\nBecause of its BARK!\n\n"
    if (like > x){
      kitten.affection += 3
      alertMessage = jokeText +name + " thought that was a good cat joke!"
    } else {
      kitten.affection -= 3
      alertMessage = jokeText + name + " thought that was a bad cat joke!"
    }
  } else if (joke == 0) {
    jokeText = "The only good cat is a dead cat!\n\n"
    kitten.affection = 0
    alertMessage = jokeText + name + " thought that was an OFFENSIVE cat joke\nand NEVER wants to talk to you again!!!!!"
  }
  console.log(kitten.affection)
  if (kitten.affection > 10) {
    kitten.affection = 10
  }
  setKittenMood(kitten)
  saveKittens()
  drawKittens()
  alert(alertMessage)
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection == 0) {
    kitten.mood = "Gone";
  }
    else if (kitten.affection <= 3) {
      kitten.mood = "Angry";
    }
    else if (kitten.affection <= 5) {
      kitten.mood = "Tolerant";
    }
    else {
      kitten.mood = "Happy";
    }
}

function getStarted() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("kittens").classList.remove("hidden");
  document.getElementById("addKitten").classList.remove("hidden");
  document.getElementById("returnButton").classList.remove("hidden");
  if (kittens) {
    loadKittens()
    drawKittens()
  }
}

function backToIntro() {
  document.getElementById("welcome").classList.remove("hidden");
  document.getElementById("kittens").classList.add("hidden");
  document.getElementById("addKitten").classList.add("hidden");
  document.getElementById("returnButton").classList.add("hidden");
}

function resetKittens() {
  kittens = []
  saveKittens()
  document.getElementById("resetButton").classList.add("hidden");
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
function checkForKittens() {
  loadKittens()
  if (kittens.length == 0) {
    document.getElementById("resetButton").classList.add("hidden");
  }
}
