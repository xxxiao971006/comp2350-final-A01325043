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
		console.log("Error selecting from todo table");
		console.log(err);
		return null;
	}
}

async function addRestaurant(postData) {
	let sqlInsert = `
		INSERT INTO restaurant (name, description)
		VALUES (:name, :description, );
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

module.exports = { getAllRestaurants, addRestaurant, deleteRestaurant }
