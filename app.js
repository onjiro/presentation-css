new function(sourcePath, port){
    var express = require('express'),
    haml = require('hamljs'),
    fs = require('fs'),
    here = require('./heredoc'),
    join = require('path').join;
    
    var app = express.createServer();
    app.register('.haml', require('hamljs'));
    var root = join(__dirname, "src");
    app.set('views', root);
    app.set('view engine', 'haml');
    app.use(express.static(root));
    
    app.get('/', function(req, res) {
	res.redirect('/index.html');
    });

    app.get('/index.html', function(req, res) {
	var source = here.parse(fs.readFileSync(sourcePath).toString());
	console.log(source);
	var sources = JSON.parse(source);
	var pager = haml.compile(fs.readFileSync("src/page.haml").toString());
	
	var allsources = "";
	for (var i = 0; i < sources.length; i++) {
	    var previousPage = "/" + ((i !== 0) ? (i - 1) : sources.length - 1) + ".html";
	    var nextPage = "/" + ((i !== sources.length - 1) ? (i + 1): 0) + ".html";
	    var page = sources[i];
	    console.log(page);

	    allsources += pager({
		title: page.title || "",
		class: page.class || "",
		body: haml.render(page.source),
		previous: previousPage,
		next: nextPage
	    });
	}
	res.render("layout", {
	    'layout': false,
	    'pages': allsources,
	});
    });
    app.listen(port);
    console.log("server start listening on port " + port);
}('./src/source.json', 4000);