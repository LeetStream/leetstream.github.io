export class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    if (this.constructor == ShadowComponent)
      throw new Error("Cannot instantiate abstract class `ShadowComponent`.");

    const template = document.createElement("template");
    template.innerHTML = this.render();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  render() {
    throw new Error("Abstract method `render` not implemented.");
  }
}
