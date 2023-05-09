import React from 'react';
import {LoginForm, RegisterForm} from 'modules';
import CheckEmail from './components/CheckEmail';
import { Routes, Route } from "react-router-dom";
import './Auth.scss';




const Auth = () => {
    return (
        <section className='auth'>
            <div className="auth__content">

                    <Routes>
                    <Route exact path='/login' element={<LoginForm />}/>
                    <Route exact path='/registeration' element={<RegisterForm/>}/>
                    <Route exact path='/registeration/verify' element={<CheckEmail/>}/>
                    </Routes>

            </div>
        </section>
    );
};

export default Auth;