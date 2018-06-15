var test3 = false;

if (test3) {
	// Go through values of R...
} else {
	go(arg(0), arg(1), arg(2));
}

function go(tasks, sum, ratio) {
	var rangeComparisons = combinations(fillArray(1, tasks), 2);
	for (var i = 0; i < rangeComparisons.length; i++) {
		if (rangeComparisons[i][0] + rangeComparisons[i][1] > tasks) {
			rangeComparisons.splice(i, 1);
			i--;
		}
	}

	var range = scoreRange(tasks, sum, ratio);

	var results = combinations(fillArray(range.min, range.max), tasks);
	for (var i = 0; i < results.length; i++) {
		var result = results[i];
		if (result[result.length - 1] / result[0] <= ratio && sumArray(result) == sum) {
			var tie = false;

			for (var j = 0; j < rangeComparisons.length; j++) {
				var sides = [combinations(result, rangeComparisons[j][0]), combinations(result, rangeComparisons[j][1])];
				for (var k = 0; k < sides.length; k++) {
					for (var l = 0; l < sides[k].length; l++) {
						sides[k][l] = sumArray(sides[k][l]);
					}
				}
				sides = [...sides[0], ...sides[1]];
				var comparisons = combinations(sides, 2);
				for (var k = 0; k < comparisons.length; k++) {
					if (comparisons[k][0] == comparisons[k][1]) {
						tie = true;
						break;
					}
				}
				if (tie) break;
			}

			if (!tie) {
				console.log(result.join(" "));
			}
		}
	}
};

function scoreRange(tasks, sum, ratio) {
	var min = 1;
	for (var i = 1; ; i++) {
		if (Math.floor(i * ratio) - i + 1 >= tasks) {
			min = i;
			for (var j = i; ; j++) {
				if (sumArray(fillArray(j, j + tasks - 1)) >= sum) {
					return {
						min: min,
						max: Math.floor(j * ratio)
					}
					break;
				}
			}
			break;
		}
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
