import Model from "./mvc/model.js";
import View from "./mvc/view.js";
import Controller from "./mvc/controller.js";

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

function init() {
  controller.init();
  document.body.style.setProperty("--screen-height", window.innerHeight + "px");
}

window.addEventListener("resize", () => {
  document.body.style.setProperty("--screen-height", window.innerHeight + "px");
});

document.addEventListener("DOMContentLoaded", init);
