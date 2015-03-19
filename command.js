// Define dictionairy
var commands = ["go", "walk", "take", "grab", "pick", "grip", "drop", "leave", "look", "inventory", "check", "examine", "inspect"];
var GLOBAL_ACTIONS = [];
var conjunction = ["and", "then"];
var prepositions = ["to", "a", "the", "out", "up"];

// For answeing to "with what";
var PREVIOUS_COMMAND_OR_ACTION = null;
var WITH_ITEM = null;
var ON_ITEM = null;
var ITEM_IN_ROOM_OR_PLAYER = null;
var QUEUED_ACTION = null;
var ADDITIONAL_PARAMS = [];
var DATE = null;

function processCommand(stringArray) {
	var length = stringArray.length;
	var word = null;
	var nothing = true;

	if(DATE == null) {
		DATE = new Date();
		console.log("STARTED: " + DATE.getHours() + ":" + DATE.getMinutes() + ":" + DATE.getSeconds());
	}

	// Remove prepositions
	var tmp = []
	for(var i = 0; i < length;i++) {
		if(jQuery.inArray(stringArray[i], prepositions) == -1) {
			tmp.push(stringArray[i]);
		}
	}
	length = stringArray.length;
	// Remove if clear is used
	for(var i = 0; i < length;i++) {
		if(stringArray[i] == "clear") {
			tmp = tmp.splice(i, length);
		}
	}

	stringArray = tmp;
	// If an action requests an item and then make a new complete request string
	if(QUEUED_ACTION != null && !isMentioned(stringArray[0], GLOBAL_ACTIONS) && !isMentioned(stringArray[0], commands)) {
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
	//console.log(stringArray);

	// Iterate through
	for(var i = 0; i < length;i++) {
		word = stringArray[i];
		if($.inArray(word, commands) != -1) {
			executeCommand(word, stringArray.slice(i+1, length));
			PREVIOUS_COMMAND_OR_ACTION = word;
			nothing = false;
			// Executed command
		} else if($.inArray(word, conjunction) != -1) {
			var doNothing = null; //Dummy
		} else if(executeAction(word, stringArray.slice(i+1, length))) {
			// Executed action!
			PREVIOUS_COMMAND_OR_ACTION = word;
			nothing = false;
		} else if(word == null) {
			maybeError = true;
		}
		if(WITH_ITEM != null) {
			reply("Wow, you have to so much to say, I like that, but sometimes it is too much...");
			return;
		}
	}
	if(nothing) {
		reply("I didn't understand all of that...");
	}
	// Scroll to bottom
	window.scrollTo(0,document.body.scrollHeight);
}

function executeAction(command, params, itemInRoomOrPlayer) {
	//console.log("Action: " + command + ", " + params);
	//console.log(PREVIOUS_COMMAND_OR_ACTION);
	var item = null;
	// Try to find items
	for(i in params) {
		// In the room
		item = getItemIfReachable(params[i]);
		// Execute the action with the item found if possible
		if(item != null && item.actions[command] != undefined) {
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
			reply("You cannot go there...");
			return;
		}
		if(newRoom.locked != "open") {
			reply(newRoom.locked);
			return;
		}
		PLAYER.currentRoom = newRoom;
		reply(PLAYER.currentRoom.getFullDesc());
		if(PLAYER.currentRoom == ROOM_LECTUREHALL) {
			DATE = new Date();
			console.log("ENDED: " + DATE.getHours() + ":" + DATE.getMinutes() + ":" + DATE.getSeconds());
		}
		break;
		case "take":
		case "grab":
		case "pick": // pick up is possible
		case "grip":
		if(params[0] == "all") {
			reply("You have to take all items seperately.");
			return;
		}
		var item = PLAYER.currentRoom.items[params[0]];
		if(item == undefined) {
			reply("There is no " + params[0] + " in here...");
			return;
		}
		if(item.takeable == "yes") {
			PLAYER.addItem(item);
			PLAYER.currentRoom.removeItem(item);
			reply("You took the " + item.getName() + ".");
			if(item.getName() == "bottle") {
				DATE = new Date();
				console.log("TOOK BOTTLE: " + DATE.getHours() + ":" + DATE.getMinutes() + ":" + DATE.getSeconds());
			}
		} else {
			reply(item.takeable);
		}
		break;
		case "drop":
		case "leave":
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
		var inventoryList =  PLAYER.getInventoryList();
		if(inventoryList == "") {
			reply("You don't have anything on you.");
		} else {
			reply("You currenly have: " + inventoryList);
		}
		return;
		break;
		case "check":
		case "examine":
		case "inspect":
		if(params[0] == undefined) {
			reply("Check what?");
			setQueuedAction("check", null, []);
			return;
		} else {
			// Check room
			if(params[0] == "room") {
				reply(PLAYER.getRoomDescription());
				return;
			} else if(params[0] == "inventory") {
				executeAction("inventory", [], "player");
				return;
			}else {
				var item = getItemIfReachable(params[0]);
				if(item != null) {
					reply(item.description);
					return;
				} else {
					reply("There is no item like that one around here...");
					return;
				}
			}
		}
		break;
	}
}

// To queue a query
function setQueuedAction(commandToQueue, onItem, additionalParameters) {
	ON_ITEM = onItem;
	QUEUED_ACTION = commandToQueue;
	ADDITIONAL_PARAMS = additionalParameters;
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