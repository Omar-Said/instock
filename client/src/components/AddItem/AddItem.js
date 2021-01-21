import "./AddItem.scss";
import {ReactComponent as Back} from '../../assets/icons/arrow_back-24px.svg';
import {ReactComponent as Error} from '../../assets/icons/error-24px.svg';
import { Link } from 'react-router-dom';

const AddItem = props => {

    const { itemName, description, category, status, quantity, warehouseName } = props.data;

    const validName = !itemName ? "add-item__text-input add-item__text-input--error" : "add-item__text-input";
    
    const validDesc = !description ? "add-item__text-area add-item__text-area--error" : "add-item__text-area";
    
    const validNumber = quantity < 1 || isNaN(quantity) ? "add-item__text-input add-item__text-input--error" : "add-item__text-input";

    const validateFields = (!itemName || !description || !status || !category || !warehouseName || ( (status === "In Stock" && quantity < 1 ) && isNaN(quantity) )) ?
         <button className="add-item__button add-item__button--disabled" disabled>+ Add item</button> :
         <button className="add-item__button" type="submit">+ Add item</button>
    
    return (
        <div className="add-item">
            <div className="add-item__header">
                <Link to="/inventory"><Back className="add-item__back"/></Link>
                <h1 className="add-item__title">Add New Inventory Item</h1>
            </div>
            <form className="add-item__form" onSubmit={props.handleAddItem}>
                <div className="add-item__flex-container">
                    <fieldset className="add-item__item-details">
                        <h3 className="add-item__form-header">Item Details</h3>
                        <label>
                            <h3 className="add-item__form-label">Item Name</h3>
                            <input className={validName} type="text" name="itemName" placeholder="Item Name" onChange={props.handleChange}/>
                                {!itemName &&
                                    <h5 className="add-item__error"><Error className="add-item__error-icon"/>This field is required</h5>
                                }
                        </label>
                        <label>
                            <h3 className="add-item__form-label">Description</h3>
                            <textarea className={validDesc} name="description" placeholder="Please enter a brief item description" onChange={props.handleChange}/>
                            {!description &&
                                <h5 className="add-item__error"><Error className="add-item__error-icon"/>This field is required</h5>
                            }
                        </label>
                        <label>
                            <h3 className="add-item__form-label">Category</h3>
                            <select className="add-item__select" name="category" onChange={props.handleChange}>
                                <option value="">Please Select</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Gear">Gear</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Health">Health</option>
                            </select>
                        </label>
                    </fieldset>
                    <fieldset className="add-item__item-availability">
                        <h3 className="add-item__form-header">Item Availability</h3>
                            <h3 className="add-item__form-label">Status</h3>
                            <div className="add-item__status-container">
                                <div className="add-item__radio">
                                    <label>
                                        <input type="radio" name="status" value="In Stock" onChange={props.handleRadioChange}/>In Stock
                                    </label>
                                </div>
                                <div className="add-item__radio">
                                    <label>
                                        <input type="radio" name="status" value="Out of Stock" onChange={props.handleRadioChange}/>Out of Stock
                                    </label>
                                </div>
                            </div>
                        {status === "In Stock" &&
                            <label>
                                <h3 className="add-item__form-label">Quantity</h3>
                                <input className={validNumber} type="text" name="quantity" onChange={props.handleChange}/>
                                {( quantity < 1 || isNaN(quantity) ) &&
                                    <h5 className="add-item__error"><Error className="add-item__error-icon"/>Please enter a valid number</h5>
                                }
                            </label>
                        }
                        <label>
                            <h3 className="add-item__form-label">Warehouse</h3>
                            <select className="add-item__select" name="warehouseName" onChange={props.handleChange}>
                                <option value="">Please Select</option>
                                <option value="Manhattan">Manhattan</option>
                                <option value="King West">King West</option>
                                <option value="Granville">Granville</option>
                                <option value="San Fran">San Fran</option>
                                <option value="Seattle">Seattle</option>
                                <option value="Montreal">Montreal</option>
                                <option value="Boston">Boston</option>
                            </select>
                        </label>
                    </fieldset>
                </div>
                <div className="add-item__form-submit">
                    <button className="add-item__button add-item__button--cancel"><Link to="/inventory">Cancel</Link></button>
                    {validateFields}
                </div>
            </form> 
        </div>
    );
};

export default AddItem;