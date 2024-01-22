const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError");

// Morgan would print at the end of the cycle
app.use(morgan("tiny"));

// Password
const verifyPassword = (req, res, next) => {
	const { pwd } = req.query;
	if (pwd === "Duck") {
		return next();
	}

	throw new AppError("Password Required!", 401);
	// throw new Error("Password required!");
	// res.send("Wrong password, try again!");
};

app.use((req, res, next) => {
	console.log(req.method, req.path);
	req.method = "GET";
	req.requestTime = Date.now();
	return next();
});

app.use("/dogs", (req, res, next) => {
	console.log("I love dogs!");
	return next();
});

// app.use((req, res, next) => {
// 	console.log("My first middleware!");
// 	return next();
// });

app.get("/secret", verifyPassword, (req, res) => {
	res.send("Don't tell anyone, but i hate brocoli");
});

app.get("/", (req, res) => {
	console.log(req.requestTime);
	res.send(`Home Page!`);
});

app.get("/dogs", (req, res) => {
	res.send(`Woof! Woof!`);
});

app.get("/err", (req, res) => {
	chicken.fly();
});

app.get("/admin", (req, res) => {
	throw new AppError("Error: You are not admin.", 403);
});

// This is if no route matched
app.use((req, res) => {
	res.status(404).send(`NOT FOUND 404!. Love and peace~ me.maeself 2024`);
});

// This is error Handling
// app.use((err, req, res, next) => {
// 	console.log("*************************************");
// 	res.status(500).send("oh boy, we got error");
// 	console.log(err);

// 	// Passing the error to the next error handler
// 	next(err);
// });

app.use((err, req, res, next) => {
	const { message = "Something went wrong", status = 500 } = err;
	res.status(status).send(message);
});

app.listen(3000, () => {
	console.log(`(express) listening on 3000`);
});
