$(document).ready(function() {
	// Welcome
	log("JavaScript initialized and now ready!");
	reply("Welcome to the game! Your objective is to reach the lecture hall because you are late!<br><br>");

	reply(PLAYER.currentRoom.getFullDesc());

	$("#speak").focus();

	$("#form").on("submit", function(e) {
		e.preventDefault();

		// Get the input
		var input = $("#speak").val().trim();
		said(input); // Ouput what said
		$("#speak").val(""); // Reset input

		// Get string and replace all non characters
		var split_input = input.replace(/[^a-z ]/ig, "").toLowerCase().split(" ");
		
		// Do work
		if(processCommand(split_input)) {
			reply(PLAYER.getRoomDescription());
		}
	});
});

var BACKSPACE_ERRORS = 0;
var PREVIOUSKEYID = null;
document.onkeydown = KeyCheck;  //or however you are calling your method
function KeyCheck()
{
   var KeyID = event.keyCode;
   switch(KeyID)
   {
      case 8: // BACKSPACE
      case 46: // DELETE
      if(PREVIOUSKEYID != 8 || PREVIOUSKEYID != 46) {
      	BACKSPACE_ERRORS++;
      	console.log(BACKSPACE_ERRORS);
      }
      break;
      case 
      default:
      break;
   }
   PREVIOUSKEYID = KeyID;
}