import { Difficulty } from "../db/difficulty.js";
import { problems } from "../db/problems.js";
import { stringToColor } from "../utils.js";
import { Component } from "./Component.js";

class ProblemsDistribution extends Component {
  render() {
    let table = problems.reduce((result, problem) => {
      result.push({
        id: problem.id,
        pattern: problem.patterns[0].name,
        patternColor: stringToColor(problem.patterns[0].name),
        difficulty: problem.difficulty,
        difficultyColor: {
          [Difficulty.EASY]: "#53E05C",
          [Difficulty.MEDIUM]: "#536BE0",
          [Difficulty.HARD]: "#E05853",
          [Difficulty.ABSENT]: "#000",
        }[problem.difficulty],
        noOfCompanies: problem.companies.length,
        noOfCompaniesColor: (255 * (problem.companies.length - 1)) / 75,
        isBlind75: problem.tags.includes("Blind75"),
        isGrind75: problem.tags.includes("Grind75"),
      });
      return result;
    }, []);

    return /*HTML*/ `
      <center style="margin-bottom: 2rem">
        <table>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Pattern</th>
            <th>Difficulty</th>
            <th>No. of Companies</th>
            <th>Blind75</th>
            <th>Grind75</th>
          </tr>
          ${table
            .map(
              (problem) =>
                `<tr>
                <td>${table.indexOf(problem) + 1}</td>
                <td>${problem.id}</td>
                <td style="background-color: ${problem.patternColor}">${
                  problem.pattern
                }</td>
                <td style="background-color: ${problem.difficultyColor}">${
                  problem.difficulty
                }</td>
                <td style="background-color: rgb(0, ${
                  problem.noOfCompaniesColor
                }, 0); color: white;">${problem.noOfCompanies}</td>
                <td style="background-color: ${
                  problem.isBlind75 ? "#53E05C" : "#E05853"
                }">${problem.isBlind75}</td>
                <td style="background-color: ${
                  problem.isGrind75 ? "#53E05C" : "#E05853"
                }">${problem.isGrind75}</td>
              </tr>`
            )
            .join("")} 
        </table>
      </center>
        `;
  }
}

customElements.define("problems-distribution", ProblemsDistribution);
