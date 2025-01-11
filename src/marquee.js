import gsap from "gsap";

export class Marquee {
  constructor(rootElement) {
    console.log("marquee");
    console.log("Marquee initialized");
    this.marquee = rootElement;
    this.marqueeInner = this.marquee.querySelector(".marquee_inner");
    this.animation = null;

    this.updateDimensions();
    this.setup();
    this.animate();

    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.marquee);
  }

  updateDimensions() {
    this.marqueeInnerWidth = this.marqueeInner.offsetWidth;
    this.marqueeWidth = this.marquee.offsetWidth;
    this.gap = parseFloat(getComputedStyle(this.marquee).gap) || 0;
  }

  setup() {
    //check for existing clones
    const existingClones = this.marquee.querySelectorAll(
      ".marquee_inner:not(:first-child)"
    );
    //removing the clone
    existingClones.forEach((clone) => {
      clone.remove();
    });

    //Calculations for the duplication and add one at the end just for safety
    const copyNum = Math.ceil(this.marqueeWidth / this.marqueeInnerWidth) + 1;

    if (this.wrapper) {
      this.wrapper.remove();
    }

    //create a div element and wrap everything
    this.wrapper = document.createElement("div");
    this.wrapper.style.display = "flex";
    this.wrapper.style.gap = `${this.gap}px`;

    //move the original marquee inner into the wrapper
    if (this.marqueeInner.parentNode !== this.wrapper) {
      this.marqueeInner.remove();
      this.wrapper.appendChild(this.marqueeInner);
    }

    //add number of copies to the wrapper
    for (let i = 0; i < copyNum; i++) {
      const clone = this.marqueeInner.cloneNode(true);
      this.wrapper.appendChild(clone);
    }

    this.marquee.appendChild(this.wrapper);
  }

  animate() {
    //calculate the total width of one item with gap
    const itemWidth = this.marqueeInnerWidth + this.gap;

    //animation
    this.animation = gsap.to(this.wrapper, {
      x: -itemWidth,
      duration: 2,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(this.wrapper, { x: 0 });
        console.log("repeat");
      },
    });
  }

  handleResize() {
    this.updateDimensions();

    if (this.animation) {
      this.animation.kill();
    }

    this.setup();
    this.animate();
  }
}
