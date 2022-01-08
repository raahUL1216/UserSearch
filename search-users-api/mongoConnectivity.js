"use strict";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://rahul:Welcome@testcluster.zcxmg.mongodb.net/Database?retryWrites=true&w=majority";

class MongoDatabase {
	constructor(batchSize) {
		this.client = new MongoClient(
			uri,
			{ useUnifiedTopology: true }
		);
		this.collection = null;
		this.isConnectionEstablished = false;
	}

	// connect to mongo db and set given database and collection instance
	async connect(dbName, collectionName) {
		try {
			await this.client.connect();
			const database = this.client.db(dbName);
			this.collection = database.collection(collectionName);

			this.isConnectionEstablished = true;
			console.log('Connected to mongo db sucessfully.');
		}
		catch (error) {
			console.log('Error while connecting to mongo db.', error);
			throw error;
		}
	}

	async close() {
		try {
			if (this.isConnectionEstablished) {
				await this.client.close();
			}
		}
		catch (error) {
			console.log('Error while closing mongo db connection.', error);
			throw error;
		}
	}

	async getUsers(searchTerm) {
		let cursor, users;

		try {
			cursor = this.collection.find({}, { _id: 0 });
			users = await cursor.toArray();
		}
		catch (error) {
			console.log('Error while searching users.', error);
			throw error;
		}
		finally {
			await cursor.close();
		}

		return users;
	}

	async getUsersCount() {
		return await this.collection.countDocuments({});
	}
}


export default MongoDatabase;
