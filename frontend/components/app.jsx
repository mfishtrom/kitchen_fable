import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import Modal from './modal';
import GreetingContainer from './greeting_container';
import { ProtectedRoute } from '../util/route_util';
import Carousel from './carousel';
import RestaurantIndexContainer from './restaurant_index_container';
import RestaurantContainer from './restaurant_container';
import UserContainer from './user_container';

const App = () => (
    <div className="main-body">
        <Modal />
        <header>
            <GreetingContainer />
            <Switch>
                {/* <AuthRoute exact path="/signin" component={SignInFormContainer} />
                <AuthRoute exact path="/signup" component={SignUpFormContainer} /> */}
            </Switch>
        </header>
        <div className="main-div">
            <Switch>
                <Route exact path="/" component={Carousel} />
                <Route exact path="/search" component={Carousel} />
                <Route exact path="/restaurants" component={RestaurantIndexContainer}/>
                <Route exact path="/restaurants/:restId" component={RestaurantContainer} />
                <ProtectedRoute exact path="/user" component={UserContainer} />
            </Switch>
        </div>
        <footer>
                <h5>Join us on</h5>
                <div className="external-links">
                <a href="https://github.com/sophiacheungshc/kitchen_fable" target="_blank"><span id="github"></span></a>
                <a href="https://github.com/sophiacheungshc/kitchen_fable" target="_blank"><span id="linkedin"></span></a>
                </div>
        </footer>
    </div>
);

export default App;

