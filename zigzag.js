var table = [[1]];
var zig = [1];
var zag = [];

for (var i = 1; i < 16; i++) {
	var a = [];
	if (i % 2 == 1) {
		for (var j = 0; j < i + 1; j++) {
			if (j == 0) {
				a[j] = 0;
			} else {
				a[j] = a[j - 1] + table[i - 1][j - 1];
			}
		}
		zag.push(a[a.length - 1]);
	} else {
		for (var j = i; j >= 0; j--) {
			if (j == i) {
				a[j] = 0;
			} else {
				a[j] = a[j + 1] + table[i - 1][j];
			}
		}
		zig.push(a[0]);
	}
	table.push(a);
}

console.log(zig.join(", "));
console.log(zag.join(", "));
console.log(table[table.length - 1].join(" >> "));
