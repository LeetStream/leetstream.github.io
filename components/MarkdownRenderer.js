import { ShadowComponent } from "./ShadowComponent.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export class MarkdownRenderer extends ShadowComponent {
  constructor() {
    super();
  }

  render() {
    return /*HTML*/ `
      <style>
        /* Dark mode styles */
        :host {
          display: block;
          background-color: black;
          color: #d4d4d4;
          line-height: 1.6;
          max-width: 75ch;
          margin: 0 auto;
          text-align: justify;
          padding-bottom: 2rem;
        }

        a {
          color: #0366d6;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        h1 {
          display: none;
        }
      </style>
      <div class="markdown-body">
        <!-- Markdown content will be inserted here -->
      </div>
    `;
  }

  connectedCallback() {
    const src = this.getAttribute("src");

    fetch(src)
      .then((response) => response.text())
      .then((text) => {
        const html = marked(text);

        this.shadow.querySelector(".markdown-body").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error fetching Markdown file:", error);
      });
  }
}

customElements.define("markdown-renderer", MarkdownRenderer);
