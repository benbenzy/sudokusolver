const puzzleBoard = document.querySelector("#puzzle");
const solvePuzzle = document.getElementById("solve-puzzle");
const message = document.querySelector("#message");
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
	const element = document.createElement("input");
	element.setAttribute("type", "number");
	element.setAttribute("min", 1);
	element.setAttribute("max", 9);
	if (
		((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 27) ||
		((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
		((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
		((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
		((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
	) {
		element.classList.add("odd-section");
	}
	puzzleBoard.appendChild(element);
}

const joinValues = () => {
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		if (input.value) {
			submission.push(input.value);
		} else {
			submission.push("x");
		}
	});
	console.log(submission);
};
const populateTable = (canBeSolved, message, answer) => {
	const inputs = document.querySelectorAll("input");
	if (canBeSolved && answer) {
		inputs.forEach((input, i) => {
			input.value = answer[i];
		});
		message.innerHTML = message;
	} else {
		message.innerHTML = message;
	}
};

const solve = () => {
	joinValues();
	const data = submission.join("");
    axios.get("http://localhost:8000/solve", {
        params: {
          input:JSON.stringify(data)
        }
      })
      .then(function (response) {
        console.log("response data",response.data.answer);
        populateTable(response.data.canBeSolved,response.data.message,response.data.answer)
      })

	// fetch("http://localhost:8000/solve", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json",
    //         "Accept":"application/json"
	// 	},
	// 	data: JSON.stringify(data),
	// })
	// 	.then((data) => {
	// 		return data.json();
	// 	})
	// 	.then((post) => {
	// 		console.log(post);
	// 	})
	// 	.catch((error) => {
	// 		console.error("error", error);
	// 	});
};

solvePuzzle.addEventListener("click", solve);
