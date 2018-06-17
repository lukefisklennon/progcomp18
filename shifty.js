var fs = require("fs");
var input = fs.readFileSync("shifty.txt", "utf8").trim().split("\n").join("");

go(input, 21);

function go(input, a) {
	var sequence = [];
	var s = 42;
	var total = 0;
	for (var i = 0; ; i++) {
		s = (a * s + 1) % 95;
		sequence.push(s);
		if (i % 2 == 0) total += s;
		if (total > input.length) {
			break;
		}
	}

	var output = "";
	var current = 42;
	var offset = 0;
	var j = 0;
	for (var i = 0; i < input.length; i++) {
		if (offset + 1 > sequence[j * 2]) {
			current = sequence[j * 2 + 1];
			offset = 0;
			j++;
		}
		output += shift(input[i], -current);
		current++;
		offset++;
		if (current > 94) {
			current = 0;
		}
	}
	console.log(output);
};

function shift(char, n) {
	var code = char.charCodeAt(0);
	if (code >= 32 && code <= 126) {
		code += n;
		if (code > 126) {
			code -= 95;
		}
		if (code < 32) {
			code += 95;
		}
		return String.fromCharCode(code);
	} else {
		return char;
	}
}
