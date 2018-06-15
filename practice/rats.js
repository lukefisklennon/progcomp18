var limit = 10 ** 12;
var data = {};

for (var i = 1; i < 10000; i++) {
	var cycle = rats(i);
	if (cycle.length > 0) {
		var string = cycle.join(" ");
		if (string in data) {
			data[cycle.join(" ")][1]++;
		} else {
			data[string] = [cycle, 1];
		}
	}
}

var test = 0;
for (var string in data) {
	var cycle = data[string][0];
	var occurrences = data[string][1];
	test += occurrences;
	console.log("Period: " + cycle.length + ", occurs " + occurrences + " times, cycle: " + string);
}
console.log("Test:", test);

function rats(start) {
	var current = start;
	var history = [current];
	for (var i = 0; ; i++) {
		current = sort(current + reverse(current));
		if (current > limit) {
			return [];
		}
		var lastIndex = history.indexOf(current);
		if (lastIndex != -1) {
			return history.slice(lastIndex);
		}
		history.push(current);
	}
}

function reverse(n) {
	return Number(String(n).split("").reverse().join(""));
}

function sort(n) {
	return Number(String(n).split("").sort().join(""));
}
