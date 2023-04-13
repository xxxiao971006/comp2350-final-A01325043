const database = include('/databaseConnection');

async function getAllItems() {
	let sqlQuery = `
		SELECT purchase_item_id, item_name, item_description, cost, quantity
		FROM purchase_item
		;
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

async function addItem(postData) {
	let sqlInsert = `
		INSERT INTO purchase_item (item_name, item_description, cost, quantity)
		VALUES (:name, :description, :cost, :quantity );
		`;

	let params = {
		name: postData.name,
		description: postData.description,
		cost: postData.cost,
		quantity: postData.quantity
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

async function deleteItem(itemId) {
	let sqlDeleteItem = `
		DELETE FROM purchase_item
		WHERE purchase_item_id = :itemId
		`;
	let params = {
		itemId: Number(itemId)
	};
	console.log(sqlDeleteItem);
	try {
		await database.query(sqlDeleteItem, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function addQuantity(itemId) {
	let sqlAddQuantity = `
		UPDATE purchase_item
		SET quantity = quantity + 1
		WHERE purchase_item_id = :itemId
		`;
	let params = {
		itemId: Number(itemId)
	};
	console.log(sqlAddQuantity);
	try {
		await database.query(sqlAddQuantity, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function minusQuantity(itemId) {
	let sqlMinusQuantity = `
		UPDATE purchase_item
		SET quantity = quantity - 1
		WHERE purchase_item_id = :itemId
		`;
	let params = {
		itemId: Number(itemId)
	};
	console.log(sqlMinusQuantity);
	try {
		await database.query(sqlMinusQuantity, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = { getAllItems, addItem, deleteItem, addQuantity, minusQuantity }
