import "./Warehouses.scss";
import Delete from "../../assets/icons/delete_outline-24px.svg"
import Edit from '../../assets/icons/edit-24px-blue.svg'
import Right from '../../assets/icons/chevron_right-24px.svg'
import Sort from '../../assets/icons/sort-24px.svg'
import Close from '../../assets/icons/close-24px.svg'
import { Link } from "react-router-dom";

function Warehouses (props){
  function mainDelete (){
    if(!props.deleteToggle){
      return "deleteDisable"
    }
    else{
      return "deleteActive"
    }
  }

  
  if(props.list.length){
  return(
    <>
   <div className="warehouse__main-container">
    <div className="warehouse">
    <div className="warehouse__header">
    <h1 className="warehouse__title">Warehouses</h1>
    <form className="warehouse__form">
      <input type="text" placeholder="search" className="warehouse__search"/>
     <Link className="warehouse__add" to='/addWarehouse'> <button className="warehouse__button">+Add New Warehouse </button></Link>
    </form>
    
    </div>
    <div className="warehouse__order">
      <p className="warehouse__order-content">WAREHOUSE <img src={Sort} alt="sort"/></p>
      <p className="warehouse__order-content">ADDRESS <img src={Sort} alt="sort"/></p>
      <p className="warehouse__order-content">CONTACT NAME <img src={Sort} alt="sort"/></p>
      <p className="warehouse__order-content">CONTACT INFORMATION <img src={Sort} alt="sort"/></p>
      <p className="warehouse__order-content">ACTIONS</p>
    </div>
      {props.list.map((warehouse)=>{
        return(
          <div className="warehouse-container" key={warehouse.id}>
            <div className="warehouse__sub-container">
            <div className="warehouse__content-container">
              <p className="warehouse__sub-title">WAREHOUSE</p>
              <Link
                      className="warehouse__link"
                      to={`/warehouse/${warehouse.id}`}
                    >
                      <p className="warehouse__content">
                        {warehouse.name} <img src={Right} alt="link" className="warehouse__chevron"/>
                      </p>
                    </Link>
              <p className="warehouse__sub-title">ADDRESS</p>
              <p className="warehouse__content">{warehouse.address}, {warehouse.city},{warehouse.country}</p>
            </div>
            <div className="warehouse__content-container">
              <p className="warehouse__sub-title">CONTACT NAME</p>
              <p className="warehouse__content">{warehouse.contact.name}</p>
              <p className="warehouse__sub-title">CONTACT INFORMATION</p>
              <p className="warehouse__content">{warehouse.contact.phone} {warehouse.contact.email}</p>
            </div>
            </div>
            <div className="warehouse__icons">
              <img src={Delete} className="delete" alt="delete" onClick={()=>props.handleDelete(warehouse.id,warehouse.name)}/>
             <Link to={"/warehouse/"+warehouse.id+"/edit"} className="edit__link"> <img src={Edit} className="edit" alt="edit"/> </Link>
            </div>
          </div>
          
        )
      })}
    </div>
    <div className= {mainDelete()} >
      <div className="delete__container">
      <div className="close">
        <img src={Close} alt="close" onClick={()=>props.mainToggle()}/>
      </div>
    <h1 className="delete__title">Delete {props.deleteInfo.deleteName}</h1>
    <p className="delete__content">Please confirm that you'd like to delete the {props.deleteInfo.deleteName} warehouse from the list of warehouses. You won't be able to undo this action.</p>
    <div className="button__container">
    <button className="button__cancel" onClick={()=>props.mainToggle()}
    >Cancel</button>
    <button className="button__delete" onClick={()=>props.handleConfirm()}>Delete</button>
    </div>
    </div>
    </div>
    <div className="warehouse__footer">
                <p className="footer__content">© InStock Inc. All Rights Reserved.</p>
            </div>
    </div>
   
            </>
    )}
     
  else{return(
  <div>Loading</div>
)
}
}

export default Warehouses;
