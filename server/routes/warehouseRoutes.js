const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const app= express()

function readWarehouseData() {
  const warehouse = fs.readFileSync("./data/warehouses.json");
  return JSON.parse(warehouse);
}

function readInventoryData() {
  const inventory = fs.readFileSync("./data/inventories.json");
  return JSON.parse(inventory);
}

function checkPhoneNumber(number){
  if(number.length<10 ||number.length>15){
    return 'Not a valid phone number'
  }
  else{
    return number
  }
}
function checkEmail(email){
if(email.includes('@')&&email.includes('.com')){
  return email
}
else{
  return 'Not a valid Email Address'
}
}

function checkWarehouse(body,res){
 const { name, address, city, country, contact } = body;
 if(
  name &&
  address &&
  city &&
  country &&
  contact.name &&
  contact.position &&
  contact.phone &&
  contact.email){
    const warehouseData=readWarehouseData();
    warehouseData.push(body)
  fs.writeFileSync("./data/warehouses.json",JSON.stringify(warehouseData))
  res.status(201).json(warehouseData)
  }
  else{
    res.status(400).send('Invalid Request:Please ensure all fields are filled out properly')
  }
}



app.use((req,res,next)=>{
       if(req.method==="POST"&&req.headers["content-type"]!=="application/json"){
      return res.status(400).send("server requires application/Json")
  }
    next()
 });


router.get("/", (_req, res) => {
  res.status(200).json(readWarehouseData());
});

router.get("/:id", (req, res) => {
  const warehouseData = readWarehouseData();
  const inventoryData = readInventoryData();

  const warehouseID = warehouseData.find(
    (element) => element.id === req.params.id
  );

  const inventoryID = inventoryData.filter(
    (element) => element.warehouseID === req.params.id
  );

  if (warehouseID && inventoryID) {
    res.json({ warehouse: warehouseID, inventory: inventoryID });
  } else {
    res.status(404);
  }
});

function editWarehouse(id, body) {
  const { name, address, city, country, contact } = body;
  if (
    id &&
    name &&
    address &&
    city &&
    country &&
    contact.contactName &&
    contact.position &&
    contact.phone &&
    contact.email
  ) {
    const warehouse = readWarehouseData();
    const findWarehouse = warehouse.findIndex((element) => element.id === id);
    warehouse.splice(findWarehouse, 1, {
      id,
      name,
      address,
      city,
      country,
      contact: {
        name: contact.contactName,
        position: contact.position,
        phone: contact.phone,
        email: contact.email,
      },
    });
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouse));
    return warehouse;
  } else {
    return "Invalid form submission";
  }
}

router.put("/:id", (req, res) => {
  console.log(req.params);
  const returned = editWarehouse(req.params.id, req.body);

  if (returned === "Invalid form submission") {
    res.status(400).send({ message: returned });
  } else {
    res.status(200).send(returned);
  }
});

router.delete("/:id", (req, res) => {
  const warehouseData = readWarehouseData();
  const mainDelete = warehouseData.filter((warehouse) => {
    if (warehouse.id !== req.params.id) {
      return warehouse;
    }
  })
  fs.writeFileSync('./data/warehouses.json',JSON.stringify(mainDelete))
  res.status(200).json(readWarehouseData())
})

router.post('/',(req,res)=>{
  
  const newWarehouse={
    id: uuidv4(),
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country:req.body.country,
      contact: {
        name: req.body.contact.name,
        position:req.body.contact.position,
        phone: checkPhoneNumber(req.body.contact.phone),
        email: checkEmail(req.body.contact.email)
      }
  }
  if(newWarehouse.contact.phone!=='Not a valid phone number'&&newWarehouse.contact.email!=='Not a valid Email Address'){
    checkWarehouse(newWarehouse,res)
  }
  else{
  res.status(400).send('Invalid Request:Please ensure all fields are filled out properly')
  }
})

module.exports = router;
