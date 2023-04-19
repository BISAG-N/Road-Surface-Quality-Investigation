import React from 'react'
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Details from './Details';
import AdminControl from './AdminControl';
import PrivateRoute from './PrivateRoute';
import Reset from './Reset';
import  SetPassword from './SetPassword'
import Redirect from './Redirect';
import four  from './four';

// Components
import UserHome from './UserHome';
import ImageInvestigation from './ImageInvestigation'
import VideoInvestigation from './VideoInvestigation'
import Dashboard from "./Dashboard";
import InvestigationReport from './InvestigationReport';

const Routes = () => {
    return (
        <>
        {/* <BrowserRouter> */}
            <Switch>
              
                <PrivateRoute exact path="/" ><Home /></PrivateRoute>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" ><Signup /></Route>
                {/* <PrivateRoute exact path="/detail" component={Details}/> */}
                {/* <Route exact path="/admin"><Admin /></Route> */}
                <PrivateRoute exact path='/admin' component={AdminControl}/>
                <Route exact path="/reset" component={Reset}/>
                <Route exact path="/set-password/:token" component={SetPassword}/>


                <PrivateRoute exact path="/dashboard"><Redirect /></PrivateRoute>
                <PrivateRoute exact path="/image-investigation"><UserHome RenComponent={ImageInvestigation} /></PrivateRoute>
                <PrivateRoute exact path="/video-investigation"><UserHome RenComponent={VideoInvestigation} /></PrivateRoute>
                <PrivateRoute exact path="/investigation-report"><UserHome RenComponent={InvestigationReport} /></PrivateRoute>

                <Route path="*" component={four}/>
            </Switch>
            {/* </BrowserRouter> */}
        </>
    )
}
export default Routes;