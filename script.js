import { problems } from "./db/problems.js";
import { UserDb } from "./db/userDb.js";
import { router, routingRules } from "./routers.js";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
window.addEventListener("hashchange", routingRules);
window.addEventListener("load", routingRules);
window.addEventListener("hashchange", activeNavLink);
window.addEventListener("load", activeNavLink);

document.querySelector("#export").addEventListener("click", () => {
  const data = UserDb.get().problems;

  const csvContent =
    "Title,Difficulty,Patterns,URL,Companies,Tags,Hints,Bugs,Time,Solution Type,Score,My Solution URL,Note\n" +
    Object.entries(data)
      .map(([pId, pData]) =>
        [
          ...Object.entries(problems.find((p) => p.id === pId))
            .filter(([ki, _]) => !["solutions", "id"].includes(ki))
            .map(([k, v]) => {
              if (["title", "url", "difficulty"].includes(k)) return `"${v}"`;
              else if (["companies", "tags"].includes(k))
                return `"${v.map((it) => it).join(",")}"`;
              else if (k === "patterns")
                return `"${v.map((it) => it.name).join(",")}"`;
            }),
          ...Object.entries(pData).map(([_, value]) => `"${value}"`),
        ].join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `problems_${new Date().toISOString().replaceAll(":", "-")}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
});

function activeNavLink() {
  document.querySelectorAll("nav li a").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(
    `nav li a[href="${location.hash || "/"}"]`
  );
  if (activeLink) activeLink.classList.add("active");
}
