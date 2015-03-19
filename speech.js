 var finalTranscript = '';
 var recognizing = false;
 var USE_SPEECH = false;
 var BACKSPACE_ERRORS = 0;
 var PREVIOUSKEYID = null;

 $(document).ready(function() {

        // check that your browser supports the API
        if (!('webkitSpeechRecognition' in window)) {
        	alert("Sorry, your Browser does not support the Speech API");

        } else {
            // Create the recognition object and define the event handlers

            var recognition = new webkitSpeechRecognition();
            var keepAlive = false;
            recognition.continuous = true;         // keep processing input until stopped
            recognition.interimResults = true;     // show interim results
            recognition.lang = 'en-US';           // specify the language

            recognition.onstart = function() {
            	recognizing = true;
            	$('#startSpeech').html('Release space to end speech input');
            };

            recognition.onerror = function(event) {
            	console.log("Speech error: " + event.error);
            };

            recognition.onend = function() {
                $('#startSpeech').html('Hold space to talk!');
                recognizing = false;
                recognition.stop();
            /*if(!keepAlive) {
            	recognizing = false;
            	console.log("Ended");
            	} else {
            		recognition.start();
            		console.log("Kept alive.");
            	}
                */
            };

            recognition.onresult = function(event) {
            	var interimTranscript = '';

                // Assemble the transcript from the array of results
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                	if (event.results[i].isFinal) {
                		finalTranscript += event.results[i][0].transcript;
                	} else {
                		interimTranscript += event.results[i][0].transcript;
                	}
                }

                // MADE IT MORE CONFUSING BECAUSE DELAY
                //$("#speak").val(interimTranscript);

                //console.log("interim:  " + interimTranscript);

                // update the page
                if(finalTranscript.length > 0) {
                	$("#speak").val(finalTranscript);
                	finalTranscript = "";
                	$("#form").submit();
                }
            };

            $("#startSpeech").click(function(e) {
            	e.preventDefault();
                if(!USE_SPEECH) {
                    USE_SPEECH = true;
                    $('#startSpeech').html('Hold space to talk!');
                } else {
                    USE_SPEECH = false;
                    $(this).html("Speech disabled!");
                }
            });

            document.onkeydown = function(e) {
                if(USE_SPEECH) {
                    if (e.keyCode == 0 || e.keyCode == 32) {
                        // console.log('Space down!');
                        if(!recognizing) {
                            recognizing = true;
                            finalTranscript = '';
                            recognition.start();
                        }
                    }
                } else if(e.keyCode == 8 || e.keyCode == 46) {
                    if(PREVIOUSKEYID != 8 && PREVIOUSKEYID != 46) {
                        BACKSPACE_ERRORS++;
                        $("#error-count").html(BACKSPACE_ERRORS);
                        //console.log("Added error! Total: " + BACKSPACE_ERRORS);
                    }
                }
                PREVIOUSKEYID = e.keyCode;
            }
            document.onkeyup = function(e) {
                if(USE_SPEECH) {
                   finalTranscript = '';
                   recognizing = false;
                   recognition.stop();
               }
           }
       }
   });