import './Nav.scss';
import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/logo/InStock-Logo.svg';

const Nav = props => {
    const buttonClassWare = props.currPage === "warehouse" ? "nav__button nav__button--current" : "nav__button";
    const buttonClassInv = props.currPage === "inventory" ? "nav__button nav__button--current" : "nav__button";

    return (
        <header>
            <nav className="nav">
                <Link to='/'>
                    <Logo className="nav__logo"/>
                </Link>
                <div className="nav__button-container">
                    <Link to='/'>
                        <button className={buttonClassWare}>Warehouses</button>
                    </Link>
                    <Link to='/inventory'>
                        <button className={buttonClassInv}>Inventory</button>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Nav;