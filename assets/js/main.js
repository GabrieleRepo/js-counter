import { Counter } from "./counter.js";
import { askNumber } from "./helpers.js";

function renderCounterUI() {
  // Creates and renders the counter UI inside the #my-app element
  const appBody = document.querySelector("#my-app"); // main container

  // Insert the main counter section at the beginning of #my-app
  appBody.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="container my-5 py-3">

      <h1 class="text-center mt-2 fw-bold text-white">COUNTER</h1>

      <!-- Card del contatore -->
      <div class="row my-4">
        <div class="offset-1 col-10 offset-md-1 col-md-10 offset-lg-3 col-lg-6 d-grid">
          <div class="card text-center shadow custom-card">
            <div class="card-body display-1" id="counter">0</div>
          </div>
        </div>
      </div>

      <!-- Row dei bottoni principali -->
      <div class="row mt-3 flex-column flex-lg-row align-items-center justify-content-center">
        <div class="col-10 col-lg-2 mb-2 mb-lg-0 gx-lg-2 d-grid order-3 order-lg-1">
          <button class="btn btn-lg btn-danger fw-bold text-dark text-nowrap" type="button" id="decrease-button">
            <i class="bi bi-dash-circle me-1"></i> Decrease
          </button>
        </div>

        <div class="col-10 col-lg-2 mb-2 mb-lg-0 gx-lg-2 d-grid order-2">
          <button class="btn btn-lg btn-warning fw-bold" type="button" id="reset-button">
            <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
          </button>
        </div>

        <div class="col-10 col-lg-2 mb-2 mb-lg-0 gx-lg-2 d-grid order-1 order-lg-3">
          <button class="btn btn-lg btn-success fw-bold text-dark" type="button" id="increase-button">
            <i class="bi bi-plus-circle me-1"></i> Increase
          </button>
        </div>
      </div>

      <!-- Row Delta -->
      <div class="row mt-lg-3 flex-column flex-lg-row align-items-center justify-content-center">
        <div class="col-10 col-lg-2 mb-2 mb-lg-0 gx-lg-2 d-grid">
          <button class="btn btn-lg btn-info fw-bold text-dark text-nowrap px-0" type="button" id="delta-button">
            <i class="bi bi-pencil me-1"></i> Delta:
            <span class="badge text-bg-dark ms-2" id="delta-value"></span>
          </button>
        </div>
      </div>

    </div>
    `,
  );

  // Insert the instructions section at the end of #my-app
  appBody.insertAdjacentHTML(
    "beforeend",
    `
      <div class="container my-5">
      <h3 class="text-center text-white fw-bold mt-5 mb-3 pt-4">Instructions</h3>
      <div class="d-flex justify-content-center">
        <ol class="list-group list-group-numbered col-10 col-lg-6">
          <li class="list-group-item bg-violet">Use Increase and Decrease to change the counter.</li>
          <li class="list-group-item bg-violet">Delta controls the step size.</li>
          <li class="list-group-item bg-violet">Reset brings the counter back to zero.</li>
          <li class="list-group-item bg-violet">Click the navbar title to go back to the main menu.</li>
        </ol>
      </div>
    </div>
    `,
  );

  // Get references to all main DOM elements for later use
  const counterCard = document.getElementById("counter");
  const increaseButton = document.getElementById("increase-button");
  const decreaseButton = document.getElementById("decrease-button");
  const resetButton = document.getElementById("reset-button");
  const deltaButton = document.getElementById("delta-button");
  const deltaValue = document.getElementById("delta-value");

  // Return an object containing all relevant DOM elements
  return {
    counterCard: counterCard,
    increaseButton: increaseButton,
    decreaseButton: decreaseButton,
    resetButton: resetButton,
    deltaButton: deltaButton,
    deltaValue: deltaValue,
  };
}

function setUpEvents() {
  // Create the DOM elements for the counter and get references
  const ui = renderCounterUI();
  const counterCard = ui["counterCard"];
  const increaseButton = ui["increaseButton"];
  const decreaseButton = ui["decreaseButton"];
  const resetButton = ui["resetButton"];
  const deltaButton = ui["deltaButton"];
  const deltaValue = ui["deltaValue"];

  // Ask the user for the initial step size (delta)
  let delta;
  do {
    delta = askNumber();
  } while (delta === null);

  // Create a new Counter instance with the DOM element and delta
  const counterInstance = new Counter(counterCard, delta);
  deltaValue.textContent = delta;

  // Attach event listeners to the buttons
  increaseButton.addEventListener("click", () => {
    counterInstance.increase();
  });

  decreaseButton.addEventListener("click", () => {
    counterInstance.decrease();
  });

  resetButton.addEventListener("click", () => {
    counterInstance.reset();
  });

  deltaButton.addEventListener("click", () => {
    const newDelta = askNumber();
    if (newDelta === null) {
      return; // do nothing if user cancels
    } else {
      counterInstance.updateDelta(newDelta); // update step size
      deltaValue.textContent = newDelta; // update displayed delta
    }
  });
}

// Main function that runs at the start of the DOM loading.
function startApp() {
  // Get references to key elements
  const heroButton = document.getElementById("hero-button");
  const headerSection = document.querySelector("header");
  const navTitle = document.getElementById("nav-title");

  heroButton.addEventListener("click", () => {
    headerSection.remove();
    setUpEvents();
  });

  navTitle.addEventListener("click", () => {
    const app = document.getElementById("my-app");
    if (app.hasChildNodes()) {
      // When the navbar title is clicked:
      // 1. Clear the counter app content
      // 2. Re-insert the header section back into the DOM
      app.replaceChildren(); // remove all children from #my-app
      app.insertAdjacentElement("beforebegin", headerSection);
    } else {
      return; // do nothing if #my-app is already empty
    }
  });
}

if (document.readyState === "loading") {
  startApp();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    startApp();
  });
}
