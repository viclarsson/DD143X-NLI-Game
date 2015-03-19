
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>A simple NLI-based game</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<link rel="stylesheet" href="style.css?version=<?php echo uniqid(); ?>">
</head>
<body>
	<button id="startSpeech">Speech disabled!</button>
	<section id="console">
	</section>
	<section id="input">
		<div id="arrow">></div>
		<form method="get" action="#" id="form">
			<input type="text" id="speak"/>
			<input type="submit" id="button">
		</form>
	</section>

	<footer>
		Developed by Victor Larsson & Jesper Qvarfordt, 2015 for DD143X (Version <?php echo uniqid(); ?>) <span class="hidden" id="error-count"></span>
	</footer>


	<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.1.min.js"><\/script>')</script>
	<script src="speech.js?version=<?php echo uniqid(); ?>"></script>
	<script src="global.js?version=<?php echo uniqid(); ?>"></script>
	<script src="command.js?version=<?php echo uniqid(); ?>"></script>
	<script src="objects.js?version=<?php echo uniqid(); ?>"></script>
	<script src="world.js?version=<?php echo uniqid(); ?>"></script>
	<script src="game.js?version=<?php echo uniqid(); ?>"></script>
</body>
</html>