
// Function for player input
function said(string) {
	$("#console").append("<br>> " + string + "<br>");
}

// Function for answering
function reply(string) {
	$("#console").append(string + "<br>")
}

// Function for outputting text
function log(string) {
	$("#console").append('<span class="log">' + string + '<span><br><br>');
}

// http://stackoverflow.com/questions/1119289/how-to-show-the-are-you-sure-you-want-to-navigate-away-from-this-page-when-ch
/*window.onbeforeunload = function (e) {
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'Any text will block the navigation and display a prompt';

    // For IE6-8 and Firefox prior to version 4
    if (e) 
    {
    	e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
};*/