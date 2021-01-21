import "./InventoryListItem.scss";
import { ReactComponent as ChevronR } from "../../assets/icons/chevron_right-24px.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit-24px-blue.svg";
import { Link } from 'react-router-dom';

const InventoryListItem = (props) => {
  return (
    <div className="list-item">
      <div className="list-item__container">
        <h4 className="list-item__label">inventory item</h4>
        <p className="list-item__item-name">
          <Link to={`/inventory/${props.id}`}>
            {props.item} <ChevronR className="list-item__chevron" />
          </Link>
        </p>
        <h4 className="list-item__label">category</h4>
        <p className="list-item__info-text list-item__info-text--category">
          {props.category}
        </p>
        <h4 className="list-item__label">status</h4>
        <div className="list-item__status-container">
          {props.status === "In Stock" && (
            <p className="list-item__in-stock">in stock</p>
          )}
          {props.status === "Out of Stock" && (
            <p className="list-item__out-of-stock">out of stock</p>
          )}
        </div>
        <h4 className="list-item__label">qty</h4>
        <p className="list-item__info-text list-item__info-text--qty">
          {props.qty}
        </p>
        <h4 className="list-item__label">warehouse</h4>
        <p className="list-item__info-text list-item__info-text--warehouse">
          {props.warehouse}
        </p>
      </div>
      <div className="list-item__actions">
        <Delete className="list-item__action-icon" onClick={ () => props.toggleDeleteModal(props.id)}/>
        <Link className="list-item__action-link" to={`/inventory/${props.id}/edit/`}><Edit className="list-item__action-icon"/></Link>
      </div>
    </div>
  );
};

export default InventoryListItem;
