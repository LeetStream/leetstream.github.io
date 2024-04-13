import { getProblemOfDay, problems } from "./db/problems.js";
import { UserDb } from "./db/userDb.js";

export const routers = {
  "/": "<problem-form/>",
  done: "<done-comp/>",
  usage: /*HTML*/ `<markdown-renderer src="./README.md"/>`,
};

export function routingRules() {
  if (
    location.hash.slice(1) === "done" &&
    (Object.keys(UserDb.get().problems).length === 0 ||
      !UserDb.get().problems[problems[getProblemOfDay()].id])
  )
    location.hash = "";
  else if (
    Object.keys(UserDb.get().problems).length > 0 &&
    UserDb.get().problems[problems[getProblemOfDay()].id] &&
    ["", "problem"].includes(location.hash.slice(1))
  )
    location.hash = "done";
}

export function router() {
  const path = window.location.hash.slice(1);
  const contentDiv = document.getElementById("content");

  contentDiv.innerHTML = routers[path || "/"];
}
