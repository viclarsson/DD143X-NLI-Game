function Player (startRoom) {
	this.currentRoom = startRoom;
	this.getRoomDescription = function() {
		return PLAYER.currentRoom.getFullDesc();
	}
	this.items = {};
	this.addItem = function (item) {
		this.items[item.getName()] = item;
	}
	this.hasItem = function (itemName) {
		if(this.items[itemName] != undefined) {
			return true;
		} else {
			return false;
		}
	}
	this.removeItem = function (item) {
		delete this.items[item.getName()];
	}
	this.getInventoryList = function (item) {
		var itemList = "";
		for (i in this.items) { 
			itemList += " " + this.items[i].description;
		}
		return itemList;
	}
}

function Room (name, desc, directions) {
	this.name = name;
	this.desc = desc;
	this.directions = directions;
	this.locked = "open";
	this.setLockedText = function (string) {
		this.locked = string;
	}

	// Array of exits
	this.exits = {};
	this.addExit = function (commandString, room) {
		this.exits[commandString] = room;
	}
	this.removeExit = function (commandString) {
		delete this.exits[commandString];
	}
	this.getRoomFromExit = function(command) {
		return this.exits[command];
	}

	// Array of items
	this.items = {};
	this.addItem = function (item) {
		this.items[item.getName()] = item;
	}
	this.getItem = function (itemName) {
		return this.items[itemName];
	}
	this.removeItem = function (item) {
		delete this.items[item.getName()];
	}

	this.getFullDesc = function () {
		var itemList = "";
		return (desc + " " + directions + this.getRoomItemList()).trim();
	}

	this.getRoomItemList = function () {
		var itemList = "";
		for (i in this.items) { 
			itemList += " " + this.items[i].roomDescription;
		}
		return itemList;
	}
}

function Item (name, itemDesc, roomDesc, takeable) {
	this.name = name;
	this.description = itemDesc;
	this.roomDescription = roomDesc;
	this.state = "";
	this.takeable = takeable;
	this.actions = {};
	this.addAction = function (command, actionFunction) {
		GLOBAL_ACTIONS.push(command);
		this.actions[command] = actionFunction;
	}
	this.getActions = function () {
		return this.actions;
	}
	this.getName = function () {
		return this.name.toLowerCase().trim();
	}
}