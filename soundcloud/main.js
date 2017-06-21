/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
let userInput = document.getElementById("musicSearchBar");
let submitButton = document.getElementById("submitButton");
let userInputSubmission = ""

submitButton.addEventListener("click", submission);

function submission(){

  userInputSubmission = userInput.value;
  console.log(userInputSubmission);

  (function(){
      'use strict'

      function musicDataToHtml(input){
        return
        input.title;
      };

      fetch("https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=" + userInputSubmission)
        .then(
          function(response){
            if(response.status != 200){
              console.log("There has been an error and the code is " + response.status);
              return;
            }
            response.json().then(function(data){
              // for (let i = 0; i < data.length; i++){
              //   console.log(data[i]);
              // }
              console.log(data[0].title);
              console.log(musicDataToHtml(data[0]));
              
            })
          }
        )
  })();
}


// 2. Create your `onSubmit` event for getting the user's search term


// 3. Create your `fetch` request that is called after a submission


// 4. Create a way to append the fetch results to your page
// function musicDataToHtml(data){
//   return
//   `
//   <div class="musicSearchWrapper">
//     <p>${data.title}</p>
//   </div>
//
//   `;
// };

// 5. Create a way to listen for a click that will play the song in the audio play
