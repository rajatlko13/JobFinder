import React, { Component } from 'react';
import Images from '../images/images';

class Home extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <h3 className="mx-2 my-2">Welcome to Home Page</h3>
                <Images style={{float: '100px'}} width='200' height='200' />
            </React.Fragment>
         );
    }
}
 
export default Home;