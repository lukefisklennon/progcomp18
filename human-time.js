var input = require("./input.js");
var n = Number(input());

for (var i = 0; i < n; i++) {
	var line = input();
	process(line);
}

function process(line) {
	var hours = Number(line.substring(0, 2));
	var minutes = Number(line.substring(2, 4));

	var word;
	var difference = minutes;
	var functions = [
		function() {
			word = "past ";
		},
		function() {
			word = "to ";
			difference = 60 - minutes;
			hours++;
		}
	]
	functions[Math.floor((Math.abs(minutes - 1)) / 30) % 2]();

	var phrases = {
		"0": "",
		"1": "a minute " + word,
		"15": "a quarter " + word,
		"30": "half " + word
	}

	if (difference != 1 && difference % 15 != 0) {
		difference += " minutes " + word;
	} else {
		difference = phrases[difference];
	}

	var periods = ["am", "pm"];
	m = periods[Math.floor(hours / 12) % 2];
	hours = hours % 12;

	var toggle = {
		"am": "pm",
		"pm": "am"
	}
	var functions = [
		function() {
			hours = 12;
			m = toggle[m];
		},
		function() {}
	]
	functions[Math.ceil(hours / 12)]();

	var names = {
		"12pm": " midnight",
		"12am": " noon"
	}

	var string = hours + m;

	if (string in names) {
		m = names[string];
	}

	console.log(line + " is " + difference + hours + m);
}
