import express from 'express'
import MongoDatabase from "./mongoConnectivity.js";

const app = express()
const port = 3001

// Add headers before the routes are defined
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Pass to next layer of middleware
	next();
});

app.get('/', (req, res) => {
	res.send('Test API working!')
})

app.get('/search-users/:searchTerm', async (req, res) => {
	const searchTerm = req.params.searchTerm;
	console.log('searchTerm: ' + searchTerm);

	try {
		const MongoDB = new MongoDatabase();
		await MongoDB.connect("Database", "Users");

		const users = await MongoDB.getUsers(searchTerm);
		users.map(user => { delete user._id; });

		const response = JSON.stringify(users);
		console.log('Response recevied. Type: ' + typeof response);

		res.send(response);
	}
	catch (error) {
		console.log(error);
		throw error;
	}
})

app.listen(3001, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})