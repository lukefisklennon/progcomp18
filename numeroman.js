var input = require("./input.js");

var n = Number(input());

for (var i = 0; i < n; i++) {
	var line = input();
	process(line);
}

function process(line) {
	if (line.length == 0) {
		error(line, 1);
		return;
	}
	var values = [];
	var sum = 0;
	for (var i = 0; i < line.length; i++) {
		var number = numeralToNumber(line[i]);
		if (number == false) {
			error(line, 1);
			return;
		}
		values.push(number);
	}
	for (var i = 0; i < values.length; i++) {
		var current = values[i];
		var lastValue = Math.Infinity;
		var next = null;
		if (i < values.length - 1) {
			next = values[i + 1];
		}
		if (next != null && next > current) {
			var value = next - current;
			i++;
			if (value > lastValue) {
				error(line, 2);
				return;
			}
			sum += value;
			lastValue = value;
			if (!isSubtractive(line[i])) {
				error(line, 4);
				return;
			}
		} else {
			var value = current;
			if (value > lastValue) {
				error(line, 2);
				return;
			}
			sum += value;
			lastValue = value;
		}
	}
	console.log(sum + " " + line);
}

function numeralToNumber(numeral) {
	var numerals = {
		"M": 1000,
		"D": 500,
		"C": 100,
		"L": 50,
		"X": 10,
		"V": 5,
		"I": 1
	}
	if (numeral in numerals) {
		return numerals[numeral];
	} else {
		return false;
	}
}

function isSubtractive(numeral) {
	var numerals = {
		"M": false,
		"D": false,
		"C": true,
		"L": false,
		"X": true,
		"V": false,
		"I": true
	}
	return numerals[numeral];
}

function error(line, code) {
	console.log("Bad" + code + " " + line);
}
