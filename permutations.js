// function permutations(a, n, callback) {
// 	if (typeof n == "function") {
// 		callback = n;
// 		n = a.length;
// 	}
//
// 	if (n == 1) {
// 		callback(a);
// 	} else {
// 		for (var i = 0; i < n - 1; i++) {
// 			permutations(a, n - 1, callback);
// 			if (n % 2 == 0) {
// 				swap(a, i, n - 1);
// 			} else {
// 				swap(a, 0, n - 1);
// 			}
// 		}
//         permutations(a, n - 1, callback);
// 	}
// }
//
// function swap(array, a, b) {
// 	var first = array[a];
// 	array[a] = array[b];
// 	array[b] = first;
// }
//
// permutations([1, 2, 3], 2, function(result) {
// 	console.log(result);
// });

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;

	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}

	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}

	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		console.log("!", tailcombs);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function fill(n, o) {
	o = o || 0;
	var a = [];
	for (var i = o; i < n + o; i++) {
		a.push(i);
	}
	return a;
}

console.log(k_combinations(fill(5, 1), 2));
