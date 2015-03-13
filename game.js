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
});