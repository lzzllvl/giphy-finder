let initialChoices = ["Tupac", "Chance the Rapper", "Andre 3000", "Big Boi", "Biggie", "The Game", "Missy Elliot", "Lupe Fiasco"];

let createButtons = (currentValue) => {
  let btn = $("<button>");
  btn.text(currentValue);
  btn.attr("data-name", currentValue);
  btn.appendTo($("#btn-list")).after("\u00A0 \u00A0");
};

let apiKey = "dc6zaTOxFJmzC";
let urlBase = "http://api.giphy.com/v1/gifs/search";
let paramObj = {
  q: "",
  limit: 10,
  rating: "pg",
  api_key: apiKey,
};
