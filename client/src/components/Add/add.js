import { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Back from '../../assets/icons/arrow_back-24px.svg'
import Nav from '../Nav/Nav'
import Error from '../../assets/icons/error-24px.svg'
import './add.scss'

class Add extends Component {
    state={
        errorToggle:false,
        currPage:'warehouse'
    }

    mainToggle(){
        if(!this.state.errorToggle){
            return "errorDisabled"
        }
        else{
            return "errorEnabled"
        }
    }

    boxToggle(){
        if(!this.state.errorToggle){
            return "add__text"
        }
        else{
            return "add__error"
        }
    }


    handleSubmit=(event)=>{
        event.preventDefault();
        if(
            event.target.name.value.length&&
            event.target.address.value.length&&
           event.target.city.value.length&&
           event.target.country.value.length&&
           event.target.contactName.value.length&&
           event.target.position.value.length&&
            event.target.phone.value.length&&
            event.target.email.value.length&&
            (event.target.phone.value.length>10||
             event.target.phone.value.length<15)&&
            event.target.email.value.includes('@')&&
            event.target.email.value.includes('.com')
           
            ){
                axios.post('http://localhost:8080/warehouse',{
                    name:event.target.name.value,
                    address:event.target.address.value,
                    city:event.target.city.value,
                    country:event.target.country.value,
                    contact:{
                        name:event.target.contactName.value,
                        position:event.target.position.value,
                        phone:event.target.phone.value,
                        email:event.target.email.value
                    }
                }).then(setTimeout(this.props.history.push('/'),2000))
            }
            else{
                event.target.reset()
                this.setState({
                    errorToggle:true
                })
                
            }
        }

    render(){
        return(
            <>
            <Nav currPage={this.state.currPage}/>
            <div className="add">
                <div className="add__header">
                    <Link to="/">
                    <img src={Back} className="back__arrow" alt="return"/>
                    </Link>
                    <h1 className="add__title">Add New Warehouse</h1>
                </div>
                
                <form className="add__form" onSubmit={this.handleSubmit}>

                
                <div className="add__container">
                    <div className="add__details">
                        <h2 className="add__details-title">Warehouse Details</h2>
                        <label className="add__title">Warehouse Name</label><br/>
                        <input type="text" name="name" className={this.boxToggle()} placeholder="Warehouse Name"/>
                        <br/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                        <label className="add__title">Street Address</label><br/>
                        <input type ="text" name="address" className={this.boxToggle()} placeholder="Street Address"/>
                        <br/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                        <label className="add__title">City</label><br/>
                        <input type ="text" name="city" className={this.boxToggle()} placeholder="City"/><br/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                        <label className="add__title">Country</label><br/>
                        <input type="text" name="country" className={this.boxToggle()} placeholder="Country"/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                    </div>
                    <div className="add__contact">
                        <h2 className="add__contact-title">Contact Details</h2>
                        <label className="add__title">Contact Name</label><br/>
                        <input type="text" name="contactName" className={this.boxToggle()} placeholder="Contact Name"/><br/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                        <label className="add__title">Position</label><br/>
                        <input type="text" name="position" className={this.boxToggle()} placeholder="Position"/><br/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                        <label className="add__title">Phone Number </label><br/>
                        <input type="number" name="phone" className={this.boxToggle()} placeholder="Phone Number"/><br/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                        <label className="add__title">Email</label><br/>
                        <input type="text" name="email" className={this.boxToggle()} placeholder="Email"/>
                        <p className={this.mainToggle()}> <img src={Error} className="error__image" alt="error"/>This field is required</p>
                    </div>
                    </div>
                    <div className="add__buttons">
                        <Link to="/">
                        <button className="button__cancel">Cancel</button>
                        </Link>
                        <button type="submit" className="button__add">+Add Warehouse</button>
                    </div>
                </form>
            
            <div className="warehouse-add__footer">
                <p className="footer__content">© InStock Inc. All Rights Reserved.</p>
            </div>
            </div>
            </>
        )
    }
}
export default Add