const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryControllers");

router.get("/", inventoryController.getAllInventories);

router.get("/", (_req, res) => {
  res.status(200).send("ok");
});

router.get("/:id", (req, res) => {
  const inventoryitem = inventoryController.findById(req.params.id);
  if (inventoryitem === undefined) {
    res.status(404).send({ message: "No item with that id exists" });
  } else {
    res.status(200).send(inventoryitem);
  }
});

router.post("/", inventoryController.addItem);

router.put("/:id", (req, res) => {
    const error = inventoryController.updateItem(req.body);
    if (error) {
      res.status(400).send({ message: error });
    } else {
      res.status(200).send(req.body);
    }
});

router.delete("/:id", inventoryController.deleteItem);

module.exports = router;
