import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        
        <div className="jumbotron">
            

                <center>
            <p className="lead d-inline-block ml-2">
                <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
            </p>
               </center>
</div>
    )
}

export default Home;

/*

*/