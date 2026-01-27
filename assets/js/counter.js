// Counter class: handles the counter logic and display
export class Counter {
  // Constructor
  constructor(displayElement, delta) {
    this.value = 0; // current counter value
    this.delta = delta; // step (delta) for increase/decrease
    this.displayElement = displayElement; // DOM element where the value is displayed
    this.updateDisplay(); // immediately update the display at initialization
  }

  updateDisplay() {
    // Updates the DOM element with the current value
    this.displayElement.textContent = this.value;
  }

  reset() {
    // Resets the counter to 0
    this.value = 0;
    this.updateDisplay();
  }

  increase() {
    // Increase the counter by delta
    this.value += this.delta;
    this.updateDisplay();
  }

  decrease() {
    // Decreases the counter by delta
    this.value -= this.delta;
    this.updateDisplay();
  }

  updateDelta(number) {
    // Update the delta (step size)
    this.delta = number;
  }
}
