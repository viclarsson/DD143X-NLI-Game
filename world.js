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
ITEM_BOX.addAction("break", function(params) {
	if(!isMentioned("with", params)) {
		// No with
		reply("With what?!");
		setQueuedAction("break", "box", ["with"]); // Should the item be in the room or on player?
	} else {
		if(isMentioned(ITEM_HAMMER.getName(), params)) {
			// Talks about hammer
			if(PLAYER.hasItem("hammer")) {
				PLAYER.currentRoom.removeItem(ITEM_BOX);
				ROOM_LECTUREHALL.setLockedText("open")
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
ROOM_CORRIDOR.addItem(ITEM_BOX);

var ITEM_NERD = new Item("Nerd", "Some nerd is programming on his Macbook. What a hipster. Better keep it down though, wouldn’t want to disturb him.", "Are you out of your mind?!");
ITEM_NERD.addAction("talk", function() {
	reply("The nerd glares at you, mumbles something about the KTH code of honor and then gets back to his programming.");
});
ITEM_NERD.addAction("attack", function(params) {
	if(!isMentioned("with", params)) {
		// No with
		reply("With what?!");
		// Define the "correct" item in the third argument. setQueuedAction(action, onItem, needItem, roomOrOnPlayer)
		setQueuedAction("break", "box", ["with"]); // Should the item be in the room or on player?
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
var ROOM_LECTUREHALL = new Room ("Lecture hall", "As you enter the lecture hall you look at your watch realizing that you're 10 minutes late. But then again, you didn't choose the thug life. You find and empty seat and sit down. Mission accomplished. You finished the game!");
ROOM_LECTUREHALL.setLockedText("A large box is in the way. You should try to break it or maybe move it if you have the strength!");
ROOM_CORRIDOR.addExit("north", ROOM_LECTUREHALL);
var PLAYER = new Player(ROOM_CORRIDOR);

// ==== ORANGE ====
var ROOM_ORANGE = new Room ("Orange", "You are in the computer lab Orange. It seems like all of the computers have been moved, that’s weird.", 
"To the north is the computer lab Yellow, to the east is the corridor, to the south is the computer lab Red.");
ROOM_ORANGE.addExit("north", ROOM_YELLOW);
ROOM_ORANGE.addExit("west", ROOM_CORRIDOR);
ROOM_ORANGE.addExit("south", ROOM_RED);

var ITEM_EMPTYBOTTLE = new Item("Empty bottle", "On a table in the corner stands a bottle, it looks empty.", "yes");
ROOM_ORANGE.addItem(ITEM_EMPTYBOTTLE);

// ==== YELLOW ====
var ROOM_YELLOW = new Room("Yellow", "You are in the computer lab Yellow”, "To the south is the computer lab Orange");
ROOM_YELLOW.addExit("south", ROOM_ORANGE);

var ITEM_COMPUTER = new Item ("Computer", "There are some computers here", "You should leave the computers here.");
ITEM_COMPUTER.addAction("use", function() {
	reply("You browse Facebook, seems like you have a notification. Oh, only an invite to play Candy Crush. What did you expect, you study computer science. You don’t have a social life.");
});
ROOM_YELLOW.addItem(ITEM_COMPUTER);

var ITEM_VIGGO = new Item ("Viggo", "Viggo Kann is sitting by a desk reading a NP-hard book. He’s holding the book upside down but seems to be enjoying it nonetheless. Better not point it out or he might give you a bad grade.", "Not sure thats a good idea");
ITEM_VIGGO.addAction("talk", function(){
	if(Player.hasItem("Key")){
		reply("Viggo looks at you and nods, then keeps on reading.");
	}else{
		reply("Viggo looks up at you with a confused look on his face, he tells you he’s thirsty then keeps on reading.");
	}
});
ITEM_VIGGO.addAction("give", function(){
	if(isMentioned("bottle")){
		if(Player.hasItem("Empty bottle")){
			reply("The bottle is empty, better fill it with something first.");
		}
		if else(Player.hasItem("Water bottle")){
			reply("Viggo accepts the water bottle. He stands up and chugs it in one go, you are mildly impressed. He then takes out a key from his pocket and gives it to you before going back to reading.");
			//ta bort flaskan
			//lägg till key
		}
		else{
			reply("You do not have a bottle");
		}
	}else{
		reply("Viggo doesn't want this");
	}
});
ROOM_YELLOW.addItem(ITEM_VIGGO);

// ==== BATHROOM ====
var ROOM_BATHROOM = new Room("Bathroom", "You are in the bathroom", "To the north is the corridor.");
ROOM_BATHROOM.addExit("north", ROOM_CORRIDOR);

var ITEM_NUMBER = new Item("Number", "On one of the walls there is something written: “Call this number for a good time” followed by a telephone number. Seems legit.
", "You can't remove this from the wall");
ITEM_NUMBER.addAction("call", function(){
	reply("You call the number. You can hear someone breath heavily into the telephone. When you ask for a good time the person hangs up. Better luck next time.");	
});
ROOM_BATHROOM.addItem(ITEM_NUMBER);

var ITEM_TOILET = new Item("Toilet", "There is a toilet bowl by the opposite wall.", "Why would you ever want to bring this with you?");
ITEM_TOILET.addAction("use", function(params) {
	if(!isMentioned("with", params)) {
		// No with
		reply("With what?!");
		setQueuedAction("use", "bottle", ["with"]); // Should the item be in the room or on player?
	} else {
		if(isMentioned(ITEM_EMPTYBOTTLE.getName(), params)) {
			if(PLAYER.hasItem("Empty bottle")) {
				//ta bort emptybottle
				//lägg till full bottle
				reply("You fill the bottle with toilet water because doing that makes perfect sense. Your empty bottle just transformed into… a water bottle. Amazing!");
			} else {
				reply("You dont have a bottle");
			}
		} else if(isMentioned(ITEM_WATERBOTTLE.getName(), params){
			reply("The bottle is already full, you decide not to empty it, might need this for later.");
			
		}else{
			reply("Don't think so...");
		}
	}
});
ROOM_BATHROOM.addItem(ITEM_TOILET);

var ITEM_SINK = new Item("Sink", "A sink is attached to the wall.", "You try to remove it from the wall but it is stuck.");
ITEM_SINK.addAction("use", function(params) {
	if(!isMentioned("with", params)) {
		// No with
		reply("With what?!");
		setQueuedAction("use", "bottle", ["with"]); // Should the item be in the room or on player?
	} else {
		if(isMentioned(ITEM_EMPTYBOTTLE.getName(), params)) {
			if(PLAYER.hasItem("Empty bottle")) {
				//ta bort emptybottle
				//lägg till full bottle
				reply("You decide to do the sane thing and fill the bottle in the sink instead of the toilet. Good for you. Just don’t expect and award. Your empty bottle just transformed into… a water bottle. Shocking!");
			} else {
				reply("You dont have a bottle");
			}
		} else if(isMentioned(ITEM_WATERBOTTLE.getName(), params){
			reply("The bottle is already full, you decide not to empty it, might need this for later.");
			
		}else{
			reply("Don't think so...");
		}
	}
});
ROOM_BATHROOM.addItem(ITEM_SINK);

// ==== RED ====

//TODO






