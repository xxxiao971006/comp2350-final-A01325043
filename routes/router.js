const { addAuthor, deleteAuthor, getAllAuthors } = require('../databaseAccessLayer');

const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', async (req, res) => {
	console.log("page hit");
	
	try {
		const result = await dbModel.getAllItems();
		res.render('index', {allItems: result});

		//Output the results of the query to the Heroku Logs
		console.log(result);
	}
	catch (err) {
		res.render('error', {message: 'Error reading from MySQL'});
		console.log("Error reading from mysql");
	}
});

router.post('/addItem', async (req, res) => {
	console.log("form submit");
	console.log(req.body);

	try {
		const success = await dbModel.addItem(req.body);
		if (success) {
			res.redirect("/");
		}
		else {
			res.render('error', { message: "Error writing to MySQL" });
			console.log("Error writing to MySQL");
		}
	}
	catch (err) {
		res.render('error', { message: "Error writing to MySQL" });
		console.log("Error writing to MySQL");
		console.log(err);
	}
});


router.get('/deleteItem', async (req, res) => {
	console.log("delete author");
	console.log(req.query);
	let itemId = req.query.id;
	if (itemId) {
		const success = await dbModel.deleteItem(itemId);
		if (success) {
			res.redirect("back");
		}
		else {
			res.render('error', { message: 'Error writing to MySQL' });
			console.log("Error writing to mysql");
			console.log(err);
		}
	}
});


router.get('/addQuantity', async (req, res) => {
	console.log("add quantity");
	console.log(req.query);
	let itemId = req.query.id;
	if (itemId) {
		const success = await dbModel.addQuantity(itemId);
		if (success) {
			res.redirect("back");
		}
		else {
			res.render('error', { message: 'Error writing to MySQL' });
			console.log("Error writing to mysql");
			console.log(err);
		}
	}
});

router.get('/minusQuantity', async (req, res) => {
	console.log("add quantity");
	console.log(req.query);
	let itemId = req.query.id;
	if (itemId) {
		const success = await dbModel.minusQuantity(itemId);
		if (success) {
			res.redirect("back");
		}
		else {
			res.render('error', { message: 'Error writing to MySQL' });
			console.log("Error writing to mysql");
			console.log(err);
		}
	}
});

module.exports = router;
