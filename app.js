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
	res.redirect('/index');
    });

    app.get('/:number', function(req, res) {
	var number = (req.params.number === "index") ? 0: parseInt(req.params.number);
	// 利便性のためアクセスの度にファイルをロード
	var source = here.parse(fs.readFileSync(sourcePath).toString());
	console.log(source);
	var pages = JSON.parse(source);
	var previousPage = "/" + ((number !== 0) ? (number - 1) : pages.length - 1);
	var nextPage = "/" + ((number !== pages.length - 1) ? (number + 1): 0);
	var page = pages[number];
	res.render("layout", {
	    'layout': false,
	    'body': haml.render(page.source),
	    'title': page.title || "",
	    'class': page.class || "",
	    'previous': previousPage,
	    'next': nextPage,
	});
    });
    app.listen(port);
    console.log("server start listening on port " + port);
}('./src/source.json', 4000);