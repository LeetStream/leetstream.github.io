import { getProblemOfDay, problems } from "../db/problems.js";
import { Component } from "./Component.js";

class Done extends Component {
  constructor() {
    super();
  }

  render() {
    const todaysProblem = problems[getProblemOfDay()];
    const patterns = todaysProblem.patterns;
    const solutions = todaysProblem.solutions;
    return /*HTML*/ `
      <confettiful-comp>
      <div class="references">
          <div class="patterns">
            ${patterns
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
                          };">
                            ${article.title}
                            <span style="font-size: 16px;"> &#x1f855; </span>
                          </span>
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
              ${solutions
                .map((solution) => {
                  return /*HTML*/ `
                  <a href="${
                    solution.url
                  }" target="_blank" class="badge-container">
                    <span class="badge" style="background: ${
                      solution.site.color || "#9b9b9b"
                    };">
                      ${solution.title || solution.site.name}
                      <span style="font-size: 16px;"> &#x1f855; </span>
                    </span>
                  </a>
                `;
                })
                .join("")}
              <contribute-button></contribute-button>
            </span>
          </div>
        </div>
        
        <div class="badges">
          ${todaysProblem.tags
            .map((tag) => {
              return /*HTML*/ `<span class="badge" style="background-color: #a52a2a;">${tag}</span>`;
            })
            .join("")}
        </div>
      </confettiful-comp>
    `;
  }
}

customElements.define("done-comp", Done);
