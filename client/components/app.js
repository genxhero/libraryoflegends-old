import React from 'react';
import Header from './header';
import { graphql } from 'react-apollo';
import currentUser from '../queries/current_user';

const App = ( props ) => {
    return <div className="container">
         <Header />
         <div className="content"> 
           {props.children}
         </div>
    </div>;
}

export default graphql(currentUser)(App);