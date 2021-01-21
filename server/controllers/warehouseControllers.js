const fs = require('fs');

function readWarehouseData() {
    const warehouse = fs.readFileSync("./data/warehouses.json");
    return JSON.parse(warehouse);
};

function findWarehouseID(name) {
    const warehouseList = readWarehouseData();
    const selectedWarehouse = warehouseList.filter( warehouse => warehouse.name === name);
    return selectedWarehouse[0].id;
};

module.exports = { readWarehouseData, findWarehouseID };