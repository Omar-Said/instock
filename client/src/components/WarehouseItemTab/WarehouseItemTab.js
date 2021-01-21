import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import trashCan from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px-blue.svg";
import CloseIcon from '../../assets/icons/close-24px.svg';

const API_URL = 'http://localhost:8080'
class WarehouseItemTab extends Component {
  state = {
    showDeleteModal: false,
    selectedItemForDelete: null,
  }

  toggleDeleteModal = (id) => {
    console.log('toggle', id);
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      selectedItemForDelete: id,
    })
  }

  deleteInventoryItem = (id) => {
    axios.delete(`${API_URL}/inventory/${id}`)
      .then(() => {
        this.setState({
          showDeleteModal: false,
          selectedItemForDelete: null,
        });
      })
  }

  render() {
  let { itemData } = this.props;

  let itemForDelete;
  if (this.state.selectedItemForDelete) {
    itemForDelete = itemData;
  }

  return (
    <div className="warehouse-inventory__tab">
      <div className="warehouse-inventory__stock">
        <Link
          to={`/inventory/${itemData.id}`}
          className="warehouse-inventory__link"
        >
          <h3 className="warehouse-inventory__txt">{itemData.itemName}</h3>
          <img src={chevron} alt="" />
        </Link>
      </div>
      <div className="warehouse-inventory__stock">
        <p className="warehouse-inventory__desc">{itemData.category}</p>
      </div>
      <div className="warehouse-inventory__stock">
        {itemData.status === "In Stock" && (
          <p className="warehouse-inventory__in-stock">in stock</p>
        )}
        {itemData.status === "Out of Stock" && (
          <p className="warehouse-inventory__out-of-stock">out of stock</p>
        )}
      </div>
      <div className="warehouse-inventory__stock">
        <p className="warehouse-inventory__desc">{itemData.quantity}</p>
      </div>
      <div className="warehouse-inventory__icon">
        <img src={trashCan} alt="" onClick={() => this.toggleDeleteModal(itemData.id)}/>
        <Link to={`/inventory/${itemData.id}/edit/`}>
          <img className="warehouse-inventory__edit" src={edit} alt="" />
        </Link>
      </div>
      {this.state.showDeleteModal && 
          <div className="delete-modal">
            <div className="delete-modal__content">
              <img className="delete-modal__close" src={CloseIcon} alt='X' onClick={() => this.toggleDeleteModal()} />
              <h1 className="delete-modal__delete">Delete {itemForDelete.itemName} inventory item?</h1>
              <p className="delete-modal__paragraph">Please confirm that you'd like to delete {itemForDelete.itemName} from the inventory list. You won't be able to undo this action.</p>
              <div className="delete-modal__buttons">
                <button className="delete-modal__btn" onClick={() => this.toggleDeleteModal()}>Cancel</button>
                <button className="delete-modal__btn delete-modal__btn--delete" onClick={() => this.deleteInventoryItem(this.state.selectedItemForDelete)}>Delete</button>
              </div>
            </div>
          </div>
        }
    </div>
  )};
}

export default WarehouseItemTab;
