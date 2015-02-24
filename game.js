$(document).ready(function() {

	// Welcome
	log("JavaScript initialized and now ready!");
	reply("Welcome to the game!");

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

		// Reply
		reply("(Parsed as [" + split_input + "])");
	});
});

// Function for player input
function said(string) {
	$("#console").append("> " + string + "<br>");
}

// Function for answering
function reply(string) {
	$("#console").append(string + "<br><br>")
}

// Function for outputting text
function log(string) {
	$("#console").append('<span class="log">' + string + '<span><br><br>');
}