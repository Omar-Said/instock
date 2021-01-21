const inventories = require("../models/inventoryModels");
const inventoryData = require("../data/inventories.json");

function findById(id) {
  return inventoryData.find((obj) => obj.id === id);
};

function getAllInventories(_, res) {
  res.status(200).json(inventories.inventoryList());
};

 function updateItem(item) {
    if (item.id && item.id !== '' && 
        // item.warehouseID && item.warehouseID !== '' &&
        item.warehouseName && item.warehouseName !== '' &&
        item.itemName && item.itemName !== '' &&
        item.description && item.description !== '' &&
        item.category && item.category !== '' &&
        item.status && item.status !== '' &&
        item.quantity && item.quantity !== '') {

            let inventory = inventories.inventoryList();
            const newInventory = inventory.map(i => {
                if (i.id === item.id) {
                    return {
                        id: i.id,
                        warehouseID: i.warehouseID,
                        warehouseName: item.warehouseName,
                        itemName: item.itemName,
                        description: item.description,
                        category: item.category,
                        status: item.status,
                        quantity: item.quantity,
                    }
                } else {
                    return i;
                }
            })

            inventories.writeInventory(newInventory);
    } else {
        return "Data was missing";
    }
    return
 }

function deleteItem(req, res) {
  res.status(204).json(inventories.deleteItem(req.params.id));
};

function addItem(req, res) {
  if (!req.body.warehouseName && !req.body.itemName && !req.body.description && !req.body.category && !req.body.status && !req.body.quantity) {
    return res.status(400).json({
        error: 'POST body must contain all requiredProperties',
        requiredProperties: ['warehouseName', 'itemName', 'description', 'category', 'status', 'quantity']
    });
  };

  const newItem = {
    warehouseName: req.body.warehouseName,
    itemName: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity
  };

  res.status(201).json(inventories.addItem(newItem));
};

module.exports = { getAllInventories, findById, updateItem, deleteItem, addItem };
