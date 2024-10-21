const participants = Array.from(document.querySelectorAll(".participant"));
const participantsCopy = Array.from([...participants]);
let buddyList = shuffleArray(participants);
console.log(buddyList);

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
  names.forEach((participant, index) => {
    participant.querySelector(".buddy").textContent =
      ` → ${list[index].dataset.name}`;
  });
}

function resetBuddyList(names) {
  if (names.length === 0) return;
  names.forEach((participant) => {
    participant.querySelector(".buddy").textContent = "";
  });
  buddyList = shuffleArray(participants);
}

(function setUpPeoplePage() {
  const randomButton = document.getElementById("randomize");
  const resetButton = document.getElementById("reset");
  const shuffleButton = document.getElementById("buddy");

  if (randomButton === null || resetButton === null || shuffleButton === null)
    return;

  randomButton.addEventListener("click", () => {
    randomNamePicker(participantsCopy);
  });

  resetButton.addEventListener("click", () => {
    resetNamePicker(participants);
    resetBuddyList(participants);
  });

  shuffleButton.addEventListener("click", () => {
    handleBuddyList(buddyList, participants);
  });
})();
