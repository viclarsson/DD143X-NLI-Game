/* Build the world here! */	


// ==== CORRIDOR ====
var ROOM_CORRIDOR = new Room ("Corridor", "You are in the corridor. Just a plain corridor, nothing special.",
	"To the south is the bathroom, to the west is the computer lab called “Orange”, to the north is the lecture hall.");

var ITEM_HAMMER = new Item("hammer", "A black hammer.", "yes"); // ADDED TAKEABLE PARAM! "yes" => takeable, otherwise, define a nice string.
ROOM_CORRIDOR.addItem(ITEM_HAMMER);

/* = ITEM_BOX = */
var ITEM_BOX = new Item("Box", "A large box is blocking your way into the lecture hall, there might be a way to break it.", "Too heavy!");
ITEM_BOX.addAction("move", function() {
	reply("You move the box. Oh, wait, you didn't. It's too heavy.");
});
ITEM_BOX.addAction("break", function() {
	if(PLAYER.hasItem("hammer")) {
		PLAYER.currentRoom.removeItem(ITEM_BOX);
		reply("You break the box with the hammer. I told you it would prove useful! You can now go north into the lecture hall");
	} else {
		reply("You try to break the box but your lack of physical strength makes it impossible. You really got to sign up for a gym membership. Yeah, maybe next year.");
	}
});
ROOM_CORRIDOR.addItem(ITEM_BOX);

var ITEM_NERD = new Item("Nerd", "Some nerd is programming on his Macbook. What a hipster. Better keep it down though, wouldn’t want to disturb him.", "Are you out of your mind?!");
ITEM_NERD.addAction("talk", function() {
	reply("The nerd glares at you, mumbles something about the KTH code of honor and then gets back to his programming.");
});
ITEM_NERD.addAction("attack", function(params) {
	if(!PLAYER.hasItem("hammer")) {
		reply("You want to attack the nerd but you lack a sufficient weapon...");
	} else if(jQuery.inArray(ITEM_HAMMER.getName(), params) != -1) {
		reply("In a blind rage you smack the nerd across the face with the hammer. As you come to your senses, you realize what you've done. Oh well, too late to regret it now. Back to business.");
	} else {
		reply("Attack with what?!");
	}
});
	ROOM_CORRIDOR.addItem(ITEM_NERD);

// ==== LECTURE HALL ====
var ROOM_LECTUREHALL = new Room ("Lecture hall", "As you enter the lecture hall you look at your watch realizing that you're 10 minutes late. But then again, you didn't choose the thug life. You find and empty seat and sit down. Mission accomplished. You finished the game!")
ROOM_LECTUREHALL.setLockedText("A large box is in the way. You should try to break it or maybe move it if you have the strength!");
ROOM_CORRIDOR.addExit("north", ROOM_LECTUREHALL);
var PLAYER = new Player(ROOM_CORRIDOR);
