var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//inport config.js from config dir that holds our sql creds
var config = require('../config/config');
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});


//after this line runs, we're connected to MySQL
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	// init array as a placeholder
	var taskArray =[];
	var selectQuery = "SELECT * FROM tasks";
	connection.query(selectQuery, (error, results, field)=>{
		// res.json(results); 
  		res.render('index', { taskArray: results});
	})
});

router.post('/addNew', (req, res, next)=>{
	// res.json(req.body);
	var newTask = req.body.newTaskString;
	var taskDate = req.body.newTaskDate;
// We have a MySQL connection...called connection!
	var insertQuery = "INSERT INTO tasks (task_name, task_date) VALUES ('"+newTask+"','"+taskDate+"')";
	// res.send(query); 
	connection.query(insertQuery, (error, results, field)=>{
		if (error) throw error;
		res.redirect('/'); 
	});

});

module.exports = router;
