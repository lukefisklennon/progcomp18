go();

function go() {
	var input = require("./input.js");
	var n = Number(input());

	for (var i = 0; i < n; i++) {
		var line = input();
		process(line);
	}

	function process(line) {
		// ...
	}
});

function permutations(a, callback, n) {
	n = n || a.length;
	if (n == 1) {
		callback(a);
	} else {
		for (var i = 0; i < n - 1; i++) {
			permutations(a, callback, n - 1);
			if (n % 2 == 0) {
				swap(a, i, n - 1);
			} else {
				swap(a, 0, n - 1);
			}
		}
        permutations(a, callback, n - 1);
	}
	function swap(array, a, b) {
		var first = array[a];
		array[a] = array[b];
		array[b] = first;
	}
}

function combinations(a, n) {
	var results = [];
	if (n > a.length || n <= 0) {
		return [];
	}
	if (n == a.length) {
		return [a];
	}
	if (n == 1) {
		for (var i = 0; i < a.length; i++) {
			results.push([a[i]]);
		}
		return results;
	}
	for (var i = 0; i < a.length - n + 1; i++) {
		var head = a.slice(i, i + 1);
		var tail = combinations(a.slice(i + 1), n - 1);
		for (var j = 0; j < tail.length; j++) {
			results.push(head.concat(tail[j]));
		}
	}
	return results;
}

function fillArray(a, b) {
	var array = [];
	for (var i = a; i <= b; i++) {
		array.push(i);
	}
	return array;
}

function sumArray(a) {
	var total = 0;
	for (var i = 0; i < a.length; i++) {
		total += a[i];
	}
	return total;
}

function arg(n) {
	return Number(process.argv[n + 2]);
}
