const fs = require('fs');
const inventoryFile = './data/inventories.json';
const warehouseController = require('../controllers/warehouseControllers');
const { v4: uuidv4 } = require('uuid');

function inventoryList() {
    const data = fs.readFileSync(inventoryFile);
    return JSON.parse(data);
};

function writeInventory(inventory) {
    fs.writeFileSync(inventoryFile, JSON.stringify(inventory));
};

function inventoryItem(warehouseName, itemName, description, category, status, quantity) {
    this.id = uuidv4();
    this.warehouseID = warehouseController.findWarehouseID(warehouseName);
    this.warehouseName = warehouseName;
    this.itemName = itemName;
    this.description = description;
    this.category = category;
    this.status = status;
    this.quantity = quantity;
};

function deleteItem(itemID) {
    const inventory = inventoryList();
    const itemIndex = inventory.findIndex( item => item.id === itemID );
    inventory.splice(itemIndex, 1);
    fs.writeFileSync(inventoryFile, JSON.stringify(inventory));
    return inventory;
};

function addItem(data) {
    const inventory = inventoryList();
    const item = new inventoryItem(data.warehouseName, data.itemName, data.description, data.category, data.status, data.quantity);
    inventory.push(item);
    writeInventory(inventory);
    return item;
};

module.exports = { inventoryList, writeInventory, deleteItem, inventoryItem, addItem };