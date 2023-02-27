const database = include('/databaseConnection');


async function getAllRestaurants() {
	let sqlQuery = `
		SELECT restaurant_id, name, description
		FROM restaurant;
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from restaurant table");
		console.log(err);
		return null;
	}
}

async function getAllReviews(restaurantId) {
	let sqlQuery = `
		SELECT review_id, restaurant_id, reviewer_name, details, rating
		FROM review
		WHERE restaurant_id = ${restaurantId};
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from review table");
		console.log(err);
		return null;
	}
}

async function getRestaurantById(restaurantId) {
	let sqlQuery = `
		SELECT name
		FROM restaurant
		WHERE restaurant_id = ?;
	`;

	try {
		const results = await database.query(sqlQuery, [restaurantId]);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from review table");
		console.log(err);
		return null;
	}
}

async function addRestaurant(postData) {
	let sqlInsert = `
		INSERT INTO restaurant (name, description)
		VALUES (:name, :description );
		`;

	let params = {
		name: postData.restaurant_name,
		description: postData.description,
	};

	try {
		await database.query(sqlInsert, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function addRestaurantReview(postData) {
	let sqlInsert = `
		INSERT INTO review (restaurant_id, reviewer_name, details, rating)
		VALUES (:id, :reviewer, :details, :rating );
		`;

	// let params = {
	// 	id: Number(postData.restaurantId),
	// 	reviewer: postData.reviewer_name,
	// 	details: postData.review,
	// 	rating: Number(postData.rate)
	// };

	let params = {
		id: 1,
		reviewer: Nikki,
		details: wtf,
		rating: 2
	};

	try {
		await database.query(sqlInsert, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteRestaurant(restaurantId) {
	let sqlDeleteRestaurant = `
		DELETE FROM restaurant
		WHERE restaurant_id = :restaurantID
		`;
	let params = {
		restaurantID: restaurantId
	};
	console.log(sqlDeleteRestaurant);
	try {
		await database.query(sqlDeleteRestaurant, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteReview(reviewId) {
	let sqlDeleteReview = `
		DELETE FROM review
		WHERE review_id = :reviewID
		`;
	let params = {
		reviewID: reviewId
	};
	console.log(sqlDeleteReview);
	try {
		await database.query(sqlDeleteReview, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = { getAllRestaurants, addRestaurant, deleteRestaurant, 
	getAllReviews, getRestaurantById, deleteReview, addRestaurantReview }
