import { getProblemOfDay } from "./db/problems.js";
import { UserDb } from "./db/userDb.js";

export const routers = {
  "/": "<problem-form/>",
  done: "<done-comp/>",
  usage: /*HTML*/ `
    <markdown-renderer src="./README.md">
    </markdown-renderer>
  `,
};

export function routingRules() {
  if (
    location.hash.slice(1) === "done" &&
    (UserDb.get().problems.length === 0 ||
      UserDb.get().problems[UserDb.get().problems.length - 1].index !==
        getProblemOfDay())
  )
    location.hash = "";
  else if (
    UserDb.get().problems.length > 0 &&
    UserDb.get().problems[UserDb.get().problems.length - 1].index ===
      getProblemOfDay() &&
    ["", "problem"].includes(location.hash.slice(1))
  )
    location.hash = "done";
}

export function router() {
  const path = window.location.hash.slice(1);
  const contentDiv = document.getElementById("content");

  contentDiv.innerHTML = routers[path || "/"];
}
