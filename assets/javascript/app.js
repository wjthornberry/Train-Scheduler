  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCvhxP1aU86yzSdg7Fs96K6BqTT7v9UUm4",
    authDomain: "train-tracker-19b61.firebaseapp.com",
    databaseURL: "https://train-tracker-19b61.firebaseio.com",
    projectId: "train-tracker-19b61",
    storageBucket: "",
    messagingSenderId: "902596415304"
  };
  firebase.initializeApp(config);

  $(document).ready(function() {

        // Audio Setup add .mp3 to assets
        // ===========

        // Create an audio element with JavaScript
        var audioElement = document.createElement("audio");

        // Set it's source to the location
        // of our Captain Planet theme song file.
        audioElement.setAttribute("src", "Assets/captainplanet24.mp3");

        // Theme Button
        $(".theme-button").on("click", function() {
          audioElement.play();
        });

        // Pause Button
        $(".pause-button").on("click", function() {
          audioElement.pause();
        });
