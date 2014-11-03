var express = require('express');
var router = express.Router();
/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
/*	mongoClient.connect("mongodb://mongonodedb:mongo123@ds047940.mongolab.com:47940/mongotestdb", function(err, db) {
  if(!err) {
    console.log("We are connected"+req.db);
  }
  else
  {
	  console.log(err+req.db);
	  }
});*/
    var db = req.db;
	console.log("We are connected"+req.db);
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
