// Define dictionairy
var commands = ["go", "walk", "take", "drop", "look", "inventory", "check"];
var conjunction = ["and", "then"];
var prepositions = ["to", "a", "the", "out"];

// For answeing to "with what";
var WITH_ITEM = null;
var ON_ITEM = null;
var ITEM_IN_ROOM_OR_PLAYER = null;
var QUEUED_ACTION = null;
var ADDITIONAL_PARAMS = [];

function processCommand(stringArray) {
	var length = stringArray.length;
	var word = null;
	var replyConfused = false;

	// Remove prepositions
	var tmp = []
	for(var i = 0; i < length;i++) {
		if(jQuery.inArray(stringArray[i], prepositions) == -1) {
			tmp.push(stringArray[i]);
		}
	}
	stringArray = tmp;
	// If an action requests an item and then make a new complete request string
	if(QUEUED_ACTION != null) {
		tmp = [QUEUED_ACTION];
		if (ON_ITEM != null) {
			tmp = tmp.concat([ON_ITEM]);
		}
		tmp = tmp.concat(ADDITIONAL_PARAMS);
		tmp = tmp.concat([stringArray[0]]);
		stringArray = tmp;
	}
	ON_ITEM = null;
	QUEUED_ACTION = null;
	ADDITIONAL_PARAMS = [];
	length = stringArray.length
	console.log(stringArray);

	// Iterate through
	for(var i = 0; i < length;i++) {
		word = stringArray[i];
		if($.inArray(word, commands) != -1) {
			executeCommand(word, stringArray.slice(i+1, length));
			// Executed command
		} else if($.inArray(word, conjunction) != -1) {
			var doNothing = null; //Dummy
		}
		if(executeAction(word, stringArray.slice(i+1, length), "room")) {
			// Executed action!
		} else {
			//replyConfused = true;
		}
		if(WITH_ITEM != null) {
			reply("Wow, you have to so much to say, I like that, but sometimes it is too much...");
			return;
		}
	}
	if(replyConfused) {
		reply("I didn't understand all of that...");
	}
}

function executeAction(command, params, itemInRoomOrPlayer) {
	console.log("Action: " + command + ", " + params);
	var item;
	// Try to find items
	for(i in params) {
		// In the room
		if(itemInRoomOrPlayer == "room") {
			item = PLAYER.currentRoom.getItem(params[i]);
		} else {
			item = PLAYER.items[params[i]];
		}
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
		var item = PLAYER.currentRoom.items[params[0]];
		if(item == undefined) {
			reply("There are no " + params[0] + " in here...");
			return;
		}
		if(item.takeable == "yes") {
			PLAYER.addItem(item);
			PLAYER.currentRoom.removeItem(item);
			reply("You took the " + item.getName() + ".");
		} else {
			reply(item.takeable);
		}
		break;
		case "drop":
		var item = PLAYER.items[params[0]];
		if(item == undefined) {
			reply("You have no " + params[0] + " on you...");
			return;
		}
		PLAYER.removeItem(item);
		PLAYER.currentRoom.addItem(item);
		reply("Dropped " + item.name + ".");
		break;
		case "look":
		reply(PLAYER.getRoomDescription());
		break;
		case "inventory":
		reply(PLAYER.getInventoryList());
		break;
		case "check":
		if(params[0] == undefined) {
			reply("Check what?");
			setQueuedAction("check", null, []);
			return;
		} else {
			// Check room
			if(params[0] == "room") {
				reply(PLAYER.getRoomDescription());
				return;
			} else {
				var item = getItemIfReachable(params[0]);
				if(item != null) {
					reply(item.desc);
					return;
				} else {
					reply("That is just absurd!");
					return;
				}
			}
		}
		break;
	}
}

//function setQueuedAction(commandToQueue, onItem, neededItemsList, itemLocation, additionalParameters) {
	function setQueuedAction(commandToQueue, onItem, additionalParameters) {
	//WITH_ITEM = neededItemsList;
	ON_ITEM = onItem;
	QUEUED_ACTION = commandToQueue;
	ADDITIONAL_PARAMS = additionalParameters;
	//ITEM_IN_ROOM_OR_PLAYER = itemLocation;
}

// Check if word is mentioned in the Array
function isMentioned(word, array) {
	if($.inArray(word, array) != -1) {
		return true;
	}
	return false;
}

function getItemIfReachable(itemName) {
	// Check if on player
	var item = PLAYER.items[itemName];
	if(item == null) {
		item = PLAYER.currentRoom.items[itemName];
	}
	return item;
}