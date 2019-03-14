import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        hamburgerOn: false
    }
  };  
  hamburgerOn = () => {
    this.setState(()=>({
      hamburgerOn: !this.state.hamburgerOn
    }))
  }
  render() {
    return (
  <header className="navbar">
    <div className="content-container navbar--flex">
      <div className={this.state.hamburgerOn?"navbar__toggleShow":"navbar__content"}>
        <Link className="navbar__title" to="/dashboard"><h1>Expensify-Plus</h1></Link>
        <div className="navbar__hamburger navbar__item-toggle" onClick={this.hamburgerOn}><FontAwesomeIcon icon="bars" /></div>
      </div>

      <div className={this.state.hamburgerOn?"navbar__toggleShow navbar__content--right":"navbar__content navbar__content--right"}>
        <Link className="navbar__item" to="/dashboard">Dashboard</Link>
        <Link className="navbar__item" to="/transaction">Transactions</Link>
        <div className="navbar__item" onClick={this.props.startLogout}>Logout</div>
      </div>
      
    </div>
  </header>
  )}
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Navbar);
