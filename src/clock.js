export class Clock {
  constructor(selector) {
    this.element = document.querySelector(selector);
    if (!this.element) {
      throw new Error(`Element with the selector "${selector}" not found.`);
    }
    this.updateTime(); // Initial the update
    this.start(); // start the clock
  }

  //format the time in hh:mm:ss
  formatTime(date) {
    function pad(num) {
      return String(num).padStart(2, "0");
    }
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  //update the clock element with current time
  updateTime() {
    const now = new Date();
    this.element.textContent = this.formatTime(now);
  }

  //start the clock and update it every second
  start() {
    this.interval = setInterval(() => this.updateTime(), 1000);
  }

  //stoping the clock
  stop() {
    clearInterval(this.interval);
  }
}
