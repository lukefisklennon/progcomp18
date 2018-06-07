var candidates = fillCandidates();
console.log("Initial candidate list size = " + candidates.length + ".");

var secret = 12748856;

var correct = false;
var guessNumber = 0;
var lastGuess = null;
while (true) {
	guessNumber++;
	var guess = middleCandidate(candidates);
	var result = match(encode(guess), secret);
	candidates = filterCandidates(candidates, guess, result);
	console.log("Guess " + guessNumber + " " + guess + " gives " + result + " ".repeat(5 - result.length) + "Candidates remaining: " + candidates.length);
	if (candidates.length <= 1) {
		console.log("Solution: " + candidates[0]);
		break;
	}
	if (lastGuess != null && guess == lastGuess) {
		break;
	}
	lastGuess = guess;
}

function encode(g) {
	var k = 0;
	var r = 0;
	var digits = stringify(g).split("");
	for (var k = 0; k < digits.length; k++) {
		var c = Number(digits[k]);
		var d = (3 * c + 7) % 10;
		r += Math.pow(2, 3 * d + 2) + k * Math.pow(8, d);
	}
	return r;
}

function match(gcode, scode) {
	var b = "";
	var c = "";
	for (var k = 0; k <= 9; k++) {
		var p = (Math.floor(gcode / Math.pow(8, k))) % 8;
		var q = (Math.floor(scode / Math.pow(8, k))) % 8;
		var r = p - q;
		var s = 2 * r + 3 * q;
		if (s > 11 && s > 2 * r) {
			if (s == 3 * p) {
				b += "B";
			} else {
				c += "C";
			}
		}
	}
	return b + c;
}

function fillCandidates() {
	var a = [];
	for (var i = 0; i < 10000; i++) {
		var s = stringify(i);
		if (s.length < 4) continue;
		var ok = true;
		for (var j = 0; j < 3; j++) {
			if (s.substring(j + 1).indexOf(String(s[j])) != -1) {
				ok = false;
				break;
			}
		}
		if (ok) a.push(i);
	}
	return a;
}

function filterCandidates(a, guess, result) {
	var filtered = [];
	for (var i = 0; i < a.length; i++) {
		if (match(encode(guess), encode(a[i])) == result) {
			filtered.push(a[i]);
		}
	}
	return filtered;
}

function middleCandidate(a) {
	if (a.length % 2 == 0) {
		return a[a.length / 2];
	} else {
		return a[Math.floor(a.length / 2)];
	}
}

function stringify(n) {
	var s = String(n);
	if (n < 1000) {
		s = "0" + s;
	}
	return s;
}
