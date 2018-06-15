var fs = require("fs");

var stdin = new String();

function input(prompt) {
	if (typeof prompt == "string" && prompt.length > 0) {
		process.stdout.write(prompt);
	}
	var max = 256;
	if (stdin.length === 0) {
		var buf = new Buffer(max);
		var totalBuf = new Buffer(max);
		var totalBytesRead = 0;
		var bytesRead = 0;
		var endByte = 10;
		var endByteRead = false;
		var fd = process.stdin.fd;
		var usingDevice = false;
		try {
			fd = fs.openSync("/dev/stdin", "rs");
			usingDevice = true;
		} catch (e) {}
		for (;;) {
			try {
				bytesRead = fs.readSync(fd, buf, 0, max, null);
				var tmpBuf = new Buffer(totalBytesRead + bytesRead);
				totalBuf.copy(tmpBuf, 0, 0, totalBytesRead);
				buf.copy(tmpBuf, totalBytesRead, 0, bytesRead);
				totalBuf = tmpBuf;
				totalBytesRead += bytesRead;
				for (var i = 0; i < bytesRead; i++) {
					if (buf[i] === endByte) {
						endByteRead = true;
						break;
					}
				}
				if (endByteRead) break;
			} catch (e) {
				if (e.code === "EOF") break;
				throw e;
			}
			if (bytesRead === 0) break;
		}
		if (usingDevice) { fs.closeSync(fd); }
		stdin = totalBuf.toString("utf-8");
	}
	var newline = stdin.search("\n") + 1;
	var line = stdin.slice(0, newline);
	stdin = stdin.slice(newline);
	return line.trim();
}

module.exports = input;
