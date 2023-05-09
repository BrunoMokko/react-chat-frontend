import { withFormik } from 'formik';
import LoginForm from '../components/LoginForm';
import store from 'redux/store';
import {userActions} from 'redux/actions';


const LoginFormContainer = withFormik({
    validate: values => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Пожалуйста, введите Вашу электронную почту!';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'Неверный адрес электронной почты!';
        }

        if(!values.password) {
            errors.password = 'Введите пароль'
        } else
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.password)) {
            errors.password = 'Неверный пароль'

        }
        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        store.dispatch(userActions.fetchUserLogin(values)).then(({status})=> {
            if(status === 'success') {
                setTimeout(function(){
                    window.location.href = '/';
                }, 800);

            }
            setSubmitting(false);
        })
            .catch(() => {
                setSubmitting(false);
            });
    },
    displayName: 'LoginForm',
})(LoginForm);

export default  LoginFormContainer;