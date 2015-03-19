/* Build the world here! */	


// ==== CORRIDOR ====
var ROOM_CORRIDOR = new Room ("Corridor", "You are in the corridor. Just a plain corridor, nothing special.",
	"To the south is the bathroom, to the west is the computer lab called “Orange”, to the north is the lecture hall.");
var ITEM_PEN = new Item("Pen", "A nice pen.", "A pen is visible in one of the corners of the room.", "yes");
/* = ITEM_BOX = */
var ITEM_BOX = new Item("Box", "A very large box.", "A large box is blocking your way into the lecture hall, there might be a way to break it.", "Too heavy!");
ITEM_BOX.addAction("move", function() {
	reply("You move the box. Oh, wait, you didn't. It's too heavy.");
});
ITEM_BOX.addAction("break", function(params) {
	if(!isMentioned("with", params)) {
		// No with
		reply("With what?!");
		setQueuedAction("break", "box", ["with"]); // Should the item be in the room or on PLAYER?
	} else {
		if(isMentioned(ITEM_HAMMER.getName(), params)) {
			// Talks about hammer
			if(PLAYER.hasItem("hammer")) {
				PLAYER.currentRoom.removeItem(ITEM_BOX);
				ROOM_LECTUREHALL.setLockedText("open");
				reply("You break the box with the hammer. I told you it would prove useful! You can now go north into the lecture hall");
			} else {
				reply("You don't have the hammer! Look for it!");
			}
		} else {
			// Talks about other item
			reply("Don't think so...");
		}
	}
});
ITEM_BOX.addAction("smash", ITEM_BOX.actions["break"]);
ROOM_CORRIDOR.addItem(ITEM_BOX);
ROOM_CORRIDOR.addItem(ITEM_PEN);

var ITEM_NERD = new Item("nerd", "A nerd.", "Some nerd is programming on his Macbook. What a hipster. Better keep it down though, wouldn’t want to disturb him.", "Are you out of your mind?!");
ITEM_NERD.addAction("talk", function() {
	reply("The nerd glares at you, mumbles something about the KTH code of honor and then gets back to his programming.");
});
ITEM_NERD.addAction("speak", ITEM_NERD.actions["talk"]);
ITEM_NERD.addAction("attack", function(params) {
	if(!isMentioned("with", params)) {
		// No with
		reply("With what?!");
		// Define the "correct" item in the third argument. setQueuedAction(action, onItem, needItem, roomOrOnPLAYER)
		setQueuedAction("attack", "nerd", ["with"]); // Should the item be in the room or on PLAYER?
	} else {
		if(isMentioned(ITEM_HAMMER.getName(), params)) {
			// Talks about hammer
			if(PLAYER.hasItem("hammer")) {
				reply("In a blind rage you smack the nerd across the face with the hammer. As you come to your senses, you realize what you've done. Oh well, too late to regret it now. Back to business.");
			} else {
				reply("You don't have the hammer! Look for it!");
			}
		} else {
			// Talks about other item
			reply("You want to attack the nerd but you lack a sufficient weapon... Maybe something that lies around?");

		}
	}
});
ROOM_CORRIDOR.addItem(ITEM_NERD);

// ==== LECTURE HALL ====
var ROOM_LECTUREHALL = new Room ("Lecture hall", "As you enter the lecture hall you look at your watch realizing that you're 10 minutes late. But then again, you didn't choose the thug life. You find and empty seat and sit down. Mission accomplished. You finished the game!", "Congratulations!");
ROOM_LECTUREHALL.setLockedText("A large box is in the way. You should try to break it or maybe move it if you have the strength!");

// ==== ORANGE ====
var ROOM_ORANGE = new Room ("Orange", "You are in the computer lab Orange. It seems like all of the computers have been moved, that’s weird.", 
	"To the north is the computer lab Yellow, to the east is the corridor, to the south is the computer lab Red.");

var ITEM_BOTTLE = new Item("bottle", "An empty bottle.", "On a table in the corner stands an empty bottle.", "yes");
ITEM_BOTTLE.state = "empty";
ITEM_BOTTLE.addAction("fill", function(params) {
	if(PLAYER.hasItem("bottle")) {
		// Player has bottle
		if(PLAYER.items["bottle"].state == "full") {
			reply("The bottle is already full.");
			return;
		}

		if(PLAYER.currentRoom != ROOM_BATHROOM) {
			// Not in bathroom
			reply("You cannot fill the bottle here.");
		} else {
			// We are in the bathroom
			if(!isMentioned("using", params)) {
				// No with
				reply("Fill bottle using the tap or the toilet?");
				setQueuedAction("fill", "bottle", ["using"]);
			} else {
				// Mentioned
				if(isMentioned("toilet", params) || isMentioned("tap", params)) {
					PLAYER.items["bottle"].state = "full";
					PLAYER.items["bottle"].description = "A bottle filled with water.";
					if(isMentioned("toilet", params)) {
						//Used toiled
						reply("You fill the bottle with toilet water because doing that makes perfect sense. Your empty bottle just transformed into… a water bottle. Amazing!");

					} else {
						reply("You decide to do the sane thing and fill the bottle with water from the tap instead of the toilet. Good for you. Just don’t expect an award. Your empty bottle just transformed into… a water bottle. Shocking!");
					}
					return;
				} else {
					reply("Don't think so...");
					return;
				}
			}
		}
	} else {
		// Player does not have bottle
		reply("You do not have the bottle on you...");
		return;
	}
});
ITEM_BOTTLE.addAction("use", ITEM_BOTTLE.actions["fill"]);
ROOM_ORANGE.addItem(ITEM_BOTTLE);

// ==== YELLOW ====
var ROOM_YELLOW = new Room("Yellow", "You are in the computer lab Yellow.", "To the south is the computer lab Orange.");

var ITEM_COMPUTER = new Item ("Computer", "A running computer", "There are some computers here.", "You should leave the computers here.");
ITEM_COMPUTER.addAction("use", function() {
	reply("You browse Facebook, seems like you have a notification. Oh, only an invite to play Candy Crush. What did you expect, you study computer science. You don’t have a social life.");
});
ROOM_YELLOW.addItem(ITEM_COMPUTER);

var ITEM_MICHAEL = new Item ("Michael", "Michael", "Michael is sitting by a desk reading a NP-hard book. Why don't you speak to him?", "Not sure thats a good idea...");
ITEM_MICHAEL.addAction("talk", function(){
	if(PLAYER.hasItem("key")){
		reply("Michael looks at you and nods, then keeps on reading.");
	}else{
		reply("Michael looks up at you, he tells you he’s thirsty then keeps on reading. Maybe you could help him.");
	}
});
ITEM_MICHAEL.addAction("speak", ITEM_MICHAEL.actions["talk"]);

// KEY TO GIVE
var ITEM_KEY = new Item("key", "A shiny key.", "A key lies in the room.", "yes");
ITEM_MICHAEL.addAction("give", function(params){
	if(isMentioned("bottle", params)){
		if(PLAYER.hasItem("bottle")){
			// Has bottle
			if(PLAYER.items['bottle'].state == "empty") {
				reply("The bottle is empty, better fill it with something first.");
				return;
			} else {
				reply("Michael accepts the water bottle. He stands up and chugs it in one go, you are mildly impressed. He then takes out a key from his pocket and gives it to you before going back to reading.");
				PLAYER.removeItem(ITEM_BOTTLE);
				PLAYER.addItem(ITEM_KEY);
				ROOM_RED.setLockedText("open");
				DATE = new Date();
				console.log("GIVE BOTTLE: " + DATE.getHours() + ":" + DATE.getMinutes() + ":" + DATE.getSeconds());
				return;
			}
		} else {
			reply("You do not have a bottle?!");
			return;
		}
	} else {
		reply("Michael doesn't want this!");
	}
});
ROOM_YELLOW.addItem(ITEM_MICHAEL);

// ==== BATHROOM ====
var ROOM_BATHROOM = new Room("Bathroom", "You are in the bathroom", "To the north is the corridor.");

var ITEM_NUMBER = new Item("Number", "A number on the wall.", "On one of the walls there is something written: “Call this number for a good time” followed by a telephone number. Seems legit.", "You can't remove this from the wall");
ITEM_NUMBER.addAction("call", function(){
	reply("You call the number. You can hear someone breath heavily into the telephone. When you ask for a good time the person hangs up. Better luck next time.");	
});
ROOM_BATHROOM.addItem(ITEM_NUMBER);

var ITEM_TOILET = new Item("Toilet", "A toilet", "There is a toilet bowl by the opposite wall.", "Why would you ever want to bring this with you?");
ROOM_BATHROOM.addItem(ITEM_TOILET);

var ITEM_TAP = new Item("Tap", "A tap", "A tap is attached to the wall.", "You try to remove it from the wall but it is stuck.");
ROOM_BATHROOM.addItem(ITEM_TAP);

var ROOM_RED = new Room("Red", "You are in the computer lab Red.", "To the north is the computer lab Orange.");
ROOM_RED.setLockedText("You need a key to enter this room...");
var ITEM_HAMMER = new Item("hammer", "A black hammer.", "On the floor lies a hammer.", "yes"); // ADDED TAKEABLE PARAM! "yes" => takeable, otherwise, define a nice string.
ROOM_RED.addItem(ITEM_HAMMER);

// EXITS

ROOM_CORRIDOR.addExit("north", ROOM_LECTUREHALL);
ROOM_CORRIDOR.addExit("south", ROOM_BATHROOM);
ROOM_CORRIDOR.addExit("west", ROOM_ORANGE);

ROOM_BATHROOM.addExit("north", ROOM_CORRIDOR);

ROOM_ORANGE.addExit("north", ROOM_YELLOW);
ROOM_ORANGE.addExit("east", ROOM_CORRIDOR);
ROOM_ORANGE.addExit("south", ROOM_RED);

ROOM_YELLOW.addExit("south", ROOM_ORANGE);

ROOM_RED.addExit("north", ROOM_ORANGE);

// Initialize PLAYER in one room
var PLAYER = new Player(ROOM_CORRIDOR);



