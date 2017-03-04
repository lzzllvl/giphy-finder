

//the array of initial buttons
let choices = ["Stoked", "Pissed Off", "Happy", "I'm Done", "Drunk", "ROFL", "Lowkey", "Hyped", "Meh", "Not Amused"]

//open api key
let apiKey = "dc6zaTOxFJmzC";

//url base for the api
let urlBase = "https://api.giphy.com/v1/gifs/search?";

//constant paramaters for the query are saved here
//query name(q) will be added later
let paramObj = {
  limit: 10,
  rating: "pg-13",
  api_key: apiKey,
};


// this function is for creating button HTML elements.
// It adds a data attribute for the name which will
// come in handy for the ajax calls
let createButton = (currentValue) => {
  let btn = $("<button>");
  btn.text(currentValue);
  btn.attr("data-name", currentValue);
  btn.appendTo($("#btn-list"));
};

// this function may be unnecessary, but it uses the full
// query url to send an ajax call and then call another
// function to place the images
let sendAjax = (query) => {
   $.ajax({
    url: query,
    method: "GET"
  })
  .done((response) => {
    $("#results").children().remove();
    response.data.map(placeImages);
  });
};

// this function takes the data from the
// api response and places the images with
// data attributes for the animated/still urls
let placeImages = (currentValue)=>{
  //save pertinent data in variables
  let paused = currentValue.images.fixed_height_small_still.url;
  let active = currentValue.images.fixed_height_small.url;
  let rating = currentValue.rating;

  //create a span for the ratings
  let newSpan = $("<span>");
  let ratingP = $("<p>");
  ratingP.html("Rating: "+rating);
  ratingP.appendTo(newSpan);

  //create an img tag for the gifs,
  //data is for paused and active urls
  let imgTag = $("<img>");
  imgTag.attr("src", paused);
  imgTag.attr("data-state", "paused");
  imgTag.attr("data-paused", paused);
  imgTag.attr("data-active", active);
  imgTag.appendTo(newSpan);

  //appends the image span to the results section
  $("#results").append(newSpan);
};

//this is a function which is called in the
//$(document).ready() function in index.html
let readyFunc = () => {
  //create a button for each choice
  choices.forEach(createButton);

  //adding an event listener to button children
  //of #btn-list
  $("#btn-list").on("click", "button",(event)=>{
      //this sets the q property of the param object
      paramObj.q = $(event.target).data("name");
      //which is then encoded with the jquery param method
      let encParam = $.param(paramObj);
      //put it together and we have an API url
      let queryUrl = urlBase + encParam;
      //send it (see above)
      sendAjax(queryUrl);
    });


  //adding the event listener for making the gif change
  //between still and active states
  $("#results").on("click", "img", (event) => {
      let self = $(event.target);
      //switch `src` attribute to active or paused, based on
      // the data-state attribute
      let state = self.data("state");
      if(state === "paused"){
        self.attr("src", self.data("active"));
        self.data("state", "active");
      } else {
        self.attr("src", self.data("paused"));
        self.data("state", "paused");
      }
    });





/**
  * the following is a bit of an alternative solution.
  * The assignment tells us to add to the array and
  * recreate the buttons. Instead, I take the submitted value
  * and make the button with the createButton() function.
  */

  //this adds a button from the form input
  $("form").submit((event)=>{
    event.preventDefault();
    //since we don't have a page to send the input
    //we prevent default and check the value.
    let added = $("#input-text").val();
    //add to the choice array
    choices.push(added);
    //create button for the new value
    createButton(added);
    //reset the value to original
    $("#input-text").val("Enter Your Emotion");
  });
};
