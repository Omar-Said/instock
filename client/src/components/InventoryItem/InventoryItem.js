import React, {Component} from 'react';
import arrowBack from '../../assets/icons/arrow_back-24px.svg'; 
import edit from '../../assets/icons/edit-24px-2.svg';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './InventoryItem.scss';
import { Link } from 'react-router-dom';

class InventoryItem extends Component {
  state={
    item:null,
    isError: false,
    isLoading: true,
  };

  componentDidMount(){
    setTimeout(() => {
      axios.get(`http://localhost:8080/inventory/${this.props.match.params.id}`) 
      .then(response => {
        this.setState({
          item: response.data,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({isError: true});
      });
    }, 1000);
  }

  render(){
    const {isLoading, item} = this.state;
    return (
      !isLoading && 
      <>
      <Nav currPage='inventory' />
      <div className="item-container">
        <div className="item-header">
          <Link to='/inventory'>
            <img className="item-header__backarrow" src={arrowBack} alt='<'/>
          </Link>
          <h1 className="item-header__name">{item.itemName}</h1>
          <Link to={`/inventory/${item.id}/edit/`}>
            <div className="item-header__edit-container">
              <img className="item-header__edit" src={edit} alt='edit'/>
              <p className="item-header__edittext">Edit</p>
            </div>
          </Link>
        </div>
        <div className="item-body">
          <div className="item-body__contentleft">
            <p className="item-body__label">ITEM DESCRIPTION:</p>
            <p className="item-body__text">{item.description}</p>
            <p className="item-body__label">CATEGORY:</p>
            <p className="item-body__text">{item.category}</p>
          </div>
          <div className="item-body__contentright">
            <div className="item-body__statquan">
              <p className="item-body__label item-body__half">STATUS:</p>
              <p className={item.status==='In Stock'? 'item-body__in-stock': 'item-body__out-of-stock'}>{item.status}</p>
              <p className="item-body__label item-body__half">QUANTITY:</p>
              <p className="item-body__text item-body__half">{item.quantity}</p>
            </div>
            <p className="item-body__label">WAREHOUSE:</p>
            <p className="item-body__text">{item.warehouseName}</p>
          </div>
        </div>
      </div> 
        <p className="item__footer">© InStock Inc. All Rights Reserved.</p>
      </>       
    )
    };
}

export default InventoryItem;
