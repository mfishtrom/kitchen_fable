import React from 'react';
import Map from './map';
import ReservationContainer from './reservation_container';

class Restaurant extends React.Component {
    constructor(props){
        super(props);

        this.checkFav = this.checkFav.bind(this);
        this.deleteFav = this.deleteFav.bind(this);
        this.createFav = this.createFav.bind(this);

    }

    componentDidMount(){
        this.props.fetchRestaurant(this.props.match.params.restId);
    }

    deleteFav(id) {
        return (e) => {
            e.preventDefault();
            this.props.deleteFav(id);
        };
    }

    createFav(id) {
        return (e) => {
            e.preventDefault();
            this.props.createFav(id);
        };
    }

    checkFav(){

        if (!this.props.currentUserId) { return <div className="unsave-res" onClick={() => this.props.openModal('signin')}><i className="fas fa-bookmark"></i>Sign in to save</div>}

        const { restaurant } = this.props;

        if (restaurant.userSaved) {
            return (
            <div className="unsave-res" onClick={this.deleteFav(restaurant.id)}><i className="fas fa-bookmark"></i>Unsave this restaurant</div>
            )
        } else {
            return (
            <div className="save-res" onClick={this.createFav(restaurant.id)}><i className="far fa-bookmark"></i>Save this restaurant</div>
            )
        }
    }

    render(){
        if (this.props.restaurant === undefined) {
            return(<div></div>);
        }

        const { name, address, location, phone_number, cuisine, menu, hours, 
            dress_code, exec_chef, description, image } = this.props.restaurant;

        return(
            <>
                {this.checkFav()}
                <img className="rest-banner" src={image}></img>
                <div className="rest-show">
                <div className="rest-main">
                    <div className="show-tab">
                        <span className="tab-selected">Overview</span>
                        <span>Reviews</span>
                        <span>Leave a Review</span>
                    </div>
                    <span className="show-item-name">{name}</span>
                    <span className="show-item-desc">{description}</span>
                        <span className="show-item-menu"><a href={menu} target="_blank">Link to menu</a></span>
                </div>

                <div className="rest-details">
                    <ReservationContainer />
                    <Map />
                    <span className="show-item-address">
                        <i className="fas fa-map-marker-alt"></i>{address}
                    </span>
                    <span className="show-item-location">
                        <i className="fas fa-city"></i>City
                        <p>{ location }</p>
                    </span>
                    <span className="show-item-hours">
                        <i className="far fa-clock"></i>Hours of operation
                        <p>{ hours }</p>
                    </span>
                    <span className="show-item-cuisine">
                        <i className="fas fa-utensils"></i>Cuisine
                        <p>{ cuisine }</p>
                    </span>
                    <span className="show-item-dress">
                        <i className="fas fa-tshirt"></i>Dress code
                        <p>{ dress_code }</p>
                    </span>
                    <span className="show-item-chef">
                        <i className="fas fa-user-ninja"></i>Executive chef
                        <p>{ exec_chef }</p>
                    </span>
                    <span className="show-item-phone">
                        <i className="fas fa-phone"></i>Phone number
                        <p>{ phone_number }</p>
                    </span>
                </div>
            </div>
            </>
        )
    }
}

export default Restaurant;