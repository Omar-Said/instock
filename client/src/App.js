import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WareHouse from "./pages/Warehouse";
import Inventory from "./pages/Inventory";
import InventoryItem from "./components/InventoryItem/InventoryItem";
import InventoryItemEdit from './pages/InventoryItemEdit';
import Add from "./components/Add/add";
import WarehouseEdit from "./components/WarehouseEdit/WarehouseEdit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={WareHouse} />
        <Route path="/warehouse/:id/edit" component={WarehouseEdit} />
        <Route path="/warehouse/:id" component={WareHouse} />
        <Route path="/inventory" exact component={Inventory} />
        <Route path="/inventory/add" exact component={Inventory} />
        <Route path="/inventory/:id" exact component={InventoryItem} />
        <Route path="/inventory/:id/edit/" component={InventoryItemEdit} />
        <Route path="/addWarehouse" component={Add} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
