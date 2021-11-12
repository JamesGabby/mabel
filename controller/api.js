var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var mongoose = require('mongoose');

module.exports = function(app) {

    // MySQL connection
    var con = mysql.createConnection({
        host: 'mudfoot.doc.stu.mmu.ac.uk',
        user: 'gabbituj',
        password: 'queonitH8',
        database: 'gabbituj',
        port: '6306'
    });

    // MongoDB connection
    mongoose.connect(`mongodb+srv://Philosofesia:xQO9mODCrC0qthSj@cluster0.recta.mongodb.net/Cluster0?retryWrites=true&w=majority`);
    var Schema = mongoose.Schema;
    var commentSchema = new Schema({
        comment: String
    });
    var Comment = mongoose.model('Comment', commentSchema);

    app.get('/api/comment', function(req, res) {
        //res.json({ name: 'James'});
        con.query(`select * from comments`, function(err, rows) {
            if (err) throw err;
            console.log(rows);
            res.json({
                "StatusCode": 200
            });
        });
    });
    
    // Insert into MySQL DB
    // app.post('/api/comment', jsonParser, function(req, res) {
    //     con.query(`insert into comments (comment) values ('${req.body.comment}');`, function(err, rows) {
    //         if (err) throw err;
    //         console.log(req);
    //         console.log("message: "+req.body.comment);
    //         res.send("success");
    //     });
    // });

    // Insert into MongoDB
    app.post('/api/comment', jsonParser, function(req, res) {
        var commentFromClient = Comment({
            comment: req.body.comment
        });
        commentFromClient.save(function(err) {
            if (err) throw err;
            console.log('Comment added!');
        });
        res.send("success");
    });
    
    app.delete('/api/comment/:id', function(req, res) { });

}