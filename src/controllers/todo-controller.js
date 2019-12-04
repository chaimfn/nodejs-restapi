const _fs = require("fs");
const _todofile = "./src/db/todo.json";
const _errMsg = "An error has occurred";

const _todoController = require("express").Router();
// All routes bellow are based on /todo/ base route. (see: router.js line 11)
// for example: '.get("/:id")' is meaning: http://<server-base-address>/todo/34
_todoController
    .get("/", async (req, res, next) => {
        console.log("todoController.get(/)");
		let status = 200, output = null;
		try {
			const data = await _fs.promises.readFile(_todofile, "utf-8");
			console.log("_fs.promises.readFile succeeded");
			output = JSON.parse(data);
		}
		catch(err) {
			console.log("_fs.promises.readFile failed", err);
			status = 500;
			output = _errMsg;
		}
		finally {
			res.status(status).send(output);
			next();
		}
	})
    .get("/:id", async (req, res, next) => {
        console.log("todoController.get(/:id)");
        const id = parseInt(req.params.id);
		let status = 200, output = null;
		try {
			const data = await _fs.promises.readFile(_todofile, "utf-8");
			console.log("_fs.promises.readFile succeeded");
			const list = JSON.parse(data);
			const i = list.findIndex(i => i.id == id);
			if (i < 0)
				status = 404;
			else
				output = { i, item: list[i] };
		}
		catch(err) {
			console.log("_fs.promises.readFile failed", err);
			status = 500;
			output = _errMsg;
		}
		finally {
			res.status(status);
			if(!!output)
				res.send(output);
			next();
		}
    })
    .post("/", async (req, res, next) => {
        console.log("todoController.post(/)");
		let status = 200, list = [], output = null;
		try {
			const data = await _fs.promises.readFile(_todofile, "utf-8");
			console.log("_fs.promises.readFile succeeded");
			list = JSON.parse(data);
			list.push(req.body);
			const sList = JSON.stringify(list);
			try {
				await _fs.promises.writeFile(_todofile, sList);
				console.log("_fs.promises.writeFile succeeded");
			}
			catch(err) {
				console.log("_fs.promises.writeFile failed", err);
				status = 500;
			}
		}
		catch(err) {
			console.log("_fs.promises.readFile failed", err);
			status = 500;
		}
		finally {
			if(status == 500)
				output = _errMsg;
			res.status(status);
			if(!!output)
				res.send(output);
			next();
		}
    })
    .put("/:id", async (req, res, next) => {
        console.log("todoController.put(/:id)");
        const id = parseInt(req.params.id);
		let status = 204, list = [], output = null;
		try {
			const data = await _fs.promises.readFile(_todofile, "utf-8");
			console.log("_fs.promises.readFile succeeded");
			list = JSON.parse(data);
			const i = list.findIndex(i => i.id == id);
			if (i < 0)
				status = 404;
			else {
				list[i] = req.body;
				const sList = JSON.stringify(list);
				try {
					await _fs.promises.writeFile(_todofile, sList);
					console.log("_fs.promises.writeFile succeeded");
				}
				catch(err) {
					console.log("_fs.promises.writeFile failed", err);
					status = 500;
				}
			}
		}
		catch(err) {
			console.log("_fs.promises.readFile failed", err);
			status = 500;
		}
		finally {
			if(status == 500)
				output = _errMsg;
			res.status(status);
			if(!!output)
				res.send(output);
			next();
		}
    })
    .delete("/:id", async (req, res, next) => {
        console.log("todoController.delete(/:id)");
        const id = parseInt(req.params.id);
		let status = 204, list = [], output = null;
		try {
			const data = await _fs.promises.readFile(_todofile, "utf-8");
			console.log("_fs.promises.readFile succeeded");
			list = JSON.parse(data);
			const i = list.findIndex(i => i.id == id);
			if (i < 0)
				status = 404;
			else {
				list.splice(i, 1);
				const sList = JSON.stringify(list);
				try {
					await _fs.promises.writeFile(_todofile, sList);
					console.log("_fs.promises.writeFile succeeded");
				}
				catch(err) {
					console.log("_fs.promises.writeFile failed", err);
					status = 500;
				}
			}
		}
		catch(err) {
			console.log("_fs.promises.readFile failed", err);
			status = 500;
		}
		finally {
			if(status == 500)
				output = _errMsg;
			res.status(status);
			if(!!output)
				res.send(output);
			next();
		}
    })

module.exports = _todoController;