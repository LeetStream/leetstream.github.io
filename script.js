import { problems } from "./db/problems.js";
import { UserDb } from "./db/userDb.js";
import { router, routingRules } from "./routers.js";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
window.addEventListener("hashchange", routingRules);
window.addEventListener("load", routingRules);

document.querySelector("#export").addEventListener("click", () => {
  const data = UserDb.get().problems;

  const csvContent =
    "Title,Difficulty,Patterns,URL,Companies,Tags,Hints,Bugs,Time,Solution Type,Score,My Solution URL,Note\n" +
    data
      .map((item) =>
        Object.entries(item)
          .map(([key, value]) =>
            key === "index"
              ? Object.entries(problems[value])
                  .filter(([ki, _]) => ki !== "solutions")
                  .map(([k, v]) => {
                    if (["title", "url", "difficulty"].includes(k)) return v;
                    else if (["patterns", "companies", "tags"].includes(k))
                      return `"${v.map((it) => it.name).join(",")}"`;
                  })
                  .join(",")
              : key === "note"
              ? `"${value}"`
              : value
          )
          .join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `problems${new Date().toISOString().replaceAll(":", "-")}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
});
