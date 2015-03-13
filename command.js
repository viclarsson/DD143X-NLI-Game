// Define dictionairy
var commands = ["go", "walk", "take", "drop"];
var conjunction = ["and", "then"];
var prepositions = ["to", "a", "the"];

function processCommand(stringArray) {
	var length = stringArray.length;
	var word = null;
	var nothing = true;

	// Remove prepositions
	var tmp = []
	for(var i = 0; i < length;i++) {
		if(jQuery.inArray(stringArray[i], prepositions) == -1) {
			tmp.push(stringArray[i]);
		}
	}
	stringArray = tmp;

	for(var i = 0; i < length;i++) {
		word = stringArray[i];
		if(jQuery.inArray(word, commands) != -1) {
			// Execute command with maximum of 3 parameters
			executeCommand(word, stringArray.slice(i+1, length));
			nothing = false;

		} else if(jQuery.inArray(word, conjunction) != -1) {
			// A conjunction
			// Maybe fix output for this.		
		} else if(executeAction(word, stringArray.slice(i+1, length))) {
			return;
		}
	}
	if(nothing) {
		reply("I don't understand that...");
	}
}

function executeAction(command, params) {
	var item;
	// Try to find items
	for(i in params) {
		// In the room
		item = PLAYER.currentRoom.getItem(params[i]);
		// Execute the action with the item found if possible
		if(item != undefined && item.actions[command] != undefined) {
			item.actions[command](params);
			return true;
		}
	}
	return false;
}


function executeCommand(command, params) {
	//console.log(params);
	switch(command) {
		case "go":
		case "walk":
		var newRoom = PLAYER.currentRoom.getRoomFromExit(params[0]);
		if(newRoom == undefined) {
			reply("Not possible...");
			return;
		}
		if(newRoom.locked != "open") {
			reply(newRoom.locked);
			return;
		}
		PLAYER.currentRoom = newRoom;
		reply(PLAYER.currentRoom.getFullDesc());
		break;
		case "take":
		//var paramId = detectPreposition(0, params[0], prepositions);
		var item = PLAYER.currentRoom.items[params[0]];
		if(item == undefined) {
			reply("There are no " + params[paramId] + " in here...");
			return;
		}
		if(item.takeable == "yes") {
			PLAYER.addItem(item);
			PLAYER.currentRoom.removeItem(item);
			reply("You took the " + item.getName() + ".");
		} else {
			reply(item.takeable)
		}
		break;
		case "drop":
		//var paramId = detectPreposition(0, params[0], prepositions);
		var item = PLAYER.items[params[0]];
		if(item == undefined) {
			reply("You have no " + params[paramId] + " on you...");
			return;
		}
		PLAYER.removeItem(item);
		PLAYER.currentRoom.addItem(item);
		reply("Dropped " + item.name + ".");
		break;
	}
}

/*
	Returns the next id if there is a preposition
	*/
	function detectPreposition(paramId, word, array) {
		if($.inArray(word, array) != -1) {
			console.log("Item preposition detected!");
			paramId++;
		}
		return paramId;
	}