import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import chevron from "../../assets/icons/chevron_right-24px.svg";
import trashCan from "../../assets/icons/delete_outline-24px.svg";
import edit from "../../assets/icons/edit-24px-blue.svg";
import WarehouseItemTab from "../WarehouseItemTab/WarehouseItemTab";
import CloseIcon from '../../assets/icons/close-24px.svg';

const API_URL = 'http://localhost:8080'

class WarehouseItem extends Component {
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
    let itemForDelete;
    if (this.state.selectedItemForDelete) {
      itemForDelete = this.props;
    }

  return (
    <div>
      <div className="warehouse-inventory__container">
        <div className="warehouse-inventory__top">
          <div className="warehouse-inventory__left">
            <h4 className="warehouse-inventory__header">INVENTORY ITEM</h4>
            <Link
              to={`/inventory/${this.props.id}`}
              className="warehouse-inventory__link"
            >
              <h3 className="warehouse-inventory__txt">{this.props.itemName}</h3>
              <img src={chevron} alt="" />
            </Link>
          </div>
          <div className="warehouse-inventory__top-left">
            <h4 className="warehouse-inventory__header">STATUS</h4>
            {this.props.status === "In Stock" && (
              <p className="warehouse-inventory__in-stock">in stock</p>
            )}
            {this.props.status === "Out of Stock" && (
              <p className="warehouse-inventory__out-of-stock">out of stock</p>
            )}
          </div>
        </div>
        <div className="warehouse-inventory__top">
          <div className="warehouse-inventory__right">
            <h4 className="warehouse-inventory__header">CATEGORY</h4>
            <p className="warehouse-inventory__desc">{this.props.category}</p>
          </div>
          <div className="warehouse-inventory__top-left">
            <h4 className="warehouse-inventory__header">QTY</h4>
            <p className="warehouse-inventory__desc">{this.props.quantity}</p>
          </div>
        </div>
        <div className="warehouse-inventory__icons">
          <img src={trashCan} alt="trashcan" onClick={() => this.toggleDeleteModal(this.props.id)} />
          <Link to={`/inventory/${this.props.id}/edit/`}>
            <img src={edit} alt="edit" />
          </Link>
        </div>
      </div>
      <WarehouseItemTab itemData={this.props} />
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
  );
}
}

export default WarehouseItem;
