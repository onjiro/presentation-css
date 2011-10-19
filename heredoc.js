exports.parse = function(src) {
    var tmp = src;
    // TODO "EOS"以外の区切り文字に対応
    var pattern = /<<EOS\n([\w\s\S]*?)\nEOS/;

    while (matcher = pattern.exec(tmp)) {
	tmp = tmp.replace(
	    tmp.substring(matcher.index, matcher.index + matcher[0].length),
	    '"' + matcher[1].replace(/\n/g, "\\n").replace(/\"/g, "\\\"") + '"');
    }
    return tmp;
};
