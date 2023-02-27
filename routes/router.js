const { addUser, deleteUser, getAllUsers } = require('../databaseAccessLayer');

const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', async (req, res) => {
	console.log("page hit");
	
	try {
		const result = await dbModel.getAllRestaurants();
		res.render('index', {allRestaurants: result});

		//Output the results of the query to the Heroku Logs
		console.log(result);
	}
	catch (err) {
		res.render('error', {message: 'Error reading from MySQL'});
		console.log("Error reading from mysql");
	}
});

router.post('/addRestaurant', async (req, res) => {
	console.log("form submit");
	console.log(req.body);

	try {
		const success = await dbModel.addRestaurant(req.body);
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

router.get('/deleteRestaurant', async (req, res) => {
	console.log("delete restaurant");
	console.log(req.query);
	let restaurantId = req.query.id;
	if (restaurantId) {
		const success = await dbModel.deleteRestaurant(restaurantId);
		if (success) {
			res.redirect("/");
		}
		else {
			res.render('error', { message: 'Error writing to MySQL' });
			console.log("Error writing to mysql");
			console.log(err);
		}
	}
});

router.get('/showReviews', async (req, res) => {
	let restaurantId = req.query.id;
	let restaurantName = await dbModel.getRestaurantById(restaurantId);

	try {
		const result = await dbModel.getAllReviews(restaurantId);
		res.render('review', { allReviews: result, restaurantName: restaurantName });

		//Output the results of the query to the Heroku Logs
		console.log(result);
	}
	catch (err) {
		res.render('error', { message: 'Error reading from MySQL' });
		console.log("Error reading from mysql");
	}

})

router.get('/deleteReview', async (req, res) => {
	console.log("delete restaurant");
	console.log(req.query);
	let restaurantId = req.query.id;
	if (restaurantId) {
		const success = await dbModel.deleteRestaurant(restaurantId);
		if (success) {
			res.redirect("/");
		}
		else {
			res.render('error', { message: 'Error writing to MySQL' });
			console.log("Error writing to mysql");
			console.log(err);
		}
	}
});
module.exports = router;
