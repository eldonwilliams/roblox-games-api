import { config } from "dotenv";
config();

import fetch from "node-fetch"
import express from "express";

const app = express();
app.use(express.json());

app.get('/games/:id', (request, response) => {
	fetch(`https://games.roblox.com/v1/games?universeIds=${request.params.id}`).then((fetchResponse) => {
		fetchResponse.json().then((jsonResponse) => {
			console.log(jsonResponse)
			if (!jsonResponse.data) return response.status(404).send({ "error": "That wasn't found", });
			if (jsonResponse.data.length <= 0) return response.status(404).send({ "error": "That wasn't found", });
			response.status(200).send(jsonResponse.data[0]);
		});
	}).catch((err) => {
		console.log(err)
		response.status(400).send({ "error": "Something isn't right..." })
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Roblox Games API is up on port ${process.env.PORT}`);
});