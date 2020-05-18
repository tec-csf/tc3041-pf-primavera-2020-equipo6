import React, { Component } from 'react';
import app from "../base";


class home extends Component {
    constructor(props) {
        super(props);
      }
      state = {
        email: "",
      };

    render(){
        const user = app.auth().currentUser;
        return(
            <>
            <h1> Welcome {user.email}</h1>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
            </>
        );
    }
}

export default home;