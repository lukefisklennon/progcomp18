var input = require("./input.js");
var n = Number(input());

for (var i = 0; i < n; i++) {
	var line = input();
	process(line);
}

function process(line) {
	var hours = Number(line.substring(0, 2));
	var minutes = Number(line.substring(2, 4));

	var word = "";
	var difference = minutes;
	if (minutes <= 30) {
		word = "past ";
	} else if (minutes > 30) {
		word = "to ";
		difference = 60 - minutes;
		hours++;
	}

	if (difference == 1) {
		difference = "a minute ";
	} else if (difference == 15) {
		difference = "a quarter ";
	} else if (difference == 30) {
		difference = "half ";
	} else if (difference == 0) {
		difference = "";
		word = "";
	} else {
		difference += " minutes ";
	}

	var m = "am";
	if (hours > 12) {
		hours -= 12;
		m = "pm";
	}
	if ((hours == 0 && m == "am") || (hours == 12 && m == "pm")) {
		m = " midnight";
		hours = 12;
	} else if ((hours == 0 && m == "pm") || (hours == 12 && m == "am")) {
		m = " noon";
	}

	console.log(line + " is " + difference + word + hours + m);
}

function toggle(m) {
	if (m == "am") {
		return "pm";
	}
	return "am";
}
