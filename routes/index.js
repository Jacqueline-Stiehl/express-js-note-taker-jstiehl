const router = require("express").Router();

const notes = require("./notes");
// const orders = require("./orders");
// const customers = require("./customers");

router.use("/notes", notes);
// router.use("/orders", orders);
// router.use("/customers", customers);

module.exports = router;
