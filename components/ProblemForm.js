import { Difficulty } from "../db/difficulty.js";
import { problems, getProblemOfDay } from "../db/problems.js";
import { UserDb } from "../db/userDb.js";
import { calculateScore, removeUnicodeAndLowerCase } from "../utils.js";
import { Component } from "./Component.js";

class ProblemForm extends Component {
  constructor() {
    super();

    let stored = UserDb.get();

    const problemOfDay = getProblemOfDay();
    const problem = problems[problemOfDay];

    const problemUrl = this.querySelector("#title");
    const problemTitle = problemUrl.querySelector("h1");

    problemTitle.innerText = problem.title;
    problemUrl.href = problem.url;

    const problemDifficulty = this.querySelector("#difficulty");
    problemDifficulty.innerText = problem.difficulty || Difficulty.ABSENT;
    problemDifficulty.classList.add(
      removeUnicodeAndLowerCase(problem.difficulty || Difficulty.ABSENT)
    );

    const companiesList = this.querySelector("#companies");

    problem.companies.reverse().forEach((com) => {
      const listItem = this.createElement("li");
      listItem.innerHTML = com;
      companiesList.insertBefore(listItem, companiesList.firstChild);
    });

    const hints = this.querySelector("#hints");
    const bugs = this.querySelector("#bugs");
    const time = this.querySelector("#time");
    const solutionType = this.querySelector("#solution-type");
    const solutionUrl = this.querySelector("#ur-solution");
    const note = this.querySelector("#note");
    const done = this.querySelector("#done");

    function updateScore() {
      const bugsValue = +bugs.value;
      const hintsValue = +hints.value;
      const maxBugs = Math.max(stored.maxBugs, bugsValue);
      const maxHints = Math.max(stored.maxHints, hintsValue);

      done.querySelector("span").innerText = calculateScore(
        maxBugs,
        maxHints,
        +time.value,
        +solutionType.value,
        bugsValue,
        hintsValue
      ).toFixed(2);
    }

    [hints, bugs, time, solutionType].forEach((e) =>
      e.addEventListener("input", updateScore)
    );

    done.addEventListener("click", () => {
      const bugsValue = +bugs.value;
      const hintsValue = +hints.value;
      if (bugsValue > stored.maxBugs || hintsValue > stored.maxHints) {
        stored.maxBugs = Math.max(stored.maxBugs, bugsValue);
        stored.maxHints = Math.max(stored.maxHints, hintsValue);

        stored.problems.forEach(
          (p) =>
            (p.score = calculateScore(
              stored.maxBugs,
              stored.maxHints,
              p.time,
              p.solutionType,
              p.bugs,
              p.hints
            ))
        );
      }
      stored.problems.push({
        index: problemOfDay,
        hints: +hints.value,
        bugs: +bugs.value,
        time: +time.value,
        solutionType: +solutionType.value,
        score: calculateScore(
          stored.maxBugs,
          stored.maxHints,
          +time.value,
          +solutionType.value,
          bugsValue,
          hintsValue
        ),
        solutionUrl: solutionUrl.value,
        note: note.value,
      });
      UserDb.set(stored);
      location.hash = "done";
    });
  }

  render() {
    return /*HTML*/ `
    <div class="hero">
      <div class="problem">
        <a href="#" id="title">
          <h1>Number of Connected Components in an Undirected Graph</h1>
        </a>
        <span class="badge" id="difficulty">High 🔥</span>
      </div>
      <ul class="companies" id="companies">
        <!-- Icons: iconoir.com , simpleicons.org -->
        <li><contribute-button></contribute-button></li>
      </ul>
      <form>
        <div class="metrics">
          <div class="labeled-input">
            <label for="hints">Hints 💡</label>
            <input type="number" name="hints" id="hints" min="0">
          </div>

          <div class="labeled-input">
            <label for="bugs">Bugs 🐛</label>
            <input type="number" name="bugs" id="bugs" min="0">
          </div>

          <div class="labeled-input">
            <label for="time">Time ⏱️</label>
            <input type="number" name="time" id="time" min="1">
          </div>

          <div class="labeled-input">
            <label for="solution-type">Solution Type 🛠️</label>
            <select name="solution-type" id="solution-type">
              <option value="0">🚶‍♂️ Off Track</option>
              <option value="1">🤦‍♂️ Got Completely Stuck</option>
              <option value="2">💪 Almost Worked (Brute Force)</option>
              <option value="3">🎯 Sub-Optimal</option>
              <option value="4">🌟 Optimal</option>
            </select>
          </div>
        </div>


        <div class="labeled-input">
          <label for="ur-solution">Your Solution 💻</label>
          <input type="url" name="ur-solution" id="ur-solution"
            placeholder="https://www.github.com/path/to/your/solution">
        </div>

        <div class="labeled-input">
          <label for="note">Note 📝</label>
          <textarea name="note" id="note"></textarea>
        </div>

        <button type="done" id="done"><span>0.00</span> Done</button>
      </form>
    </div>
    `;
  }
}

customElements.define("problem-form", ProblemForm);
