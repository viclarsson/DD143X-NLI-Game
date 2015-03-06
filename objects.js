function Player (startRoom) {
	this.currentRoom = startRoom;
	this.items = {};
	this.addItem = function (item) {
		this.items[item.getName()] = item;
	}
	this.hasItem = function (item) {
		if(this.items[item.getName()] != undefined) {
			return true;
		} else {
			return false;
		}
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
	this.addExit = function (command, room) {
		this.exits[command] = room;
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
	this.getActionCommands = function () {
		var actions = [];
		for(i in this.items) {
			actions.push(Object.keys(this.items[i].getActions()));
		}
		return actions;
	}

	this.getFullDesc = function () {
		var itemList = "";
		for (i in this.items) { 
			itemList += " " + this.items[i].desc;
		}
		return (desc + " " + directions + itemList).trim();
	}
}

function Item (name, desc) {
	this.name = name;
	this.desc = desc;
	this.adjective = "";
	this.actions = {};
	this.addAction = function (command, actionFunction) {
		this.actions[command] = actionFunction;
	}
	this.getActions = function () {
		return this.actions;
	}
	this.getName = function () {
		return this.name.toLowerCase().trim();
	}
}