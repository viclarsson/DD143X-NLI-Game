function Player (startRoom) {
	this.currentRoom = startRoom;
	this.items = {};
	this.addItem = function (item) {
		this.items[item.name.toLowerCase()] = item;
	}
}

function Room (name, desc, directions) {
	this.name = name;
	this.desc = desc;
	this.directions = directions;
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
		this.items[item.name.toLowerCase()] = item;
	}

	// Array of NPCs
	this.npcs = [];
	this.addNpc = function (npc) {
		this.npcs.push(npc);
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
	this.takeable = false;
	this.edible = false;
	this.getName = function () {
		return (this.adjective + " " + this.name).trim();
	}
}

function NPC (name, desc) {
	this.name = name;
	this.desc = desc;
	this.getName = function () {
		return this.name;
	}
}

function World (rooms) {
	this.rooms = rooms;
}

/* Build the world here! */	
var corridor = new Room ("Corridor", "You are in the corridor. Just a plain corridor, nothing special. Some nerd is programming on his Macbook. What a hipster. Better keep it down though, wouldn’t want to disturb him.", "To the south is the bathroom, to the west is the computer lab called “Orange”, to the north is the lecture hall.")
corridor.addItem(new Item("Box", "A large box is blocking your way into the lecture hall, there might be a way to break it."));
console.log(corridor);
var PLAYER = new Player(corridor);
var WORLD = new World([corridor]);
