const _router = require("express").Router();
const _todoController = require("./controllers/todo-controller");
const _generalController = require("./controllers/general-controller");

_router
    // A middleware to catch all incoming requests
    .use((req, res, next) => {
        console.log(new Date().toLocaleString("he-IL"), req.method, req.path);
        next();
    })
    // Adding a nested routers, 
    // and route all requests like http://<SERVER-ADDRESS>/api/todo/<any> to todoController
    .use("/api/todo", _todoController)
    .use("/api/general", _generalController)
    // A middlweare to finish all requests
    .use((req, res) => {
        console.log("END REQUEST");
        console.log("========");
        res.end();
    })

module.exports = _router;