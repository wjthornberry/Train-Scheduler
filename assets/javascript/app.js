$(document).ready(function(){

  // Damn the torpedoes and initialize Firebase!
  var config = {
    apiKey: "AIzaSyCvhxP1aU86yzSdg7Fs96K6BqTT7v9UUm4",
    authDomain: "train-tracker-19b61.firebaseapp.com",
    databaseURL: "https://train-tracker-19b61.firebaseio.com",
    projectId: "train-tracker-19b61",
    storageBucket: "train-tracker-19b61.appspot.com",
    messagingSenderId: "902596415304"
  };
  firebase.initializeApp(config);

  // start Google auth

    $('.content').hide();

  // Auth using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();

  $(document).on('click', '.signIn', function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
     // This gives you a Google Access Token. You can use it to access the Google API.
     var token = result.credential.accessToken;
     // The signed-in user info.
     var user = result.user;
     $('.content').show();
     loggedIn();
    });
    $(this).removeClass('signIn')
      .addClass('signOut')
      .html('Sign Out Of Google');
  });

  $(document).on('click', '.signOut', function () {
    firebase.auth().signOut().then(function() {
      $('.content').hide();
    }, function(error) {
      // An error happened.
    });
    $(this).removeClass('signOut')
      .addClass('signIn')
      .html('Sign In With Google To See Schedule');
  });

    // $(this).removeClass('signIn')
    //   .addClass('signOut')
    //   .html('Sign Out Of Google');
  });

  // $(document).on('click', '.signOut', function () {
  //   firebase.auth().signOut().then(function() {
  //     $('.content').hide();
  //   }, function(error) {
  //     // An error happened.
  //   });
  //   $(this).removeClass('signOut')
  //     .addClass('signIn')
  //     .html('Sign In With Google To See Schedule');
  // });

  // end Google auth

function loggedIn() {

// Create a variable to reference Firebase's database
var database = firebase.database();

// Event: capture click
$("#submitTrain").on("click", function() {

	// Variables hold user input
	var trainNameInput = $('#trainNameInput').val().trim();
	var destinationInput = $('#destinationInput').val().trim();
	var startTimeInput = $('#startTimeInput').val().trim();
	var frequencyInput = $('#frequencyInput').val().trim();


	// When the input fields are filled
	if (trainNameInput != "" &&
		destinationInput != "" &&
		startTimeInput != "" &&
		frequencyInput != "") {

	// Push that data to Firebase
	database.ref().push({
		trainName: trainNameInput,
		destination: destinationInput,
		startTime: startTimeInput,
		frequency: frequencyInput
	});  
    document.getElementById("#submitTrain").value = '';
    }
	// If not, do not submit
	else {
		return false;
	}

	// No page refreshing
	return false;
})

//Firebase watcher + initial loader
database.ref().on("child_added", function(childSnapshot) {

	// Create rows to display the database values
	var $trainBody = $('#trainRows');
	var $trainRow = $('<tr>');
	var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
	var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);	
	
	var frequency = childSnapshot.val().frequency;
	var startTime = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");		
	var minAway = frequency - (moment().diff(moment(startTime), "minutes") % frequency);
	
	var nextTrain = $('<td>').html(moment(moment().add(minAway, "minutes")).format("hh:mm")).appendTo($trainRow);
	var minutesAway = $('<td>').html(minAway).appendTo($trainRow);
		
	$trainRow.appendTo($trainBody);

});
}
