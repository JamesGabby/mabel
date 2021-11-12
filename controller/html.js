var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app) {

    app.get('/', function(req, res) { 
        res.render('index');
    });
    
    app.get('/comment/:id', function(req, res) {
        res.render('comment', { Comment: req.params.comment, Qrst: req.query.qrst });
    });

}