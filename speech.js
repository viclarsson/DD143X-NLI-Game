 var finalTranscript = '';
 var recognizing = false;

 $(document).ready(function() {

        // check that your browser supports the API
        if (!('webkitSpeechRecognition' in window)) {
        	alert("Sorry, your Browser does not support the Speech API");

        } else {
            // Create the recognition object and define the event handlers

            var recognition = new webkitSpeechRecognition();
            var keepAlive = true;
            recognition.continuous = true;         // keep processing input until stopped
            recognition.interimResults = true;     // show interim results
            recognition.lang = 'en-US';           // specify the language

            recognition.onstart = function() {
            	recognizing = true;
            	console.log('Speak slowly and clearly');
            	$('#startSpeech').html('Click to Stop');
            };

            recognition.onerror = function(event) {
            	console.log(event.error);
            };

            recognition.onend = function() {
            	if(!keepAlive) {
            	recognizing = false;
            	console.log("Ended");
            	} else {
            		recognition.start();
            		console.log("Kept alive.");
            	}
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
                console.log("interim:  " + interimTranscript);

                // update the page
                if(finalTranscript.length > 0) {
                	$("#speak").val(finalTranscript);
                	finalTranscript = "";
                	$("#form").submit();
                	//console.log("FINAL:" + finalTranscript);
                	//recognition.stop();
                	//recognition.start();
                	//$('#startSpeech').html('Click to Start Again');
                	//recognizing = false;
                }
            };

            $("#startSpeech").click(function(e) {
            	e.preventDefault();

            	if (recognizing) {
            		recognition.stop();
            		$('#startSpeech').html('Click to Start Again');
            		recognizing = false;
            	} else {
            		finalTranscript = '';
                    // Request access to the User's microphone and Start recognizing voice input
                    recognition.start();
                    console.log('Allow the browser to use your Microphone');
                    $('#startSpeech').html('waiting');
                    //$('#transcript').html('&nbsp;');
                }
            });
        }
    });