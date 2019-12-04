const _generalController = require("express").Router();
// All routes bellow are based on /general/ base route. (see: router.js line 11)
// for example: '.get("/health-check")' is meaning: http://<server-base-address>/general/health-check
_generalController
    .get("/health-check", (req, res, next) => {
        console.log("generalController.get(/health-check)");
        res.status(200).send("OK");
        next();
    })
    .post("/health-check", (req, res, next) => {
        console.log("generalController.post(/health-check)");
        res.status(200).send("OK");
        next();
    })

module.exports = _generalController;