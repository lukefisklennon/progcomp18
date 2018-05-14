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
	if (minutes <= 30) {
		word = "past ";
	} else {
		word = "to ";
		difference = 60 - minutes;
		hours++;
	}

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

	if (hours == 0) {
		hours = 12;
		if (m == "am") {
			m = "pm";
		} else {
			m = "am";
		}
	}

	if (hours + m == "12pm") {
		m = " midnight";
	} else if (hours + m == "12am") {
		m = " noon";
	}

	console.log(line + " is " + difference + hours + m);
}
