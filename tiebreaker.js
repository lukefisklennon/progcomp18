function fill(n, o) {
	o = o || 0;
	var a = [];
	for (var i = o; i < n + o; i++) {
		a.push(i);
	}
	return a;
}
