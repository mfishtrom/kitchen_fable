import { RECEIVE_USER, LOGOUT_USER } from '../actions/session_actions';


const _nullUser = Object.freeze({
    id: null
});

const SessionReducer = (oldState = _nullUser, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_USER:
            return {id: action.payload.user.id};
        case LOGOUT_USER:
            return _nullUser;
        default: 
            return oldState;
    }
};

export default SessionReducer;