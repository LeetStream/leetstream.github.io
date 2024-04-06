import { getProblemOfDay } from "./db/problems.js";
import { UserDb } from "./db/userDb.js";

export const routers = {
  problem: "<problem-form/>",
  done: "<done-comp/>",
};

export function routerRules() {
  if (
    UserDb.get().problems.length !== 0 &&
    UserDb.get().problems[UserDb.get().problems.length - 1].index ===
      getProblemOfDay()
  )
    location.hash = "done";
  else if (location.hash.slice(1) === "done") location.hash = "";
}

export function router() {
  const path = window.location.hash.slice(1);
  const contentDiv = document.getElementById("content");

  contentDiv.innerHTML = routers[path || "problem"];
}
