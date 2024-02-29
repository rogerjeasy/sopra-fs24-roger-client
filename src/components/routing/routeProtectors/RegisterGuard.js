import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {useState} from 'react';


export const RegisterGuard = props => {
    if (!localStorage.getItem('token')) {
        return props.children;
    }
    // if user is already logged in, redirect to main /game
    return <Redirect to="/register" />;
};

RegisterGuard.propTypes = {
    children: PropTypes.node
}


export const LoginRegisterGuard = props => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    if (toggleLogin) {
        return <Redirect to="/login" />;
    }
    return <Redirect to="/register" />;
    };

LoginRegisterGuard.propTypes = {
    children: PropTypes.node
}