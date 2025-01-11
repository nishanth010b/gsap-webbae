import { Clock } from "./clock";
import { reveal } from "./helpers/reveal";
import { Marquee } from "./marquee";

const clock = new Clock(".hero_clock");
reveal();

const marqueeElements = document.querySelectorAll(".marquee");
marqueeElements.forEach((marqueeElement) => {
  new Marquee(marqueeElement);
});

console.log("working again");
