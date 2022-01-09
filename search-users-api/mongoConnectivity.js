"use strict";
import { MongoClient } from "mongodb";
import assert from 'assert';
class MongoDatabase {
	constructor() {
		this.client = new MongoClient(
			'mongodb+srv://rahul:Welcome@testcluster.zcxmg.mongodb.net/Database?retryWrites=true&w=majority',
			{ useUnifiedTopology: true }
		);
		this.collection = null;
		this.isConnectionEstablished = false;
	}

	// connect to mongo db and set given database and collection instance
	async connect(dbName, collectionName) {
		try {
			if (!this.isConnectionEstablished) {
				await this.client.connect();
				const database = this.client.db(dbName);
				this.collection = database.collection(collectionName);

				this.isConnectionEstablished = true;
				console.log('Connected to mongo db sucessfully.');
			}
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
				this.isConnectionEstablished = false;
			}
		}
		catch (error) {
			console.log('Error while closing mongo db connection.', error);
			throw error;
		}
	}

	async getUsers(searchTerm) {
		let cursor, users = [];

		try {
			// fuzzy search for users
			cursor = await this.collection.aggregate([
				{
					'$search': {
						'index': 'default',
						'text': {
							'query': searchTerm,
							'path': ['name', 'address', 'items', 'id'],
							'fuzzy': {
								'maxEdits': 2,  // number of edits required to match the word.can be 1 or 2
								'prefixLength': 2  // prefix length to match while comparing
							}
						},
						"highlight": {
							'path': ['name', 'address', 'items', 'id'],
							"maxCharsToExamine": 5000, // optional, defaults to 500,000
							"maxNumPassages": 5 // optional, defaults to 5
						}
					}
				},
				{
					'$project': {
						"name": 1,
						'address': 1,
						'items': 1,
						'id': 1,
						'highlights': { $meta: "searchHighlights" }
					}
				}
			]).toArray();

			for await (const user of cursor) {
				users.push(user);
			}
		}
		catch (error) {
			console.log('Error while searching users.', error);
			throw error;
		}

		return users;
	}

	async getUsersCount() {
		return await this.collection.countDocuments({});
	}
}


export default MongoDatabase;
