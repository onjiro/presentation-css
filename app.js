new function(port){
    var express = require('express'),
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

    // TODO any level to redirect index
    var pages = [
	"index",
	"目次",
	"HTMLとCSS",
	"CSSでの段組み",
	"セレクタ",
	"CSS3での新要素",
	"おまけ",
    ];
    app.get('/:page.html', function(req, res) {
	var previousPage = "/";
	var nextPage = "/";
	for (var i = 0; i < pages.length; i++) {
	    if (req.params.page.toString() === pages[i]) {
		previousPage = (i > 0) ? pages[i - 1] + ".html": "/";
		nextPage = (i < pages.length - 1) ? pages[i + 1] + ".html": "/";
		break;
	    }
	}
	res.render(req.params.page, {
	    'title': req.params.page,
	    'previous': previousPage,
	    'next': nextPage,
	});
    });
    app.listen(port);
    console.log("server start listening on port " + port);
}(4000);