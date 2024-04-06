export class Component extends HTMLElement {
  constructor() {
    super();
    if (this.constructor == Component)
      throw new Error("Cannot instantiate abstract class `Component`.");

    this.innerHTML = this.render();
  }

  render() {
    throw new Error("Abstract method `render` not implemented.");
  }
}
