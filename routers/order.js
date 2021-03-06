const { Router } = require("express");
const Order = require("../models/order");
const router = Router();
const passport = require("passport");

router.post("/order", async (req, res) => {
  try {
    if (req.body) {
      const order = new Order(req.body);
      await order.save();
      res
        .status(201)
        .json({ message: "Thanks for ordering We will reply soon" });
    } else {
      res.status(400).json({ message: "Please select all fields" });
    }
  } catch (e) {
    res.status(500).jsom({ message: "Something went wrong, please try again" });
  }
});

router.get(
  "/allorder",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const order = await Order.find();
      res.status(200).json(order);
    } catch (e) {
      res
        .status(500)
        .jsom({ message: "Something went wrong, please try again" });
    }
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Order.remove({ _id: req.params.id });
      res.status(200).json({ message: "You Deleted The Order" });
    } catch (e) {
      res
        .status(500)
        .jsom({ message: "Something went wrong, please try again" });
    }
  }
);

module.exports = router;
