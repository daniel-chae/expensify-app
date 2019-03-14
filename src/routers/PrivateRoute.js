import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} render={(props)=>(
        isAuthenticated ? (
            <div>
                <Navbar />
                <Component {...props}/>
                <Footer />
            </div>) : (
                <Redirect to="/" />
                )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);