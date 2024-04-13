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
          background: #2ea44e;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        a:hover {
          background: rgb(70, 180, 94);
        }
      </style>
      <a href="https://github.com/LeetStream/leetstream.github.io">+</a>
    `;
  }
}

customElements.define("contribute-button", ContributeButton);
