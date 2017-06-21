

// Defining global variables and storing global elements ----------------------

let userInput = document.getElementById("musicSearchBar");
let submitButton = document.getElementById("submitButton");
let userInputSubmission = ""
let resultsSection = document.getElementById("results");
let audioPlayer = document.getElementById("music-player");
let nowPlaying = document.getElementById("nowPlaying");
// let songsBeingDisplayed = [];

submitButton.addEventListener("click", submission);

function submission(){

  userInputSubmission = userInput.value;
// Below ensures that user input with spaces will still work in SoundCloud query
  userInputSubmission = userInputSubmission.replace(/ /g, "%20")

// When user clicks submit button after a search, the results from past search
// will be cleared and song currently playing will stop playing
  resultsSection.innerHTML = "";
  audioPlayer.src = "";

// This function contains the fetch that will occur when submit button is clicked
  (function(){

      'use strict'

      fetch("https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=" + userInputSubmission)
        .then(
          function(response){
            if(response.status != 200){
              console.log("There has been an error and the code is " + response.status);
              return;
            }
            response.json().then(function(data){

              let musicArray = data;

// This function takes in a result and creates a div that stores the result's
// song title, artist, and album cover
              function musicDataToHtml(song){
                let newDiv = document.createElement("div");
                newDiv.className = "songDivider";
                let markup = `
                  <img class="foo" src="${song.artwork_url}" onerror="this.src='https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?11030601123180174439'" alt="album cover not available">
                  <p>${song.title}</p>
                `;
                newDiv.innerHTML = markup;

                return newDiv;
              };

// Code below loops through results, applies musicDataToHtml function to each result,
// and appends each new div to the section with id="results"
              for (let i = 0; i < musicArray.length; i++){
                resultsSection.appendChild(musicDataToHtml(musicArray[i]));
              };

// songsBeingDisplayed is now an element that is assigned to an array of div's
// with class="songDivider"
              let songsBeingDisplayed = document.getElementsByClassName("songDivider");

// Code below loops through songsBeingDisplayed, adds an event listener to each songIndex
// in the array. On click, the event listener calls the playSong function
              for (let k = 0; k < songsBeingDisplayed.length; k++){
                let songIndex = songsBeingDisplayed[k];
                songIndex.addEventListener("click", playSong);
// This function appens the client id onto the stream_url and sets the audioPlayer's
// src equal to the necessary song link
                function playSong(){
                  nowPlaying.innerHTML = "Press play to start listening to: " + musicArray[k].title;
                  let songLink = musicArray[k].stream_url + "?client_id=8538a1744a7fdaa59981232897501e04";
                  audioPlayer.src = songLink;
                  audioPlayer.addEventListener("play", function () {
                    nowPlaying.innerHTML = "You're now listening to: " + musicArray[k].title;
                  });
                }
                // audioPlayer.addEventListener("play", function () {
                //   nowPlaying.innerHTML = "You're listening to: " + musicArray[k].title;
                // });
              }
            })
          }
        )
  })();
}
