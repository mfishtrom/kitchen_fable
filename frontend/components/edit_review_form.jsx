import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateReview } from '../actions/review_actions';
import { closeModal } from '../actions/modal_actions';


const mSP = ({ session, entities: { users, reservations } }) => {
    return ({
        currentUser: users[session.id],
        reservations: reservations
    });
};

const mDP = (dispatch) => ({
    updateReview: (review) => dispatch(updateReview(review)),
    closeModal: () => dispatch(closeModal())
});

class EditReviewForm extends React.Component {
    constructor(props) {
        super(props);
        const { id, comment, overall, food, service, ambience } = props.review;

        this.state = {
            id: id,
            comment: comment,
            overall: overall,
            food: food,
            service: service,
            ambience: ambience
        };
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateReview(this.state).then(this.props.closeModal);
    }

    render(){
        return(
            <div className="review-form-container">
                <form onSubmit={this.handleSubmit} className="session-form-box">
                    <h3>{this.props.currentUser.fname}, how was your visit?</h3>
                    <h5>You dined here on {this.props.reservations[this.props.review.res_id].date}</h5>
                    <hr className="session-hr" />
                    {/* {this.renderErrors()} */}
                    <div className="session-form">
                        <input type="text" value={this.state.overall} onChange={this.update('overall')} />

                        <input type="text" value={this.state.food} onChange={this.update('food')} />

                        <input type="text" value={this.state.service} onChange={this.update('service')} />

                        <input type="text" value={this.state.ambience} onChange={this.update('ambience')} />

                        <input type="text" value={this.state.comment} onChange={this.update('comment')} />

                        <input className="submit-btn" type="submit" />

                    </div>

                </form>
            </div>
        )
    }
}

export default withRouter(connect(mSP, mDP)(EditReviewForm));
