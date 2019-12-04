const _express = require("express");
const _router = require("./router"); // general global router
const _port = process.env.PORT || 4000;

const app = _express();
app
	.use((req, res, next) => {
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "*");
		next();
	})
    // The 2 lines below are global,
    // to be able sending json in ajax as object style (- not using 'JSON.stringify' by esnding)
    .use(_express.urlencoded({ extended: false }))
    .use(_express.json())
    // Adding the general-global router
    .use(_router)
    // A middlweare to catch all uncaptured errors
    .use((err, req, res, next) => {
        console.log("err", err);
        res
            .status(500)
            .send("An error has occurred")
            .end()
    })
    // Fire up the server
    .listen(_port, () => {
        console.log(new Date().toLocaleString("he-IL"))
        console.log(`Listening on port ${_port}`);
        console.log("=============");
    })

