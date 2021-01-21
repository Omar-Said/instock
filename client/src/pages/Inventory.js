import { Component } from 'react';
import './Inventory.scss';
import axios from 'axios';
import Nav from '../components/Nav/Nav';
import InventoryList from '../components/InventoryList/InventoryList';
import CloseIcon from '../assets/icons/close-24px.svg';
import AddItem from '../components/AddItem/AddItem';

const API_URL = 'http://localhost:8080'

class Inventory extends Component {
  state = {
    inventoryList: [],
    selectedItem: null,
    currPage: "inventory",
    showDeleteModal: false,
    selectedItemForDelete: null,
    itemName: "",
    description: "",
    category: "",
    status: "",
    quantity: undefined,
    warehouseName: ""
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/inventory`)
      .then( response => 
        this.setState({
          inventoryList: response.data
        }));
  }

  toggleDeleteModal = (id) => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      selectedItemForDelete: id,
    })
  }

  deleteInventoryItem = (id) => {
    axios.delete(`${API_URL}/inventory/${id}`)
      .then(() => {
        axios.get(`${API_URL}/inventory`)
        .then( response => 
          this.setState({
            inventoryList: response.data,
            showDeleteModal: false,
            selectedItemForDelete: null,
          }));
      })
  }

  componentDidUpdate(prevProps) {
    const currPage = this.props.match.path; 
    
    if (prevProps.match.path !== currPage) {
      this.setState({addItem: true})
    }
    if ((currPage === '/inventory' && this.state.addItem === true )) {
      this.setState({addItem:false})
    }
  }

  handleRadioChange = event => {
    this.setState({
        status: event.target.value
    });

    if (this.state.status === "Out of Stock") {
      this.setState({ quantity: 0 });
    }
  }

  handleChange = event => {
    const name = event.target.name
    this.setState({
        [name]: event.target.value
    });
  }

  handleAddItem = event => {
    event.preventDefault();
    const warehouseName = this.state.warehouseName;
    const itemName = this.state.itemName;
    const description = this.state.description;
    const category = this.state.category;
    const status = this.state.status;
    const quantity = this.state.quantity;
  
    const postBody = {
      warehouseName,
      itemName,
      description,
      category,
      status,
      quantity,
    };

    axios
      .post(`${API_URL}/inventory`, postBody)
      .then( () => {
        this.setState({
          itemName: "",
          description: "",
          category: "",
          status: "",
          quantity: undefined,
          warehouseName: "",
        });
        alert(`Successfully added ${postBody.itemName} to ${postBody.warehouseName}'s inventory!`);
      })
      event.target.reset();
  }
  
  render() {
    let itemForDelete;
    if (this.state.selectedItemForDelete) {
      itemForDelete = this.state.inventoryList.find(i => i.id === this.state.selectedItemForDelete);
    }

    const inventoryClass = this.props.match.path === "/inventory" ? "inventory" : "inventory inventory--add";
    
    return (
      <div className={inventoryClass}>
        <Nav currPage={this.state.currPage}/>
        {this.props.match.path === "/inventory" &&
          <InventoryList
            data={this.state.inventoryList}
            toggleDeleteModal={this.toggleDeleteModal}
          />
        }
        {this.props.match.path === "/inventory/add" && 
          <AddItem
            data={this.state}
            handleAddItem={this.handleAddItem}
            handleChange={this.handleChange}
            handleRadioChange={this.handleRadioChange}
          />
        }
        <p className="inventory__footer">© InStock Inc. All Rights Reserved.</p>
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

export default Inventory;