import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, login } from '../actions/session_actions';
import SignUpForm from './signup_form';

const mSP = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Create Account'
    };
};

const mDP = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        login: (user) => dispatch(login(user))
    };
};

export default connect(mSP, mDP)(SignUpForm);
