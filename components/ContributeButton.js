import { ShadowComponent } from "./ShadowComponent.js";

class ContributeButton extends ShadowComponent {
  constructor() {
    super();
  }

  render() {
    return /*HTML*/ `
      <style>
        a {
          display: inline;
        }

        #contribute {
          background: #2ea44e;
          border-radius: 1.5rem;
          padding: .375rem .85rem;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          color: white;
        }

        #contribute:hover {
          background: rgb(70, 180, 94);
        }

        #contribute>span {
          font-size: 1.25rem;
          font-weight: 700;
        }
      </style>
      <a href="https://github.com/LeetStream/leetstream.github.io">
        <button id="contribute">
          <span>+</span> Contribute
        </button>
      </a>
    `;
  }
}

customElements.define("contribute-button", ContributeButton);
