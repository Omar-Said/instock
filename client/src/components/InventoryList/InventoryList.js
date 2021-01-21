import './InventoryList.scss';
import InventoryListItem from '../InventoryListItem/InventoryListItem';
import {ReactComponent as Sort} from '../../assets/icons/sort-24px.svg';
import { Link } from 'react-router-dom';

const InventoryList = props => {
  return (
    <div className="inventory-list">
      <div className="inventory-list__header">
        <h1 className="inventory-list__title">Inventory</h1>
        <input className="inventory-list__search" type="text" placeholder="Search..."/>
        <button className="inventory-list__button">
          <Link to="/inventory/add">+ Add New Item</Link>
        </button>
      </div>
      <div className="inventory-list__table-header">
        <h4 className="inventory-list__label inventory-list__label--item">inventory item<Sort className="inventory-list__sort"/></h4>
        <h4 className="inventory-list__label">category<Sort className="inventory-list__sort"/></h4>
        <h4 className="inventory-list__label">status<Sort className="inventory-list__sort"/></h4>
        <h4 className="inventory-list__label inventory-list__label--qty">qty<Sort className="inventory-list__sort"/></h4>
        <h4 className="inventory-list__label inventory-list__label--warehouse">warehouse<Sort className="inventory-list__sort"/></h4>
        <h4 className="inventory-list__label inventory-list__label--actions">actions</h4>
      </div>
        {props.data.slice(0, 8).map( item => {
          return (
            <InventoryListItem 
              key={item.id}
              id={item.id}
              category={item.category}
              item={item.itemName}
              qty={item.quantity}
              status={item.status}
              warehouse={item.warehouseName}
              toggleDeleteModal={props.toggleDeleteModal}
            />
          )
        })}
    </div>
  );
};

export default InventoryList;