
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