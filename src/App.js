import React from "react";
import {connect} from "react-redux";
import { Auth, Home } from 'pages';
import { Routes, Route, Navigate } from "react-router-dom";

const App = props => {
    const {isAuth} = props;
  return (
    <div className="wrapper">

        <Routes>
            <Route path="*" element={<Auth />} />
            <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
            <Route path="dialog/:id" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        </Routes>

    </div>
  );
}

export default connect(({user}) => ({isAuth: user.isAuth}))(App);
