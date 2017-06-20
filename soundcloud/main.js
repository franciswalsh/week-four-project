/*
  Here is a guide for the steps you could take:
*/
(function(){
    'use strict'

    fetch("https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04")
      .then(
        function(response){
          if(response.status != 200){
            console.log("There has been an error and the code is " + response.status);
            return;
          }
          response.json().then(function(data){
            console.log(response.status);
            console.log(data[1].uri);
          })
        }
      )
})();
// 1. First select and store the elements you'll be working with


// 2. Create your `onSubmit` event for getting the user's search term


// 3. Create your `fetch` request that is called after a submission


// 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play
