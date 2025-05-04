document.addEventListener("DOMContentLoaded", () => {
  // Learn More Button Fix
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      window.open("https://www.geeksforgeeks.org/petersons-algorithm-in-process-synchronization/", "_blank");
    });
  }

  // Cursor trail movement
  const cursorTrail = document.getElementById('cursorTrail');
  document.addEventListener('mousemove', (e) => {
    if (cursorTrail) {
      cursorTrail.style.top = `${e.clientY}px`;
      cursorTrail.style.left = `${e.clientX}px`;
    }
  });
});

// General Peterson's Algorithm Variables
let flag = [false, false];
let turn = 0;

// Simulation Logic
async function startSimulation() {
  const num = parseInt(document.getElementById("numProcesses").value);
  const errorMsg = document.getElementById("errorMsg");

  if (isNaN(num) || num !== 2) {
    errorMsg.textContent = "Please enter exactly 2 processes before running the simulation.";
    return;
  }

  errorMsg.textContent = ""; // Clear any previous error

  const status = document.getElementById('statusArea');
  status.textContent = 'Simulation running...';

  for (let i = 0; i < 2; i++) {
    let other = 1 - i;
    logMessage(`Process ${i} is trying to enter critical section.`);
    updateProcessUI(i, "Trying");
    flag[i] = true;
    turn = other;

    updateProcessUI(i, "Waiting");
    logMessage(`Process ${i} is waiting...`);
    await sleep(1000);

    while (flag[other] && turn === other) {
      await sleep(500);
    }

    updateProcessUI(i, "Critical Section");
    logMessage(`Process ${i} entered critical section.`);
    await sleep(2000);

    flag[i] = false;
    updateProcessUI(i, "Idle");
    logMessage(`Process ${i} exited critical section.`);
  }

  status.textContent = 'Simulation complete.';
}

// Real-World Analogy
function aliceWantsToCook() {
  flag[0] = true;
  turn = 1;
  checkCooking();
}

function bobWantsToCook() {
  flag[1] = true;
  turn = 0;
  checkCooking();
}

function checkCooking() {
  if (flag[0] && (!flag[1] || turn === 0)) {
    document.getElementById("aliceBubble").innerText = "I am cooking!";
    document.getElementById("bobBubble").innerText = "I will wait.";
  } else if (flag[1] && (!flag[0] || turn === 1)) {
    document.getElementById("bobBubble").innerText = "I am cooking!";
    document.getElementById("aliceBubble").innerText = "I will wait.";
  }
  setTimeout(resetThoughtBubbles, 2000);
}

function resetThoughtBubbles() {
  document.getElementById("aliceBubble").innerText = "I want to cook!";
  document.getElementById("bobBubble").innerText = "I want to cook!";
  flag = [false, false];
}

// UI Helpers
function logMessage(msg) {
  const logOutput = document.getElementById('logOutput');
  logOutput.innerHTML += `<div>> ${msg}</div>`;
  logOutput.scrollTop = logOutput.scrollHeight;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleAbout() {
  const about = document.getElementById("about");
  const faq = document.getElementById("faqSection");

  if (faq) faq.style.display = "none";
  if (about) {
    about.style.display = "block";
    about.scrollIntoView({ behavior: "smooth" });
  }
}

function goHome() {
  window.location.href = "index.html";
}

function goToRealWorld() {
  window.location.href = "realworld.html";
}

function switchCodeLanguage() {
  const selected = document.getElementById("languageSelector").value;
  ['python', 'c', 'cpp', 'java'].forEach(lang => {
    const el = document.getElementById(`code-${lang}`);
    if (el) el.style.display = (lang === selected) ? 'block' : 'none';
  });
}

// Single version of createProcesses
function createProcesses() {
  const num = parseInt(document.getElementById("numProcesses").value);
  const errorMsg = document.getElementById("errorMsg");
  const processContainer = document.getElementById("process-container");

  errorMsg.textContent = ""; // clear old message
  processContainer.innerHTML = ""; // reset process container

  if (isNaN(num) || num !== 2) {
    errorMsg.textContent = "Error: Peterson's Algorithm supports only 2 processes.";
    return;
  }

  // Continue with creating the simulation if input is valid
  for (let i = 0; i < 2; i++) {
    const div = document.createElement("div");
    div.className = "process";
    div.id = `process-${i}`; // <-- Add this line to assign unique IDs
    div.textContent = "Process " + i;
    processContainer.appendChild(div);
  }
}


// Unified version of updateProcessUI
function updateProcessUI(i, state) {
  const el = document.getElementById(`process-${i}`);
  if (!el) return;

  el.className = "process-button"; // reset

  if (state === "Trying") el.classList.add("trying");
  else if (state === "Waiting") el.classList.add("waiting");
  else if (state === "Critical Section") el.classList.add("critical");
  else el.classList.add("idle");
}

function resetSimulation() {
  document.getElementById('process-container').innerHTML = '';
  document.getElementById('logOutput').innerHTML = '';
  document.getElementById('statusArea').textContent = '';
  document.getElementById('numProcesses').value = '';
  document.getElementById('errorMsg').textContent = ''; // 🔧 Fix: Clear error
  flag = [false, false];
  turn = 0;
}

function aliceWantsToCook() {
  const alice = document.querySelector('.alice-container');
  const bob = document.querySelector('.bob-container');

  const aliceBubble = document.getElementById('aliceBubble');
  const bobBubble = document.getElementById('bobBubble');

  // Reset pop classes
  alice.classList.remove('pop');
  bob.classList.remove('pop');

  setTimeout(() => {
    alice.classList.add('pop');
  }, 10);

  // Update thought bubbles
  aliceBubble.textContent = "I will cook!";
  bobBubble.textContent = "I will wait!";
}

function bobWantsToCook() {
  const alice = document.querySelector('.alice-container');
  const bob = document.querySelector('.bob-container');

  const aliceBubble = document.getElementById('aliceBubble');
  const bobBubble = document.getElementById('bobBubble');

  // Reset pop classes
  alice.classList.remove('pop');
  bob.classList.remove('pop');

  setTimeout(() => {
    bob.classList.add('pop');
  }, 10);

  // Update thought bubbles
  bobBubble.textContent = "I will cook!";
  aliceBubble.textContent = "I will wait!";
}

function toggleRaceCondition() {
  const raceConditionContent = document.getElementById('raceConditionContent');
  if (raceConditionContent.style.display === 'none') {
    fetch('race.html')
      .then(response => response.text())
      .then(data => {
        raceConditionContent.innerHTML = data;  // Load the content from race.html
        raceConditionContent.style.display = 'block';  // Show the content
      })
      .catch(error => {
        console.error('Error loading race condition content:', error);
      });
  } else {
    raceConditionContent.style.display = 'none';  // Hide the content
  }
}
function toggleRaceCondition() {
  const raceConditionContent = document.getElementById('raceConditionContent');
  if (raceConditionContent.style.display === 'none' || raceConditionContent.style.display === '') {
    // Load the race condition simulation from race.html
    fetch('race.html')
      .then(response => response.text())
      .then(data => {
        raceConditionContent.innerHTML = data;  // Load the content from race.html
        raceConditionContent.style.display = 'block';  // Show the content
        startRaceConditionSimulation(); // Start the race condition simulation after loading
      })
      .catch(error => {
        console.error('Error loading race condition content:', error);
      });
  } else {
    // Hide the race condition content
    raceConditionContent.style.display = 'none';
  }
}
function openRacePage() {
  window.open("race.html", "_blank");
}


function toggleRaceCondition() {
  const raceConditionFrame = document.getElementById('raceConditionFrame');
  
  if (raceConditionFrame.style.display === 'none') {
      // Show the race condition simulation
      raceConditionFrame.style.display = 'block';
  } else {
      // Hide the race condition simulation
      raceConditionFrame.style.display = 'none';
  }
}
