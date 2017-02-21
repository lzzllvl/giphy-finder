let choices = ["Tupac", "Chance the Rapper", "Andre 3000", "Big Boi", "Biggie", "The Game", "Missy Elliot", "Lupe Fiasco"];
let apiKey = "dc6zaTOxFJmzC";
let urlBase = "http://api.giphy.com/v1/gifs/search?";
let paramObj = {
  q: "",
  limit: 10,
  rating: "pg",
  api_key: apiKey,
};



let createButtons = (currentValue) => {
  let btn = $("<button>");
  btn.text(currentValue);
  btn.attr("data-name", currentValue);
  btn.appendTo($("#btn-list"));
};

let sendAjax = (query) => {
   $.ajax({
    url: query,
    method: "GET"
  })
  .done((response) => {
    $("#results").children().remove();
    response.data.map(placeImages);
    imageClicks();
  });
};

let placeImages = (currentValue)=>{
  let paused = currentValue.images.fixed_height_small_still.url;
  let active = currentValue.images.fixed_height_small.url;
  let imgTag = $("<img>");
  imgTag.attr("src", paused);
  imgTag.attr("data-state", "paused");
  imgTag.attr("data-paused", paused);
  imgTag.attr("data-active", active);
  $("#results").append(imgTag);
}

let buttonClicks = () => {
  $("#btn-list > button").on("click", (event)=>{
    paramObj.q = $(event.target).data("name");
    let encParam = $.param(paramObj);
    let queryUrl = urlBase + encParam;
    sendAjax(queryUrl);
  });
};

let imageClicks = () => {
  $("#results > img").on("click", (event) => {
    let self = $(event.target);
    let state = self.data("state");
    if(state === "paused"){
      self.attr("src", self.data("active"));
      self.data("state", "active");
    } else {
      self.attr("src", self.data("paused"));
      self.data("state", "paused");
    }
  });
}





$("form").submit((event)=>{
  event.preventDefault();
  let added = $("#input-text").val();
  choices.push(added);
  $("#btn-list").children().remove().html("");
  choices.forEach(createButtons);
  buttonClicks();
  $("#input-text").val("Hip Hop Artists")
});

choices.forEach(createButtons);
buttonClicks();
