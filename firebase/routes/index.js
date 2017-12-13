var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/messageService', { useMongoClient: true});

var messageSchema = mongoose.Schema({
        User: String,
        Subject: String,
	Message: String
});

var Message = mongoose.model('Message', messageSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log('Connected to Mongo');
});


router.post('/message', function(req, res, next) {

        console.log("Post comment route");
        console.log(req.body);

        var newMessage = new Message(req.body);
        console.log(newMessage);
        newMessage.save(function(err, post) {
                if (err) return console.error(err);
                console.log(post);
                res.sendStatus(200);
        });

});

router.get('/message/:person', function(req, res) {
	console.log(req.param("person") + " this is the person");
        Message.find({'User':req.param("person")}, function(err, results) {
                if (err) return console.error(err);
                console.log(results);
                res.json(results);
        })


});


module.exports = router;