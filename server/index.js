const express = require("express");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventoryRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use("/warehouse", warehouseRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(PORT, () => console.log("Listening on port 8080"));
