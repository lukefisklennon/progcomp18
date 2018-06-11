var puzzle = true;

var started = Date.now();

var file = "bible-codes.txt";
if (puzzle) {
	var file = "puzzle.dat";
}

var fs = require("fs");
var text = fs.readFileSync(file, "utf8");

var offset = parseInt(process.argv[2]);
var cycle = parseInt(process.argv[3]);
var length = parseInt(process.argv[4]);

var iterations = 1;
if (puzzle) {
	iterations = text.length - cycle;
}
// iterations = 50;

var results = [];

for (var z = 0; z < iterations; z++) {
	// var text = original;
	if (!puzzle) var array = text.split("");

	offset = parseInt(process.argv[2]) + z + 1;

	var reverse = false;
	if (cycle < 0) {
		reverse = true;
		cycle *= -1;
		offset -= cycle * length;
	}

	var els = "";
	// var test = "";

	var j = 0;
	var broken = false;
	for (var i = offset; i < text.length; i++) {
		var code = text[i].toLowerCase().charCodeAt(0);
		if (code >= 97 && code <= 122) {
			j++;
			// test += text[i];
			if (j >= offset && (j - offset) % cycle == 0) {
				if (els.length < length) {
					els += text[i].toLowerCase();
					if (!puzzle) array[i] = "[" + array[i] + "]";
				} else {
					broken = true;
					break;
				}
			}
		}
	}

	if (!broken) iterations = j;

	if (!puzzle) {
		var text = array.join("");
		var lines = text.split("\n");

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].indexOf("[") != -1 && lines[i].indexOf("]") != -1) {
				console.log(lines[i]);
			}
		}
	}

	var final = "";
	if (reverse) {
		for (var i = 0; i < els.length; i++) {
			final = els[i] + final;
		}
	} else {
		final = els;
	}

	if (puzzle) {
		if (els.indexOf("iva") == 0) {
			results.push(els);
		}
	} else {
		console.log("\n" + els);
	}
}

console.log(results);
console.log(Date.now() - started + " ms");
