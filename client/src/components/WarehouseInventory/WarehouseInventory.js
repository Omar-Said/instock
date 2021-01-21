import "./WarehouseInventory.scss";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import sort from "../../assets/icons/sort-24px.svg";

function WarehouseInventory(props) {
  let { inventory } = props.warehouse;
  return (
    <div className="warehouse-inventory">
      <header className="warehouse-inventory__header-tab">
        <div className="warehouse-inventory__header-wrap">
          <h4 className="warehouse-inventory__header-mod">INVENTORY ITEM</h4>
          <img
            src={sort}
            alt="sort button"
            className="warehouse-inventory__header-svg"
          />
        </div>
        <div className="warehouse-inventory__header-wrap">
          <h4 className="warehouse-inventory__header-mod">CATEGORY</h4>
          <img
            src={sort}
            alt="sort button"
            className="warehouse-inventory__header-svg"
          />
        </div>
        <div className="warehouse-inventory__header-wrap">
          <h4 className="warehouse-inventory__header-mod">STATUS</h4>
          <img
            src={sort}
            alt="sort button"
            className="warehouse-inventory__header-svg"
          />
        </div>
        <div className="warehouse-inventory__header-wrap">
          <h4 className="warehouse-inventory__header-mod">QUANTITY</h4>
          <img
            src={sort}
            alt="sort button"
            className="warehouse-inventory__header-svg"
          />
        </div>
        <h4 className="warehouse-inventory__header-mod">ACTIONS</h4>
      </header>
      <ul className="warehouse-inventory__wrapper">
        {inventory.map((element) => (
          <WarehouseItem
            category={element.category}
            description={element.description}
            itemName={element.itemName}
            quantity={element.quantity}
            status={element.status}
            warehouseName={element.warehouseName}
            id={element.id}
            key={element.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default WarehouseInventory;
