import { getProblemOfDay, problems } from "../db/problems.js";

class Done extends HTMLElement {
  constructor() {
    super();
    const todaysProblem = problems[getProblemOfDay()];
    this.patterns = todaysProblem.patterns;
    this.solutions = todaysProblem.solutions;
    this.innerHTML = this.render();
  }

  render() {
    return /*HTML*/ `
      <confettiful-comp>
        <div class="references">
          <div class="patterns">
            ${this.patterns
              .map((pattern) => {
                return /*HTML*/ `
                <div class="pattern">
                  <h2>${pattern.name}</h2>
                  <span class="badges">
                    ${pattern.articles
                      .map((article) => {
                        return /*HTML*/ `
                        <a href="${
                          article.url
                        }" target="_blank" class="badge-container">
                          <span class="badge" style="background: ${
                            article.site.color || "#9b9b9b"
                          };">${article.title}</span>
                        </a>
                      `;
                      })
                      .join("")}
                    <contribute-button></contribute-button>
                  </span>
                </div>
              `;
              })
              .join("")}
          </div>

          <div class="solutions">
            <h2>Solutions</h2>
            <span class="badges">
              ${this.solutions
                .map((solution) => {
                  return /*HTML*/ `
                  <a href="${
                    solution.url
                  }" target="_blank" class="badge-container">
                    <span class="badge" style="background: ${
                      solution.site.color || "#9b9b9b"
                    };">${solution.title || solution.site.name}</span>
                  </a>
                `;
                })
                .join("")}
              <contribute-button></contribute-button>
            </span>
          </div>
        </div>
      </confettiful-comp>
    `;
  }
}

customElements.define("done-comp", Done);
