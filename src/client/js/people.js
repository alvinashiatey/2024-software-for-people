const participantsContainer = document.querySelector(".participants");
const participants = Array.from(document.querySelectorAll(".participant"));
const participantsCopy = Array.from([...participants]);
let buddyList = shuffleArray(participants);

function randomNamePicker(names) {
  if (names.length === 0) return;
  const randomName = names[Math.floor(Math.random() * names.length)];
  randomName.classList.add("selected");
  names.splice(names.indexOf(randomName), 1);
}

function resetNamePicker(names) {
  if (names.length === 0) return;
  names.forEach((participant) => {
    participant.classList.remove("selected");
  });
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  let attempts = 0;
  do {
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    attempts++;
  } while (
    shuffled.some((value, index) => value === arr[index]) &&
    attempts < 100
  );
  return shuffled;
}

function handleBuddyList(list, names) {
  if (list.length === 0) return;
  if (names.length === 0) return;
  names.forEach((participant, index) => {
    participant.querySelector(".buddy").textContent =
      ` → ${list[index].dataset.name}`;
  });
  participantsContainer.setAttribute("buddy", "true");
}

function resetBuddyList(names) {
  if (names.length === 0) return;
  if (participantsContainer.getAttribute("buddy") === null) return;
  names.forEach((participant) => {
    participant.querySelector(".buddy").textContent = "";
  });
  buddyList = shuffleArray(participants);
  participantsContainer.removeAttribute("buddy");
}

function createRandomPairings(names) {
  const pairings = [];
  const shuffled = shuffleArray(names);
  for (let i = 0; i < shuffled.length; i += 2) {
    if (i + 1 < shuffled.length) {
      pairings.push([shuffled[i], shuffled[i + 1]]);
    } else {
      pairings[pairings.length - 1].push(shuffled[i]);
    }
  }
  return pairings;
}

function handleRandomPairings(pairings) {
  if (pairings.length === 0) return;
  participantsContainer.innerHTML = "";
  pairings.forEach((pair) => {
    const div = document.createElement("div");
    div.classList.add("pair");
    pair.forEach((participant) => {
      div.appendChild(participant);
    });
    participantsContainer.appendChild(div);
  });
  participantsContainer.setAttribute("pairings", "true");
}

function resetRandomPairings(names) {
  if (names.length === 0) return;
  if (participantsContainer.getAttribute("pairings") === null) return;
  participantsContainer.innerHTML = "";
  names.forEach((participant) => {
    participantsContainer.appendChild(participant);
  });
  participantsContainer.removeAttribute("pairings");
}

(function setUpPeoplePage() {
  const randomButton = document.getElementById("randomize");
  const resetButton = document.getElementById("reset");
  const shuffleButton = document.getElementById("buddy");
  const randomPairingsButton = document.getElementById("pairings");

  if (
    randomButton === null ||
    resetButton === null ||
    shuffleButton === null ||
    randomPairingsButton === null
  )
    return;

  randomButton.addEventListener("click", () => {
    randomNamePicker(participantsCopy);
  });

  resetButton.addEventListener("click", () => {
    resetNamePicker(participants);
    resetBuddyList(participants);
    resetRandomPairings(participants);
  });

  shuffleButton.addEventListener("click", () => {
    resetRandomPairings(participants);
    handleBuddyList(buddyList, participants);
  });

  randomPairingsButton.addEventListener("click", () => {
    resetBuddyList(participants);
    handleRandomPairings(createRandomPairings(participants));
  });
})();
