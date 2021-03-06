import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelRes } from '../actions/reservation_actions';
import { openModal } from '../actions/modal_actions';
import { toast } from 'react-toastify';

const mDP = (dispatch) => ({
    cancelRes: (id) => dispatch(cancelRes(id)),
    openModal: (modal, review) => dispatch(openModal(modal, review))

});

class ReservationIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.cancel = this.cancel.bind(this);
        this.checkReview = this.checkReview.bind(this);
    }

    handleClick() {
        this.props.history.push(`/restaurants/${this.props.restaurant.id}`);
    }

    cancel(e){
        e.preventDefault();
        this.props.cancelRes(this.props.reservation.id);
        //successful cancellation toast message
        toast(`Your reservation at ${this.props.restaurant.name} on 
            ${this.props.reservation.date} has been cancelled.`, { className: 'toasty' });
    }

    checkCancel(){
        return this.props.cancel ? (<button className="res-cancel-btn" onClick={this.cancel}>Cancel Reservation</button>) : (<></>)
    }

    checkReview(){
        const { cancel, review, reservation } = this.props;
        if (cancel === false) {
            if (review) {
                return (
                    <button className="res-cancel-btn" onClick={() => this.props.openModal('editreview', review)}>Edit/Delete Review</button>
                )
            } else {
                return (
                    <button className="res-cancel-btn" onClick={() => this.props.openModal('newreview', {res_id: reservation.id, date: reservation.date})}>Write a Review</button>
                )
            }
        }
    }

    render() {
        if (!this.props.restaurant || !this.props.reservation) return null;
        const { name, address } = this.props.restaurant;
        const { date, time, party, occasion, photo } = this.props.reservation;
        
        const style = {
            backgroundImage: 'url(' + photo + ')',
        };

        return (
            <div className="reserve-index-item">
                <div className="fav-thumb" onClick={this.handleClick} style={style}></div>

                <div className="res-item-info">
                    <span className="res-item-name" onClick={this.handleClick}>{name}</span>
                    <span className="res-item-address">{address}</span>
                    <span className="res-item-datetime">{date} at {time}</span>
                    <span className="res-item-occ">Occasion: {occasion}</span>
                    <span className="res-item-party">For a party of {party}.</span>
                    {this.checkReview()}
                    {this.checkCancel()}
                </div>

            </div>
        );
    }
}

export default withRouter(connect(null, mDP)(ReservationIndexItem));
