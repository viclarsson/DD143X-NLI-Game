$(document).ready(function() {
	// Welcome
	log("JavaScript initialized and now ready!");
	reply("Welcome to the game!");

	reply(PLAYER.currentRoom.getFullDesc());

	$("#speak").focus();

	$("#form").on("submit", function(e) {
		e.preventDefault();

		// Get the input
		var input = $("#speak").val();
		said(input); // Ouput what said
		$("#speak").val(""); // Reset input

		// Get string and replace all non characters
		var split_input = input.replace(/[^a-z ]/ig, "").toLowerCase().split(" ");
		
		// Do work
		if(processCommand(split_input)) {
			reply(PLAYER.currentRoom.getFullDesc());
		}
	});

	//http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API

	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onstart = function() {}
	recognition.onerror = function(event) {}
	recognition.onend = function() {}


	function startButton(event) {
  ...
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();

  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i &lt; event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
  };
}
});