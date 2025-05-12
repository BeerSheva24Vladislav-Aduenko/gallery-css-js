import RateComponent from "./rate-component.js";
parent = document.getElementById("rate");

const rateComp = new RateComponent();
rateComp.render(parent, 2);
rateComp.render(parent, 3.1);
rateComp.render(parent, 3.5);
rateComp.render(parent, 3.6);
rateComp.render(parent, 3.9);
