let initialChoices = ["Tupac", "Chance the Rapper", "Andre 3000", "Big Boi", "Biggie", "The Game", "Missy Elliot", "Lupe Fiasco"];

let createButtons = (currentValue) => {
  let btn = $("<button>");
  btn.text(currentValue); // need to find a way to add a space
  btn.appendTo($("#btn-list")).after("\u00A0 \u00A0");
};
