const PORT = 8000;
const express = require("express");
const axios = require("axios").default;
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json())

app.get('/solve',(req,res)=> {
   console.log("query data",req.query.input)
    const options = {
		method: "GET",
		url: "https://sudoku-solver2.p.rapidapi.com/53x2x7x4x6x2x195x4x98x4x6x1x8x3x6x3x34x2x8x1x3x2x17x3x2x3x6x1x6x4x28x4x419x2x5x4x8x2x79",
		headers: {
			'X-RapidAPI-Key': process.env.API_KEY_RAPID,
			"X-RapidAPI-Host": "sudoku-solver2.p.rapidapi.com",
		},
		input: req.query.input,
	};

	axios
		.request(options)
		.then(function (response) {
            console.log(response.data);
            res.json(response.data)
		})
		.catch(function (error) {
			console.error(error);
		});
})

app.listen(PORT,()=>console.log(`server listening on Port ${PORT}`))
