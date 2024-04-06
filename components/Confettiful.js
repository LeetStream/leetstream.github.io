// Source: https://www.youtube.com/watch?v=8L0ngrNIUP4

import { ShadowComponent } from "./ShadowComponent.js";

class Confettiful extends ShadowComponent {
  constructor() {
    super();
    this.el = this.shadow.querySelector("#confettiful");
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
    this.confettiAnimations = ["slow", "medium", "fast"];

    this._setupElements();
    this._renderConfetti();
  }

  _setupElements() {
    const containerEl = document.createElement("div");

    containerEl.classList.add("confetti-container");

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
  }

  _renderConfetti() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement("div");
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiBackground =
        this.confettiColors[
          Math.floor(Math.random() * this.confettiColors.length)
        ];
      const confettiLeft =
        Math.floor(Math.random() * this.el.offsetWidth) + "px";
      const confettiAnimation =
        this.confettiAnimations[
          Math.floor(Math.random() * this.confettiAnimations.length)
        ];

      confettiEl.classList.add(
        "confetti",
        "confetti--animation-" + confettiAnimation
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      this.containerEl.appendChild(confettiEl);
    }, 25);
  }

  render() {
    return /*HTML*/ `
    <style>
      h1 {
        font-size: 7rem;
        text-align: center;
        color: #fcedd8;
        background-color: black;
        font-family: "VT323";
        font-weight: 700;
        text-shadow: 5px 5px 0 #eb452b, 10px 10px 0 #efa032, 15px 15px 0 #46b59b,
          20px 20px 0 #017e7f, 25px 25px 0 #052939, 30px 30px 0 #c11a2b;
      }
      @keyframes confetti-slow {
        0% {
          transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
        }
        100% {
          transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg);
        }
      }
      @keyframes confetti-medium {
        0% {
          transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
        }
        100% {
          transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg);
        }
      }
      @keyframes confetti-fast {
        0% {
          transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
        }
        100% {
          transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg);
        }
      }
      .confetti-container {
        perspective: 700px;
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
      }
      .confetti {
        position: absolute;
        z-index: 1;
        top: -10px;
        border-radius: 0;
        pointer-events: none;
      }
      .confetti--animation-slow {
        animation: confetti-slow 2.25s linear 1 forwards;
      }
      .confetti--animation-medium {
        animation: confetti-medium 1.75s linear 1 forwards;
      }
      .confetti--animation-fast {
        animation: confetti-fast 1.25s linear 1 forwards;
      }
    </style>
    <div id="confettiful">
      <h1>Great!</h1>
      <slot></slot>
    </div>
    `;
  }
}

customElements.define("confettiful-comp", Confettiful);
