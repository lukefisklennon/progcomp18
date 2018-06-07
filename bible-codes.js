var fs = require("fs");
var text = fs.readFileSync("bible-codes.txt", "utf8").trim();
var array = text.split("");

var offset = parseInt(process.argv[2]);
var cycle = parseInt(process.argv[3]);
var length = parseInt(process.argv[4]);

var reverse = false;
if (cycle < 0) {
	reverse = true;
	cycle *= -1;
}

var els = "";

var j = 0;
for (var i = 0; i < text.length; i++) {
	var code = text[i].toLowerCase().charCodeAt(0);
	if (code >= 97 && code <= 122) {
		j++;
		if (j >= offset && (j - offset) % cycle == 0) {
			if (els.length < length) {
				els += text[i].toLowerCase();
				array[i] = "[" + array[i] + "]";
			} else {
				break;
			}
		}
	}
}

var text = array.join("");
var lines = text.split("\n");

for (var i = 0; i < lines.length; i++) {
	if (lines[i].indexOf("[") != -1 && lines[i].indexOf("]") != -1) {
		console.log(lines[i]);
	}
}

var final = "";
if (reverse) {
	for (var i = 0; i < els.length; i++) {
		final = final + els[i];
	}
}

console.log("\n" + final);
