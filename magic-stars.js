var constant = 26;

var set = fill(1, 12);

var start = Date.now();
while (true) {
	var test = shuffle(set.slice(0));
	if (check(test)) {
		console.log(test.join(" "));
		console.log("Found super-magic normalised star after " + Math.round((Date.now() - start) / 1000) + " seconds");
		process.exit(0);
	}
}

function check(test) {
	return (
		test[0] + test[1] + test[2] + test[3] == constant &&
		test[3] + test[4] + test[5] + test[6] == constant &&
		test[6] + test[7] + test[8] + test[0] == constant &&
		test[11] + test[8] + test[1] + test[9] == constant &&
		test[9] + test[2] + test[4] + test[10] == constant &&
		test[10] + test[5] + test[7] + test[11] == constant &&
		Math.min(test[0], test[9], test[3], test[10], test[6], test[11]) == test[0] &&
		test[8] > test[1] &&
		test[0] + test[9] + test[3] + test[10] + test[6] + test[11] == constant
	);
}

function shuffle(original) {
	var shuffled = [];
	var length = original.length;
	for (var i = 0; i < length; i++) {
		shuffled.push(original.splice(Math.floor(Math.random() * original.length - 1), 1)[0]);
	}
	return shuffled;
}

function fill(start, end) {
	var array = [];
	for (var i = start; i <= end; i++) {
		array.push(i);
	}
	return array;
}
