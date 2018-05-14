var input = require("./input.js");

var n = Number(input());
for (var i = 0; i < n; i++) {
	var original = input();
	var formatted = "";
	var reversed = "";
	for (var j = 0; j < original.length; j++) {
		if (original[j] != " " && (!isNaN(Number(original[j])) || original[j].toUpperCase() != original[j].toLowerCase())) {
			formatted += original[j];
		}
		formatted = formatted.toLowerCase();
	}
	for (var j = 0; j < formatted.length; j++) {
		reversed += formatted[formatted.length - j - 1];
	}
	var output = "";
	if (formatted == reversed) {
		output += "Yes";
	} else {
		output += " No";
	}
	output += " \"" + original + "\"";
	console.log(output);
}
