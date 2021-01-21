import React, {Component} from 'react';
import arrowBack from '../assets/icons/arrow_back-24px.svg'; 
import axios from 'axios';
import Nav from '../components/Nav/Nav';
import './InventoryItemEdit.scss';
import { Link } from 'react-router-dom';

class InventoryItemEdit extends Component {
    state={
      item:null,
      isError: false,
      isLoading: true,
      categories: [],
      category: null,
      warehouseName: null,
      itemName: null,
      description: null,
      status: null,
      quantity: 0,
      validationErrors: '',
    };

    componentDidMount(){
        axios.get(`http://localhost:8080/inventory/${this.props.match.params.id}`) 
        .then(response => {
            this.setState({
            item: response.data,
            isLoading: false,
            category: response.data.category,
            warehouseName: response.data.warehouseName,
            itemName: response.data.itemName,
            description: response.data.description,
            status: response.data.status,
            quantity: response.data.quantity,
            });
        })
        .catch(() => {
            this.setState({isError: true});
        });
    }

        saveItem = (e) => {
            e.preventDefault()

            let validationErrors = '';

            if (!this.state.itemName || this.state.itemName === '' ) {
                validationErrors += 'Item Name cannot be blank. ';
            }
            if (!this.state.description || this.state.description === '' ) {
                validationErrors += 'Description cannot be blank. ';
            }
            if (!this.state.category ) {
                validationErrors += 'Please select a category. ';
            }
            if (!this.state.warehouseName) {
                validationErrors += 'Please select a warehouse. ';
            }
            if (!this.state.quantity || this.state.quantity === '' || (this.state.status === 'In Stock' && this.state.quantity <= 0) ) {
                validationErrors += 'Quantity must be greater than 0. ';
            }

            if (validationErrors  !== '') {
                this.setState({
                    validationErrors: validationErrors,
                })
            } else {
                const body = {
                    id: this.state.item.id,
                    warehouseName: this.state.warehouseName,
                    itemName: this.state.itemName,
                    description: this.state.description,
                    category: this.state.category,
                    status: this.state.status,
                    quantity: this.state.status === 'In Stock' ? this.state.quantity : '0',
                };

                axios.put(`http://localhost:8080/inventory/${this.props.match.params.id}`, body)
                .then(response => {
                    this.props.history.push(`/inventory/${this.state.item.id}`);
                })
            }
        }

        handleChange = event => {
            const name = event.target.name
            this.setState({
                [name]: event.target.value,
            });
        }

        handleStatusChange = event => {
            this.setState({
                status: event.target.value,
            })
        }

        cancel = (e) => {
            e.preventDefault();
            this.props.history.push(`/inventory/${this.state.item.id}`);
        };

        render(){
            const {isLoading, item} = this.state;
            return (
              !isLoading && 
              <>
              <Nav currPage='inventory' />
              <div>
              <div className="edit-item">
                <div className="edit-item-header">
                  <Link to={`/inventory/${item.id}`}>
                    <img className="edit-item-header__backarrow" src={arrowBack} alt='<'/>
                  </Link>
                  <h1 className="edit-item-header__name">Edit Inventory Item</h1>
                </div>
                <div className="edit-item-body">
                <form className="edit-item-body__form" onSubmit={(e)=>this.saveItem(e)} onKeyPress={(e) => {e.key === 'Enter' && e.preventDefault();}}>
                  <div className="edit-item-body__contentleft">
                    <h3 className="edit-item-body__header">Item Details</h3>
                    <p className="edit-item-body__label">Item Name:</p>
                    <input name='itemName' value={this.state.itemName} className="edit-item-body__text" onChange={this.handleChange} />
                    <p className="edit-item-body__label">Description:</p>
                    <textarea name='description' value={this.state.description} className="edit-item-body__description" onChange={this.handleChange} />
                    <p className="edit-item-body__label">Category:</p>
                    <select className="edit-item-body__select" name="category" value={this.state.category} onChange={this.handleChange}>
                        <option value="Electronics">Electronics</option>
                        <option value="Gear">Gear</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Health">Health</option>
                    </select>
                  </div>
                  <div className="edit-item-body__contentright">
                    <h3 className="edit-item-body__header">Item Availability</h3>
                    <div className="edit-item-body__statquan">
                        <p className="edit-item-body__label edit-item-body__half">Status:</p>
                            <input type='radio' checked={this.state.status === 'In Stock'} id='inStock' value='In Stock' onChange={this.handleStatusChange}/>
                            <label className="edit-item-body__statuscontainer" htmlFor='inStock'>In Stock</label>
                            <input type='radio' checked={this.state.status === 'Out of Stock'} id='outOfStock' value='Out of Stock' onChange={this.handleStatusChange}/>
                            <label htmlFor='outOfStock'>Out of Stock</label>
                    </div>
                    <div>
                        {this.state.status === 'In Stock' && (
                            <>
                                <p className="edit-item-body__label edit-item-body__half">Quantity:</p>
                                <input className="edit-item-body__text edit-item-body__half" name='quantity' value={this.state.quantity} onChange={this.handleChange} />
                            </>
                        )}
                    </div>
                    <p className="edit-item-body__label">Warehouse:</p>
                    <select className="edit-item-body__select" name="warehouseName" value={this.state.warehouseName} onChange={this.handleChange}>
                        <option value="Manhattan">Manhattan</option>
                        <option value="King West">King West</option>
                        <option value="Granville">Granville</option>
                        <option value="San Fran">San Fran</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Montreal">Montreal</option>
                        <option value="Boston">Boston</option>
                    </select>
                        {this.state.validationErrors && <div className='edit-item-body__errors'>{this.state.validationErrors}</div>}
                  </div>
                    <div className="edit-item-body__buttoncontainer">
                        <button className="edit-item-body__button edit-item-body__button--cancel" onClick={(e) => this.cancel(e)}>Cancel</button>
                        <button className="edit-item-body__button" type="submit" >Save</button>
                    </div>
                  </form>
                </div>
              </div> 
              </div>
                <p className="edit-item-footer">© InStock Inc. All Rights Reserved.</p>
              </>       
            )
            };
    }
        
export default InventoryItemEdit;