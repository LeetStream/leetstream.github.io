import { getProblemOfDay, problems } from "./db/problems.js";
import { UserDb } from "./db/userDb.js";

export const routers = {
  "/": "<problem-form/>",
  done: "<done-comp/>",
  usage: "<markdown-renderer src='./README.md'/>",
  newStream: "<new-stream/>",
  joinStream: "<join-stream/>",
};

export function routingRules() {
  if (!UserDb.get().loggedIn) {
    if (location.hash.slice(1) === "") location.hash = "newStream";
  } else {
    if (
      location.hash.slice(1) === "done" &&
      (Object.keys(UserDb.get().problems).length === 0 ||
        !UserDb.get().problems[problems[getProblemOfDay()].id])
    )
      location.hash = "";
    else if (
      location.hash.slice(1) === "" &&
      Object.keys(UserDb.get().problems).length > 0 &&
      UserDb.get().problems[problems[getProblemOfDay()].id]
    )
      location.hash = "done";
  }
}

export function router() {
  const path = window.location.hash.slice(1);
  const contentDiv = document.getElementById("content");

  contentDiv.innerHTML = routers[path || "/"];
}
