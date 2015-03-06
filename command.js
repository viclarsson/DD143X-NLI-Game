// Define dictionairy
var commands = ["go", "walk", "take", "use", "talk", "speak"];
var conjunction = ["and", "then"];

function processCommand(stringArray) {
	var length = stringArray.length;
	var word = null;
	var nothing = true;

	for(var i = 0; i < length;i++) {
		word = stringArray[i];
		if(jQuery.inArray(word, commands) != -1) {
			// Execute command with maximum of 3 parameters
			executeCommand(word, stringArray.slice(i+1, length));
			nothing = false;

		} else if(jQuery.inArray(word, conjunction) != -1) {
			// A conjunction
			// Maybe fix output for this.		
		} else {
			console.log(word + ": Not a word but may be a usable item/NPC!");
		}
	}
	if(nothing) {
		reply("I don't understand that...");
	}
}

function executeCommand(command, params) {
	console.log(params);
	switch(command) {
		case "go":
		case "walk":
		case "climb":
			var newRoom = PLAYER.currentRoom.getRoomFromExit(params[0])
			if(newRoom == undefined) {
				reply("Not possible...");
				return;
			}
			PLAYER.currentRoom = newRoom;
			reply(PLAYER.currentRoom.getFullDesc());
		break;
		case "take":
			var item = PLAYER.currentRoom.items[params[0]];
			console.log(item);
			if(item == undefined) {
				reply("There are no " + params[0] + " in here...");
				return;
			}
			PLAYER.addItem(item);
			reply("You took the " + item.name);
		break;
		case "use":
			log("You used " + params[0]);
		break;
		case "talk":
		case "speak":
			log("You spoke " + params[0] + " " + params[1])
		break;
	}
}